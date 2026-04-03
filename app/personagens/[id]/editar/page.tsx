'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditarPersonagem() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', role: 'resident', occupation: '', description: '', secrets: '', notes: '', alive: true,
  })

  useEffect(() => {
    fetch(`/api/characters/${id}`).then((r) => r.json()).then((data) => {
      setForm({
        name: data.name || '',
        role: data.role || 'resident',
        occupation: data.occupation || '',
        description: data.description || '',
        secrets: data.secrets || '',
        notes: data.notes || '',
        alive: data.alive !== false,
      })
    })
  }, [id])

  const set = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push(`/personagens/${id}`)
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = { color: '#9b8ea0', fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const }
  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem', borderRadius: '3px', padding: '0.5rem 0.75rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0a1a 0%, #0f0f0f 100%)', minHeight: '140px' }}>
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href={`/personagens/${id}`}>
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Editar Personagem
          </h1>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Nome *</label>
              <input style={fieldStyle} value={form.name} onChange={(e) => set('name', e.target.value)} required className="mt-1" />
            </div>
            <div>
              <label style={labelStyle}>Profissão</label>
              <input style={fieldStyle} value={form.occupation} onChange={(e) => set('occupation', e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Papel</label>
              <select style={fieldStyle} value={form.role} onChange={(e) => set('role', e.target.value)} className="mt-1">
                <option value="resident">Morador</option>
                <option value="suspect">Suspeito</option>
                <option value="witness">Testemunha</option>
                <option value="victim">Vítima</option>
                <option value="unknown">Desconhecido</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={fieldStyle} value={form.alive ? 'alive' : 'dead'} onChange={(e) => set('alive', e.target.value === 'alive')} className="mt-1">
                <option value="alive">Vivo(a)</option>
                <option value="dead">Morto(a)</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '90px' }} value={form.description} onChange={(e) => set('description', e.target.value)} className="mt-1" />
          </div>
          <div>
            <label style={labelStyle}>🔒 Segredos</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px', borderColor: '#3a1515' }} value={form.secrets} onChange={(e) => set('secrets', e.target.value)} className="mt-1" />
          </div>
          <div>
            <label style={labelStyle}>Notas do Mestre</label>
            <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} className="mt-1" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={loading || !form.name} className="flex items-center gap-2 px-6 py-2.5 rounded-sm cursor-pointer disabled:opacity-50" style={{ background: '#8B0000', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem' }}>
              <Save size={15} /> {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <Link href={`/personagens/${id}`}>
              <span className="text-sm cursor-pointer" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>Cancelar</span>
            </Link>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
