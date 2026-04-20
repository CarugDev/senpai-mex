'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const items = useCart(s => s.items)
  const count = useCart(s => s.count)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(count())
  }, [items])

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

  const linkClass = scrolled
    ? 'font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide border-b-2 border-torii/0 hover:border-torii/100 pb-0.5'
    : 'font-body text-sm text-snow/80 hover:text-snow transition-colors duration-300 tracking-wide border-b-2 border-torii/0 hover:border-torii/100 pb-0.5'

  const utilLinkClass = scrolled
    ? 'font-body text-sm text-ink/60 hover:text-ink transition-colors duration-300 tracking-wide'
    : 'font-body text-sm text-snow/80 hover:text-snow transition-colors duration-300 tracking-wide'

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-mist/95 backdrop-blur-sm border-b border-ink/8' : 'bg-gradient-to-b from-ink/70 to-transparent'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container-jp">
        <div className="flex items-center justify-between h-20">

          <div className="hidden md:flex items-center gap-10">
            <Link href="/productos?category=belleza" className={linkClass}>Belleza</Link>
            <Link href="/productos?category=ropa" className={linkClass}>Ropa</Link>
            <Link href="/productos?category=bags" className={linkClass}>Bags</Link>
            <Link href="/productos?category=tes" className={linkClass}>Tés</Link>
            <Link href="/productos?category=varios" className={linkClass}>Varios</Link>
            <Link href="/nosotros" className={linkClass}>Nosotros</Link>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.png"
              alt="Senpai Mex"
              width={120}
              height={40}
              className={`object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/carrito" className={utilLinkClass}>
              Carrito ({cartCount})
            </Link>
            {user ? (
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLogout}
                  className={`font-body text-sm border-b pb-0.5 transition-colors duration-300 ${scrolled ? 'text-ink border-ink/30 hover:border-ink' : 'text-snow/80 border-snow/30 hover:text-snow hover:border-snow'}`}
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link href="/login" className="font-body text-sm bg-torii text-snow px-4 py-2 hover:bg-torii-dark transition-colors duration-300">
                Ingresar
              </Link>
            )}
          </div>

          <button className="md:hidden ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-snow'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-snow'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-ink' : 'bg-snow'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-mist border-t border-ink/8 py-8 px-6 space-y-6">
            {[['Belleza', '/productos?category=belleza'], ['Ropa', '/productos?category=ropa'], ['Bags', '/productos?category=bags'], ['Tés', '/productos?category=tes'], ['Varios', '/productos?category=varios'], ['Nosotros', '/nosotros']].map(([label, href]) => (
              <Link key={label} href={href} className="block font-body text-sm text-ink/70 hover:text-ink tracking-wide py-2" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-ink/8 space-y-4">
              <Link href="/carrito" className="block font-body text-sm text-ink/60" onClick={() => setMenuOpen(false)}>Carrito</Link>
              {user ? (
                <>
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
    </motion.nav>
  )
}
