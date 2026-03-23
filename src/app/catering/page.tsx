import type { Metadata } from 'next'
import CateringClient from './CateringClient'

export const metadata: Metadata = {
  title: 'Catering',
  description: 'Book Tadka 96 for your next event — weddings, birthdays, corporate events, and more. 100% Halal certified Indian Fusion catering in League City, TX.',
}

export default function CateringPage() {
  return <CateringClient />
}
