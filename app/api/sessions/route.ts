import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const sessions = await prisma.session.findMany({ orderBy: { number: 'desc' } })
  return Response.json(sessions)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const session = await prisma.session.create({
    data: {
      number: Number(body.number),
      title: body.title,
      date: new Date(body.date),
      summary: body.summary || null,
      notes: body.notes || null,
    },
  })
  return Response.json(session, { status: 201 })
}
