import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const clue = await prisma.clue.findUnique({ where: { id } })
  if (!clue) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(clue)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const clue = await prisma.clue.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description ?? null,
      status: body.status,
      location: body.location ?? null,
      foundBy: body.foundBy ?? null,
      sessionId: body.sessionId ?? null,
    },
  })
  return Response.json(clue)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.clue.delete({ where: { id } })
  return Response.json({ ok: true })
}
