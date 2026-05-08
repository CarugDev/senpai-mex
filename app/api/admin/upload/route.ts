import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const webpBuffer = await sharp(buffer)
      .rotate()
      .withMetadata()
      .webp({ quality: 82 })
      .toBuffer()

    const url = await new Promise<string>((resolve, reject) => {
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
      ).end(webpBuffer)
    })

    return NextResponse.json({ url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
