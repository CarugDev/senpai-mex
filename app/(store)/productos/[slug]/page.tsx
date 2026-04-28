import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/store/AddToCartButton'
import AnimateIn from '@/components/ui/AnimateIn'
import Link from 'next/link'

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

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      isActive: true,
      NOT: { id: product.id }
    },
    include: { category: true },
    take: 4,
  })

  return (
    <div className="min-h-screen bg-mist">

      {/* BREADCRUMB */}
      <div className="container-jp pt-32 pb-8">
        <div className="flex items-center gap-2 font-body text-xs text-stone">
          <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-ink transition-colors">Productos</Link>
          <span>/</span>
          <Link href={`/productos?category=${product.category.slug}`} className="hover:text-ink transition-colors">{product.category.name}</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <section className="container-jp pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

          {/* IMAGE */}
          <AnimateIn direction="right">
            <div className="sticky top-32">
              <div className="relative w-full overflow-hidden bg-snow" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-mist-dark">
                      <span className="font-display text-[10vw] text-stone/20">先</span>
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                      <div className="border border-snow/50 px-6 py-3 rotate-[-30deg]">
                        <span className="font-body text-sm tracking-widest text-snow">AGOTADO</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MULTIPLE IMAGES THUMBNAILS */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {product.images.map((img, i) => (
                    <div key={i} className="relative overflow-hidden bg-snow" style={{ paddingBottom: '100%' }}>
                      <img src={img} alt={`${product.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateIn>

          {/* PRODUCT INFO */}
          <AnimateIn direction="left" delay={0.2}>
            <div className="flex flex-col">

              <div className="mb-8">
                <Link href={`/productos?category=${product.category.slug}`} className="label-sm hover:text-ink transition-colors">
                  {product.category.name}
                </Link>
                <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mt-3 mb-6">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <span className="font-display text-3xl text-ink">
                    ${price.toFixed(2)} <span className="font-body text-sm text-stone">MXN</span>
                  </span>
                  {compareAt && compareAt > price && (
                    <span className="font-body text-lg text-stone line-through">
                      ${compareAt.toFixed(2)}
                    </span>
                  )}
                  {compareAt && compareAt > price && (
                    <span className="font-body text-xs bg-torii text-snow px-3 py-1 tracking-widest">
                      {Math.round((1 - price / compareAt) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full h-px bg-ink/10 mb-8" />

              <p className="font-body text-sm text-stone leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between py-3 border-b border-ink/8">
                  <span className="label-sm">Origen</span>
                  <span className="font-body text-sm text-ink">{product.origin}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-ink/8">
                  <span className="label-sm">Categoría</span>
                  <span className="font-body text-sm text-ink">{product.category.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-ink/8">
                  <span className="label-sm">Disponibilidad</span>
                  <span className={`font-body text-sm ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-gold' : 'text-matcha'}`}>
                    {product.stock === 0 ? 'Agotado' : product.stock <= 5 ? `Últimas ${product.stock} piezas` : `${product.stock} disponibles`}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <AddToCartButton product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price,
                  image: product.images[0] ?? '',
                }} stock={product.stock} />
              </div>

              {/* SHIPPING INFO */}
              <div className="bg-snow p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-matcha text-sm">✓</span>
                  <span className="font-body text-xs text-stone">Envío gratis a Durango</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-matcha text-sm">✓</span>
                  <span className="font-body text-xs text-stone">Envío gratis en pedidos mayores a $1,000 MXN</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-matcha text-sm">✓</span>
                  <span className="font-body text-xs text-stone">Entrega en 3-7 días hábiles a toda la República</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-matcha text-sm">✓</span>
                  <span className="font-body text-xs text-stone">Producto 100% auténtico importado de Japón</span>
                </div>
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="section-pad bg-snow">
          <div className="container-jp">
            <AnimateIn>
              <p className="label-sm mb-3">También te puede gustar</p>
              <h2 className="font-display text-3xl text-ink mb-12">Productos relacionados</h2>
            </AnimateIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((rel, i) => (
                <AnimateIn key={rel.id} delay={i * 0.1} direction="up">
                  <Link href={`/productos/${rel.slug}`} className="group block">
                    <div className="relative w-full overflow-hidden bg-mist mb-3" style={{ paddingBottom: '100%' }}>
                      <div className="absolute inset-0">
                        {rel.images[0] ? (
                          <img
                            src={rel.images[0]}
                            alt={rel.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-mist-dark">
                            <span className="font-display text-2xl text-stone/20">先</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="font-display text-base text-ink group-hover:text-torii transition-colors">{rel.name}</p>
                    <p className="font-body text-sm text-stone">${Number(rel.price).toFixed(2)} MXN</p>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
