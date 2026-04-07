import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProductosPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
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
      <div className="bg-snow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/8">
              <th className="label-sm text-left p-6">Producto</th>
              <th className="label-sm text-left p-6">Categoría</th>
              <th className="label-sm text-left p-6">Precio</th>
              <th className="label-sm text-left p-6">Stock</th>
              <th className="label-sm text-left p-6">Estado</th>
              <th className="label-sm text-left p-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-ink/5 hover:bg-mist transition-colors">
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
