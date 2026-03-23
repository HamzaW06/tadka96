'use client'

import { useState, FormEvent } from 'react'

interface AdminSettingsClientProps {
  initialSettings: Record<string, string>
}

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

interface DayHours {
  open: boolean
  openTime: string
  closeTime: string
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'info' | 'hours' | 'content'>('info')

  let hoursData: Record<string, DayHours>
  try {
    hoursData = JSON.parse(settings.hours || '{}')
  } catch {
    hoursData = {}
  }

  const [hours, setHours] = useState<Record<string, DayHours>>(
    days.reduce((acc, day) => {
      acc[day] = hoursData[day] || { open: false, openTime: '12:15', closeTime: '20:00' }
      return acc
    }, {} as Record<string, DayHours>)
  )

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError('')

    const payload = {
      ...settings,
      hours: JSON.stringify(hours),
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  const set = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }))

  const inputClass = 'w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none transition-colors'
  const labelClass = 'block text-text-secondary text-xs mb-1.5'
  const groupClass = 'bg-card-bg rounded-2xl border border-white/10 p-5 mb-4'

  const tabs = [
    { id: 'info' as const, label: 'Restaurant Info' },
    { id: 'hours' as const, label: 'Hours' },
    { id: 'content' as const, label: 'Content & Text' },
  ]

  return (
    <form onSubmit={handleSave}>
      {/* Tab bar */}
      <div className="flex gap-2 mb-6 bg-card-bg rounded-2xl border border-white/10 p-1.5 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div>
          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">Contact Info</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Restaurant Name</label>
                <input value={settings.restaurant_name || ''} onChange={(e) => set('restaurant_name', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input value={settings.phone || ''} onChange={(e) => set('phone', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={settings.email || ''} onChange={(e) => set('email', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input value={settings.address || ''} onChange={(e) => set('address', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">Social Media</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Instagram URL</label>
                <input value={settings.instagram || ''} onChange={(e) => set('instagram', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Instagram Handle</label>
                <input value={settings.instagram_handle || ''} onChange={(e) => set('instagram_handle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Facebook URL</label>
                <input value={settings.facebook || ''} onChange={(e) => set('facebook', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>DoorDash URL</label>
                <input value={settings.doordash_url || ''} onChange={(e) => set('doordash_url', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Uber Eats URL</label>
                <input value={settings.ubereats_url || ''} onChange={(e) => set('ubereats_url', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">Notes</h3>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Gratuity Note</label>
                <input value={settings.gratuity_note || ''} onChange={(e) => set('gratuity_note', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Catering Text</label>
                <input value={settings.catering_text || ''} onChange={(e) => set('catering_text', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className={groupClass}>
          <h3 className="font-heading text-base font-bold text-text-primary mb-4">Hours of Operation</h3>
          <div className="space-y-3">
            {days.map((day) => {
              const h = hours[day]
              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 text-text-secondary text-sm capitalize">{day}</div>
                  <button
                    type="button"
                    onClick={() => setHours((prev) => ({ ...prev, [day]: { ...prev[day], open: !h.open } }))}
                    className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ${h.open ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${h.open ? 'translate-x-5' : ''}`} />
                  </button>
                  {h.open ? (
                    <>
                      <input
                        type="time"
                        value={h.openTime}
                        onChange={(e) => setHours((prev) => ({ ...prev, [day]: { ...prev[day], openTime: e.target.value } }))}
                        className="bg-dark-bg border border-white/10 rounded-lg px-3 py-1.5 text-text-primary text-sm outline-none w-28"
                      />
                      <span className="text-text-secondary text-sm">–</span>
                      <input
                        type="time"
                        value={h.closeTime}
                        onChange={(e) => setHours((prev) => ({ ...prev, [day]: { ...prev[day], closeTime: e.target.value } }))}
                        className="bg-dark-bg border border-white/10 rounded-lg px-3 py-1.5 text-text-primary text-sm outline-none w-28"
                      />
                    </>
                  ) : (
                    <span className="text-red-400 text-sm">Closed</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div>
          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">Taglines</h3>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Main Tagline (English)</label>
                <input value={settings.tagline_main || ''} onChange={(e) => set('tagline_main', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tagline (Hindi)</label>
                <input value={settings.tagline_hindi || ''} onChange={(e) => set('tagline_hindi', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Short Tagline</label>
                <input value={settings.tagline_short || ''} onChange={(e) => set('tagline_short', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">About Text</h3>
            <textarea
              rows={5}
              value={settings.about_text || ''}
              onChange={(e) => set('about_text', e.target.value)}
              className={inputClass + ' resize-none'}
            />
          </div>
          <div className={groupClass}>
            <h3 className="font-heading text-base font-bold text-text-primary mb-3">Hours Display Text</h3>
            <input value={settings.hours_display || ''} onChange={(e) => set('hours_display', e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {/* Save bar */}
      <div className="sticky bottom-4 mt-6">
        <div className="flex items-center gap-3 bg-card-bg border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
          {success && <p className="text-green-400 text-sm flex-1">✓ Settings saved!</p>}
          {error && <p className="text-red-400 text-sm flex-1">{error}</p>}
          {!success && !error && <p className="text-text-secondary text-sm flex-1">Unsaved changes</p>}
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  )
}
