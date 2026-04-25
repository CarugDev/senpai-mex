import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 0

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ products })
}
