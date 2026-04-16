import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { status } = await request.json()
    const order = await prisma.order.update({
      where: { id: params.orderId },
      data: { status },
    })
    return NextResponse.json({ order })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
