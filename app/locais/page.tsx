import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import LocationCard from '@/components/LocationCard'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function LocaisPage() {
  const locations = await prisma.location.findMany({ orderBy: { createdAt: 'desc' } })

  const categories = ['forest', 'diner', 'residential', 'police', 'business', 'other']
  const catLabels: Record<string, string> = {
    forest: 'Floresta & Natureza', diner: 'Restaurantes & Bares', residential: 'Residências',
    police: 'Autoridades', business: 'Comércio', other: 'Outros',
  }
  const grouped: Record<string, typeof locations> = {}
  for (const cat of categories) {
    const group = locations.filter((l) => l.category === cat)
    if (group.length > 0) grouped[cat] = group
  }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a0a 0%, #0f0f0f 100%)', minHeight: '160px' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #1B4332 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="relative z-10 px-10 pt-10 pb-6 flex items-end justify-between">
          <div>
            <div className="text-xs mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: "'Special Elite', monospace", color: '#6fcf97', opacity: 0.7 }}>
              Mapa da Cidade
            </div>
            <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Locais
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              {locations.length} local(is) em Black Pines
            </p>
          </div>
          <Link href="/locais/novo">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-sm cursor-pointer" style={{ background: '#1B4332', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem' }}>
              <Plus size={15} /> Novo Local
            </button>
          </Link>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8">
        {locations.length === 0 ? (
          <div className="text-center py-16 rounded-sm" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>Cidade vazia</p>
            <p className="text-sm mb-6" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              Mapeie os locais de Black Pines.
            </p>
            <Link href="/locais/novo">
              <button className="px-6 py-2.5 rounded-sm cursor-pointer" style={{ background: '#1B4332', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}>
                Adicionar primeiro local
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((cat) => {
              const group = grouped[cat]
              if (!group) return null
              return (
                <section key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                      {catLabels[cat]}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-sm" style={{ background: '#2a2a2a', color: '#6B6560', fontFamily: 'monospace' }}>
                      {group.length}
                    </span>
                    <div className="flex-1 h-px" style={{ background: '#2a2a2a' }} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {group.map((loc) => <LocationCard key={loc.id} location={loc} />)}
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
