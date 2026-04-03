import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const character = await prisma.character.findUnique({ where: { id } })
  if (!character) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(character)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const character = await prisma.character.update({
    where: { id },
    data: {
      name: body.name,
      role: body.role,
      occupation: body.occupation ?? null,
      description: body.description ?? null,
      secrets: body.secrets ?? null,
      notes: body.notes ?? null,
      alive: body.alive !== false,
    },
  })
  return Response.json(character)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.character.delete({ where: { id } })
  return Response.json({ ok: true })
}
