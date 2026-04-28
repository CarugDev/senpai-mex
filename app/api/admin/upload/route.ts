import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

    const { error } = await supabase.storage
      .from('productos')
      .upload(fileName, webpBuffer, {
        contentType: 'image/webp',
        upsert: true,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data } = supabase.storage
      .from('productos')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: data.publicUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
