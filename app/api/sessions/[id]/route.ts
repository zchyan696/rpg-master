import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await prisma.session.findUnique({ where: { id } })
  if (!session) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(session)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const session = await prisma.session.update({
    where: { id },
    data: {
      number: Number(body.number),
      title: body.title,
      date: new Date(body.date),
      summary: body.summary ?? null,
      notes: body.notes ?? null,
    },
  })
  return Response.json(session)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.session.delete({ where: { id } })
  return Response.json({ ok: true })
}
