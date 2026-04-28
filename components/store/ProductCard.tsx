'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number | string
    compareAt?: number | string | null
    images: string[]
    origin: string
    stock: number
    category: { name: string }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price)
  const compareAt = product.compareAt ? Number(product.compareAt) : null
  const hasDiscount = compareAt && compareAt > price

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
      <Link href={`/productos/${product.slug}`} className="group block">
        <div className="relative w-full bg-snow mb-5 overflow-hidden" style={{ paddingBottom: '133%' }}>
          <div className="absolute inset-0">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-mist-dark">
                <span className="font-display text-4xl text-stone/30">先</span>
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                <div className="border border-snow/50 px-4 py-2 rotate-[-30deg]">
                  <span className="font-body text-xs tracking-widest text-snow">AGOTADO</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <p className="label-sm">{product.category.name}</p>
          <h3 className="font-display text-xl text-ink leading-snug group-hover:text-torii transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 pt-1">
            <span className="font-body text-sm text-ink">
              ${price.toFixed(2)} <span className="text-stone text-xs">MXN</span>
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-stone line-through">
                ${compareAt!.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
