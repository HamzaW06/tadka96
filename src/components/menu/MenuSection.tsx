import MenuCard from '@/components/menu/MenuCard'

interface MenuSectionProps {
  category: {
    id: string
    name: string
    slug: string
    note: string | null
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
      isVegetarian: boolean
      isAvailable: boolean
    }>
  }
}

const weekendSlugs = ['tadka-time']

export default function MenuSection({ category }: MenuSectionProps) {
  const availableItems = category.items.filter((item) => item.isAvailable)
  const unavailableItems = category.items.filter((item) => !item.isAvailable)
  const allItems = [...availableItems, ...unavailableItems]

  if (allItems.length === 0) return null

  const isWeekend = weekendSlugs.includes(category.slug)

  return (
    <section id={`category-${category.slug}`} className="scroll-mt-32 py-10">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            {category.name}
          </h2>
          {isWeekend && (
            <span className="inline-flex items-center gap-1 bg-purple-900/30 border border-purple-700/50 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full">
              ⭐ Fri–Sun Only
            </span>
          )}
        </div>
        {category.note && (
          <p className="text-secondary/80 text-sm italic bg-secondary/5 border border-secondary/20 rounded-lg px-3 py-2 inline-block">
            {category.note}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allItems.map((item) => (
          <div
            key={item.id}
            className={item.isAvailable ? '' : 'opacity-50 grayscale'}
          >
            <MenuCard
              item={{
                ...item,
                category: { slug: category.slug },
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
