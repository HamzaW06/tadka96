import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MenuPageClient from '@/components/menu/MenuPageClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the full Tadka 96 menu — Indian fusion classics, Halal certified. Chicken curries, vegetarian dishes, fusion wraps, appetizers, drinks & desserts.',
}

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      items: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  // Filter out empty categories
  const nonEmpty = categories.filter((cat) => cat.items.length > 0)

  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      {/* Header */}
      <div className="py-10 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          Explore
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">
          Our Menu
        </h1>
        <p className="text-text-secondary">
          All chicken and meat items are 100% Halal certified. Spice levels customizable: Mild · Medium · Spicy.
        </p>
        <p className="text-secondary/80 text-sm italic mt-2">
          All entrees include Rice &amp; Naan
        </p>
      </div>

      <MenuPageClient categories={nonEmpty} />

      {/* Bottom note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-card-bg rounded-xl p-4 border border-white/10 text-center text-text-secondary text-sm">
          <p>
            🌶️ Spice preference? Just let us know — Mild, Medium, or Spicy — when you order.
          </p>
          <p className="mt-1">
            A 10% gratuity will be added to parties of 4 or more.
          </p>
        </div>
      </div>
    </div>
  )
}
