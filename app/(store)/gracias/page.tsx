'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

export default function GraciasPage() {
  const clearCart = useCart(s => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl text-matcha mb-8">ありがとう</p>
        <h1 className="font-display text-3xl text-ink mb-4">¡Pedido confirmado!</h1>
        <p className="font-body text-sm text-stone leading-relaxed mb-12">
          Gracias por tu compra. Recibirás un correo de confirmación con los detalles de tu pedido. Procesaremos tu envío en las próximas 24 horas.
        </p>
        <Link href="/productos" className="inline-block font-body text-sm tracking-widest bg-ink text-snow px-10 py-4 hover:bg-ink-soft transition-colors duration-300">
          SEGUIR COMPRANDO
        </Link>
      </div>
    </div>
  )
}
