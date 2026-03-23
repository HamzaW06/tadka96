import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { sanitizeFilename } from '@/lib/utils'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import crypto from 'crypto'

// Extension is determined by MIME type — never by user-supplied filename
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 20 uploads per hour per IP
  if (!rateLimit(getClientIp(request), 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many uploads. Try again later.' }, { status: 429 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extension comes from MIME type, not user-supplied filename
    const safeBase = sanitizeFilename(file.name.replace(/\.[^/.]+$/, '')) || 'image'
    const uniqueId = crypto.randomBytes(8).toString('hex')
    const filename = `${safeBase}-${uniqueId}${ext}`

    const uploadDir = join(process.cwd(), 'public', 'images', 'menu')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)

    return NextResponse.json({ url: `/images/menu/${filename}` }, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
