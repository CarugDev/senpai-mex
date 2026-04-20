import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import OrderStatusForm from '@/components/admin/OrderStatusForm'
import { stripe } from '@/lib/stripe'

export default async function OrdenDetallePage({ params }: { params: { orderId: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { user: true, items: { include: { product: true } }, address: true },
  })

  if (!order) notFound()

  let shippingData = null
  if (order.stripeSessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId)
      shippingData = {
        name: session.metadata?.shipping_name,
        phone: session.metadata?.shipping_phone,
        street: session.metadata?.shipping_street,
        colony: session.metadata?.shipping_colony,
        city: session.metadata?.shipping_city,
        state: session.metadata?.shipping_state,
        zip: session.metadata?.shipping_zip,
        notes: session.metadata?.shipping_notes,
        email: session.customer_email,
      }
    } catch (e) {}
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-12">
        <Link href="/admin/ordenes" className="font-body text-sm text-stone hover:text-ink transition-colors">
          ← Órdenes
        </Link>
        <div>
          <p className="label-sm mb-1">Orden</p>
          <h1 className="font-display text-3xl text-ink">{order.id.slice(0, 8)}...</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-snow p-8">
            <h2 className="font-display text-xl text-ink mb-6">Productos</h2>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-4 border-b border-ink/5 last:border-0">
                <div>
                  <p className="font-body text-sm text-ink">{item.product.name}</p>
                  <p className="font-body text-xs text-stone">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-body text-sm text-ink">${Number(item.price).toFixed(2)} MXN</p>
              </div>
            ))}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-stone">Subtotal</span>
                <span className="font-body text-sm text-ink">${Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-stone">Envío</span>
                <span className="font-body text-sm text-ink">${Number(order.shipping).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-ink/8 pt-2">
                <span className="font-body text-sm font-medium text-ink">Total</span>
                <span className="font-body text-sm font-medium text-ink">${Number(order.total).toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-snow p-8">
            <h2 className="font-display text-xl text-ink mb-6">Cliente</h2>
            <p className="font-body text-sm text-ink mb-1">{order.user?.email}</p>
            <p className="font-body text-xs text-stone">{new Date(order.createdAt).toLocaleDateString('es-MX')}</p>
            {order.stripeSessionId && (
              <p className="font-mono text-xs text-stone mt-2 break-all">Stripe: {order.stripeSessionId}</p>
            )}
          </div>

          {shippingData && (
            <div className="bg-snow p-8">
              <h2 className="font-display text-xl text-ink mb-6">Datos de envío</h2>
              <div className="space-y-3">
                <div>
                  <p className="label-sm mb-1">Nombre</p>
                  <p className="font-body text-sm text-ink">{shippingData.name}</p>
                </div>
                <div>
                  <p className="label-sm mb-1">Teléfono</p>
                  <p className="font-body text-sm text-ink">{shippingData.phone}</p>
                </div>
                <div>
                  <p className="label-sm mb-1">Correo</p>
                  <p className="font-body text-sm text-ink">{shippingData.email}</p>
                </div>
                <div>
                  <p className="label-sm mb-1">Dirección</p>
                  <p className="font-body text-sm text-ink">{shippingData.street}</p>
                  <p className="font-body text-sm text-ink">{shippingData.colony}</p>
                  <p className="font-body text-sm text-ink">{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                </div>
                {shippingData.notes && (
                  <div>
                    <p className="label-sm mb-1">Notas</p>
                    <p className="font-body text-sm text-stone">{shippingData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-snow p-8">
            <h2 className="font-display text-xl text-ink mb-6">Estado</h2>
            <OrderStatusForm orderId={order.id} currentStatus={order.status} />
          </div>
        </div>
      </div>
    </div>
  )
}
