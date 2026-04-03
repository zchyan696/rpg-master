'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Calendar } from 'lucide-react'

interface Session {
  id: string
  number: number
  title: string
  date: string | Date
  summary?: string | null
}

export default function SessionCard({ session }: { session: Session }) {
  const date = new Date(session.date)
  const formatted = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <Link href={`/sessoes/${session.id}`}>
      <motion.div
        whileHover={{ y: -2, x: 2 }}
        transition={{ duration: 0.2 }}
        className="card-glow cursor-pointer flex gap-4 p-5 rounded-sm"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
      >
        {/* Number badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold"
          style={{
            background: 'rgba(139,0,0,0.2)',
            border: '1px solid rgba(139,0,0,0.3)',
            color: '#8B0000',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {session.number}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', fontSize: '1rem' }}
            >
              {session.title}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Calendar size={11} style={{ color: '#6B6560' }} />
              <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {formatted}
              </span>
            </div>
          </div>

          {session.summary && (
            <p
              className="text-sm mt-1 line-clamp-2"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}
            >
              {session.summary}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
