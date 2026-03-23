import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('footer'),
})

export async function POST(req: NextRequest) {
  // 3 signups per hour per IP
  if (!rateLimit(getClientIp(req), 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    await prisma.emailSignup.upsert({
      where: { email: data.email },
      update: {},
      create: { email: data.email, source: data.source },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
