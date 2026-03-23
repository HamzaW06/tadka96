'use client'

import { useState, useEffect } from 'react'
import CategoryFilter from '@/components/menu/CategoryFilter'
import MenuSection from '@/components/menu/MenuSection'

interface Category {
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

interface MenuPageClientProps {
  categories: Category[]
}

export default function MenuPageClient({ categories }: MenuPageClientProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug || '')

  useEffect(() => {
    const handleScroll = () => {
      for (const cat of categories) {
        const el = document.getElementById(`category-${cat.slug}`)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 180 && rect.bottom > 180) {
          setActiveSlug(cat.slug)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories])

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeSlug={activeSlug}
        onSelect={setActiveSlug}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 divide-y divide-white/5">
        {categories.map((cat) => (
          <MenuSection key={cat.id} category={cat} />
        ))}
      </div>
    </>
  )
}
