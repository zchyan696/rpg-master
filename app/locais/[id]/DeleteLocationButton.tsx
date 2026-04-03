'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteLocationButton({ id }: { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    if (!confirm('Deletar este local?')) return
    await fetch(`/api/locations/${id}`, { method: 'DELETE' })
    router.push('/locais')
  }
  return (
    <button onClick={handleDelete} className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm cursor-pointer" style={{ background: 'rgba(139,0,0,0.2)', color: '#eb5757', border: '1px solid rgba(139,0,0,0.3)', fontFamily: "'Crimson Text', serif" }}>
      <Trash2 size={13} /> Deletar
    </button>
  )
}
