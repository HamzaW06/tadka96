interface PlaceholderProps {
  name: string
  categorySlug?: string
  className?: string
}

const categoryColors: Record<string, string> = {
  'chicken-hit': 'from-red-900/60 to-orange-900/60',
  'all-is-veg': 'from-green-900/60 to-emerald-900/60',
  'tadka-twists': 'from-yellow-900/60 to-amber-900/60',
  'tadka-bites': 'from-orange-900/60 to-red-900/60',
  'tadka-time': 'from-purple-900/60 to-pink-900/60',
  drinks: 'from-blue-900/60 to-cyan-900/60',
  desserts: 'from-pink-900/60 to-rose-900/60',
  'add-ons': 'from-gray-900/60 to-slate-900/60',
}

const categoryIcons: Record<string, string> = {
  'chicken-hit': '🍗',
  'all-is-veg': '🥬',
  'tadka-twists': '🌯',
  'tadka-bites': '🥟',
  'tadka-time': '⭐',
  drinks: '🥛',
  desserts: '🍨',
  'add-ons': '➕',
}

export default function MenuItemPlaceholder({ name, categorySlug = '', className = '' }: PlaceholderProps) {
  const gradient = categoryColors[categorySlug] || 'from-card-bg to-dark-bg'
  const icon = categoryIcons[categorySlug] || '🍽️'
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-1 ${className}`}
    >
      <span className="text-3xl" role="img" aria-hidden="true">{icon}</span>
      <span className="text-text-secondary/50 text-xs font-medium">{initials}</span>
    </div>
  )
}
