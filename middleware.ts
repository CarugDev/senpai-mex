import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const protectedRoutes = ['/checkout', '/perfil']
  const adminRoutes = ['/admin']

  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  const isAdmin = adminRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  if (user && isAdmin) {
  const { createClient } = await import('@supabase/supabase-js')
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data: profile, error } = await adminClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  console.log('Admin check:', { userId: user.id, profile, error })

  if (!profile || profile.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
