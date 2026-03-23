import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { menuItemSchema } from '@/lib/validations'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const items = await prisma.menuItem.findMany({
      orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
      include: { category: true },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('GET /api/admin/menu error:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const parsed = menuItemSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 })
    }

    const item = await prisma.menuItem.create({ data: parsed.data })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/menu error:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
