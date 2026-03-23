'use client'

import { useState, FormEvent } from 'react'

interface Category {
  id: string
  name: string
}

interface MenuItemFormData {
  id?: string
  name: string
  description: string
  price: string
  priceSmall: string
  priceLarge: string
  categoryId: string
  isBestSeller: boolean
  isSpicy: boolean
  isAvailable: boolean
  image: string
}

interface MenuItemFormProps {
  categories: Category[]
  initial?: Partial<MenuItemFormData>
  onSuccess: () => void
  onCancel: () => void
}

export default function MenuItemForm({ categories, initial, onSuccess, onCancel }: MenuItemFormProps) {
  const [form, setForm] = useState<MenuItemFormData>({
    name: initial?.name || '',
    description: initial?.description || '',
    price: initial?.price || '',
    priceSmall: initial?.priceSmall || '',
    priceLarge: initial?.priceLarge || '',
    categoryId: initial?.categoryId || categories[0]?.id || '',
    isBestSeller: initial?.isBestSeller ?? false,
    isSpicy: initial?.isSpicy ?? false,
    isAvailable: initial?.isAvailable ?? true,
    image: initial?.image || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)

  const isEdit = !!initial?.id

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        setForm((f) => ({ ...f, image: data.url }))
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch {
      setError('Upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseFloat(form.price),
      priceSmall: form.priceSmall ? parseFloat(form.priceSmall) : null,
      priceLarge: form.priceLarge ? parseFloat(form.priceLarge) : null,
      categoryId: form.categoryId,
      isBestSeller: form.isBestSeller,
      isSpicy: form.isSpicy,
      isAvailable: form.isAvailable,
      image: form.image || null,
    }

    const url = isEdit ? `/api/admin/menu/${initial!.id}` : '/api/admin/menu'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save item')
        return
      }
      onSuccess()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-xs mb-1.5">Item Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. Butter Chicken"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-xs mb-1.5">Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass + ' resize-none'}
            placeholder="Short description of the dish..."
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs mb-1.5">Price * <span className="text-text-secondary/50">(brand tip: end in .96)</span></label>
          <input
            type="number"
            required
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputClass}
            placeholder="19.96"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs mb-1.5">Category *</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className={inputClass}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-text-secondary text-xs mb-1.5">Small Price (optional)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.priceSmall}
            onChange={(e) => setForm({ ...form, priceSmall: e.target.value })}
            className={inputClass}
            placeholder="3.96"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-xs mb-1.5">Large Price (optional)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.priceLarge}
            onChange={(e) => setForm({ ...form, priceLarge: e.target.value })}
            className={inputClass}
            placeholder="5.96"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-xs mb-1.5">Image</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputClass + ' flex-1'}
              placeholder="https://... or upload below"
            />
            <label className="shrink-0 bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 text-secondary text-sm px-3 py-2.5 rounded-xl cursor-pointer transition-colors">
              {uploadingImage ? '...' : 'Upload'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          {form.image && (
            <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
              <span>✓</span>
              <span className="truncate">{form.image}</span>
              <button type="button" onClick={() => setForm({ ...form, image: '' })} className="text-red-400 hover:text-red-300 shrink-0">Remove</button>
            </div>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 pt-1">
        {[
          { key: 'isBestSeller', label: '⭐ Best Seller' },
          { key: 'isSpicy', label: '🌶️ Spicy' },
          { key: 'isAvailable', label: '✅ Available' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
              className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
                form[key as keyof typeof form] ? 'bg-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  form[key as keyof typeof form] ? 'translate-x-5' : ''
                }`}
              />
            </div>
            <span className="text-text-secondary text-sm">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-white/5 hover:bg-white/10 text-text-secondary py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  )
}
