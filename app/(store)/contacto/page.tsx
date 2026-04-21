'use client'
import { useState } from 'react'
import AnimateIn from '@/components/ui/AnimateIn'

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass = "w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
  const labelClass = "label-sm block mb-2"

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <AnimateIn>
          <p className="label-sm mb-4">Contacto</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-4">Estamos aquí<br />para ayudarte</h1>
          <p className="font-body text-ink/60 text-lg max-w-xl leading-relaxed mb-16">
            ¿Tienes dudas sobre algún producto, tu pedido o envío? Escríbenos y te respondemos a la brevedad.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <AnimateIn direction="right">
            {sent ? (
              <div className="bg-snow p-12 text-center">
                <p className="font-display text-5xl text-matcha mb-4">✓</p>
                <h2 className="font-display text-2xl text-ink mb-4">Mensaje enviado</h2>
                <p className="font-body text-sm text-stone">Te responderemos en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className={labelClass}>Nombre completo</label>
                  <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Tu nombre" />
                </div>
                <div>
                  <label className={labelClass}>Correo electrónico</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="tu@correo.com" />
                </div>
                <div>
                  <label className={labelClass}>Mensaje</label>
                  <textarea name="message" value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} required className={inputClass} rows={5} placeholder="¿En qué podemos ayudarte?" />
                </div>
                <button type="submit" className="w-full bg-torii text-snow font-body text-sm tracking-widest py-4 hover:bg-torii-dark transition-colors duration-300">
                  ENVIAR MENSAJE
                </button>
              </form>
            )}
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <div className="bg-snow p-8">
                <p className="label-sm mb-3">WhatsApp</p>
                <p className="font-display text-xl text-ink mb-2">Respuesta inmediata</p>
                <p className="font-body text-sm text-stone">Escríbenos por WhatsApp para una respuesta más rápida.</p>
              </div>
              <div className="bg-snow p-8">
                <p className="label-sm mb-3">Correo</p>
                <p className="font-display text-xl text-ink mb-2">hectorheca9@hotmail.com</p>
                <p className="font-body text-sm text-stone">Respondemos en menos de 24 horas.</p>
              </div>
              <div className="bg-snow p-8">
                <p className="label-sm mb-3">Horario</p>
                <p className="font-display text-xl text-ink mb-2">Lun — Sáb</p>
                <p className="font-body text-sm text-stone">9:00 am — 7:00 pm (hora México)</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </div>
  )
}
