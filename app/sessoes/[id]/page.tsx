import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/PageTransition'
import ZigzagDivider from '@/components/ZigzagDivider'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import DeleteSessionButton from './DeleteSessionButton'

export default async function SessaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await prisma.session.findUnique({ where: { id } })
  if (!session) notFound()

  const date = new Date(session.date)
  const formatted = date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  const sectionStyle = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '3px', padding: '1.25rem' }
  const labelStyle = { color: '#6B6560', fontFamily: "'Special Elite', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.5rem' }

  return (
    <PageTransition>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f0f 100%)', minHeight: '160px' }}>
        <div className="relative z-10 px-10 pt-8 pb-6">
          <Link href="/sessoes">
            <span className="flex items-center gap-1.5 text-xs mb-4 cursor-pointer" style={{ color: '#6B6560', fontFamily: 'monospace' }}>
              <ArrowLeft size={12} /> voltar
            </span>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs block mb-1" style={{ color: '#6b9fd4', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sessão #{session.number}
              </span>
              <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F5F0E8' }}>
                {session.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-2">
                <Calendar size={12} style={{ color: '#6B6560' }} />
                <span className="text-sm" style={{ color: '#6B6560', fontFamily: 'monospace' }}>{formatted}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/sessoes/${id}/editar`}>
                <button className="px-4 py-2 rounded-sm text-sm cursor-pointer" style={{ background: '#2a2a2a', color: '#F5F0E8', fontFamily: "'Crimson Text', serif" }}>Editar</button>
              </Link>
              <DeleteSessionButton id={id} />
            </div>
          </div>
        </div>
        <ZigzagDivider />
      </div>

      <div className="px-10 py-8 space-y-5 max-w-2xl">
        {session.summary && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Resumo</label>
            <p style={{ color: '#F5F0E8', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{session.summary}</p>
          </div>
        )}
        {session.notes && (
          <div style={sectionStyle}>
            <label style={labelStyle}>Notas do Mestre</label>
            <p style={{ color: '#9b8ea0', fontFamily: "'Crimson Text', serif", lineHeight: 1.7, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>{session.notes}</p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
