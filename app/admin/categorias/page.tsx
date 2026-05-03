import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriasPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Gestión</p>
        <h1 className="font-display text-4xl text-ink">Categorías</h1>
      </div>

      <div className="bg-snow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink/8">
              <th className="label-sm text-left p-6">Nombre</th>
              <th className="label-sm text-left p-6">Slug</th>
              <th className="label-sm text-left p-6">Productos</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-ink/5 hover:bg-mist transition-colors">
                <td className="p-6">
                  <p className="font-display text-base text-ink">{cat.name}</p>
                </td>
                <td className="p-6">
                  <p className="font-mono text-xs text-stone">{cat.slug}</p>
                </td>
                <td className="p-6">
                  <p className="font-body text-sm text-ink">{cat._count.products}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
