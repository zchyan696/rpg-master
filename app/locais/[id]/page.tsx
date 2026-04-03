import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Trees, Utensils, Home, Shield, Briefcase, HelpCircle } from 'lucide-react'
import DeleteLocationButton from './DeleteLocationButton'

const categoryConfig: Record<string, { label: string; color: string; icon: any }> = {
  forest: { label: 'Floresta', color: '#6fcf97', icon: Trees },
  diner: { label: 'Restaurante', color: '#C9A84C', icon: Utensils },
  residential: { label: 'Residencial', color: '#9b8ea0', icon: Home },
  police: { label: 'Polícia', color: '#6b9fd4', icon: Shield },
  business: { label: 'Comércio', color: '#e0a458', icon: Briefcase },
  other: { label: 'Outro', color: '#6B6560', icon: HelpCircle },
}

export default async function LocalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const location = await prisma.location.findUnique({ where: { id } })
  if (!location) notFound()

  const cat = categoryConfig[location.category] || categoryConfig.other
  const Icon = cat.icon

  const sectionStyle = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '1.25rem' }
  const labelStyle = { color: '#6B6560', fontFamily: "'Special Elite', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.5rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${cat.color}15 0%, #0f0f0f 100%)`, minHeight: '160px' }}>
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href="/locais">
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mt-1" style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}>
                <Icon size={22} style={{ color: cat.color }} />
              </div>
              <div>
                <span className="text-xs block mb-1" style={{ color: cat.color, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cat.label}</span>
                <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>{location.name}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/locais/${id}/editar`}>
                <button className="px-4 py-2 rounded-sm text-sm cursor-pointer" style={{ background: '#2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}>Editar</button>
              </Link>
              <DeleteLocationButton id={id} />
            </div>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 space-y-5 max-w-2xl">
        {location.description && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Descrição</label>
            <p style={{ color: '#F5F0E8', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{location.description}</p>
          </div>
        )}
        {location.notes && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Notas do Mestre</label>
            <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{location.notes}</p>
          </div>
        )}
        <div style={{ ...sectionStyle }}>
          <label style={labelStyle}>Adicionado em</label>
          <span style={{ color: '#6B6560', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {new Date(location.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
    </PageTransition>
  )
}
