'use client'

import { useCallback } from 'react'

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

export default function CategoryFilter({ categories, activeSlug, onSelect }: CategoryFilterProps) {
  const handleClick = useCallback(
    (slug: string) => {
      onSelect(slug)
      const el = document.getElementById(`category-${slug}`)
      if (el) {
        const offset = 120
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [onSelect]
  )

  return (
    <div className="sticky top-16 md:top-20 z-30 bg-dark-bg/95 backdrop-blur-md border-b border-white/10 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto category-tabs pb-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleClick(cat.slug)}
              className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                activeSlug === cat.slug
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
