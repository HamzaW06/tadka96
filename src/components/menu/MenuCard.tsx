import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import SpiceIndicator from '@/components/menu/SpiceIndicator'
import MenuItemPlaceholder from '@/components/ui/MenuItemPlaceholder'
import { formatPrice } from '@/lib/utils'

interface MenuCardProps {
  item: {
    id: string
    name: string
    description: string | null
    price: number
    priceSmall: number | null
    priceLarge: number | null
    image: string | null
    isBestSeller: boolean
    isSpicy: boolean
    isVegetarian?: boolean
    isAvailable: boolean
    category?: {
      slug: string
    }
  }
}

export default function MenuCard({ item }: MenuCardProps) {
  const hasSizes = item.priceSmall !== null && item.priceLarge !== null

  return (
    <div className="menu-card bg-card-bg rounded-2xl overflow-hidden border border-white/5 flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-video bg-card-bg overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.name} — Tadka 96 Indian Fusion`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <MenuItemPlaceholder name={item.name} categorySlug={item.category?.slug} />
        )}
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {item.isBestSeller && <Badge variant="bestseller">⭐ Best Seller</Badge>}
          {item.isSpicy && <Badge variant="spicy">🌶️ Spicy</Badge>}
          {!item.isAvailable && <Badge variant="default">Unavailable</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-text-primary font-semibold text-sm sm:text-base leading-snug line-clamp-2">
            {item.name}
          </h3>
          <div className="text-right shrink-0">
            {hasSizes ? (
              <div className="text-xs text-text-secondary">
                <span className="block text-secondary font-semibold">{formatPrice(item.priceSmall!)}</span>
                <span className="block text-accent font-semibold">{formatPrice(item.priceLarge!)}</span>
                <span className="text-[10px] text-text-secondary/60">Sm / Lg</span>
              </div>
            ) : (
              <span className="text-accent font-bold text-sm sm:text-base">{formatPrice(item.price)}</span>
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-2 flex-1">
            {item.description}
          </p>
        )}

        {/* Dietary tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {item.isVegetarian && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-400 bg-green-900/30 border border-green-700/40 px-1.5 py-0.5 rounded-full">
              🌿 Veg
            </span>
          )}
          {item.isSpicy && <SpiceIndicator isSpicy={item.isSpicy} />}
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-900/20 border border-emerald-700/30 px-1.5 py-0.5 rounded-full">
            ✓ Halal
          </span>
        </div>
      </div>
    </div>
  )
}
