export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function formatPriceSimple(price: number): string {
  return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface DayHours {
  open: boolean
  openTime: string
  closeTime: string
}

export type WeekHours = Record<DayOfWeek, DayHours>

export function isRestaurantOpen(hours: WeekHours, timezone = 'America/Chicago'): boolean {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const parts = formatter.formatToParts(now)
    const weekday = parts.find((p) => p.type === 'weekday')?.value?.toLowerCase() as DayOfWeek
    const hour = parts.find((p) => p.type === 'hour')?.value
    const minute = parts.find((p) => p.type === 'minute')?.value

    if (!weekday || !hour || !minute) return false

    const dayHours = hours[weekday]
    if (!dayHours?.open) return false

    const currentMinutes = parseInt(hour) * 60 + parseInt(minute)
    const [openH, openM] = dayHours.openTime.split(':').map(Number)
    const [closeH, closeM] = dayHours.closeTime.split(':').map(Number)
    const openMinutes = openH * 60 + openM
    const closeMinutes = closeH * 60 + closeM

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes
  } catch {
    return false
  }
}

export function getCurrentDayHours(hours: WeekHours, timezone = 'America/Chicago'): DayHours | null {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
    })
    const weekday = formatter.format(now).toLowerCase() as DayOfWeek
    return hours[weekday] || null
  } catch {
    return null
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase()
}

export function formatHoursDisplay(hours: WeekHours): string {
  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const lines: string[] = []

  for (const day of days) {
    const h = hours[day]
    if (!h) continue
    const label = day.charAt(0).toUpperCase() + day.slice(1)
    if (!h.open) {
      lines.push(`${label}: Closed`)
    } else {
      lines.push(`${label}: ${formatTime(h.openTime)} – ${formatTime(h.closeTime)}`)
    }
  }
  return lines.join('\n')
}

export function formatTime(time: string): string {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
