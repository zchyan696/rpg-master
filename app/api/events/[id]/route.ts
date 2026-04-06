import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const event = await prisma.event.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description ?? undefined,
      date: body.date ?? undefined,
      type: body.type ?? undefined,
      order: body.order ?? undefined,
    },
  })
  return Response.json(event)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.event.delete({ where: { id } })
  return Response.json({ ok: true })
}
