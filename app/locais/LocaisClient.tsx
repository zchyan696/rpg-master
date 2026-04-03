'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import BlackPinesMap from '@/components/BlackPinesMap'
import ZigzagDivider from '@/components/ZigzagDivider'
import {
  Trees, Utensils, Home, Shield, Briefcase, HelpCircle,
  Users, ChevronRight, Skull, X, List, UserX,
} from 'lucide-react'

interface Character {
  id: string
  name: string
  role: string
  occupation: string | null
  alive: boolean
}

interface Location {
  id: string
  name: string
  category: string
  mapX: number | null
  mapY: number | null
  description: string | null
  notes: string | null
  characters: Character[]
}

const categoryConfig: Record<string, { label: string; color: string; icon: any }> = {
  forest:      { label: 'Floresta',    color: '#2D6A4F', icon: Trees },
  diner:       { label: 'Restaurante', color: '#C9A84C', icon: Utensils },
  residential: { label: 'Residência',  color: '#9b8ea0', icon: Home },
  police:      { label: 'Autoridades', color: '#6b9fd4', icon: Shield },
  business:    { label: 'Comércio',    color: '#e0a458', icon: Briefcase },
  other:       { label: 'Outro',       color: '#8B6560', icon: HelpCircle },
}

const roleLabels: Record<string, string> = {
  suspect: 'Suspeito', witness: 'Testemunha', resident: 'Morador',
  victim: 'Vítima', unknown: 'Desconhecido',
}
const roleColors: Record<string, string> = {
  suspect: '#eb5757', witness: '#C9A84C', resident: '#9b8ea0',
  victim: '#8B0000', unknown: '#6B6560',
}

interface UnmappedChar {
  id: string
  name: string
  role: string
  occupation: string | null
  alive: boolean
}

