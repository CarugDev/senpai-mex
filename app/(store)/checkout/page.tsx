'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { supabase } from '@/hooks/useAuth'

const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
  'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

export default function CheckoutPage() {
  const { items, total, count } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    colony: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setForm(prev => ({ ...prev, email: session.user.email! }))
      }
    })
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingData: form }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (count() === 0) {
    return (
      <div className="min-h-screen bg-mist pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-5xl text-stone/30 mb-6">空</p>
          <h2 className="font-display text-2xl text-ink mb-4">Tu carrito está vacío</h2>
          <Link href="/productos" className="font-body text-sm tracking-widest border-b border-ink/30 hover:border-ink transition-colors pb-1">
            VER PRODUCTOS
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = total()
  const isDurango = form.state === 'Durango'
  const shipping = isDurango ? 0 : (subtotal >= 1000 ? 0 : 180)
  const orderTotal = subtotal + shipping

  const inputClass = "w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
  const labelClass = "label-sm block mb-2"

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <div className="mb-12">
          <p className="label-sm mb-3">Último paso</p>
          <h1 className="font-display text-5xl text-ink">Datos de envío</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* FORMULARIO */}
            <div className="lg:col-span-2 space-y-10">

              <div>
                <h2 className="font-display text-2xl text-ink mb-8">Información de contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Nombre completo *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className={labelClass}>Correo electrónico *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="tu@correo.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Teléfono *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="10 dígitos" />
                  </div>
                </div>
              </div>

              <div className="border-t border-ink/8 pt-10">
                <h2 className="font-display text-2xl text-ink mb-8">Dirección de envío</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Calle y número *</label>
                    <input name="street" value={form.street} onChange={handleChange} required className={inputClass} placeholder="Calle, número exterior e interior" />
                  </div>
                  <div>
                    <label className={labelClass}>Colonia *</label>
                    <input name="colony" value={form.colony} onChange={handleChange} required className={inputClass} placeholder="Colonia o fraccionamiento" />
                  </div>
                  <div>
                    <label className={labelClass}>Ciudad *</label>
                    <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Ciudad o municipio" />
                  </div>
                  <div>
                    <label className={labelClass}>Estado *</label>
                    <select name="state" value={form.state} onChange={handleChange} required className={inputClass}>
                      <option value="">Selecciona un estado</option>
                      {ESTADOS_MEXICO.map(estado => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Código postal *</label>
                    <input name="zip" value={form.zip} onChange={handleChange} required className={inputClass} placeholder="5 dígitos" maxLength={5} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Notas de entrega (opcional)</label>
                    <textarea name="notes" value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))} className={inputClass} placeholder="Indicaciones para el repartidor" rows={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* RESUMEN */}
            <div className="lg:col-span-1">
              <div className="bg-snow p-8 sticky top-32">
                <h2 className="font-display text-2xl text-ink mb-8">Resumen</h2>

                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-ink truncate">{item.name}</p>
                        <p className="font-body text-xs text-stone">x{item.quantity}</p>
                      </div>
                      <p className="font-body text-sm text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-ink/8 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone">Subtotal</span>
                    <span className="font-body text-sm text-ink">${subtotal.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone">Envío</span>
                    <span className={`font-body text-sm ${shipping === 0 ? 'text-matcha' : 'text-ink'}`}>
                      {shipping === 0 ? 'Gratis' : '$180.00 MXN'}
                    </span>
                  </div>
                  <div className="border-t border-ink/8 pt-3 flex justify-between">
                    <span className="font-body text-sm font-medium text-ink">Total</span>
                    <span className="font-body text-sm font-medium text-ink">${orderTotal.toFixed(2)} MXN</span>
                  </div>
                </div>

                {isDurango && (
                  <p className="font-body text-xs text-matcha mt-2 text-center">
                    ✓ Envío gratuito a Durango
                  </p>
                )}

                {!isDurango && subtotal < 1000 && (
                  <p className="font-body text-xs text-stone mt-4 text-center">
                    Agrega ${(1000 - subtotal).toFixed(2)} MXN más para envío gratis
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-torii text-snow font-body text-sm tracking-widest py-4 hover:bg-torii-dark transition-colors duration-300 disabled:opacity-50 mt-8"
                >
                  {loading ? 'PROCESANDO...' : 'PROCEDER AL PAGO'}
                </button>

                <Link href="/carrito" className="block text-center font-body text-xs text-stone hover:text-ink transition-colors tracking-widest mt-4">
                  ← VOLVER AL CARRITO
                </Link>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
