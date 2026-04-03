import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'asc' } })
  return Response.json(events)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const event = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description || null,
      date: body.date,
      type: body.type || 'event',
    },
  })
  return Response.json(event, { status: 201 })
}
