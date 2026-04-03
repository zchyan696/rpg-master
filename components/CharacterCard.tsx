'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, EyeOff, Skull } from 'lucide-react'

interface Character {
  id: string
  name: string
  role: string
  narrativeRole?: string | null
  occupation?: string | null
  description?: string | null
  secrets?: string | null
  alive: boolean
}

const narrativeColors: Record<string, string> = {
  vitima:            '#8B0000',
  assassino:         '#eb5757',
  red_herring_forte: '#e0a458',
  red_herring_medio: '#C9A84C',
  red_herring_fraco: '#9b8ea0',
  testemunha_chave:  '#6b9fd4',
  testemunha:        '#6B6560',
  autoridade:        '#2D6A4F',
}

const narrativeLabels: Record<string, string> = {
  vitima:            'Vítima',
  assassino:         'Assassino',
  red_herring_forte: 'Red Herring Forte',
  red_herring_medio: 'Red Herring Médio',
  red_herring_fraco: 'Red Herring Fraco',
  testemunha_chave:  'Testemunha Chave',
  testemunha:        'Testemunha',
  autoridade:        'Autoridade',
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function getAvatarColor(name: string) {
  const colors = ['#4a1942', '#1a2e4a', '#1a3a2a', '#3a2a0a', '#2a1a1a']
  return colors[name.charCodeAt(0) % colors.length]
}

export default function CharacterCard({ character }: { character: Character }) {
  const nColor = character.narrativeRole
    ? (narrativeColors[character.narrativeRole] ?? '#6B6560')
    : '#6B6560'
  const nLabel = character.narrativeRole
    ? (narrativeLabels[character.narrativeRole] ?? character.narrativeRole)
    : null

  return (
    <Link href={`/personagens/${character.id}`}>
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="card-glow group relative cursor-pointer rounded-sm overflow-hidden"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
      >
        {/* Top accent by narrative role */}
        <div className="h-[3px]" style={{ background: nColor }} />

        <div className="p-5">
          <div className="flex items-start gap-4 mb-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
              style={{
                background: getAvatarColor(character.name),
                border: `2px solid ${nColor}33`,
                fontFamily: "'Playfair Display', serif",
                color: '#F5F0E8',
              }}
            >
              {!character.alive ? <Skull size={18} style={{ color: '#8B0000' }} /> : getInitials(character.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', fontSize: '1.05rem' }}>
                {character.name}
                {!character.alive && (
                  <span className="ml-2 text-xs" style={{ color: '#8B0000', fontFamily: 'monospace' }}>†</span>
                )}
              </h3>
              {character.occupation && (
                <div className="text-xs mt-0.5 truncate"
                  style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
                  {character.occupation}
                </div>
              )}
              {nLabel && (
                <span
                  className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-sm border"
                  style={{
                    color: nColor,
                    background: `${nColor}15`,
                    borderColor: `${nColor}33`,
                    fontFamily: 'monospace',
                    letterSpacing: '0.04em',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {nLabel}
                </span>
              )}
            </div>
          </div>

          {character.description && (
            <p className="text-sm mb-3 line-clamp-2"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>
              {character.description}
            </p>
          )}

          {character.secrets && (
            <div className="blur-secret-container mt-2 pt-2 border-t" style={{ borderColor: '#1e1e1e' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <EyeOff size={11} style={{ color: '#8B0000' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: '#8B0000', fontFamily: 'monospace' }}>
                  Segredo
                </span>
                <Eye size={11} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: '#6B6560' }} />
              </div>
              <p className="blur-secret text-xs"
                style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>
                {character.secrets}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
