'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    const res = await fetch('/api/auth/check-role')
    const { role } = await res.json()

    window.location.href = role === 'ADMIN' ? '/admin/dashboard' : '/'
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <Link href="/" className="font-display text-3xl text-ink tracking-widest">先輩</Link>
          <p className="label-sm mt-3">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="label-sm block mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="label-sm block mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 font-body text-xs text-stone hover:text-ink transition-colors"
              >
                {showPassword ? 'OCULTAR' : 'VER'}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-snow font-body text-sm tracking-widest py-4 hover:bg-ink-soft transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'INGRESANDO...' : 'INGRESAR'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="font-body text-sm text-stone">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="text-ink border-b border-ink/30 hover:border-ink transition-colors">
              Regístrate
            </Link>
          </p>
          <Link href="/recuperar" className="block font-body text-xs text-stone hover:text-ink transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}
