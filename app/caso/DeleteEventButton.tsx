'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export default function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter()
  async function handleDelete() {
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
    router.refresh()
  }
  return (
    <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-sm" style={{ color: '#6B6560' }} title="Remover evento">
      <X size={12} />
    </button>
  )
}
