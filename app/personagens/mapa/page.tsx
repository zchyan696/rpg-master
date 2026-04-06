'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const COLORS: Record<string, string> = {
  vitima:               '#8B0000',
  vitima_2:             '#5a0000',
  orquestrador:         '#6B0050',
  assassino_real:       '#eb5757',
  assassino_controlado: '#9b59b6',
  red_herring_forte:    '#e0a458',
  red_herring_medio:    '#C9A84C',
  red_herring_fraco:    '#9b8ea0',
  testemunha_chave:     '#6b9fd4',
  testemunha:           '#6B6560',
  autoridade:           '#2D6A4F',
}

const LABELS: Record<string, string> = {
  vitima:               'Vítima',
  vitima_2:             'Vítima 2',
  orquestrador:         'Orquestrador',
  assassino_real:       'Assassino Real',
  assassino_controlado: 'Controlado',
  red_herring_forte:    'Red Herring ////',
  red_herring_medio:    'Red Herring ///',
  red_herring_fraco:    'Red Herring //',
  testemunha_chave:     'Testemunha Chave',
  testemunha:           'Testemunha',
  autoridade:           'Autoridade',
}

type Character = {
  id: string
  name: string
  narrativeRole: string | null
  occupation: string | null
  description: string | null
  alive: boolean
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function Node({
  char,
  size = 'md',
}: {
  char: Character
  size?: 'sm' | 'md' | 'lg'
}) {
  const role = char.narrativeRole ?? ''
  const color = COLORS[role] ?? '#4a4a4a'
  const label = LABELS[role] ?? role

  const widths = { sm: 'w-36', md: 'w-44', lg: 'w-52' }
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-sm' }
  const avatarSizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-10 h-10 text-sm' }

  return (
    <Link href={`/personagens/${char.id}`}>
      <div
        className={`${widths[size]} rounded border cursor-pointer transition-all duration-150 hover:scale-105 hover:brightness-125`}
        style={{
          borderColor: color + '55',
          background: `linear-gradient(135deg, #141414 0%, #1a1414 100%)`,
          borderLeftColor: color,
          borderLeftWidth: 3,
        }}
      >
        <div className="p-2.5">
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className={`${avatarSizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
              style={{ background: color + '22', color, fontFamily: 'monospace' }}
            >
              {initials(char.name)}
            </div>
            <div className="min-w-0">
              <div
                className={`${textSizes[size]} font-bold leading-tight truncate`}
                style={{ fontFamily: "'Playfair Display', serif", color: '#e8e0d5' }}
              >
                {char.name}
              </div>
              {char.occupation && (
                <div className="text-xs truncate" style={{ color: '#5a5a5a', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                  {char.occupation}
                </div>
              )}
            </div>
          </div>
          <div
            className="text-xs px-1.5 py-0.5 rounded-sm inline-block"
            style={{ background: color + '18', color, fontFamily: 'monospace', fontSize: '0.55rem', letterSpacing: '0.05em' }}
          >
            {label}
          </div>
          {!char.alive && (
            <span className="ml-1 text-xs" style={{ color: '#5a0000', fontSize: '0.55rem', fontFamily: 'monospace' }}>
              † morto
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function Arrow({ label, color = '#3a3a3a' }: { label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1" style={{ minWidth: 56 }}>
      <div className="h-px w-full mb-1" style={{ background: color + '60' }} />
      <div className="text-center" style={{ color: color + '90', fontFamily: 'monospace', fontSize: '0.5rem', letterSpacing: '0.08em' }}>
        {label}
      </div>
      <div className="flex items-center w-full mt-1">
        <div className="flex-1 h-px" style={{ background: color + '60' }} />
        <div style={{ color: color + '90', fontSize: '0.6rem' }}>▶</div>
      </div>
    </div>
  )
}

function SectionLabel({ text, color = '#3a3a3a' }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span style={{ color, fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
        {text.toUpperCase()}
      </span>
      <div className="flex-1 h-px" style={{ background: color + '30' }} />
    </div>
  )
}

export default function MapaPage() {
  const [chars, setChars] = useState<Character[]>([])

  useEffect(() => {
    fetch('/api/characters').then(r => r.json()).then(setChars)
  }, [])

  const byRole = (role: string) => chars.find(c => c.narrativeRole === role)
  const allByRole = (role: string) => chars.filter(c => c.narrativeRole === role)

  const sofia    = byRole('vitima')
  const jenny    = byRole('vitima_2')
  const patton   = byRole('assassino_real')
  const marcus   = byRole('assassino_controlado')
  const edgar    = byRole('orquestrador')
  const briggs   = byRole('autoridade')
  const rrFort   = allByRole('red_herring_forte')
  const rrMed    = allByRole('red_herring_medio')
  const rrFrac   = allByRole('red_herring_fraco')
  const tesChave = allByRole('testemunha_chave')
  const tes      = allByRole('testemunha')

  const redHerrings = [...rrFort, ...rrMed, ...rrFrac]
  const witnesses   = [...tesChave, ...tes]

  if (!chars.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f0f' }}>
        <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.7rem' }}>carregando mapa...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0c0c0c' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex items-center justify-between">
        <div>
          <div style={{ color: '#4a4a4a', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            MAPA DE PERSONAGENS
          </div>
          <h1 className="text-2xl font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif", color: '#e8e0d5' }}>
            Black Pines — Visão Geral
          </h1>
        </div>
        <Link
          href="/personagens"
          className="text-xs px-3 py-1.5 rounded border transition-colors hover:brightness-125"
          style={{ borderColor: '#2a2a2a', color: '#5a5a5a', fontFamily: 'monospace', fontSize: '0.6rem' }}
        >
          ← lista completa
        </Link>
      </div>

      <div className="px-8 pb-8 space-y-8">

        {/* ── CRIME 1 ── */}
        <div
          className="rounded-lg p-5"
          style={{ background: '#111', border: '1px solid #1e1515' }}
        >
          <SectionLabel text="Crime I — Assassinato de Sofia Maves (humano)" color="#8B0000" />
          <div className="flex items-center gap-0">
            {briggs  && <Node char={briggs}  size="sm" />}
            <Arrow label="informou" color="#2D6A4F" />
            {patton  && <Node char={patton}  size="lg" />}
            <Arrow label="matou" color="#eb5757" />
            {sofia   && <Node char={sofia}   size="lg" />}

            {/* Jenny ligada a Sofia */}
            <div className="flex flex-col items-start ml-10 pl-10" style={{ borderLeft: '1px solid #1e1515' }}>
              <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.55rem', marginBottom: 4 }}>
                MELHOR AMIGA ↗
              </div>
              {jenny && <Node char={jenny} size="md" />}
            </div>
          </div>
        </div>

        {/* ── CRIME 2 ── */}
        <div
          className="rounded-lg p-5"
          style={{ background: '#111', border: '1px solid #16101e' }}
        >
          <SectionLabel text="Crime II — Assassinato de Jenny Alcott (sobrenatural)" color="#6B0050" />
          <div className="flex items-center gap-0">
            {edgar   && <Node char={edgar}   size="sm" />}
            <Arrow label="controlou" color="#6B0050" />
            {marcus  && <Node char={marcus}  size="lg" />}
            <Arrow label="matou" color="#9b59b6" />
            {jenny   && <Node char={jenny}   size="lg" />}

            <div className="flex flex-col items-start ml-10 pl-10" style={{ borderLeft: '1px solid #1e1515' }}>
              <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.55rem', marginBottom: 4 }}>
                VIA ENERGIA DO LAGO ↗
              </div>
              <div style={{ color: '#4a3a3a', fontFamily: 'monospace', fontSize: '0.6rem', maxWidth: 180, lineHeight: 1.5 }}>
                O lago não tem agenda.<br />
                Edgar acredita que tem.
              </div>
            </div>
          </div>
        </div>

        {/* ── RED HERRINGS + TESTEMUNHAS lado a lado ── */}
        <div className="grid grid-cols-2 gap-6">

          {/* Red Herrings */}
          <div className="rounded-lg p-5" style={{ background: '#111', border: '1px solid #1e1a10' }}>
            <SectionLabel text="Suspeitos / Red Herrings" color="#e0a458" />
            <div className="flex flex-wrap gap-3">
              {redHerrings.map(c => <Node key={c.id} char={c} size="md" />)}
            </div>
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e1e1e' }}>
              <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.55rem', lineHeight: 1.8 }}>
                FORTE → evidências sólidas, sem alibi<br />
                MÉDIO → evasivo, documentos escondidos<br />
                FRACO → contexto suspeito, alibi verificável
              </div>
            </div>
          </div>

          {/* Testemunhas */}
          <div className="rounded-lg p-5" style={{ background: '#111', border: '1px solid #101a1e' }}>
            <SectionLabel text="Testemunhas" color="#6b9fd4" />
            <div className="flex flex-wrap gap-3">
              {witnesses.map(c => <Node key={c.id} char={c} size="md" />)}
            </div>
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #1e1e1e' }}>
              <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.55rem', lineHeight: 1.8 }}>
                CHAVE → Pete: viu Edgar (3h) + Marcus (lago)<br />
                TESTEMUNHA → Ruth: conhece o peso do lago<br />
                TESTEMUNHA → Linda: carta de Edgar + Oregon
              </div>
            </div>
          </div>
        </div>

        {/* ── Legenda rápida ── */}
        <div
          className="rounded-lg p-4"
          style={{ background: '#0e0e0e', border: '1px solid #1a1a1a' }}
        >
          <div style={{ color: '#3a3a3a', fontFamily: 'monospace', fontSize: '0.55rem', letterSpacing: '0.15em', marginBottom: 8 }}>
            LEGENDA RÁPIDA
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(COLORS).map(([role, color]) => (
              <div key={role} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span style={{ color: '#5a5a5a', fontFamily: 'monospace', fontSize: '0.55rem' }}>
                  {LABELS[role]}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
