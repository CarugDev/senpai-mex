'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  isActive: boolean
  isFeatured: boolean
  category: { name: string }
  images: string[]
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('todos')
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

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

  function toggleSelect(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  function toggleSelectAll() {
    if (selected.length === filtered.length) {
      setSelected([])
    } else {
      setSelected(filtered.map(p => p.id))
    }
  }

  async function handleDelete(ids: string[]) {
    if (!confirm(`¿Eliminar ${ids.length} producto(s)? Esta acción no se puede deshacer.`)) return
    setLoading(true)

    for (const id of ids) {
      await fetch(`/api/admin/productos/${id}`, { method: 'DELETE' })
    }

    setProducts(prev => prev.filter(p => !ids.includes(p.id)))
    setSelected([])
    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="label-sm mb-2">Gestión</p>
          <h1 className="font-display text-4xl text-ink">Productos ({products.length})</h1>
        </div>
        <Link href="/admin/productos/nuevo" className="font-body text-sm tracking-widest bg-ink text-snow px-8 py-3 hover:bg-ink-soft transition-colors duration-300">
          + NUEVO PRODUCTO
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
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

        {selected.length > 0 && (
          <button
            onClick={() => handleDelete(selected)}
            disabled={loading}
            className="font-body text-xs tracking-widest bg-red-500 text-snow px-6 py-2 hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'ELIMINANDO...' : `ELIMINAR (${selected.length})`}
          </button>
        )}
      </div>

      <div className="bg-snow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/8">
              <th className="p-6">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
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
              <tr key={product.id} className={`border-b border-ink/5 hover:bg-mist transition-colors ${selected.includes(product.id) ? 'bg-mist-dark' : ''}`}>
                <td className="p-6">
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="p-6">
                  <p className="font-display text-base text-ink">{product.name}</p>
                  <p className="font-body text-xs text-stone mt-1">{product.slug}</p>
                </td>
                <td className="p-6">
                  <span className="font-body text-sm text-stone">{product.category.name}</span>
                </td>
                <td className="p-6">
                  <span className="font-body text-sm text-ink">${Number(product.price).toFixed(2)}</span>
                </td>
                <td className="p-6">
                  <span className={`font-body text-sm ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-gold' : 'text-ink'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`font-body text-xs px-3 py-1 tracking-widest ${product.isActive ? 'bg-matcha/10 text-matcha' : 'bg-stone/10 text-stone'}`}>
                    {product.isActive ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/productos/${product.id}/editar`} className="font-body text-xs text-ink/50 hover:text-ink transition-colors tracking-widest">
                      EDITAR
                    </Link>
                    <button
                      onClick={() => handleDelete([product.id])}
                      className="font-body text-xs text-red-400 hover:text-red-600 transition-colors tracking-widest"
                    >
                      ELIMINAR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
