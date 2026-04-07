import Link from 'next/link'
import ProductCard from '@/components/store/ProductCard'
import { prisma } from '@/lib/prisma'

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { category: true },
    take: 3,
  })
}

async function getAllProducts() {
  return await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    take: 6,
  })
}

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedProducts(), getAllProducts()])

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24 bg-mist overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mist/20 via-transparent to-mist/60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[40vw] text-ink leading-none select-none">茶</span>
        </div>
        <div className="container-jp relative z-10 w-full">
          <div className="max-w-3xl">
            <p className="label-sm mb-8">Importado directamente de Japón · Envíos a México</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.9] mb-10">
              El sabor<br />
              <em className="not-italic text-matcha">auténtico</em><br />
              de Japón
            </h1>
            <p className="font-body text-ink/50 text-lg max-w-lg leading-relaxed mb-12">
              Tés ceremoniales, snacks tradicionales y utensilios artesanales. Seleccionados con rigor para el paladar mexicano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/productos" className="inline-block font-body text-sm tracking-widest bg-ink text-snow px-10 py-4 hover:bg-ink-soft transition-colors duration-300">
                EXPLORAR TIENDA
              </Link>
              <Link href="/productos?category=tes-japoneses" className="inline-block font-body text-sm tracking-widest border border-ink/30 text-ink px-10 py-4 hover:border-ink transition-colors duration-300">
                VER TÉS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      <div className="bg-matcha text-snow py-3">
        <p className="font-body text-xs tracking-[0.2em] text-center">
          ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN · PAGO SEGURO CON STRIPE
        </p>
      </div>

      {/* CATEGORIES */}
      <section className="section-pad">
        <div className="container-jp">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Colecciones</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Explora por categoría</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Belleza', slug: 'belleza', kanji: '美', desc: 'Cuidado personal japonés' },
              { name: 'Ropa', slug: 'ropa', kanji: '服', desc: 'Moda auténtica de Japón' },
              { name: 'Bags', slug: 'bags', kanji: '鞄', desc: 'Bolsas y accesorios' },
              { name: 'Tés', slug: 'tes', kanji: '茶', desc: 'Matcha, hojicha, gyokuro' },
            ].map(cat => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/productos?category=${cat.slug}` : '/productos'}
                className="group relative aspect-square bg-mist-dark overflow-hidden flex flex-col justify-between p-8 hover:bg-ink transition-colors duration-500"
              >
                <span className="font-display text-6xl text-ink/10 group-hover:text-snow/10 transition-colors duration-500 leading-none">
                  {cat.kanji}
                </span>
                <div>
                  <p className="font-body text-xs text-stone group-hover:text-snow/50 tracking-widest mb-1 transition-colors duration-500">
                    {cat.desc}
                  </p>
                  <p className="font-display text-xl text-ink group-hover:text-snow transition-colors duration-500">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad bg-snow">
        <div className="container-jp">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Selección</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Destacados</h2>
            </div>
            <Link href="/productos" className="font-body text-sm text-ink/40 hover:text-ink transition-colors duration-300 hidden md:block">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {featured.map(product => (
              <ProductCard key={product.id} product={{
                ...product,
                price: Number(product.price),
                compareAt: product.compareAt ? Number(product.compareAt) : null,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section-pad">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="aspect-[4/5] bg-mist-dark relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[20vw] md:text-[12vw] text-stone/20">道</span>
              </div>
            </div>
            <div>
              <p className="label-sm mb-6">Nuestra filosofía</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-8">
                De los campos<br />de Japón<br />a tu mesa
              </h2>
              <p className="font-body text-ink/50 leading-relaxed mb-6">
                Cada producto que seleccionamos pasa por un riguroso proceso de curación. Trabajamos directamente con productores japoneses que llevan generaciones perfeccionando su oficio.
              </p>
              <p className="font-body text-ink/50 leading-relaxed mb-12">
                Nuestra misión es simple: llevarte lo mejor de Japón con la autenticidad intacta.
              </p>
              <Link href="/nosotros" className="font-body text-sm tracking-widest border-b border-ink/30 pb-1 hover:border-ink transition-colors duration-300">
                NUESTRA HISTORIA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section-pad bg-mist-dark">
        <div className="container-jp">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Colección completa</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Todos los productos</h2>
            </div>
            <Link href="/productos" className="font-body text-sm text-ink/40 hover:text-ink transition-colors duration-300 hidden md:block">
              Ver catálogo →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14">
            {all.map(product => (
              <ProductCard key={product.id} product={{
                ...product,
                price: Number(product.price),
                compareAt: product.compareAt ? Number(product.compareAt) : null,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-20 bg-ink">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { kanji: '真', title: 'Autenticidad', desc: 'Productos verificados importados directamente de Japón' },
              { kanji: '速', title: 'Envío rápido', desc: 'Entrega a toda la República Mexicana' },
              { kanji: '安', title: 'Pago seguro', desc: 'Tarjeta, OXXO y más métodos de pago' },
            ].map(item => (
              <div key={item.kanji} className="space-y-4">
                <p className="font-display text-5xl text-snow/10">{item.kanji}</p>
                <p className="font-display text-xl text-gold">{item.title}</p>
                <p className="font-body text-sm text-snow/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
