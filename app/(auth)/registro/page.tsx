'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/hooks/useAuth'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    await fetch('/api/auth/create-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-display text-5xl text-matcha mb-6">✓</p>
          <h2 className="font-display text-2xl text-ink mb-4">Cuenta creada</h2>
          <p className="font-body text-sm text-stone leading-relaxed mb-8">
            Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión.
          </p>
          <Link href="/login" className="font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300 inline-block">
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <Link href="/" className="font-display text-3xl text-ink tracking-widest">先輩</Link>
          <p className="label-sm mt-3">Crea tu cuenta</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="label-sm block mb-2">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
              placeholder="Tu nombre"
            />
          </div>

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
                minLength={6}
                className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300 pr-10"
                placeholder="Mínimo 6 caracteres"
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
            {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
          </button>
        </form>

        <p className="mt-8 text-center font-body text-sm text-stone">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-ink border-b border-ink/30 hover:border-ink transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
