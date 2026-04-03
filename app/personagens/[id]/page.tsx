import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Skull } from 'lucide-react'
import DeleteButton from './DeleteButton'

const roleLabels: Record<string, string> = {
  suspect: 'Suspeito', witness: 'Testemunha', resident: 'Morador', victim: 'Vítima', unknown: 'Desconhecido',
}
const roleColors: Record<string, string> = {
  suspect: '#eb5757', witness: '#C9A84C', resident: '#9b8ea0', victim: '#8B0000', unknown: '#6B6560',
}

export default async function PersonagemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) notFound()

  const color = roleColors[character.role] || roleColors.unknown
  const label = roleLabels[character.role] || character.role

  const sectionStyle = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '1.25rem' }
  const labelStyle = { color: '#6B6560', fontFamily: "'Special Elite', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.5rem' }

  return (
    <PageTransition>
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${color}15 0%, #0f0f0f 100%)`, minHeight: '160px' }}
      >
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href="/personagens">
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <span
                className="text-xs px-2 py-0.5 rounded-sm border mb-2 inline-block"
                style={{ color, borderColor: `${color}40`, background: `${color}15`, fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                {label}
              </span>
              <h1 className="text-4xl font-bold flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                {character.name}
                {!character.alive && <Skull size={22} style={{ color: '#8B0000' }} />}
              </h1>
              {character.occupation && (
                <p className="mt-1 text-sm" style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif" }}>{character.occupation}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/personagens/${id}/editar`}>
                <button className="px-4 py-2 rounded-sm text-sm cursor-pointer" style={{ background: '#2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}>
                  Editar
                </button>
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 space-y-5 max-w-2xl">
        {character.description && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Descrição</label>
            <p style={{ color: '#F5F0E8', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem' }}>{character.description}</p>
          </div>
        )}

        {character.secrets && (
          <div style={{ ...sectionStyle, borderColor: '#3a1515' }} className="blur-secret-container">
            <label style={{ ...labelStyle, color: '#8B0000' }}>🔒 Segredos</label>
            <p className="blur-secret" style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem' }}>
              {character.secrets}
            </p>
            <p className="text-xs mt-2" style={{ color: '#6B6560', fontFamily: 'monospace' }}>passe o mouse para revelar</p>
          </div>
        )}

        {character.notes && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Notas do Mestre</label>
            <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{character.notes}</p>
          </div>
        )}

        <div style={{ ...sectionStyle, display: 'flex', gap: '2rem' }}>
          <div>
            <label style={labelStyle}>Status</label>
            <span style={{ color: character.alive ? '#6fcf97' : '#eb5757', fontFamily: 'monospace' }}>
              {character.alive ? 'Vivo(a)' : 'Morto(a)'}
            </span>
          </div>
          <div>
            <label style={labelStyle}>Adicionado em</label>
            <span style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {new Date(character.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
