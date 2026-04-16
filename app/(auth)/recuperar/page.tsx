'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/hooks/useAuth'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-display text-5xl text-matcha mb-6">✓</p>
          <h2 className="font-display text-2xl text-ink mb-4">Correo enviado</h2>
          <p className="font-body text-sm text-stone leading-relaxed mb-8">
            Revisa tu bandeja de entrada y sigue el link para restablecer tu contraseña.
          </p>
          <Link href="/login" className="font-body text-sm tracking-widest border-b border-ink/30 hover:border-ink transition-colors pb-1">
            VOLVER AL LOGIN
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
          <p className="label-sm mt-3">Recupera tu contraseña</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
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

          {error && (
            <p className="font-body text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-torii text-snow font-body text-sm tracking-widest py-4 hover:bg-torii-dark transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'ENVIANDO...' : 'ENVIAR LINK'}
          </button>
        </form>

        <p className="mt-8 text-center">
          <Link href="/login" className="font-body text-sm text-stone hover:text-ink transition-colors">
            Volver al login
          </Link>
        </p>
      </div>
    </div>
  )
}
