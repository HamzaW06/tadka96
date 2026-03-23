import Link from 'next/link'
import MenuCard from '@/components/menu/MenuCard'

interface FeaturedItemsProps {
  items: Array<{
    id: string
    name: string
    description: string | null
    price: number
    priceSmall: number | null
    priceLarge: number | null
    image: string | null
    isBestSeller: boolean
    isSpicy: boolean
    isAvailable: boolean
    category: {
      slug: string
    }
  }>
}

export default function FeaturedItems({ items }: FeaturedItemsProps) {
  if (items.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          Fan Favorites
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-3">
          Our Best Sellers
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          Dishes our guests keep coming back for — crafted with love and packed with flavor.
        </p>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 category-tabs sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0">
        {items.map((item) => (
          <div key={item.id} className="min-w-[260px] sm:min-w-0">
            <MenuCard item={item} />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-accent hover:text-secondary font-semibold transition-colors"
        >
          View Full Menu
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
