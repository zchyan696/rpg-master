'use client'

import { motion } from 'framer-motion'

export interface MapLocation {
  id: string
  name: string
  category: string
  mapX: number | null
  mapY: number | null
  characters: { id: string; name: string; role: string; alive: boolean }[]
}

interface Props {
  locations: MapLocation[]
  selected: string | null
  onSelect: (id: string) => void
}

const categoryColor: Record<string, string> = {
  forest:      '#2D6A4F',
  diner:       '#C9A84C',
  residential: '#9b8ea0',
  police:      '#6b9fd4',
  business:    '#e0a458',
  other:       '#8B6560',
}

const categoryIcon: Record<string, string> = {
  forest:      '🌲',
  diner:       '☕',
  residential: '🏠',
  police:      '⚖',
  business:    '🔧',
  other:       '⛪',
}

export default function BlackPinesMap({ locations, selected, onSelect }: Props) {
  const placedLocs = locations.filter((l) => l.mapX != null && l.mapY != null)

  return (
    <div className="relative w-full h-full select-none">
      <svg
        viewBox="0 0 800 560"
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <defs>
          {/* Forest texture pattern */}
          <pattern id="forestPat" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#0d1f15" />
            <text x="4" y="14" fontSize="10" fill="#1B4332" opacity="0.7">▲</text>
            <text x="12" y="8" fontSize="8" fill="#1B4332" opacity="0.5">▲</text>
          </pattern>
          {/* Water pattern */}
          <pattern id="waterPat" x="0" y="0" width="30" height="10" patternUnits="userSpaceOnUse">
            <rect width="30" height="10" fill="#0a1520" />
            <path d="M0 5 Q7.5 2 15 5 Q22.5 8 30 5" stroke="#1a3a5a" strokeWidth="1" fill="none" opacity="0.6" />
          </pattern>
          {/* Vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#0f0f0f" stopOpacity="0.6" />
          </radialGradient>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── FOREST AREAS ── */}
        {/* North forest */}
        <polygon
          points="0,0 800,0 800,145 680,130 560,145 440,120 320,140 200,125 80,145 0,130"
          fill="url(#forestPat)"
          stroke="#1B4332"
          strokeWidth="1"
          opacity="0.9"
        />
        {/* Northwest forest arm */}
        <polygon
          points="0,130 0,420 90,420 90,280 150,260 80,200 80,145"
          fill="url(#forestPat)"
          stroke="#1B4332"
          strokeWidth="1"
          opacity="0.85"
        />
        {/* Southwest forest */}
        <polygon
          points="0,420 0,560 280,560 280,480 200,460 120,450 80,420"
          fill="url(#forestPat)"
          stroke="#1B4332"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Southeast forest */}
        <polygon
          points="680,380 800,370 800,560 480,560 480,490 560,470 640,430"
          fill="url(#forestPat)"
          stroke="#1B4332"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* ── LAGO CEDAR ── */}
        <ellipse cx="390" cy="490" rx="130" ry="48"
          fill="url(#waterPat)"
          stroke="#1a3a5a"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="390" y="494" textAnchor="middle" fontSize="9"
          fill="#4a8ab0" opacity="0.6"
          style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.15em' }}>
          LAGO CEDAR
        </text>

        {/* ── ROADS ── */}
        {/* Main Street (horizontal) */}
        <line x1="92" y1="308" x2="760" y2="308" stroke="#1e1e1e" strokeWidth="10" />
        <line x1="92" y1="308" x2="760" y2="308" stroke="#252015" strokeWidth="6" />
        <line x1="92" y1="308" x2="760" y2="308" stroke="#2a2218" strokeWidth="2" strokeDasharray="20,12" opacity="0.4" />

        {/* Rua dos Pinheiros (vertical left) */}
        <line x1="165" y1="145" x2="165" y2="430" stroke="#1e1e1e" strokeWidth="8" />
        <line x1="165" y1="145" x2="165" y2="430" stroke="#252015" strokeWidth="4" />

        {/* Road to Escola / Igreja (diagonal upper right) */}
        <path d="M 500,308 Q 540,270 560,235" stroke="#1e1e1e" strokeWidth="7" fill="none" />
        <path d="M 500,308 Q 540,270 560,235" stroke="#252015" strokeWidth="4" fill="none" />

        {/* Road to Condado (right exit) */}
        <line x1="680" y1="308" x2="800" y2="290" stroke="#1e1e1e" strokeWidth="6" />
        <line x1="680" y1="308" x2="800" y2="290" stroke="#252015" strokeWidth="3" />

        {/* Trilha da Floresta */}
        <path d="M 165,260 Q 240,200 280,145" stroke="#1B4332" strokeWidth="2"
          fill="none" strokeDasharray="6,5" opacity="0.6" />

        {/* Road to Lago */}
        <path d="M 390,380 L 390,442" stroke="#1e1e1e" strokeWidth="5" />
        <path d="M 390,380 L 390,442" stroke="#252015" strokeWidth="3" />

        {/* ── ROAD LABELS ── */}
        <text x="430" y="302" fontSize="7.5" fill="#4a3a28" opacity="0.7"
          style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.2em' }}>
          MAIN STREET
        </text>
        <text x="110" y="320" fontSize="6.5" fill="#4a3a28" opacity="0.6"
          transform="rotate(-90, 110, 320)"
          style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.1em' }}>
          RUA DOS PINHEIROS
        </text>
        <text x="720" y="296" fontSize="7" fill="#4a3a28" opacity="0.6"
          style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.1em' }}>
          → CONDADO
        </text>

        {/* ── VIGNETTE ── */}
        <rect x="0" y="0" width="800" height="560" fill="url(#vignette)" />

        {/* ── LOCATION MARKERS ── */}
        {placedLocs.map((loc) => {
          const x = loc.mapX!
          const y = loc.mapY!
          const color = categoryColor[loc.category] || '#8B6560'
          const isSelected = selected === loc.id
          const hasChars = loc.characters.length > 0

          return (
            <g
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              style={{ cursor: 'pointer' }}
              filter={isSelected ? 'url(#glowStrong)' : undefined}
            >
              {/* Pulse ring when selected */}
              {isSelected && (
                <circle cx={x} cy={y} r={22} fill="none"
                  stroke={color} strokeWidth="1.5" opacity="0.4"
                  strokeDasharray="4,3"
                />
              )}

              {/* Outer ring */}
              <circle cx={x} cy={y} r={isSelected ? 14 : 11}
                fill={isSelected ? `${color}30` : '#0f0f0f'}
                stroke={color}
                strokeWidth={isSelected ? 2 : 1.5}
                opacity={isSelected ? 1 : 0.85}
              />

              {/* Inner dot */}
              <circle cx={x} cy={y} r={isSelected ? 6 : 4}
                fill={color}
                opacity={isSelected ? 1 : 0.8}
              />

              {/* NPC count badge */}
              {hasChars && (
                <g>
                  <circle cx={x + (isSelected ? 12 : 9)} cy={y - (isSelected ? 12 : 9)} r={5.5}
                    fill="#8B0000" stroke="#0f0f0f" strokeWidth="1" />
                  <text x={x + (isSelected ? 12 : 9)} y={y - (isSelected ? 8.5 : 5.5)}
                    textAnchor="middle" fontSize="6" fill="#F5F0E8" fontWeight="bold">
                    {loc.characters.length}
                  </text>
                </g>
              )}

              {/* Label */}
              <text
                x={x}
                y={y + (isSelected ? 26 : 22)}
                textAnchor="middle"
                fontSize={isSelected ? 9.5 : 8.5}
                fill={isSelected ? '#F5F0E8' : '#9b8ea0'}
                style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.08em' }}
              >
                {loc.name.length > 20 ? loc.name.slice(0, 18) + '…' : loc.name}
              </text>
            </g>
          )
        })}

        {/* ── COMPASS ── */}
        <g opacity="0.35" transform="translate(745, 60)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#C9A84C" strokeWidth="1" />
          <text x="0" y="-22" textAnchor="middle" fontSize="9" fill="#C9A84C"
            style={{ fontFamily: "'Special Elite', monospace" }}>N</text>
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#C9A84C" strokeWidth="1" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#C9A84C" strokeWidth="1" />
          <polygon points="0,-14 -4,0 0,-4 4,0" fill="#C9A84C" />
        </g>

        {/* ── MAP TITLE ── */}
        <text x="400" y="545" textAnchor="middle" fontSize="11"
          fill="#C9A84C" opacity="0.4"
          style={{ fontFamily: "'Special Elite', monospace", letterSpacing: '0.3em' }}>
          BLACK PINES — WASHINGTON STATE
        </text>
      </svg>
    </div>
  )
}
