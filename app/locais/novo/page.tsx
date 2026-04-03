'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NovoLocal() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'other', description: '', notes: '' })
  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/locais')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = { color: '#9b8ea0', fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const }
  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem', borderRadius: '3px', padding: '0.5rem 0.75rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a0a 0%, #0f0f0f 100%)', minHeight: '140px' }}>
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href="/locais">
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Novo Local
          </h1>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Nome *</label>
              <input style={fieldStyle} value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Ex: Double R Diner" className="mt-1" />
            </div>
            <div>
              <label style={labelStyle}>Categoria</label>
              <select style={fieldStyle} value={form.category} onChange={(e) => set('category', e.target.value)} className="mt-1">
                <option value="forest">Floresta & Natureza</option>
                <option value="diner">Restaurante & Bar</option>
                <option value="residential">Residência</option>
                <option value="police">Autoridades</option>
                <option value="business">Comércio</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '100px' }} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Como é o lugar, atmosfera, o que tem de especial..." className="mt-1" />
          </div>
          <div>
            <label style={labelStyle}>Notas do Mestre</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Segredos do local, eventos que aconteceram aqui, pistas escondidas..." className="mt-1" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={loading || !form.name} className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer disabled:opacity-50" style={{ background: '#1B4332', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem' }}>
              <Save size={15} /> {loading ? 'Salvando...' : 'Salvar Local'}
            </button>
            <Link href="/locais">
              <span className="text-sm cursor-pointer" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>Cancelar</span>
            </Link>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
