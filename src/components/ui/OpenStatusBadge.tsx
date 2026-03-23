'use client'

import { useEffect, useState } from 'react'

interface HoursData {
  [key: string]: {
    open: boolean
    openTime: string
    closeTime: string
  }
}

function checkIsOpen(hours: HoursData): boolean {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const parts = formatter.formatToParts(now)
    const weekday = parts.find((p) => p.type === 'weekday')?.value?.toLowerCase()
    const hour = parts.find((p) => p.type === 'hour')?.value
    const minute = parts.find((p) => p.type === 'minute')?.value
    if (!weekday || !hour || !minute) return false
    const dayHours = hours[weekday]
    if (!dayHours?.open) return false
    const currentMinutes = parseInt(hour) * 60 + parseInt(minute)
    const [openH, openM] = dayHours.openTime.split(':').map(Number)
    const [closeH, closeM] = dayHours.closeTime.split(':').map(Number)
    return currentMinutes >= openH * 60 + openM && currentMinutes < closeH * 60 + closeM
  } catch {
    return false
  }
}

const defaultHours: HoursData = {
  monday: { open: false, openTime: '', closeTime: '' },
  tuesday: { open: true, openTime: '12:15', closeTime: '20:00' },
  wednesday: { open: true, openTime: '12:15', closeTime: '20:00' },
  thursday: { open: true, openTime: '12:15', closeTime: '20:00' },
  friday: { open: true, openTime: '12:15', closeTime: '20:00' },
  saturday: { open: true, openTime: '12:15', closeTime: '20:00' },
  sunday: { open: true, openTime: '12:15', closeTime: '20:00' },
}

export default function OpenStatusBadge() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => setIsOpen(checkIsOpen(defaultHours))
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isOpen === null) return null

  return (
    <div
      className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
        isOpen
          ? 'bg-green-900/30 border-green-700/50 text-green-400'
          : 'bg-red-900/30 border-red-800/50 text-red-400'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOpen ? 'bg-green-400 status-open' : 'bg-red-400'
        }`}
      />
      {isOpen ? 'Open Now' : 'Closed'}
    </div>
  )
}
