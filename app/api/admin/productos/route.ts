import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    let categoryId = body.categoryId

    if (!categoryId && body.categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: body.categorySlug }
      })
      if (!category) {
        return NextResponse.json({ error: `Categoría no encontrada: ${body.categorySlug}` }, { status: 400 })
      }
      categoryId = category.id
    }

    const { categorySlug, ...rest } = body
    if (!rest.origin) rest.origin = 'Japón'
    if (typeof rest.images === 'string') {
      rest.images = rest.images.split(',').map((s: string) => s.trim()).filter(Boolean)
    }

    const product = await prisma.product.create({
      data: { ...rest, categoryId }
    })
    return NextResponse.json({ product })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
