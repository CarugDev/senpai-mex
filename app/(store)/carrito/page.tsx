'use client'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCart()

  if (count() === 0) {
    return (
      <div className="min-h-screen bg-mist pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-5xl text-stone/30 mb-6">空</p>
          <h2 className="font-display text-2xl text-ink mb-4">Tu carrito está vacío</h2>
          <p className="font-body text-sm text-stone mb-8">Descubre nuestra colección de productos japoneses</p>
          <Link href="/productos" className="font-body text-sm tracking-widest border-b border-ink/30 hover:border-ink transition-colors pb-1">
            VER PRODUCTOS
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <div className="mb-16">
          <p className="label-sm mb-3">Tu selección</p>
          <h1 className="font-display text-5xl text-ink">Carrito ({count()})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map(item => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-ink/8">
                <div className="relative w-24 h-24 bg-snow flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-2xl text-stone/30">先</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-ink mb-1">{item.name}</h3>
                  <p className="font-body text-sm text-stone mb-4">
                    ${item.price.toFixed(2)} MXN
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 border border-ink/15 px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="font-body text-ink/60 hover:text-ink transition-colors w-4"
                      >
                        −
                      </button>
                      <span className="font-body text-sm text-ink w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="font-body text-ink/60 hover:text-ink transition-colors w-4"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-body text-xs text-stone hover:text-ink transition-colors tracking-widest"
                    >
                      ELIMINAR
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-body text-sm text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-snow p-8 sticky top-32">
              <h2 className="font-display text-2xl text-ink mb-8">Resumen</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-stone">Subtotal</span>
                  <span className="font-body text-sm text-ink">${total().toFixed(2)} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-stone">Envío</span>
                  <span className="font-body text-sm text-matcha">
                    {total() >= 1000 ? 'Gratis' : '$180.00 MXN'}
                  </span>
                </div>
                <div className="border-t border-ink/8 pt-4 flex justify-between">
                  <span className="font-body text-sm text-ink font-medium">Total</span>
                  <span className="font-body text-sm text-ink font-medium">
                    ${(total() >= 1000 ? total() : total() + 180).toFixed(2)} MXN
                  </span>
                </div>
              </div>

              {total() < 1000 && (
                <p className="font-body text-xs text-stone mb-6 text-center">
                  Agrega ${(1000 - total()).toFixed(2)} MXN más para envío gratis
                </p>
              )}

              <Link
                href="/checkout"
                className="w-full bg-torii text-snow font-body text-sm tracking-widest py-4 hover:bg-torii-dark transition-colors duration-300 block text-center mb-4"
              >
                PROCEDER AL PAGO
              </Link>

              <Link href="/productos" className="block text-center font-body text-xs text-stone hover:text-ink transition-colors tracking-widest">
                CONTINUAR COMPRANDO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
