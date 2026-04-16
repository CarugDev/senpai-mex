import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminOrdenesPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-12">
        <p className="label-sm mb-2">Gestión</p>
        <h1 className="font-display text-4xl text-ink">Órdenes</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-snow p-12 text-center">
          <p className="font-display text-2xl text-stone">Sin órdenes todavía</p>
        </div>
      ) : (
        <div className="bg-snow">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink/8">
                <th className="label-sm text-left p-6">ID</th>
                <th className="label-sm text-left p-6">Cliente</th>
                <th className="label-sm text-left p-6">Productos</th>
                <th className="label-sm text-left p-6">Total</th>
                <th className="label-sm text-left p-6">Estado</th>
                <th className="label-sm text-left p-6">Fecha</th>
                <th className="label-sm text-left p-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-ink/5 hover:bg-mist transition-colors">
                  <td className="p-6">
                    <p className="font-mono text-xs text-stone">{order.id.slice(0, 8)}...</p>
                  </td>
                  <td className="p-6">
                    <p className="font-body text-sm text-ink">{order.user?.email ?? 'N/A'}</p>
                  </td>
                  <td className="p-6">
                    <p className="font-body text-sm text-stone">{order.items.length} producto(s)</p>
                  </td>
                  <td className="p-6">
                    <p className="font-body text-sm text-ink">${Number(order.total).toFixed(2)} MXN</p>
                  </td>
                  <td className="p-6">
                    <span className={`font-body text-xs px-3 py-1 tracking-widest ${
                      order.status === 'PAID' ? 'bg-matcha/10 text-matcha' :
                      order.status === 'PENDING' ? 'bg-gold/10 text-gold' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-600' :
                      order.status === 'DELIVERED' ? 'bg-matcha/20 text-matcha' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-500' :
                      'bg-stone/10 text-stone'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-body text-xs text-stone">
                      {new Date(order.createdAt).toLocaleDateString('es-MX')}
                    </p>
                  </td>
                  <td className="p-6">
                    <Link href={`/admin/ordenes/${order.id}`} className="font-body text-xs text-ink/50 hover:text-ink transition-colors tracking-widest">
                      VER
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
