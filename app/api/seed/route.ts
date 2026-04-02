import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'No disponible en producción' }, { status: 403 })
  }

  try {
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Tés Japoneses', slug: 'tes-japoneses', description: 'Matcha, hojicha, gyokuro y más' },
        { name: 'Snacks', slug: 'snacks', description: 'Snacks auténticos importados de Japón' },
        { name: 'Utensilios', slug: 'utensilios', description: 'Utensilios tradicionales japoneses' },
      ],
      skipDuplicates: true,
    })

    const category = await prisma.category.findFirst({ where: { slug: 'tes-japoneses' } })

    await prisma.product.createMany({
      data: [
        {
          name: 'Matcha Ceremonial Premium',
          slug: 'matcha-ceremonial-premium',
          description: 'Matcha de grado ceremonial cultivado en Uji, Kyoto. Perfecto para la ceremonia del té.',
          price: 450.00,
          compareAt: 550.00,
          stock: 25,
          images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'],
          isFeatured: true,
          categoryId: category!.id,
        },
        {
          name: 'Hojicha Orgánico',
          slug: 'hojicha-organico',
          description: 'Té verde tostado con notas suaves de caramelo. Bajo en cafeína.',
          price: 280.00,
          stock: 40,
          images: ['https://images.unsplash.com/photo-1564890369478-c89ca3d9cde4?w=800'],
          isFeatured: true,
          categoryId: category!.id,
        },
        {
          name: 'Gyokuro Reserve',
          slug: 'gyokuro-reserve',
          description: 'El té verde más premium de Japón. Cultivado a la sombra por 3 semanas.',
          price: 680.00,
          stock: 15,
          images: ['https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800'],
          isFeatured: false,
          categoryId: category!.id,
        },
      ],
      skipDuplicates: true,
    })

    return NextResponse.json({ message: 'Seed completado', categories })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
