import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const clues = await prisma.clue.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(clues)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const clue = await prisma.clue.create({
    data: {
      title: body.title,
      description: body.description || null,
      status: body.status || 'hidden',
      location: body.location || null,
      foundBy: body.foundBy || null,
      sessionId: body.sessionId || null,
    },
  })
  return Response.json(clue, { status: 201 })
}
