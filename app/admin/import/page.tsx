'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ImportPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null)

  async function handleImport() {
    if (!file) return
    setLoading(true)
    const text = await file.text()
    const lines = text.split('\n').filter(l => l.trim())
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const rows = lines.slice(1)
    const errors: string[] = []
    let success = 0

    for (const row of rows) {
      const values = row.split(',').map(v => v.trim().replace(/"/g, ''))
      const product: Record<string, string> = {}
      headers.forEach((h, i) => { product[h] = values[i] ?? '' })

      if (!product.name || !product.slug || !product.price || !product.categorySlug) {
        errors.push(`Fila saltada: datos incompletos — ${product.name || 'sin nombre'}`)
        continue
      }

      const res = await fetch('/api/admin/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          price: parseFloat(product.price),
          compareAt: product.compareAt ? parseFloat(product.compareAt) : null,
          stock: parseInt(product.stock) || 0,
          images: product.imageUrl ? [product.imageUrl] : [],
          categorySlug: product.categorySlug,
          isActive: true,
          isFeatured: product.isFeatured === 'true',
        }),
      })

      if (res.ok) {
        success++
      } else {
        const err = await res.json()
        errors.push(`Error en ${product.name}: ${err.error}`)
      }
    }

    setResults({ success, errors })
    setLoading(false)
    if (success > 0) router.refresh()
  }

  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Admin</p>
        <h1 className="font-display text-4xl text-ink">Importar productos</h1>
      </div>

      <div className="bg-snow p-8 max-w-2xl mb-8">
        <h2 className="font-display text-2xl text-ink mb-6">Plantilla CSV</h2>
        <p className="font-body text-sm text-stone mb-4">El archivo CSV debe tener estas columnas en orden:</p>
        <div className="bg-mist p-4 font-mono text-xs text-ink mb-6 overflow-x-auto">
          name,slug,description,price,compareAt,stock,imageUrl,categorySlug,isFeatured
        </div>
        <p className="font-body text-xs text-stone mb-2">Valores para <strong>categorySlug</strong>:</p>
        <div className="flex gap-2 flex-wrap mb-6">
          {['belleza', 'ropa', 'bags', 'tes', 'varios'].map(s => (
            <span key={s} className="font-mono text-xs bg-mist-dark px-3 py-1">{s}</span>
          ))}
        </div>
        <a
          href="/plantilla-productos.csv"
          download
          className="font-body text-sm tracking-widest border-b border-ink/30 pb-1 hover:border-ink transition-colors"
        >
          DESCARGAR PLANTILLA →
        </a>
      </div>

      <div className="bg-snow p-8 max-w-2xl mb-8">
        <h2 className="font-display text-2xl text-ink mb-6">Subir archivo CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="font-body text-sm text-ink mb-6 block"
        />
        {file && (
          <p className="font-body text-xs text-stone mb-6">Archivo: {file.name}</p>
        )}
        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="font-body text-sm tracking-widest bg-ink text-snow px-10 py-4 hover:bg-ink-soft transition-colors disabled:opacity-50"
        >
          {loading ? 'IMPORTANDO...' : 'IMPORTAR PRODUCTOS'}
        </button>
      </div>

      {results && (
        <div className="bg-snow p-8 max-w-2xl">
          <h2 className="font-display text-2xl text-ink mb-6">Resultados</h2>
          <p className="font-body text-sm text-matcha mb-4">✓ {results.success} productos importados correctamente</p>
          {results.errors.length > 0 && (
            <div>
              <p className="font-body text-sm text-red-500 mb-2">✗ {results.errors.length} errores:</p>
              <ul className="space-y-1">
                {results.errors.map((e, i) => (
                  <li key={i} className="font-body text-xs text-stone">{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
