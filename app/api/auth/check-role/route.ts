import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ role: null })
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true }
    })

    return NextResponse.json({ role: profile?.role ?? null })
  } catch {
    return NextResponse.json({ role: null })
  }
}
