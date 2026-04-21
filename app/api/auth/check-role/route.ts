import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ role: 'CUSTOMER' })
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true }
    })

    if (!profile) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name ?? '',
          role: 'CUSTOMER',
        }
      })
      return NextResponse.json({ role: 'CUSTOMER' })
    }

    return NextResponse.json({ role: profile.role })
  } catch {
    return NextResponse.json({ role: 'CUSTOMER' })
  }
}
