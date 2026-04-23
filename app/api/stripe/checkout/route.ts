import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { items, shippingData } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const shippingState = shippingData?.state ?? ''
    const isDurango = shippingState === 'Durango'
    const shipping = isDurango ? 0 : (subtotal >= 1000 ? 0 : 180)

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: { name: 'Envío estándar' },
          unit_amount: shipping * 100,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/carrito`,
      locale: 'es',
      customer_email: shippingData?.email,
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({ id: i.id, quantity: i.quantity }))),
        shipping_name: shippingData?.name ?? '',
        shipping_phone: shippingData?.phone ?? '',
        shipping_street: shippingData?.street ?? '',
        shipping_colony: shippingData?.colony ?? '',
        shipping_city: shippingData?.city ?? '',
        shipping_state: shippingData?.state ?? '',
        shipping_zip: shippingData?.zip ?? '',
        shipping_notes: shippingData?.notes ?? '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
