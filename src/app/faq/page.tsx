import type { Metadata } from 'next'
import FaqClient from './FaqClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Tadka 96 — Halal certification, hours, spice levels, catering, ordering, and more. Indian Fusion in League City, TX.',
}

export default function FaqPage() {
  return <FaqClient />
}
