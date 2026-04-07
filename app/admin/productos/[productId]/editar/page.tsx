import ProductForm from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditarProductoPage({ params }: { params: { productId: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.productId } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!product) notFound()
  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Productos</p>
        <h1 className="font-display text-4xl text-ink">Editar producto</h1>
      </div>
      <ProductForm categories={categories} product={product} />
    </div>
  )
}
