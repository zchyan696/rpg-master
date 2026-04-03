import { prisma } from '@/lib/prisma'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import SessionCard from '@/components/SessionCard'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function SessoesPage() {
  const sessions = await prisma.session.findMany({ orderBy: { number: 'desc' } })

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f0f 100%)', minHeight: '160px' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #6b9fd4 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        <div className="relative z-10 px-10 pt-10 pb-6 flex items-end justify-between">
          <div>
            <div className="text-xs mb-2 tracking-[0.2em] uppercase" style={{ fontFamily: "'Special Elite', monospace", color: '#6b9fd4', opacity: 0.7 }}>
              Diário de Campanha
            </div>
            <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
              Sessões
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              {sessions.length} sessão(ões) registrada(s)
            </p>
          </div>
          <Link href="/sessoes/nova">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-sm cursor-pointer" style={{ background: '#1a2a4a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', border: '1px solid #2a3a6a' }}>
              <Plus size={15} /> Nova Sessão
            </button>
          </Link>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8">
        {sessions.length === 0 ? (
          <div className="text-center py-16 rounded-sm" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <p className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>Nenhuma sessão ainda</p>
            <p className="text-sm mb-6" style={{ color: '#6B6560', fontFamily: "'Crimson Text', serif" }}>
              A história de Black Pines ainda não começou.
            </p>
            <Link href="/sessoes/nova">
              <button className="px-6 py-2.5 rounded-sm cursor-pointer" style={{ background: '#1a2a4a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif", border: '1px solid #2a3a6a' }}>
                Registrar primeira sessão
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3 max-w-3xl">
            {sessions.map((s) => (
              <SessionCard key={s.id} session={{ ...s, date: s.date.toISOString() }} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
