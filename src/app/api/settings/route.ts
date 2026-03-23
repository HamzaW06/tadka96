import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 300

export async function GET() {
  try {
    const settings = await prisma.setting.findMany()
    const result = Object.fromEntries(settings.map((s) => [s.key, s.value]))
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
