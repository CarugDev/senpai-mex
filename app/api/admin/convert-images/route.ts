import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const { secret } = await request.json()

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const products = await prisma.product.findMany({
    where: {
      images: { isEmpty: false }
    }
  })

  const results = { converted: 0, skipped: 0, errors: [] as string[] }

  for (const product of products) {
    const newImages: string[] = []
    let changed = false

    for (const imageUrl of product.images) {
      if (imageUrl.endsWith('.webp')) {
        newImages.push(imageUrl)
        results.skipped++
        continue
      }

      try {
        const response = await fetch(imageUrl)
        if (!response.ok) throw new Error(`Failed to fetch ${imageUrl}`)

        const buffer = Buffer.from(await response.arrayBuffer())

        const webpBuffer = await sharp(buffer)
          .webp({ quality: 82 })
          .toBuffer()

        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

        const { error: uploadError } = await supabase.storage
          .from('productos')
          .upload(fileName, webpBuffer, {
            contentType: 'image/webp',
            upsert: true,
          })

        if (uploadError) throw new Error(uploadError.message)

        const { data } = supabase.storage
          .from('productos')
          .getPublicUrl(fileName)

        newImages.push(data.publicUrl)
        changed = true
        results.converted++

      } catch (error: any) {
        results.errors.push(`${product.name}: ${error.message}`)
        newImages.push(imageUrl)
      }
    }

    if (changed) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: newImages }
      })
    }
  }

  return NextResponse.json(results)
}
