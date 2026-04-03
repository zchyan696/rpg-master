import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET() {
  const locations = await prisma.location.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json(locations)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const location = await prisma.location.create({
    data: {
      name: body.name,
      category: body.category || 'other',
      description: body.description || null,
      notes: body.notes || null,
    },
  })
  return Response.json(location, { status: 201 })
}
