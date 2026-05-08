import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'senpai-mex/productos',
        resource_type: 'image',
        format: 'webp',
        quality: 82,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!.secure_url)
      }
    ).end(buffer)
  })
}

export async function POST(request: NextRequest) {
  const { secret } = await request.json()

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const products = await prisma.product.findMany({
    where: { images: { isEmpty: false } }
  })

  const results = { migrated: 0, skipped: 0, errors: [] as string[] }

  for (const product of products) {
    const newImages: string[] = []
    let changed = false

    for (const imageUrl of product.images) {
      if (imageUrl.includes('cloudinary.com')) {
        newImages.push(imageUrl)
        results.skipped++
        continue
      }

      try {
        const response = await fetch(imageUrl)
        if (!response.ok) throw new Error(`Failed to fetch ${imageUrl}`)

        const buffer = Buffer.from(await response.arrayBuffer())

        const webpBuffer = await sharp(buffer)
          .rotate()
          .withMetadata()
          .webp({ quality: 82 })
          .toBuffer()

        const cloudinaryUrl = await uploadToCloudinary(webpBuffer)
        newImages.push(cloudinaryUrl)
        changed = true
        results.migrated++

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
