'use client'

import { useState, useEffect } from 'react'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Save, X } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
}

const categoryColors: Record<string, string> = {
  general: '#9b8ea0',
  plot: '#C9A84C',
  npc: '#6fcf97',
  location: '#6b9fd4',
  clue: '#eb5757',
}

const categoryLabels: Record<string, string> = {
  general: 'Geral', plot: 'Plot', npc: 'NPC', location: 'Local', clue: 'Pista',
}

export default function NotasPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [active, setActive] = useState<Note | null>(null)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('general')
  const [editContent, setEditContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/notes').then((r) => r.json()).then(setNotes)
  }, [])

  async function createNote() {
    if (!newTitle.trim()) return
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: '', category: newCategory }),
    })
    const note = await res.json()
    setNotes((n) => [note, ...n])
    setActive(note)
    setEditContent('')
    setCreating(false)
    setNewTitle('')
  }

  async function saveNote() {
    if (!active) return
    setSaving(true)
    try {
      const res = await fetch(`/api/notes/${active.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: active.title, content: editContent, category: active.category }),
      })
      const updated = await res.json()
      setNotes((n) => n.map((note) => (note.id === updated.id ? updated : note)))
      setActive(updated)
    } finally {
      setSaving(false)
    }
  }

  async function deleteNote(id: string) {
    if (!confirm('Deletar esta nota?')) return
    await fetch(`/api/notes/${id}`, { method: 'DELETE' })
    setNotes((n) => n.filter((note) => note.id !== id))
    if (active?.id === id) { setActive(null); setEditContent('') }
  }

  function openNote(note: Note) {
    setActive(note)
    setEditContent(note.content)
  }

  const fieldStyle = { display: 'block', width: '100%', background: '#141414', border: '1px solid #2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', borderRadius: '3px', padding: '0.4rem 0.65rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a0f 0%, #0f0f0f 100%)', minHeight: '160px' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #6fcf97 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="relative z-10 px-10 pt-10 pb-6">
          <div className="text-xs mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: "'Special Elite', monospace", color: '#6fcf97', opacity: 0.7 }}>
            Bloco de Anotações
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>Notas</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
            {notes.length} nota(s) salva(s)
          </p>
        </div>
        <ZigzagDivider />
      </div>

      <div className="flex" style={{ height: 'calc(100vh - 160px - 12px)' }}>
        {/* Sidebar notes list */}
        <div
          className="w-72 flex-shrink-0 flex flex-col border-r overflow-hidden"
          style={{ borderColor: '#2a2a2a', background: '#141414' }}
        >
          {/* New note button */}
          <div className="p-3 border-b" style={{ borderColor: '#2a2a2a' }}>
            {!creating ? (
              <button
                onClick={() => setCreating(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-sm cursor-pointer text-sm"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontFamily: "'Crimson Text', serif" }}
              >
                <Plus size={14} /> Nova Nota
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  style={fieldStyle}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Título da nota..."
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter') createNote() }}
                />
                <select style={fieldStyle} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={createNote} disabled={!newTitle.trim()} className="flex-1 py-1.5 rounded-sm text-xs cursor-pointer disabled:opacity-50" style={{ background: '#C9A84C', color: '#0f0f0f', fontFamily: 'monospace', fontWeight: 600 }}>
                    Criar
                  </button>
                  <button onClick={() => { setCreating(false); setNewTitle('') }} className="py-1.5 px-2 rounded-sm cursor-pointer" style={{ background: '#2a2a2a', color: '#6B6560' }}>
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {notes.length === 0 && (
              <p className="text-xs text-center pt-8" style={{ color: '#6B6560', fontFamily: 'monospace' }}>Nenhuma nota</p>
            )}
            {notes.map((note) => {
              const color = categoryColors[note.category] || categoryColors.general
              return (
                <div
                  key={note.id}
                  onClick={() => openNote(note)}
                  className="group flex items-start gap-2 px-3 py-3 cursor-pointer border-b"
                  style={{
                    borderColor: '#1e1e1e',
                    background: active?.id === note.id ? 'rgba(201,168,76,0.08)' : 'transparent',
                    borderLeft: active?.id === note.id ? '2px solid #C9A84C' : '2px solid transparent',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs truncate" style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>
                        {note.title}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                      {note.content ? note.content.slice(0, 50) + (note.content.length > 50 ? '...' : '') : 'Vazia'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                    style={{ color: '#6B6560' }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                {/* Editor header */}
                <div className="flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: '#2a2a2a' }}>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                      {active.title}
                    </h2>
                    <span
                      className="text-xs"
                      style={{ color: categoryColors[active.category], fontFamily: 'monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                    >
                      {categoryLabels[active.category]}
                    </span>
                  </div>
                  <button
                    onClick={saveNote}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm cursor-pointer disabled:opacity-50"
                    style={{ background: '#C9A84C', color: '#0f0f0f', fontFamily: "'Crimson Text', serif", fontWeight: 600 }}
                  >
                    <Save size={14} /> {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  className="flex-1 resize-none p-8"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#F5F0E8',
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    outline: 'none',
                  }}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Comece a escrever..."
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="text-center">
                  <div
                    className="text-4xl mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2a2a2a' }}
                  >
                    ☕
                  </div>
                  <p className="text-sm" style={{ color: '#3a3a3a', fontFamily: 'monospace' }}>
                    Selecione uma nota ou crie uma nova
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}
