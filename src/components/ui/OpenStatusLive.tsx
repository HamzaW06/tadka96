'use client'

import { useEffect, useState } from 'react'

const defaultHours: Record<string, { open: boolean; openTime: string; closeTime: string }> = {
  monday: { open: false, openTime: '', closeTime: '' },
  tuesday: { open: true, openTime: '12:15', closeTime: '20:00' },
  wednesday: { open: true, openTime: '12:15', closeTime: '20:00' },
  thursday: { open: true, openTime: '12:15', closeTime: '20:00' },
  friday: { open: true, openTime: '12:15', closeTime: '20:00' },
  saturday: { open: true, openTime: '12:15', closeTime: '20:00' },
  sunday: { open: true, openTime: '12:15', closeTime: '20:00' },
}

function checkIsOpen(): { isOpen: boolean; nextChange: string } {
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
    const weekday = parts.find((p) => p.type === 'weekday')?.value?.toLowerCase() || ''
    const hour = parts.find((p) => p.type === 'hour')?.value || '0'
    const minute = parts.find((p) => p.type === 'minute')?.value || '0'

    const dayHours = defaultHours[weekday]
    if (!dayHours?.open) return { isOpen: false, nextChange: 'Opens Tuesday at 12:15 PM' }

    const currentMinutes = parseInt(hour) * 60 + parseInt(minute)
    const [openH, openM] = dayHours.openTime.split(':').map(Number)
    const [closeH, closeM] = dayHours.closeTime.split(':').map(Number)
    const openMinutes = openH * 60 + openM
    const closeMinutes = closeH * 60 + closeM

    if (currentMinutes < openMinutes) {
      return { isOpen: false, nextChange: 'Opens at 12:15 PM today' }
    } else if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return { isOpen: true, nextChange: 'Closes at 8:00 PM' }
    } else {
      return { isOpen: false, nextChange: 'Opens tomorrow at 12:15 PM' }
    }
  } catch {
    return { isOpen: false, nextChange: '' }
  }
}

export default function OpenStatusLive() {
  const [status, setStatus] = useState<{ isOpen: boolean; nextChange: string } | null>(null)

  useEffect(() => {
    const update = () => setStatus(checkIsOpen())
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  return (
    <div
      className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border ${
        status.isOpen
          ? 'bg-green-900/20 border-green-700/40'
          : 'bg-red-900/20 border-red-800/40'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            status.isOpen ? 'bg-green-400 status-open' : 'bg-red-400'
          }`}
        />
        <span
          className={`text-xl font-heading font-bold ${
            status.isOpen ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {status.isOpen ? 'We Are Open Now!' : 'Currently Closed'}
        </span>
      </div>
      {status.nextChange && (
        <p className="text-text-secondary text-sm">{status.nextChange}</p>
      )}
    </div>
  )
}
