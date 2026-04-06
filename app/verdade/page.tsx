import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import { Lock, AlertTriangle, Eye, ChevronRight } from 'lucide-react'

const roleLabel: Record<string, string> = {
  assassino_real:       'ASSASSINO REAL',
  assassino_controlado: 'ASSASSINO CONTROLADO',
  orquestrador:         'ORQUESTRADOR',
  vitima:               'VÍTIMA 1',
  vitima_2:             'VÍTIMA 2',
}
const roleColor: Record<string, string> = {
  assassino_real:       '#eb5757',
  assassino_controlado: '#9b59b6',
  orquestrador:         '#6B0050',
  vitima:               '#8B0000',
  vitima_2:             '#5a0000',
}

export default async function VerdadePage() {
  const [characters, clues, events, notes] = await Promise.all([
    prisma.character.findMany({ orderBy: { createdAt: 'asc' }, include: { primaryLocation: { select: { name: true } } } }),
    prisma.clue.findMany({ where: { status: 'hidden' }, orderBy: { createdAt: 'asc' } }),
    prisma.event.findMany({ orderBy: { order: 'asc' } }),
    prisma.note.findMany({ orderBy: { createdAt: 'asc' } }),
  ])

  const perpetrators = characters.filter(c =>
    ['assassino_real', 'assassino_controlado', 'orquestrador'].includes(c.narrativeRole ?? '')
  )
  const victims = characters.filter(c =>
    ['vitima', 'vitima_2'].includes(c.narrativeRole ?? '')
  )

  const block: React.CSSProperties = {
    background: '#111',
    border: '1px solid #2a1a1a',
    borderRadius: '3px',
    padding: '1.25rem',
  }
  const label: React.CSSProperties = {
    color: '#4a4a4a',
    fontFamily: "'Special Elite', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.5rem',
  }

  return (
    <PageTransition>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0505 0%, #0a0a0a 100%)', minHeight: '160px' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #8B0000 0, #8B0000 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px',
        }} />
        <div className="relative z-10 px-10 pt-10 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={12} style={{ color: '#8B0000' }} />
            <span className="text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Special Elite', monospace", color: '#8B0000' }}>
              Acesso Restrito — Somente Mestre
            </span>
          </div>
          <h1 className="text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            A Verdade do Caso
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
            O que realmente aconteceu em Black Pines.
          </p>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 space-y-10 max-w-5xl">

        {/* CADEIA DOS CRIMES */}
        <section>
          <h2 className="text-lg font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#eb5757' }}>
            Cadeia dos Crimes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Crime 1 */}
            <div style={{ ...block, borderColor: '#3a1515' }}>
              <span style={{ ...label, color: '#eb5757' }}>Crime 1 — Humano</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#8B0000', fontFamily: 'monospace', fontSize: '0.7rem' }}>VÍTIMA</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>Sofia Maves</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#eb5757', fontFamily: 'monospace', fontSize: '0.7rem' }}>ASSASSINO</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>Sheriff James Patton</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#C9A84C', fontFamily: 'monospace', fontSize: '0.7rem' }}>MOTIVO</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", fontSize: '0.9rem' }}>Sofia foi à delegacia com o registro falso de 1973 (pai de Patton). Patton matou para proteger o legado familiar.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#6b9fd4', fontFamily: 'monospace', fontSize: '0.7rem' }}>CATALISADOR</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", fontSize: '0.9rem' }}>Briggs ligou para Patton após Sofia sair da Prefeitura.</span>
                </div>
              </div>
            </div>

            {/* Crime 2 */}
            <div style={{ ...block, borderColor: '#3a1535' }}>
              <span style={{ ...label, color: '#9b59b6' }}>Crime 2 — Sobrenatural</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#5a0000', fontFamily: 'monospace', fontSize: '0.7rem' }}>VÍTIMA</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>Ruth Calloway</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#9b59b6', fontFamily: 'monospace', fontSize: '0.7rem' }}>INSTRUMENTO</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>Marcus Cole (sem memória)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#6B0050', fontFamily: 'monospace', fontSize: '0.7rem' }}>DIRETOR</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif" }}>Edgar Thorne (via energia do lago)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#C9A84C', fontFamily: 'monospace', fontSize: '0.7rem' }}>MOTIVO</span>
                  <ChevronRight size={12} style={{ color: '#4a4a4a' }} />
                  <span style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", fontSize: '0.9rem' }}>Ruth viu o caminhão de Marcus na noite de Sofia e estava falando. Edgar precisava silenciá-la.</span>
                </div>
              </div>
            </div>

          </div>

          {/* O elo que não existe */}
          <div className="mt-4 p-4 rounded-sm" style={{ background: '#1a1208', border: '1px solid #3a2a08' }}>
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} style={{ color: '#C9A84C', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: '#C9A84C', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem' }}>
                <strong>Patton e Edgar não são colaboradores.</strong> Patton agiu por conta própria. Edgar não ordenou a morte de Sofia. Os dois crimes se parecem ligados (mesmo símbolo no local) mas têm perpetradores e motivações completamente separados. O FBI procura um assassino. São dois. Isso é o que não fecha.
              </p>
            </div>
          </div>
        </section>

        {/* PERPETRADORES — secrets sem blur */}
        <section>
          <h2 className="text-lg font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Perpetradores — Verdade Completa
          </h2>
          <div className="space-y-4">
            {perpetrators.map(c => {
              const color = roleColor[c.narrativeRole ?? ''] ?? '#6B6560'
              const role = roleLabel[c.narrativeRole ?? ''] ?? c.narrativeRole
              return (
                <div key={c.id} style={{ ...block, borderLeft: `3px solid ${color}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-sm"
                      style={{ background: `${color}20`, color, fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.08em' }}>
                      {role}
                    </span>
                    <span style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600 }}>
                      {c.name}
                    </span>
                    {c.occupation && (
                      <span style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif", fontSize: '0.85rem' }}>
                        — {c.occupation}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {c.alibi && (
                      <div>
                        <span style={{ ...label }}>Alibi</span>
                        <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.6 }}>{c.alibi}</p>
                      </div>
                    )}
                    {c.secrets && (
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Eye size={10} style={{ color: '#eb5757' }} />
                          <span style={{ ...label, color: '#eb5757', marginBottom: 0 }}>Segredo Real</span>
                        </div>
                        <p style={{ color: '#c8bfb0', fontFamily: "'Crimson Text', serif", lineHeight: 1.6 }}>{c.secrets}</p>
                      </div>
                    )}
                  </div>
                  {c.notes && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: '#2a2a2a' }}>
                      <span style={{ ...label, color: '#2D6A4F' }}>Como jogar</span>
                      <p style={{ color: '#6B8560', fontFamily: "'Crimson Text', serif", lineHeight: 1.6, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{c.notes}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* VÍTIMAS */}
        <section>
          <h2 className="text-lg font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Vítimas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {victims.map(c => (
              <div key={c.id} style={{ ...block, borderColor: '#2a1515' }}>
                <span style={{ ...label, color: '#8B0000' }}>{roleLabel[c.narrativeRole ?? ''] ?? 'Vítima'}</span>
                <p style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{c.name}</p>
                {c.secrets && (
                  <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', lineHeight: 1.6 }}>{c.secrets}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PISTAS OCULTAS */}
        {clues.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Pistas Ainda Ocultas
            </h2>
            <p className="text-xs mb-4" style={{ color: '#4a4a4a', fontFamily: 'monospace' }}>
              O que os jogadores ainda não encontraram — revelar no momento certo
            </p>
            <div className="space-y-2">
              {clues.map(c => (
                <div key={c.id} className="flex gap-3 p-3 rounded-sm" style={{ background: '#141414', border: '1px solid #2a2a2a' }}>
                  <div className="w-1 rounded-full flex-shrink-0" style={{ background: '#eb5757', minHeight: '40px' }} />
                  <div>
                    <p style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 600 }}>{c.title}</p>
                    {c.location && <p className="text-xs mt-0.5" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{c.location}</p>}
                    {c.description && <p className="text-sm mt-1" style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>{c.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LINHA DO TEMPO */}
        <section>
          <h2 className="text-lg font-semibold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Linha do Tempo Completa
          </h2>
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px" style={{ background: '#2a2a2a' }} />
            <div className="space-y-3">
              {events.map(ev => {
                const colors: Record<string, string> = { event: '#9b8ea0', clue: '#C9A84C', death: '#eb5757', discovery: '#6fcf97' }
                const color = colors[ev.type] || '#9b8ea0'
                return (
                  <div key={ev.id} className="flex gap-4">
                    <div className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center z-10"
                      style={{ background: '#0f0f0f', border: `2px solid ${color}` }}>
                      <div className="w-[5px] h-[5px] rounded-full" style={{ background: color }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{ev.date}</span>
                        <span className="text-xs uppercase" style={{ color, fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.08em' }}>{ev.type}</span>
                      </div>
                      <p style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontSize: '0.95rem' }}>{ev.title}</p>
                      {ev.description && <p className="text-xs mt-0.5" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif", lineHeight: 1.5 }}>{ev.description}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* NOTAS DO MESTRE */}
        {notes.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Notas do Mestre
            </h2>
            <div className="space-y-3">
              {notes.map(n => (
                <div key={n.id} style={{ ...block, borderColor: '#1a2a1a' }}>
                  <span style={{ ...label, color: '#2D6A4F' }}>{n.category}</span>
                  <p style={{ color: '#F5F0E8', fontFamily: "'Playfair Display', serif", fontWeight: 600, marginBottom: '0.5rem' }}>{n.title}</p>
                  <p style={{ color: '#8B7560', fontFamily: "'Crimson Text', serif", lineHeight: 1.75, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{n.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </PageTransition>
  )
}
