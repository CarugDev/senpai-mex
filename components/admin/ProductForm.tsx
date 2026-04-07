'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category { id: string; name: string }
interface Product {
  id: string; name: string; slug: string; description: string
  price: any; compareAt: any; stock: number; images: string[]
  origin: string; categoryId: string; isActive: boolean; isFeatured: boolean
}

export default function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    price: product?.price ? String(product.price) : '',
    compareAt: product?.compareAt ? String(product.compareAt) : '',
    stock: product?.stock ?? 0,
    images: product?.images?.join(', ') ?? '',
    origin: product?.origin ?? 'Japón',
    categoryId: product?.categoryId ?? categories[0]?.id ?? '',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
  })

  function generateSlug(name: string) {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const body = {
      ...form,
      price: parseFloat(form.price),
      compareAt: form.compareAt ? parseFloat(form.compareAt) : null,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
    }
    const url = product ? `/api/admin/productos/${product.id}` : '/api/admin/productos'
    const method = product ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) {
      router.push('/admin/productos')
      router.refresh()
    } else {
      alert('Error al guardar')
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
  const labelClass = "label-sm block mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Nombre</label>
          <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })} required />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input className={inputClass} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea className={inputClass} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div>
          <label className={labelClass}>Precio (MXN)</label>
          <input type="number" step="0.01" className={inputClass} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        </div>
        <div>
          <label className={labelClass}>Precio anterior</label>
          <input type="number" step="0.01" className={inputClass} value={form.compareAt} onChange={e => setForm({ ...form, compareAt: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input type="number" className={inputClass} value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Categoría</label>
          <select className={inputClass} value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Origen</label>
          <input className={inputClass} value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} />
        </div>
      </div>

      <div>
        <label className={labelClass}>URLs de imágenes (separadas por coma)</label>
        <input className={inputClass} value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} placeholder="https://..." />
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
          <span className="font-body text-sm text-ink">Activo</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4" />
          <span className="font-body text-sm text-ink">Destacado</span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={loading} className="font-body text-sm tracking-widest bg-ink text-snow px-10 py-4 hover:bg-ink-soft transition-colors duration-300 disabled:opacity-50">
          {loading ? 'GUARDANDO...' : product ? 'ACTUALIZAR' : 'CREAR PRODUCTO'}
        </button>
        <button type="button" onClick={() => router.back()} className="font-body text-sm tracking-widest border border-ink/20 text-ink px-8 py-4 hover:border-ink transition-colors duration-300">
          CANCELAR
        </button>
      </div>
    </form>
  )
}
