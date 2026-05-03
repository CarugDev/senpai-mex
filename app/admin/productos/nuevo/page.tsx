import ProductForm from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function NuevoProductoPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Productos</p>
        <h1 className="font-display text-4xl text-ink">Nuevo producto</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  )
}
