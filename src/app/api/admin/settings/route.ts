import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { settingsSchema } from '@/lib/validations'

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const settings = await prisma.setting.findMany()
    const result = Object.fromEntries(settings.map((s) => [s.key, s.value]))
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/admin/settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const parsed = settingsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 })
    }

    // Only update keys that are present in the validated payload (strip unknown keys)
    const updates = Object.entries(parsed.data)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) =>
        prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      )

    await prisma.$transaction(updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT /api/admin/settings error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
