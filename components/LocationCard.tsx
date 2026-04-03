'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Trees, Utensils, Home, Shield, Briefcase, HelpCircle } from 'lucide-react'

interface Location {
  id: string
  name: string
  category: string
  description?: string | null
  notes?: string | null
}

const categoryConfig = {
  forest: { label: 'Floresta', color: '#6fcf97', Icon: Trees },
  diner: { label: 'Restaurante', color: '#C9A84C', Icon: Utensils },
  residential: { label: 'Residencial', color: '#9b8ea0', Icon: Home },
  police: { label: 'Polícia', color: '#6b9fd4', Icon: Shield },
  business: { label: 'Comércio', color: '#e0a458', Icon: Briefcase },
  other: { label: 'Outro', color: '#6B6560', Icon: HelpCircle },
}

export default function LocationCard({ location }: { location: Location }) {
  const cat = categoryConfig[location.category as keyof typeof categoryConfig] || categoryConfig.other
  const { Icon } = cat

  return (
    <Link href={`/locais/${location.id}`}>
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="card-glow cursor-pointer rounded-sm overflow-hidden"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
      >
        <div className="h-[3px]" style={{ background: cat.color }} />
        <div className="p-5">
          <div className="flex items-start gap-3 mb-2">
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
              style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
            >
              <Icon size={16} style={{ color: cat.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold truncate"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', fontSize: '1rem' }}
              >
                {location.name}
              </h3>
              <span
                className="text-xs"
                style={{
                  color: cat.color,
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {cat.label}
              </span>
            </div>
          </div>

          {location.description && (
            <p
              className="text-sm line-clamp-3 mt-2"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}
            >
              {location.description}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
