'use client'
import Link from 'next/link'
import ProductCard from '@/components/store/ProductCard'
import AnimateIn from '@/components/ui/AnimateIn'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAt: number | null
  images: string[]
  origin: string
  category: { name: string }
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [all, setAll] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/productos?featured=true&limit=3')
      .then(r => r.json())
      .then(d => setFeatured(d.products ?? []))

    fetch('/api/productos?limit=6')
      .then(r => r.json())
      .then(d => setAll(d.products ?? []))
  }, [])

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24 bg-mist overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <motion.span
            className="font-display text-[40vw] text-ink leading-none select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            茶
          </motion.span>
        </div>
        <div className="container-jp relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.p
              className="label-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Importado directamente de Japón · Envíos a México
            </motion.p>
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.9] mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              El sabor<br />
              <em className="not-italic text-matcha">auténtico</em><br />
              de Japón
            </motion.h1>
            <motion.p
              className="font-body text-ink/50 text-lg max-w-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Tés ceremoniales, snacks tradicionales y utensilios artesanales. Seleccionados con rigor para el paladar mexicano.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/productos" className="inline-block font-body text-sm tracking-widest bg-ink text-snow px-10 py-4 hover:bg-ink-soft transition-colors duration-300">
                EXPLORAR TIENDA
              </Link>
              <Link href="/productos?category=tes" className="inline-block font-body text-sm tracking-widest border border-ink/30 text-ink px-10 py-4 hover:border-ink transition-colors duration-300">
                VER TÉS
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      <motion.div
        className="bg-matcha text-snow py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p className="font-body text-xs tracking-[0.2em] text-center">
          ENVÍO GRATIS EN COMPRAS MAYORES A $800 MXN · PAGO SEGURO CON STRIPE
        </p>
      </motion.div>

      {/* CATEGORIES */}
      <section className="section-pad">
        <div className="container-jp">
          <AnimateIn className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Colecciones</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Explora por categoría</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Belleza', slug: 'belleza', kanji: '美', desc: 'Cuidado personal japonés' },
              { name: 'Ropa', slug: 'ropa', kanji: '服', desc: 'Moda auténtica de Japón' },
              { name: 'Bags', slug: 'bags', kanji: '鞄', desc: 'Bolsas y accesorios' },
              { name: 'Tés', slug: 'tes', kanji: '茶', desc: 'Matcha, hojicha, gyokuro' },
            ].map((cat, i) => (
              <AnimateIn key={cat.slug} delay={i * 0.1} direction="up">
                <Link
                  href={`/productos?category=${cat.slug}`}
                  className="group relative aspect-square bg-mist-dark overflow-hidden flex flex-col justify-between p-8 hover:bg-ink transition-colors duration-500 block"
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
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad bg-snow">
        <div className="container-jp">
          <AnimateIn className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Selección</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Destacados</h2>
            </div>
            <Link href="/productos" className="font-body text-sm text-ink/40 hover:text-ink transition-colors duration-300 hidden md:block">
              Ver todos →
            </Link>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {featured.map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.15} direction="up">
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section-pad">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <AnimateIn direction="right">
              <div className="aspect-[4/5] bg-mist-dark relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[20vw] md:text-[12vw] text-stone/20">道</span>
                </div>
              </div>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
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
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section-pad bg-mist-dark">
        <div className="container-jp">
          <AnimateIn className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Colección completa</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Todos los productos</h2>
            </div>
            <Link href="/productos" className="font-body text-sm text-ink/40 hover:text-ink transition-colors duration-300 hidden md:block">
              Ver catálogo →
            </Link>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14">
            {all.map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.1} direction="up">
                <ProductCard product={product} />
              </AnimateIn>
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
            ].map((item, i) => (
              <AnimateIn key={item.kanji} delay={i * 0.15} direction="up">
                <div className="space-y-4">
                  <p className="font-display text-5xl text-snow/10">{item.kanji}</p>
                  <p className="font-display text-xl text-gold">{item.title}</p>
                  <p className="font-body text-sm text-snow/40 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
