'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, User, Search } from 'lucide-react'

interface Clue {
  id: string
  title: string
  description?: string | null
  status: string
  location?: string | null
  foundBy?: string | null
}

const statusConfig = {
  found: { label: 'Encontrada', bg: 'rgba(45,106,79,0.2)', color: '#6fcf97', border: 'rgba(45,106,79,0.4)' },
  hidden: { label: 'Oculta', bg: 'rgba(139,0,0,0.2)', color: '#eb5757', border: 'rgba(139,0,0,0.4)' },
  'red-herring': { label: 'Pista Falsa', bg: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: 'rgba(201,168,76,0.3)' },
}

export default function ClueCard({ clue }: { clue: Clue }) {
  const status = statusConfig[clue.status as keyof typeof statusConfig] || statusConfig.hidden

  return (
    <Link href={`/caso?clue=${clue.id}`}>
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="card-glow cursor-pointer rounded-sm overflow-hidden"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
      >
        <div className="h-[2px]" style={{ background: status.color }} />
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Search size={14} style={{ color: status.color, flexShrink: 0 }} />
              <h4
                className="font-semibold truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', fontSize: '0.95rem' }}
              >
                {clue.title}
              </h4>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-sm border flex-shrink-0"
              style={{
                background: status.bg,
                color: status.color,
                borderColor: status.border,
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {status.label}
            </span>
          </div>

          {clue.description && (
            <p
              className="text-sm mb-3 line-clamp-2"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}
            >
              {clue.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2">
            {clue.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={11} style={{ color: '#6B6560' }} />
                <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
                  {clue.location}
                </span>
              </div>
            )}
            {clue.foundBy && (
              <div className="flex items-center gap-1.5">
                <User size={11} style={{ color: '#6B6560' }} />
                <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
                  {clue.foundBy}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
