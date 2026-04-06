'use client'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'

interface Props {
  product: {
    id: string
    name: string
    slug: string
    price: number
    image: string
  }
  stock: number
}

export default function AddToCartButton({ product, stock }: Props) {
  const addItem = useCart(s => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (stock === 0) {
    return (
      <button disabled className="w-full bg-stone/20 text-stone font-body text-sm tracking-widest py-4 cursor-not-allowed">
        AGOTADO
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full font-body text-sm tracking-widest py-4 transition-all duration-300 ${
        added
          ? 'bg-matcha text-snow'
          : 'bg-ink text-snow hover:bg-ink-soft'
      }`}
    >
      {added ? '✓ AGREGADO AL CARRITO' : 'AGREGAR AL CARRITO'}
    </button>
  )
}
