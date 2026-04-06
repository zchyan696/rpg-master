import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import ClueCard from '@/components/ClueCard'
import AddClueForm from './AddClueForm'
import AddEventForm from './AddEventForm'
import DeleteEventButton from './DeleteEventButton'

const eventTypeColor: Record<string, string> = {
  event: '#9b8ea0', clue: '#C9A84C', death: '#eb5757', discovery: '#6fcf97',
}
const eventTypeLabel: Record<string, string> = {
  event: 'Evento', clue: 'Pista', death: 'Morte', discovery: 'Descoberta',
}

export default async function CasoPage() {
  const [clues, events] = await Promise.all([
    prisma.clue.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.event.findMany({ orderBy: { order: 'asc' } }),
  ])

  const found = clues.filter((c) => c.status === 'found')
  const hidden = clues.filter((c) => c.status === 'hidden')
  const redHerring = clues.filter((c) => c.status === 'red-herring')

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0505 0%, #0f0f0f 100%)', minHeight: '160px' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #eb5757 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10 px-10 pt-10 pb-6">
          <div className="text-xs mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: "'Special Elite', monospace", color: '#eb5757', opacity: 0.7 }}>
            Investigação Ativa
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            O Caso
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
            {clues.length} pista(s) · {found.length} encontrada(s) · {events.length} evento(s) registrado(s)
          </p>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* LEFT: Pistas */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                  Quadro de Pistas
                </h2>
              </div>
              <AddClueForm />
            </div>

            {found.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs" style={{ color: '#6fcf97', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Encontradas</span>
                  <div className="flex-1 h-px" style={{ background: '#1e1e1e' }} />
                  <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{found.length}</span>
                </div>
                <div className="space-y-3">
                  {found.map((c) => <ClueCard key={c.id} clue={c} />)}
                </div>
              </div>
            )}

            {hidden.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs" style={{ color: '#eb5757', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ocultas</span>
                  <div className="flex-1 h-px" style={{ background: '#1e1e1e' }} />
                  <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{hidden.length}</span>
                </div>
                <div className="space-y-3">
                  {hidden.map((c) => <ClueCard key={c.id} clue={c} />)}
                </div>
              </div>
            )}

            {redHerring.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs" style={{ color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pistas Falsas</span>
                  <div className="flex-1 h-px" style={{ background: '#1e1e1e' }} />
                  <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{redHerring.length}</span>
                </div>
                <div className="space-y-3">
                  {redHerring.map((c) => <ClueCard key={c.id} clue={c} />)}
                </div>
              </div>
            )}

            {clues.length === 0 && (
              <div className="text-center py-10 rounded-sm" style={{ background: '#1a1a1a', border: '1px dashed #2a2a2a' }}>
                <p className="text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
                  Nenhuma pista registrada ainda.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Linha do Tempo */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                Linha do Tempo
              </h2>
            </div>
            <AddEventForm />

            {events.length > 0 && (
              <div className="mt-6 relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-0 bottom-0 w-px" style={{ background: '#2a2a2a' }} />
                <div className="space-y-4">
                  {events.map((event) => {
                    const color = eventTypeColor[event.type] || '#9b8ea0'
                    const label = eventTypeLabel[event.type] || event.type
                    return (
                      <div key={event.id} className="flex gap-4 relative group">
                        <div
                          className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center z-10"
                          style={{ background: '#0f0f0f', border: `2px solid ${color}` }}
                        >
                          <div className="w-[6px] h-[6px] rounded-full" style={{ background: color }} />
                        </div>
                        <div
                          className="flex-1 p-3 rounded-sm"
                          style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color, fontFamily: 'monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {label}
                              </span>
                              <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>· {event.date}</span>
                            </div>
                            <DeleteEventButton id={event.id} />
                          </div>
                          <p className="font-medium mt-1" style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '0.9rem' }}>
                            {event.title}
                          </p>
                          {event.description && (
                            <p className="text-xs mt-0.5" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
