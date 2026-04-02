import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category && { category: { slug: category } }),
        ...(featured === 'true' && { isFeatured: true }),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
  }
}
