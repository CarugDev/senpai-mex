import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any

    try {
      const items = session.metadata?.items ? JSON.parse(session.metadata.items) : []

      const user = await prisma.user.findFirst({
        where: { email: session.customer_details?.email }
      })

      if (user && items.length > 0) {
        const productIds = items.map((i: any) => i.id)
        const products = await prisma.product.findMany({
          where: { id: { in: productIds } }
        })

        const orderItems = items.map((item: any) => {
          const product = products.find(p => p.id === item.id)
          return {
            productId: item.id,
            quantity: item.quantity,
            price: product?.price ?? 0,
          }
        })

        const subtotal = orderItems.reduce((sum: number, item: any) => {
          return sum + Number(item.price) * item.quantity
        }, 0)

        const shipping = subtotal >= 800 ? 0 : 150

        await prisma.order.create({
          data: {
            userId: user.id,
            status: 'PAID',
            subtotal,
            shipping,
            total: subtotal + shipping,
            stripePaymentId: session.payment_intent,
            stripeSessionId: session.id,
            items: {
              create: orderItems
            }
          }
        })
      }
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
