import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const revalidate = 0

export default async function DashboardPage() {
  const [productCount, orderCount, categoryCount] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.category.count(),
  ])

  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Bienvenido</p>
        <h1 className="font-display text-4xl text-ink">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Productos activos', value: productCount, href: '/admin/productos' },
          { label: 'Órdenes totales', value: orderCount, href: '/admin/ordenes' },
          { label: 'Categorías', value: categoryCount, href: '/admin/categorias' },
        ].map(stat => (
          <Link key={stat.label} href={stat.href} className="bg-snow p-8 hover:shadow-jp-hover transition-shadow duration-300 group">
            <p className="font-display text-5xl text-ink mb-3 group-hover:text-matcha transition-colors duration-300">{stat.value}</p>
            <p className="label-sm">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
