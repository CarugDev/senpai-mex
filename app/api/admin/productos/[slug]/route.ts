import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()
    if (typeof body.images === 'string') {
      body.images = body.images.split(',').map((s: string) => s.trim()).filter(Boolean)
    }
    const product = await prisma.product.update({ where: { id: params.slug }, data: body })
    return NextResponse.json({ product })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.product.update({ where: { id: params.slug }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
