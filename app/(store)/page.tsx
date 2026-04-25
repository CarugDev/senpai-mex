'use client'
import Link from 'next/link'
import Image from 'next/image'
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
  stock: number
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

      {/* HERO — Shibuya de fondo */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/shibuya.jpg"
            alt="Tokio de noche"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/40" />
        </div>

        <div className="container-jp relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.p
              className="font-body text-xs uppercase tracking-[0.2em] text-torii-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              De Tokio a México · Productos japoneses auténticos
            </motion.p>
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl text-snow leading-[0.9] mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Un poco<br />
              <em className="not-italic text-torii-light" style={{ textShadow: '0 0 8px rgba(255, 65, 54, 0.9), 0 0 20px rgba(255, 65, 54, 0.6), 0 0 35px rgba(255, 65, 54, 0.3)' }}>de Tokio</em><br />
              en México
            </motion.h1>
            <motion.p
              className="font-body text-snow/70 text-lg max-w-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Belleza, moda, snacks, tés y mucho más. Todo seleccionado directamente en Japón para traerte lo auténtico sin que tengas que viajar.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/productos" className="btn-primary inline-block text-center">
                EXPLORAR TIENDA
              </Link>
              <Link href="/productos?category=tes" className="btn-outline inline-block text-center border-snow/40 text-snow hover:border-torii hover:text-torii-light">
                VER CATEGORÍAS
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 right-8 md:right-20 text-snow/30 font-body text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          TOKIO, JAPÓN
        </motion.div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      <div className="bg-torii text-snow py-3">
        <p className="font-body text-xs tracking-[0.2em] text-center">
          ENVÍO GRATIS EN COMPRAS MAYORES A $1,000 MXN · GRATIS A DURANGO · PAGO SEGURO · PRODUCTOS 100% AUTÉNTICOS
        </p>
      </div>

      {/* CATEGORIES */}
      <section className="section-pad bg-mist">
        <div className="container-jp">
          <AnimateIn className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Lo que encontrarás</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Todo lo que Japón tiene para ti</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: 'Belleza', slug: 'belleza', kanji: '美', desc: 'Skincare y cosméticos japoneses', img: '/images/categoria-belleza.jpg' },
              { name: 'Ropa', slug: 'ropa', kanji: '服', desc: 'Moda auténtica de Japón', img: '/images/categoria-ropa.webp' },
              { name: 'Bags', slug: 'bags', kanji: '鞄', desc: 'Bolsas y accesorios', img: '/images/categoria-bags.webp' },
              { name: 'Tés', slug: 'tes', kanji: '茶', desc: 'Matcha, hojicha, gyokuro', img: '/images/categoria-tes.jpg' },
            ].map((cat, i) => (
              <AnimateIn key={cat.slug} delay={i * 0.1} direction="up">
                <Link
                  href={`/productos?category=${cat.slug}`}
                  className="group relative aspect-square overflow-hidden flex flex-col justify-between p-8 block"
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-torii/60 transition-colors duration-500" />
                  <span className="relative z-10 font-display text-6xl text-snow/20 leading-none">
                    {cat.kanji}
                  </span>
                  <div className="relative z-10">
                    <p className="font-body text-xs text-snow/60 tracking-widest mb-1">
                      {cat.desc}
                    </p>
                    <p className="font-display text-xl text-snow">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              </AnimateIn>
            ))}
            <AnimateIn delay={0.4} direction="up">
              <Link
                href="/productos?category=varios"
                className="group relative aspect-square overflow-hidden flex flex-col justify-between p-8 block bg-ink"
              >
                <div className="absolute inset-0 bg-ink group-hover:bg-torii/80 transition-colors duration-500" />
                <span className="relative z-10 font-display text-6xl text-snow/20 leading-none">
                  他
                </span>
                <div className="relative z-10">
                  <p className="font-body text-xs text-snow/60 tracking-widest mb-1">
                    Productos variados de Japón
                  </p>
                  <p className="font-display text-xl text-snow">
                    Varios
                  </p>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-pad bg-snow">
        <div className="container-jp">
          <AnimateIn className="flex items-end justify-between mb-16">
            <div>
              <p className="label-sm mb-3">Selección especial</p>
              <h2 className="font-display text-4xl md:text-5xl text-ink">Productos destacados</h2>
            </div>
            <Link href="/productos" className="font-body text-sm text-torii hover:text-torii-dark transition-colors duration-300 hidden md:block">
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

      {/* BRAND STORY — Con fotos reales del cliente */}
      <section className="section-pad bg-mist">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

            {/* Collage de 2 fotos */}
            <AnimateIn direction="right" className="grid grid-cols-2 gap-2 h-full min-h-[500px]">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/templo.jpg"
                  alt="Templo japonés"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative overflow-hidden">
                <Image
                  src="/images/linternas.jpg"
                  alt="Linternas japonesas"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </AnimateIn>

            {/* Texto storytelling */}
            <AnimateIn direction="left" delay={0.2} className="bg-ink text-snow p-12 md:p-16 flex flex-col justify-center">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-torii-light mb-6">Nuestra historia</p>
              <h2 className="font-display text-4xl md:text-5xl text-snow leading-tight mb-8">
                Viví en Japón.<br />
                Traje lo<br />
                <em className="not-italic text-torii-light">mejor</em> a México.
              </h2>
              <p className="font-body text-snow/60 leading-relaxed mb-6">
                Después de vivir una temporada en Japón, quedé enamorado de una cultura que combina tradición milenaria con innovación sin igual. Desde la skincare más avanzada hasta el té más puro, cada producto japonés tiene algo especial que no encuentras en ningún otro lugar.
              </p>
              <p className="font-body text-snow/60 leading-relaxed mb-12">
                Por eso nació Senpai Mex — para que no tengas que viajar miles de kilómetros para vivir un poco de esa experiencia. Yo lo selecciono allá para que tú lo disfrutes acá.
              </p>
              <Link href="/nosotros" className="font-body text-sm tracking-widest text-torii-light border-b border-torii-light/30 pb-1 hover:border-torii-light transition-colors duration-300 self-start">
                CONOCE NUESTRA HISTORIA
              </Link>
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
            <Link href="/productos" className="font-body text-sm text-torii hover:text-torii-dark transition-colors duration-300 hidden md:block">
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

      {/* FUJI SECTION */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/fuji.jpg"
            alt="Monte Fuji"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="container-jp relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { kanji: '真', title: 'Autenticidad garantizada', desc: 'Cada producto es seleccionado y verificado directamente en Japón.' },
              { kanji: '速', title: 'Envíos a todo México', desc: 'Entregamos en toda la República con empaque cuidado y seguro.' },
              { kanji: '安', title: 'Pago 100% seguro', desc: 'Tarjeta de crédito/débito, OXXO Pay y más métodos disponibles.' },
            ].map((item, i) => (
              <AnimateIn key={item.kanji} delay={i * 0.15} direction="up">
                <div className="space-y-4">
                  <p className="font-display text-6xl text-torii-light/40">{item.kanji}</p>
                  <p className="font-display text-2xl text-snow">{item.title}</p>
                  <p className="font-body text-sm text-snow/50 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
