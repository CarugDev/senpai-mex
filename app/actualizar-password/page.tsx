'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/hooks/useAuth'

export default function ActualizarPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')

      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        }).then(() => setReady(true))
      }
    } else {
      setReady(true)
    }
  }, [])

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/login')
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center">
        <p className="font-body text-stone">Verificando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <p className="font-display text-3xl text-ink tracking-widest">先輩</p>
          <p className="label-sm mt-3">Nueva contraseña</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="label-sm block mb-2">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink transition-colors duration-300"
              placeholder="Mínimo 6 caracteres"
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
            {loading ? 'ACTUALIZANDO...' : 'ACTUALIZAR CONTRASEÑA'}
          </button>
        </form>
      </div>
    </div>
  )
}
