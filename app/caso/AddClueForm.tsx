'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'

export default function AddClueForm() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', status: 'hidden', location: '', foundBy: '' })
  const set = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }))

  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', borderRadius: '3px', padding: '0.4rem 0.65rem' }
  const labelStyle = { color: '#6B6560', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.25rem' }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/clues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ title: '', description: '', status: 'hidden', location: '', foundBy: '' })
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
          <Plus size={14} style={{ color: '#8B0000' }} />
          <span className="text-sm">Adicionar Pista</span>
        </div>
        {open ? <ChevronUp size={14} style={{ color: '#6B6560' }} /> : <ChevronDown size={14} style={{ color: '#6B6560' }} />}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: '#2a2a2a' }}>
          <div className="pt-3">
            <label style={labelStyle}>Título *</label>
            <input style={fieldStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Nome da pista" />
          </div>
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '60px' }} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Detalhes..." />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label style={labelStyle}>Status</label>
              <select style={fieldStyle} value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option value="hidden">Oculta</option>
                <option value="found">Encontrada</option>
                <option value="red-herring">Pista Falsa</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Local</label>
              <input style={fieldStyle} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Onde?" />
            </div>
            <div>
              <label style={labelStyle}>Encontrada por</label>
              <input style={fieldStyle} value={form.foundBy} onChange={(e) => set('foundBy', e.target.value)} placeholder="Quem?" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !form.title}
            className="w-full py-2 rounded-sm text-sm cursor-pointer disabled:opacity-50"
            style={{ background: '#8B0000', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}
          >
            {loading ? 'Salvando...' : 'Adicionar Pista'}
          </button>
        </form>
      )}
    </div>
  )
}