export default function LocaisClient({ locations, unmapped }: { locations: Location[]; unmapped: UnmappedChar[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [unmappedOpen, setUnmappedOpen] = useState(false)

  const selected = locations.find((l) => l.id === selectedId) ?? null
  const cat = selected ? (categoryConfig[selected.category] ?? categoryConfig.other) : null
  const CatIcon = cat?.icon

  function handleUnmappedToggle() {
    setUnmappedOpen((v) => !v)
    setListOpen(false)
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    setListOpen(false)
  }

  function handleClose() {
    setSelectedId(null)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div
        className="relative flex-shrink-0"
        style={{ background: 'linear-gradient(180deg, #0a1a0a 0%, #0f0f0f 100%)' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #1B4332 1px, transparent 1px)',
          backgroundSize: '25px 25px',
        }} />
        <div className="relative z-10 px-8 pt-7 pb-4 flex items-end justify-between">
          <div>
            <div className="text-xs mb-1 tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Special Elite', monospace", color: '#2D6A4F', opacity: 0.8 }}>
              Mapa da Cidade
            </div>
            <h1 className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Black Pines
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              {locations.length} locais · {locations.reduce((a, l) => a + l.characters.length, 0)} NPCs mapeados
            </span>
            {/* NPCs sem localização */}
            {unmapped.length > 0 && (
              <button
                onClick={handleUnmappedToggle}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs transition-colors"
                style={{
                  background: unmappedOpen ? 'rgba(139,0,0,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${unmappedOpen ? '#8B0000' : '#2a2a2a'}`,
                  color: unmappedOpen ? '#eb5757' : '#6B6560',
                  fontFamily: 'monospace',
                }}
              >
                <UserX size={12} />
                {unmapped.length} sem local
              </button>
            )}
            {/* Lista de locais toggle */}
            <button
              onClick={() => setListOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs transition-colors"
              style={{
                background: listOpen ? 'rgba(45,106,79,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${listOpen ? '#2D6A4F' : '#2a2a2a'}`,
                color: listOpen ? '#2D6A4F' : '#6B6560',
                fontFamily: 'monospace',
              }}
            >
              <List size={12} />
              Locais
            </button>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      {/* Map area — full width */}
      <div className="flex-1 relative overflow-hidden" style={{ background: '#0f0f0f' }}>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        <div className="absolute inset-4">
          <BlackPinesMap
            locations={locations}
            selected={selectedId}
            onSelect={handleSelect}
          />
        </div>

        {/* Legend */}
        <div
          className="absolute bottom-4 left-4 flex flex-col gap-1.5 p-3 rounded-sm"
          style={{ background: 'rgba(15,15,15,0.85)', border: '1px solid #1e1e1e' }}
        >
          {Object.entries(categoryConfig).map(([key, cfg]) => {
            const count = locations.filter((l) => l.category === key).length
            if (count === 0) return null
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                  {cfg.label}
                </span>
              </div>
            )
          })}
          <div className="mt-1 pt-1 border-t border-[#2a2a2a] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: '#8B0000', fontSize: '6px', color: '#F5F0E8', fontWeight: 'bold', lineHeight: 1 }}>
              N
            </div>
            <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
              = NPCs no local
            </span>
          </div>
        </div>

        {/* Hint when nothing selected */}
        <AnimatePresence>
          {!selectedId && !listOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-sm pointer-events-none"
              style={{ background: 'rgba(15,15,15,0.7)', border: '1px solid #2a2a2a' }}
            >
              <p className="text-xs" style={{ color: '#4a4a4a', fontFamily: 'monospace' }}>
                Clique em um local no mapa para ver detalhes
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Lista de locais (dropdown overlay) ── */}
        <AnimatePresence>
          {listOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-2 right-2 rounded-sm overflow-hidden"
              style={{
                width: '240px',
                background: '#111',
                border: '1px solid #2a2a2a',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
                zIndex: 20,
              }}
            >
              <div className="px-4 py-3 border-b border-[#1e1e1e] flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest"
                  style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                  Todos os locais
                </span>
                <button onClick={() => setListOpen(false)}>
                  <X size={12} style={{ color: '#6B6560' }} />
                </button>
              </div>
              {locations.map((loc) => {
                const c = categoryConfig[loc.category] ?? categoryConfig.other
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 border-b transition-colors hover:bg-[#1a1a1a] cursor-pointer"
                    style={{ borderColor: '#1a1a1a' }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-tight truncate"
                        style={{ color: '#c8bfb0', fontFamily: "'Crimson Text', serif" }}>
                        {loc.name}
                      </p>
                      {loc.characters.length > 0 && (
                        <p className="text-xs mt-0.5" style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                          {loc.characters.length} NPC{loc.characters.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NPCs não mapeados (dropdown overlay) ── */}
        <AnimatePresence>
          {unmappedOpen && unmapped.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-2 right-2 rounded-sm overflow-hidden"
              style={{
                width: '280px',
                background: '#111',
                border: '1px solid #2a2a2a',
                maxHeight: 'calc(100vh - 160px)',
                overflowY: 'auto',
                zIndex: 20,
              }}
            >
              <div className="px-4 py-3 border-b border-[#1e1e1e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserX size={11} style={{ color: '#eb5757' }} />
                  <span className="text-xs uppercase tracking-widest"
                    style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                    NPCs sem localização
                  </span>
                </div>
                <button onClick={() => setUnmappedOpen(false)}>
                  <X size={12} style={{ color: '#6B6560' }} />
                </button>
              </div>
              {unmapped.map((char) => {
                const rColor = roleColors[char.role] || '#6B6560'
                const rLabel = roleLabels[char.role] || char.role
                return (
                  <Link key={char.id} href={`/personagens/${char.id}`}>
                    <div
                      className="flex items-center gap-3 px-4 py-3 border-b hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                      style={{ borderColor: '#1a1a1a' }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: `${rColor}20`, color: rColor, fontFamily: "'Playfair Display', serif" }}>
                        {!char.alive
                          ? <Skull size={12} style={{ color: '#8B0000' }} />
                          : char.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate"
                          style={{ color: '#c8bfb0', fontFamily: "'Playfair Display', serif", fontSize: '0.85rem' }}>
                          {char.name}
                          {!char.alive && <span className="ml-1" style={{ color: '#8B0000' }}>†</span>}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="text-xs"
                            style={{ color: rColor, fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase' }}>
                            {rLabel}
                          </span>
                          {char.occupation && (
                            <>
                              <span style={{ color: '#3a3a3a' }}>·</span>
                              <span className="text-xs truncate"
                                style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif", fontSize: '0.8rem' }}>
                                {char.occupation}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={12} style={{ color: '#3a3a3a' }}
                        className="group-hover:text-[#6B6560] transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Painel de detalhes (slide from right) ── */}
        <AnimatePresence>
          {selected && cat && CatIcon && (
            <motion.div
              key={selected.id}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full overflow-y-auto"
              style={{
                width: '460px',
                background: 'rgba(10,10,10,0.97)',
                borderLeft: '1px solid #1e1e1e',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
                zIndex: 10,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-sm transition-colors hover:bg-[#1a1a1a]"
                style={{ border: '1px solid #2a2a2a', zIndex: 11 }}
              >
                <X size={14} style={{ color: '#6B6560' }} />
              </button>

              <div className="p-8 pt-7">
                {/* Category icon */}
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center mb-4"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                >
                  <CatIcon size={20} style={{ color: cat.color }} />
                </div>

                <span className="text-xs block mb-2 uppercase tracking-widest"
                  style={{ color: cat.color, fontFamily: 'monospace', fontSize: '0.65rem' }}>
                  {cat.label}
                </span>

                <h2 className="text-2xl font-bold mb-5 leading-tight pr-8"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                  {selected.name}
                </h2>

                {/* Description */}
                {selected.description && (
                  <div className="mb-6">
                    <p className="leading-relaxed"
                      style={{ color: '#c8bfb0', fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', lineHeight: '1.7' }}>
                      {selected.description}
                    </p>
                  </div>
                )}

                {/* Notes (GM only) */}
                {selected.notes && (
                  <div className="mb-6 p-4 rounded-sm" style={{ background: '#141414', border: '1px solid #2a2a2a' }}>
                    <span className="text-xs block mb-2 uppercase tracking-widest"
                      style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                      Notas do Mestre
                    </span>
                    <p className="leading-relaxed"
                      style={{ color: '#8B7560', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
                      {selected.notes}
                    </p>
                  </div>
                )}

                {/* NPCs */}
                {selected.characters.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={13} style={{ color: '#6B6560' }} />
                      <span className="text-xs uppercase tracking-widest"
                        style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                        Presença habitual
                      </span>
                    </div>
                    <div className="space-y-3">
                      {selected.characters.map((char) => {
                        const rColor = roleColors[char.role] || '#6B6560'
                        const rLabel = roleLabels[char.role] || char.role
                        return (
                          <Link key={char.id} href={`/personagens/${char.id}`}>
                            <div
                              className="flex items-center gap-4 p-4 rounded-sm cursor-pointer group transition-colors hover:bg-[#1a1a1a]"
                              style={{ background: '#141414', border: '1px solid #2a2a2a' }}
                            >
                              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                                style={{ background: `${rColor}20`, color: rColor, fontFamily: "'Playfair Display', serif" }}>
                                {!char.alive
                                  ? <Skull size={14} style={{ color: '#8B0000' }} />
                                  : char.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium"
                                  style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' }}>
                                  {char.name}
                                  {!char.alive && <span className="ml-2" style={{ color: '#8B0000' }}>†</span>}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="text-xs"
                                    style={{ color: rColor, fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {rLabel}
                                  </span>
                                  {char.occupation && (
                                    <>
                                      <span style={{ color: '#3a3a3a' }}>·</span>
                                      <span className="text-xs"
                                        style={{ color: '#8B7560', fontFamily: "'Crimson Text', serif", fontSize: '0.85rem' }}>
                                        {char.occupation}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <ChevronRight size={14} style={{ color: '#3a3a3a' }}
                                className="group-hover:text-[#6B6560] transition-colors flex-shrink-0" />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selected.characters.length === 0 && (
                  <div className="mt-2 p-4 rounded-sm text-center"
                    style={{ background: '#141414', border: '1px dashed #2a2a2a' }}>
                    <p className="text-sm" style={{ color: '#4a4a4a', fontFamily: 'monospace' }}>
                      Nenhum NPC associado a este local
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
