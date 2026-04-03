'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'

export default function AddEventForm() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', date: '', type: 'event' })
  const set = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }))

  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', borderRadius: '3px', padding: '0.4rem 0.65rem' }
  const labelStyle = { color: '#6B6560', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.25rem' }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ title: '', description: '', date: '', type: 'event' })
        setOpen(false)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-sm overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
        style={{ color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}
      >
        <div className="flex items-center gap-2">
          <Plus size={14} style={{ color: '#C9A84C' }} />
          <span className="text-sm">Adicionar Evento</span>
        </div>
        {open ? <ChevronUp size={14} style={{ color: '#6B6560' }} /> : <ChevronDown size={14} style={{ color: '#6B6560' }} />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: '#2a2a2a' }}>
          <div className="pt-3">
            <label style={labelStyle}>Título *</label>
            <input style={fieldStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="O que aconteceu?" />
          </div>
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '50px' }} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Detalhes..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Data (na ficção)</label>
              <input style={fieldStyle} value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="Ex: Dia 1, manhã" />
            </div>
            <div>
              <label style={labelStyle}>Tipo</label>
              <select style={fieldStyle} value={form.type} onChange={(e) => set('type', e.target.value)}>
                <option value="event">Evento</option>
                <option value="clue">Pista</option>
                <option value="death">Morte</option>
                <option value="discovery">Descoberta</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !form.title}
            className="w-full py-2 rounded-sm text-sm cursor-pointer disabled:opacity-50"
            style={{ background: '#C9A84C', color: '#0f0f0f', fontFamily: "'Crimson Text', serif", fontWeight: 600 }}
          >
            {loading ? 'Adicionando...' : 'Adicionar Evento'}
          </button>
        </form>
      )}
    </div>
  )
}
