import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const location = await prisma.location.findUnique({ where: { id } })
  if (!location) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(location)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const location = await prisma.location.update({
    where: { id },
    data: {
      name: body.name,
      category: body.category,
      description: body.description ?? null,
      notes: body.notes ?? null,
    },
  })
  return Response.json(location)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.location.delete({ where: { id } })
  return Response.json({ ok: true })
}
