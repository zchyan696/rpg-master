import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const notes = await prisma.note.findMany({ orderBy: { updatedAt: 'desc' } })
  return Response.json(notes)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const note = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category || 'general',
    },
  })
  return Response.json(note, { status: 201 })
}
