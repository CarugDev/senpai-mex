import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/store/AddToCartButton'

export const revalidate = 0

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, isActive: true },
    include: { category: true },
  })

  if (!product) notFound()

  const price = Number(product.price)
  const compareAt = product.compareAt ? Number(product.compareAt) : null

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div className="relative aspect-square bg-snow overflow-hidden">
            {product.images && product.images.length > 0 && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-[20vw] md:text-[10vw] text-stone/20">先</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="label-sm mb-4">{product.category.name}</p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-body text-2xl text-ink">
                ${price.toFixed(2)} <span className="text-sm text-stone">MXN</span>
              </span>
              {compareAt && compareAt > price && (
                <span className="font-body text-lg text-stone line-through">
                  ${compareAt.toFixed(2)}
                </span>
              )}
            </div>

            <div className="w-12 h-px bg-ink/20 mb-8" />

            <p className="font-body text-sm text-stone leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-3 mb-10">
              <div className="flex justify-between py-3 border-b border-ink/8">
                <span className="label-sm">Origen</span>
                <span className="font-body text-sm text-ink">{product.origin}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-ink/8">
                <span className="label-sm">Disponibilidad</span>
                <span className="font-body text-sm text-ink">
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                </span>
              </div>
            </div>

            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price,
              image: product.images[0] ?? '',
            }} stock={product.stock} />
          </div>
        </div>
      </div>
    </div>
  )
}
