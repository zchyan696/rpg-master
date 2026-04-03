import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const characters = await prisma.character.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(characters)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const character = await prisma.character.create({
    data: {
      name: body.name,
      role: body.role || 'resident',
      occupation: body.occupation || null,
      description: body.description || null,
      secrets: body.secrets || null,
      notes: body.notes || null,
      alive: body.alive !== false,
    },
  })
  return Response.json(character, { status: 201 })
}
