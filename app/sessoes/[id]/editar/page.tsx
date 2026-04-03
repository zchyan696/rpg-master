'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditarSessao() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ number: '', title: '', date: '', summary: '', notes: '' })

  useEffect(() => {
    fetch(`/api/sessions/${id}`).then((r) => r.json()).then((data) => {
      setForm({
        number: String(data.number || ''),
        title: data.title || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        summary: data.summary || '',
        notes: data.notes || '',
      })
    })
  }, [id])

  const set = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push(`/sessoes/${id}`)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = { color: '#9b8ea0', fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const }
  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem', borderRadius: '3px', padding: '0.5rem 0.75rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f0f 100%)', minHeight: '140px' }}>
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href={`/sessoes/${id}`}>
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>Editar Sessão</h1>
        </div>
        <ZigzagDivider />
      </div>
      <div className="px-10 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label style={labelStyle}>Número *</label>
              <input style={fieldStyle} type="number" min="1" value={form.number} onChange={(e) => set('number', e.target.value)} required className="mt-1" />
            </div>
            <div className="col-span-2">
              <label style={labelStyle}>Título *</label>
              <input style={fieldStyle} value={form.title} onChange={(e) => set('title', e.target.value)} required className="mt-1" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Data Real</label>
            <input style={fieldStyle} type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="mt-1" />
          </div>
          <div>
            <label style={labelStyle}>Resumo</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '100px' }} value={form.summary} onChange={(e) => set('summary', e.target.value)} className="mt-1" />
          </div>
          <div>
            <label style={labelStyle}>Notas do Mestre</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} className="mt-1" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={loading || !form.number || !form.title} className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer disabled:opacity-50" style={{ background: '#1a2a4a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem', border: '1px solid #2a3a6a' }}>
              <Save size={15} /> {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <Link href={`/sessoes/${id}`}>
              <span className="text-sm cursor-pointer" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>Cancelar</span>
            </Link>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
