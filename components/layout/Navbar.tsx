'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const cartCount = useCart(s => s.count())

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-mist/95 backdrop-blur-sm border-b border-ink/8' : 'bg-transparent'}`}>
      <div className="container-jp">
        <div className="flex items-center justify-between h-20">

          <div className="hidden md:flex items-center gap-10">
            <Link href="/productos?category=belleza" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide">
              Belleza
            </Link>
            <Link href="/productos?category=ropa" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide">
              Ropa
            </Link>
            <Link href="/productos?category=bags" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide">
              Bags
            </Link>
            <Link href="/productos?category=tes" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide">
              Tés
            </Link>
          </div>

          <Link href="/" className="font-display text-2xl text-ink tracking-widest absolute left-1/2 -translate-x-1/2">
            先輩
          </Link>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/carrito" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide">
              Carrito ({cartCount})
            </Link>
            {user ? (
              <div className="flex items-center gap-6">
                <Link href="/perfil" className="font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300">
                  Mi cuenta
                </Link>
                <button onClick={handleLogout} className="font-body text-sm text-ink border-b border-ink/30 hover:border-ink pb-0.5 transition-colors duration-300">
                  Salir
                </button>
              </div>
            ) : (
              <Link href="/login" className="font-body text-sm text-ink border-b border-ink/30 hover:border-ink pb-0.5 transition-colors duration-300">
                Ingresar
              </Link>
            )}
          </div>

          <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-mist border-t border-ink/8 py-8 space-y-6">
            {[['Belleza', '/productos?category=belleza'], ['Ropa', '/productos?category=ropa'], ['Bags', '/productos?category=bags'], ['Tés', '/productos?category=tes']].map(([label, href]) => (
              <Link key={label} href={href} className="block font-body text-sm text-ink/70 hover:text-ink tracking-wide" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-ink/8 space-y-4">
              <Link href="/carrito" className="block font-body text-sm text-ink/60" onClick={() => setMenuOpen(false)}>Carrito</Link>
              {user ? (
                <>
                  <Link href="/perfil" className="block font-body text-sm text-ink/60" onClick={() => setMenuOpen(false)}>Mi cuenta</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="block font-body text-sm text-ink">
                    Salir
                  </button>
                </>
              ) : (
                <Link href="/login" className="block font-body text-sm text-ink" onClick={() => setMenuOpen(false)}>Ingresar</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
