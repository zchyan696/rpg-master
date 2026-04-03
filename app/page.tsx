import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { Users, MapPin, Search, BookOpen, Plus } from 'lucide-react'

async function getStats() {
  const [characters, locations, clues, sessions] = await Promise.all([
    prisma.character.count(),
    prisma.location.count(),
    prisma.clue.count(),
    prisma.session.count(),
  ])
  const suspects = await prisma.character.count({ where: { role: 'suspect' } })
  const foundClues = await prisma.clue.count({ where: { status: 'found' } })
  const lastSession = await prisma.session.findFirst({ orderBy: { number: 'desc' } })
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  return { characters, locations, clues, sessions, events, suspects, foundClues, lastSession }
}

const eventTypeColor: Record<string, string> = {
  event: '#9b8ea0',
  clue: '#C9A84C',
  death: '#eb5757',
  discovery: '#6fcf97',
}

const eventTypeLabel: Record<string, string> = {
  event: 'Evento',
  clue: 'Pista',
  death: 'Morte',
  discovery: 'Descoberta',
}

export default async function Dashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Personagens', value: stats.characters, sub: `${stats.suspects} suspeito(s)`, icon: Users, href: '/personagens', color: '#9b8ea0' },
    { label: 'Locais', value: stats.locations, sub: 'na cidade', icon: MapPin, href: '/locais', color: '#C9A84C' },
    { label: 'Pistas', value: stats.clues, sub: `${stats.foundClues} encontrada(s)`, icon: Search, href: '/caso', color: '#eb5757' },
    { label: 'Sessões', value: stats.sessions, sub: stats.lastSession ? `Última: #${stats.lastSession.number}` : 'Nenhuma ainda', icon: BookOpen, href: '/sessoes', color: '#6b9fd4' },
  ]

  return (
    <PageTransition>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0505 0%, #0f0f0f 100%)', minHeight: '220px' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #8B0000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <div className="relative z-10 px-10 pt-12 pb-6">
          <div
            className="inline-block mb-3 text-xs px-3 py-1 rounded-sm border"
            style={{
              fontFamily: "'Special Elite', monospace",
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B0000',
              borderColor: '#8B000040',
              background: '#8B000015',
            }}
          >
            Caso Aberto · Black Pines, WA
          </div>

          <h1
            className="text-5xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8', letterSpacing: '-0.02em' }}
          >
            Black Pines
          </h1>

          <p
            className="text-lg italic mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#9b8ea0' }}
          >
            Uma cidade pequena guarda os maiores segredos.
          </p>

          <div
            className="text-xs tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Special Elite', monospace", color: '#C9A84C', opacity: 0.6 }}
          >
            "A névoa não apaga o passado — ela apenas o esconde por um tempo"
          </div>
        </div>

        <ZigzagDivider />
      </div>

      {/* Stats grid */}
      <div className="px-10 py-8">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <Link key={card.label} href={card.href}>
                <div
                  className="card-glow p-5 rounded-sm cursor-pointer transition-all duration-200"
                  style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center"
                      style={{ background: `${card.color}15` }}
                    >
                      <Icon size={16} style={{ color: card.color }} />
                    </div>
                    <span
                      className="text-3xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}
                    >
                      {card.value}
                    </span>
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}
                  >
                    {card.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
                    {card.sub}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}
              >
                Linha do Tempo
              </h2>
              <Link href="/caso">
                <span className="text-xs" style={{ color: '#8B0000', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  ver tudo →
                </span>
              </Link>
            </div>

            {stats.events.length === 0 ? (
              <div
                className="rounded-sm p-6 text-center"
                style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
              >
                <p className="text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
                  Nenhum evento registrado ainda.
                </p>
                <Link href="/caso">
                  <button
                    className="mt-3 text-xs px-3 py-1.5 rounded-sm flex items-center gap-1.5 mx-auto cursor-pointer"
                    style={{ background: 'rgba(139,0,0,0.2)', color: '#8B0000', border: '1px solid rgba(139,0,0,0.3)' }}
                  >
                    <Plus size={12} /> Adicionar Evento
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {stats.events.map((event) => {
                  const color = eventTypeColor[event.type] || '#9b8ea0'
                  const typeLabel = eventTypeLabel[event.type] || event.type
                  return (
                    <div
                      key={event.id}
                      className="flex gap-3 p-4 rounded-sm"
                      style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    >
                      <div className="w-1.5 rounded-full flex-shrink-0" style={{ background: color, minHeight: '40px' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs"
                            style={{ color, fontFamily: 'monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                          >
                            {typeLabel}
                          </span>
                          <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
                            · {event.date}
                          </span>
                        </div>
                        <p
                          className="font-medium mt-0.5 truncate"
                          style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' }}
                        >
                          {event.title}
                        </p>
                        {event.description && (
                          <p
                            className="text-xs mt-0.5 line-clamp-1"
                            style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}
                          >
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick access */}
          <div>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}
            >
              Ações Rápidas
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Novo Personagem', href: '/personagens/novo', color: '#9b8ea0' },
                { label: 'Novo Local', href: '/locais/novo', color: '#C9A84C' },
                { label: 'Nova Sessão', href: '/sessoes/nova', color: '#6b9fd4' },
                { label: 'Adicionar Pista ao Caso', href: '/caso', color: '#eb5757' },
                { label: 'Escrever Nota', href: '/notas', color: '#6fcf97' },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer hover:border-[#3a3a3a] transition-colors"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  >
                    <Plus size={14} style={{ color: action.color }} />
                    <span style={{ color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '1rem' }}>
                      {action.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
