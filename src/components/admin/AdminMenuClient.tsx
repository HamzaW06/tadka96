'use client'

import { useState, useCallback } from 'react'
import MenuItemForm from '@/components/admin/MenuItemForm'
import { formatPrice } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  note: string | null
}

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  priceSmall: number | null
  priceLarge: number | null
  image: string | null
  categoryId: string
  isBestSeller: boolean
  isSpicy: boolean
  isAvailable: boolean
  sortOrder: number
  category: {
    id: string
    name: string
    slug: string
  }
}

interface AdminMenuClientProps {
  initialCategories: Category[]
  initialItems: MenuItem[]
}

export default function AdminMenuClient({ initialCategories, initialItems }: AdminMenuClientProps) {
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [categories] = useState<Category[]>(initialCategories)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const refresh = useCallback(async () => {
    const res = await fetch('/api/admin/menu')
    if (res.ok) {
      const data = await res.json()
      setItems(data)
    }
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      }
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleAvailable = async (item: MenuItem) => {
    const res = await fetch(`/api/admin/menu/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: !item.isAvailable }),
    })
    if (res.ok) {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i))
      )
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-card-bg border border-white/10 focus:border-accent rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none transition-colors flex-1 min-w-[200px]"
        />
        <button
          onClick={() => { setEditingItem(null); setShowForm(true) }}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto category-tabs pb-3 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
            activeCategory === 'all' ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          All ({items.length})
        </button>
        {categories.map((cat) => {
          const count = items.filter((i) => i.categoryId === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card-bg rounded-2xl border border-white/10 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingItem(null) }}
                className="text-text-secondary hover:text-text-primary p-1"
              >
                ✕
              </button>
            </div>
            <MenuItemForm
              categories={categories}
              initial={editingItem ? {
                id: editingItem.id,
                name: editingItem.name,
                description: editingItem.description || '',
                price: editingItem.price.toString(),
                priceSmall: editingItem.priceSmall?.toString() || '',
                priceLarge: editingItem.priceLarge?.toString() || '',
                categoryId: editingItem.categoryId,
                isBestSeller: editingItem.isBestSeller,
                isSpicy: editingItem.isSpicy,
                isAvailable: editingItem.isAvailable,
                image: editingItem.image || '',
              } : undefined}
              onSuccess={() => {
                setShowForm(false)
                setEditingItem(null)
                refresh()
              }}
              onCancel={() => { setShowForm(false); setEditingItem(null) }}
            />
          </div>
        </div>
      )}

      {/* Items table */}
      <div className="bg-card-bg rounded-2xl border border-white/10 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-10 text-center text-text-secondary">
            No items found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr className="text-text-secondary text-left">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Badges</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-text-primary font-medium truncate max-w-[180px]">{item.name}</p>
                      {item.description && (
                        <p className="text-text-secondary text-xs truncate max-w-[180px]">{item.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {item.category.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-accent font-semibold">{formatPrice(item.price)}</span>
                      {item.priceLarge && (
                        <span className="text-text-secondary text-xs ml-1">/ {formatPrice(item.priceLarge)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {item.isBestSeller && (
                          <span className="text-xs bg-secondary/20 text-secondary px-1.5 py-0.5 rounded">⭐ Best</span>
                        )}
                        {item.isSpicy && (
                          <span className="text-xs bg-primary/20 text-red-400 px-1.5 py-0.5 rounded">🌶️ Spicy</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleAvailable(item)}
                        className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                          item.isAvailable
                            ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                            : 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                        }`}
                      >
                        {item.isAvailable ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingItem(item); setShowForm(true) }}
                          className="text-accent hover:text-secondary text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          {deletingId === item.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
