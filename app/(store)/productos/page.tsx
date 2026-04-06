import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/store/ProductCard'

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(searchParams.category && {
        category: { slug: searchParams.category },
      }),
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-mist pt-32">
      <div className="container-jp">
        <div className="mb-16">
          <p className="label-sm mb-3">Tienda</p>
          <h1 className="font-display text-5xl text-ink">
            {searchParams.category
              ? categories.find(c => c.slug === searchParams.category)?.name ?? 'Productos'
              : 'Todos los productos'}
          </h1>
        </div>

        <div className="flex gap-6 mb-12 border-b border-ink/10 pb-6 overflow-x-auto">
          <Link
            href="/productos"
            className={`font-body text-sm whitespace-nowrap pb-1 transition-colors duration-300 ${!searchParams.category ? 'text-ink border-b border-ink' : 'text-stone hover:text-ink'}`}
          >
            Todo
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/productos?category=${cat.slug}`}
              className={`font-body text-sm whitespace-nowrap pb-1 transition-colors duration-300 ${searchParams.category === cat.slug ? 'text-ink border-b border-ink' : 'text-stone hover:text-ink'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-display text-2xl text-stone">Sin productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 pb-32">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
