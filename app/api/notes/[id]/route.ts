import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(note)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const note = await prisma.note.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      category: body.category ?? 'general',
    },
  })
  return Response.json(note)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.note.delete({ where: { id } })
  return Response.json({ ok: true })
}
