import { prisma } from '@/lib/prisma'
import LocaisClient from './LocaisClient'

export default async function LocaisPage() {
  const [locations, unmapped] = await Promise.all([
    prisma.location.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        characters: {
          select: { id: true, name: true, role: true, occupation: true, alive: true },
        },
      },
    }),
    prisma.character.findMany({
      where: { primaryLocationId: null },
      select: { id: true, name: true, role: true, occupation: true, alive: true },
      orderBy: { name: 'asc' },
    }),
  ])

  return <LocaisClient locations={locations} unmapped={unmapped} />
}
