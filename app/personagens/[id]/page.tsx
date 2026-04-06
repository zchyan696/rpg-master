import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Skull, MapPin, Shield, Eye, AlertTriangle } from 'lucide-react'
import DeleteButton from './DeleteButton'

const narrativeColors: Record<string, string> = {
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

const narrativeLabels: Record<string, string> = {
  vitima:               'Vítima',
  vitima_2:             'Vítima 2',
  orquestrador:         'Orquestrador',
  assassino_real:       'Assassino Real',
  assassino_controlado: 'Assassino Controlado',
  red_herring_forte:    'Red Herring Forte',
  red_herring_medio:    'Red Herring Médio',
  red_herring_fraco:    'Red Herring Fraco',
  testemunha_chave:     'Testemunha Chave',
  testemunha:           'Testemunha',
  autoridade:           'Autoridade',
}

export default async function PersonagemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const character = await prisma.character.findUnique({
    where: { id },
    include: { primaryLocation: { select: { id: true, name: true } } },
  })
  if (!character) notFound()

  const nColor = character.narrativeRole
    ? (narrativeColors[character.narrativeRole] ?? '#6B6560')
    : '#6B6560'
  const nLabel = character.narrativeRole
    ? (narrativeLabels[character.narrativeRole] ?? character.narrativeRole)
    : null

  const block = {
    background: '#141414',
    border: '1px solid #222',
    borderRadius: '3px',
    padding: '1.25rem',
  }
  const labelStyle: React.CSSProperties = {
    color: '#4a4a4a',
    fontFamily: "'Special Elite', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.6rem',
  }

  return (
    <PageTransition>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${nColor}12 0%, #0f0f0f 100%)`, minHeight: '160px' }}
      >
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href="/personagens">
            <span className="flex items-center gap-1.5 text-xs mb-5 cursor-pointer"
              style={{ color: '#4a4a4a', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              {nLabel && (
                <span
                  className="text-xs px-2.5 py-1 rounded-sm border mb-3 inline-block"
                  style={{
                    color: nColor,
                    borderColor: `${nColor}40`,
                    background: `${nColor}15`,
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {nLabel}
                </span>
              )}
              <h1 className="text-4xl font-bold flex items-center gap-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                {character.name}
                {!character.alive && <Skull size={22} style={{ color: '#8B0000' }} />}
              </h1>
              {character.occupation && (
                <p className="mt-1 text-sm" style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif" }}>
                  {character.occupation}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/personagens/${id}/editar`}>
                <button className="px-4 py-2 rounded-sm text-sm cursor-pointer"
                  style={{ background: '#2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}>
                  Editar
                </button>
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 max-w-3xl space-y-4">

        {/* Descrição */}
        {character.description && (
          <div style={block}>
            <label style={labelStyle}>Descrição</label>
            <p style={{ color: '#c8bfb0', fontFamily: "'Crimson Text', serif", lineHeight: 1.75, fontSize: '1.05rem' }}>
              {character.description}
            </p>
          </div>
        )}

        {/* Conexão com a vítima + Alibi — side by side */}
        <div className="grid grid-cols-2 gap-4">
          {character.connectionToVictim && (
            <div style={block}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={10} style={{ color: '#4a4a4a' }} />
                Conexão com Sofia
              </label>
              <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.65, fontSize: '0.95rem' }}>
                {character.connectionToVictim}
              </p>
            </div>
          )}
          {character.alibi && (
            <div style={{ ...block, borderColor: '#2a2218' }}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={10} style={{ color: '#4a4a4a' }} />
                Alibi
              </label>
              <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.65, fontSize: '0.95rem' }}>
                {character.alibi}
              </p>
            </div>
          )}
        </div>

        {/* Segredos */}
        {character.secrets && (
          <div className="blur-secret-container" style={{ ...block, borderColor: '#3a1515' }}>
            <label style={{ ...labelStyle, color: '#8B0000', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={10} style={{ color: '#8B0000' }} />
              Segredos
              <span style={{ color: '#4a4a4a', fontFamily: 'monospace', fontSize: '0.55rem', marginLeft: 'auto' }}>
                passe o mouse para revelar
              </span>
            </label>
            <p className="blur-secret"
              style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.75, fontSize: '1rem' }}>
              {character.secrets}
            </p>
          </div>
        )}

        {/* Notas do Mestre */}
        {character.notes && (
          <div style={{ ...block, borderColor: '#1a2a1a' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={10} style={{ color: '#4a4a4a' }} />
              Notas do Mestre
            </label>
            <p style={{ color: '#8B7560', fontFamily: "'Crimson Text', serif", lineHeight: 1.75, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
              {character.notes}
            </p>
          </div>
        )}

        {/* Rodapé: local + status */}
        <div style={{ ...block, display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div>
            <label style={labelStyle}>Status</label>
            <span style={{ color: character.alive ? '#6fcf97' : '#eb5757', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {character.alive ? 'Vivo(a)' : 'Morto(a)'}
            </span>
          </div>
          {character.primaryLocation && (
            <div>
              <label style={labelStyle}>Local habitual</label>
              <Link href={`/locais`}>
                <span style={{ color: '#6b9fd4', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  {character.primaryLocation.name}
                </span>
              </Link>
            </div>
          )}
          <div>
            <label style={labelStyle}>Registrado em</label>
            <span style={{ color: '#4a4a4a', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {new Date(character.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

      </div>
    </PageTransition>
  )
}
