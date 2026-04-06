import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import CharacterCard from '@/components/CharacterCard'
import Link from 'next/link'

const narrativeGroups: { key: string; label: string; color: string; description: string }[] = [
  { key: 'vitima',              label: 'Vítima 1',              color: '#8B0000', description: 'Sofia — centro do caso' },
  { key: 'vitima_2',            label: 'Vítima 2',              color: '#5a0000', description: 'Morta durante a campanha — era suspeita até morrer' },
  { key: 'orquestrador',        label: 'Orquestrador',          color: '#6B0050', description: 'O arquiteto — nunca sai de casa, tudo aponta pra ele' },
  { key: 'assassino_real',      label: 'Assassino Real',        color: '#eb5757', description: 'Assassino físico de Sofia — jamais suspeito pelos jogadores' },
  { key: 'assassino_controlado',label: 'Assassino Controlado',  color: '#9b59b6', description: 'Instrumento sobrenatural — mata Ruth sem memória' },
  { key: 'red_herring_forte',   label: 'Red Herring Forte',     color: '#e0a458', description: 'Suspeito crível com evidências sólidas contra ele' },
  { key: 'red_herring_medio',   label: 'Red Herring Médio',     color: '#C9A84C', description: 'Suspeito com comportamento suspeito mas alibi possível' },
  { key: 'red_herring_fraco',   label: 'Red Herring Fraco',     color: '#9b8ea0', description: 'Parece suspeito por contexto, alibi verificável' },
  { key: 'testemunha_chave',    label: 'Testemunha Chave',      color: '#6b9fd4', description: 'Sabe algo crucial — precisa de abordagem cuidadosa' },
  { key: 'testemunha',          label: 'Testemunha',            color: '#6B6560', description: 'Informação útil mas não decisiva' },
  { key: 'autoridade',          label: 'Autoridade',            color: '#2D6A4F', description: 'Figura oficial — aliada ou obstáculo' },
]

export default async function PersonagensPage() {
  const characters = await prisma.character.findMany({ orderBy: { createdAt: 'asc' } })

  const grouped: Record<string, typeof characters> = {}
  for (const g of narrativeGroups) {
    const group = characters.filter((c) => c.narrativeRole === g.key)
    if (group.length > 0) grouped[g.key] = group
  }
  const ungrouped = characters.filter((c) => !c.narrativeRole)

  return (
    <PageTransition>
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0a1a 0%, #0f0f0f 100%)', minHeight: '140px' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #9b8ea0 1px, transparent 1px)',
          backgroundSize: '25px 25px',
        }} />
        <div className="relative z-10 px-10 pt-10 pb-6">
          <div className="text-xs mb-2 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Special Elite', monospace", color: '#9b8ea0', opacity: 0.7 }}>
            Arquivo de Personagens
          </div>
          <h1 className="text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
            Personagens
          </h1>
          <div className="mt-2 flex items-center gap-4">
            <p className="text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              {characters.length} pessoa(s) registrada(s) em Black Pines
            </p>
            <Link
              href="/personagens/mapa"
              className="text-xs px-3 py-1.5 rounded border transition-all hover:brightness-125"
              style={{ borderColor: '#8B000044', color: '#8B0000', fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.1em', background: '#8B000011' }}
            >
              ◈ MAPA GERAL
            </Link>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 space-y-12">
        {narrativeGroups.map((group) => {
          const chars = grouped[group.key]
          if (!chars) return null
          return (
            <section key={group.key}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                <h2 className="uppercase tracking-widest"
                  style={{ fontFamily: "'Special Elite', monospace", color: group.color, fontSize: '0.7rem' }}>
                  {group.label}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-sm"
                  style={{ background: '#1a1a1a', color: '#4a4a4a', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                  {chars.length}
                </span>
                <div className="flex-1 h-px" style={{ background: '#1e1e1e' }} />
              </div>
              <p className="text-xs mb-5 ml-5"
                style={{ color: '#3a3a3a', fontFamily: 'monospace' }}>
                {group.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {chars.map((char) => (
                  <CharacterCard key={char.id} character={char} />
                ))}
              </div>
            </section>
          )
        })}

        {ungrouped.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 style={{ fontFamily: "'Special Elite', monospace", color: '#3a3a3a', fontSize: '0.7rem' }}>
                SEM PAPEL NARRATIVO
              </h2>
              <div className="flex-1 h-px" style={{ background: '#1e1e1e' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ungrouped.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
