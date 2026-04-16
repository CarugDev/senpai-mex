'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const statuses = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

export default function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  async function handleUpdate() {
    setLoading(true)
    await fetch(`/api/admin/ordenes/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-3 font-body text-sm text-ink"
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-ink text-snow font-body text-sm tracking-widest py-3 hover:bg-ink-soft transition-colors disabled:opacity-50"
      >
        {loading ? 'ACTUALIZANDO...' : 'ACTUALIZAR ESTADO'}
      </button>
    </div>
  )
}
