'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, EyeOff, Skull } from 'lucide-react'

interface Character {
  id: string
  name: string
  role: string
  occupation?: string | null
  description?: string | null
  secrets?: string | null
  alive: boolean
}

const roleLabels: Record<string, string> = {
  suspect: 'Suspeito',
  witness: 'Testemunha',
  resident: 'Morador',
  victim: 'Vítima',
  unknown: 'Desconhecido',
}

const roleColors: Record<string, string> = {
  suspect: '#eb5757',
  witness: '#C9A84C',
  resident: '#9b8ea0',
  victim: '#8B0000',
  unknown: '#6B6560',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getAvatarColor(name: string) {
  const colors = ['#4a1942', '#1a2e4a', '#1a3a2a', '#3a2a0a', '#2a1a1a']
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export default function CharacterCard({ character }: { character: Character }) {
  const color = roleColors[character.role] || roleColors.unknown
  const label = roleLabels[character.role] || character.role

  return (
    <Link href={`/personagens/${character.id}`}>
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="card-glow group relative cursor-pointer rounded-sm overflow-hidden"
        style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
        }}
      >
        {/* Top color accent */}
        <div className="h-[3px]" style={{ background: color }} />

        <div className="p-5">
          {/* Avatar + name */}
          <div className="flex items-start gap-4 mb-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
              style={{
                background: getAvatarColor(character.name),
                border: `2px solid ${color}33`,
                fontFamily: "'Playfair Display', serif",
                color: '#F5F0E8',
              }}
            >
              {!character.alive ? <Skull size={18} style={{ color: '#8B0000' }} /> : getInitials(character.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', fontSize: '1.05rem' }}
              >
                {character.name}
                {!character.alive && (
                  <span className="ml-2 text-xs" style={{ color: '#8B0000', fontFamily: 'monospace' }}>†</span>
                )}
              </h3>
              {character.occupation && (
                <div className="text-xs mt-0.5 truncate" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
                  {character.occupation}
                </div>
              )}
              <span
                className="inline-block mt-1 text-xs px-2 py-0.5 rounded-sm border"
                style={{
                  color,
                  background: `${color}15`,
                  borderColor: `${color}33`,
                  fontFamily: "'Special Elite', monospace",
                  letterSpacing: '0.05em',
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Description */}
          {character.description && (
            <p
              className="text-sm mb-3 line-clamp-2"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}
            >
              {character.description}
            </p>
          )}

          {/* Secrets */}
          {character.secrets && (
            <div
              className="blur-secret-container mt-2 pt-2 border-t"
              style={{ borderColor: '#1e1e1e' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <EyeOff size={11} style={{ color: '#8B0000' }} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: '#8B0000', fontFamily: 'monospace' }}
                >
                  Segredo
                </span>
                <Eye
                  size={11}
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: '#6B6560' }}
                />
              </div>
              <p
                className="blur-secret text-xs"
                style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}
              >
                {character.secrets}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
