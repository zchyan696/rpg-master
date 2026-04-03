import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import CharacterCard from '@/components/CharacterCard'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function PersonagensPage() {
  const characters = await prisma.character.findMany({ orderBy: { createdAt: 'desc' } })

  const roles = ['suspect', 'victim', 'witness', 'resident', 'unknown']
  const grouped: Record<string, typeof characters> = {}
  for (const role of roles) {
    const group = characters.filter((c) => c.role === role)
    if (group.length > 0) grouped[role] = group
  }

  const roleLabels: Record<string, string> = {
    suspect: 'Suspeitos',
    victim: 'Vítima(s)',
    witness: 'Testemunhas',
    resident: 'Moradores',
    unknown: 'Desconhecidos',
  }

  return (
    <PageTransition>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0a1a 0%, #0f0f0f 100%)', minHeight: '160px' }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #9b8ea0 1px, transparent 1px)',
          backgroundSize: '25px 25px',
        }} />
        <div className="relative z-10 px-10 pt-10 pb-6 flex items-end justify-between">
          <div>
            <div
              className="text-xs mb-2 tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Special Elite', monospace", color: '#9b8ea0', opacity: 0.7 }}
            >
              Arquivo de Personagens
            </div>
            <h1
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}
            >
              Personagens
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              {characters.length} pessoa(s) registrada(s) em Black Pines
            </p>
          </div>
          <Link href="/personagens/novo">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm cursor-pointer transition-colors"
              style={{ background: '#8B0000', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem' }}
            >
              <Plus size={15} /> Novo Personagem
            </button>
          </Link>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8">
        {characters.length === 0 ? (
          <div
            className="text-center py-16 rounded-sm"
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
          >
            <p className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Nenhum personagem ainda
            </p>
            <p className="text-sm mb-6" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              Black Pines parece deserta. Adicione os moradores da cidade.
            </p>
            <Link href="/personagens/novo">
              <button
                className="px-6 py-2.5 rounded-sm cursor-pointer"
                style={{ background: '#8B0000', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}
              >
                Criar primeiro personagem
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {roles.map((role) => {
              const group = grouped[role]
              if (!group) return null
              return (
                <section key={role}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}
                    >
                      {roleLabels[role]}
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-sm"
                      style={{ background: '#2a2a2a', color: '#6B6560', fontFamily: 'monospace' }}
                    >
                      {group.length}
                    </span>
                    <div className="flex-1 h-px" style={{ background: '#2a2a2a' }} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {group.map((char) => (
                      <CharacterCard key={char.id} character={char} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
