import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const updated = await prisma.contactSubmission.update({
      where: { id: params.id },
      data: { isRead: body.isRead ?? true },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT /api/admin/contacts/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.contactSubmission.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/contacts/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 })
  }
}
