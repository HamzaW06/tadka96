import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 60

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { isAvailable: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('GET /api/menu error:', error)
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 })
  }
}
