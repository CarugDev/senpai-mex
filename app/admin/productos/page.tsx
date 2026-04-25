'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  isActive: boolean
  isFeatured: boolean
  images: string[]
  category: { name: string }
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('todos')

  useEffect(() => {
    fetch('/api/admin/productos/all')
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
  }, [])

  const filtered = products.filter(p => {
    if (filter === 'activos') return p.isActive
    if (filter === 'agotados') return p.stock === 0
    if (filter === 'destacados') return p.isFeatured
    return true
  })

  return (
    <div>
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="label-sm mb-2">Gestión</p>
          <h1 className="font-display text-4xl text-ink">Productos</h1>
        </div>
        <Link href="/admin/productos/nuevo" className="font-body text-sm tracking-widest bg-ink text-snow px-8 py-3 hover:bg-ink-soft transition-colors duration-300">
          + NUEVO PRODUCTO
        </Link>
      </div>
      <div className="flex gap-3 mb-8">
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'activos', label: 'Activos' },
          { key: 'agotados', label: 'Agotados' },
          { key: 'destacados', label: 'Destacados' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-body text-xs tracking-widest px-4 py-2 transition-colors duration-200 ${
              filter === f.key
                ? 'bg-ink text-snow'
                : 'border border-ink/20 text-stone hover:border-ink hover:text-ink'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="bg-snow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/8">
              <th className="label-sm text-left p-6">Imagen</th>
              <th className="label-sm text-left p-6">Producto</th>
              <th className="label-sm text-left p-6">Categoría</th>
              <th className="label-sm text-left p-6">Precio</th>
              <th className="label-sm text-left p-6">Stock</th>
              <th className="label-sm text-left p-6">Estado</th>
              <th className="label-sm text-left p-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="border-b border-ink/5 hover:bg-mist transition-colors">
                <td className="p-6">
                  {product.images[0] ? (
                    <div className="w-12 h-12 overflow-hidden bg-mist flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-mist-dark flex items-center justify-center">
                      <span className="font-display text-lg text-stone/30">先</span>
                    </div>
                  )}
                </td>
                <td className="p-6">
                  <p className="font-display text-base text-ink">{product.name}</p>
                  <p className="font-body text-xs text-stone mt-1">{product.slug}</p>
                </td>
                <td className="p-6"><span className="font-body text-sm text-stone">{product.category.name}</span></td>
                <td className="p-6"><span className="font-body text-sm text-ink">${Number(product.price).toFixed(2)}</span></td>
                <td className="p-6"><span className={`font-body text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-ink'}`}>{product.stock}</span></td>
                <td className="p-6">
                  <span className={`font-body text-xs px-3 py-1 tracking-widest ${product.isActive ? 'bg-matcha/10 text-matcha' : 'bg-stone/10 text-stone'}`}>
                    {product.isActive ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </td>
                <td className="p-6">
                  <Link href={`/admin/productos/${product.id}/editar`} className="font-body text-xs text-ink/50 hover:text-ink transition-colors tracking-widest">EDITAR</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
