import { createSupabaseServerClient } from '@/lib/supabase-server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PerfilPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  let orders: Prisma.OrderGetPayload<{ include: { items: { include: { product: true } } } }>[] = []
  let profile: { name: string | null; email: string; role: string; createdAt: Date } | null = null

  try {
    orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, email: true, role: true, createdAt: true }
    })
  } catch (error) {
    console.error('Perfil error:', error)
    return (
      <div className="min-h-screen bg-mist pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-ink mb-4">Error cargando perfil</p>
          <p className="font-body text-sm text-stone">Por favor intenta de nuevo</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">

        <div className="mb-12">
          <p className="label-sm mb-3">Tu cuenta</p>
          <h1 className="font-display text-5xl text-ink">Mi perfil</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-snow p-8">
            <p className="label-sm mb-4">Información</p>
            <p className="font-display text-xl text-ink mb-1">{profile?.name ?? 'Cliente'}</p>
            <p className="font-body text-sm text-stone mb-1">{user.email}</p>
            <p className="font-body text-xs text-stone">
              Miembro desde {new Date(profile?.createdAt ?? '').toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="bg-snow p-8">
            <p className="label-sm mb-4">Pedidos realizados</p>
            <p className="font-display text-5xl text-torii">{orders.length}</p>
          </div>
          <div className="bg-snow p-8">
            <p className="label-sm mb-4">Total gastado</p>
            <p className="font-display text-3xl text-ink">
              ${orders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2)}
              <span className="font-body text-sm text-stone ml-1">MXN</span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <p className="label-sm mb-6">Historial de pedidos</p>

          {orders.length === 0 ? (
            <div className="bg-snow p-16 text-center">
              <p className="font-display text-3xl text-stone/40 mb-4">空</p>
              <p className="font-display text-2xl text-ink mb-4">Sin pedidos todavía</p>
              <p className="font-body text-sm text-stone mb-8">Cuando realices una compra aparecerá aquí.</p>
              <Link href="/productos" className="font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300">
                EXPLORAR TIENDA
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-snow p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="font-mono text-xs text-stone mb-1">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="font-body text-xs text-stone">
                        {new Date(order.createdAt).toLocaleDateString('es-MX', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-body text-xs px-3 py-1 tracking-widest ${
                        order.status === 'PAID' ? 'bg-matcha/10 text-matcha' :
                        order.status === 'PROCESSING' ? 'bg-gold/10 text-gold' :
                        order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'DELIVERED' ? 'bg-matcha/20 text-matcha' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-500' :
                        'bg-stone/10 text-stone'
                      }`}>
                        {order.status === 'PAID' ? 'PAGADO' :
                         order.status === 'PROCESSING' ? 'EN PROCESO' :
                         order.status === 'SHIPPED' ? 'ENVIADO' :
                         order.status === 'DELIVERED' ? 'ENTREGADO' :
                         order.status === 'CANCELLED' ? 'CANCELADO' :
                         order.status}
                      </span>
                      <p className="font-body text-sm font-medium text-ink mt-2">
                        ${Number(order.total).toFixed(2)} MXN
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 border-t border-ink/8 pt-6">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          {item.product.images[0] && (
                            <div className="w-12 h-12 bg-mist overflow-hidden flex-shrink-0">
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div>
                            <p className="font-body text-sm text-ink">{item.product.name}</p>
                            <p className="font-body text-xs text-stone">x{item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-body text-sm text-ink">
                          ${(Number(item.price) * item.quantity).toFixed(2)} MXN
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
