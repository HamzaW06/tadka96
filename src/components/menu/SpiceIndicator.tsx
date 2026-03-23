interface SpiceIndicatorProps {
  isSpicy: boolean
  level?: 1 | 2 | 3
}

export default function SpiceIndicator({ isSpicy, level = 2 }: SpiceIndicatorProps) {
  if (!isSpicy) return null

  return (
    <div className="flex items-center gap-0.5" title={`Spice level: ${level === 1 ? 'Mild' : level === 2 ? 'Medium' : 'Hot'}`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm flame-icon ${i < level ? 'opacity-100' : 'opacity-20'}`}
          role="img"
          aria-label="flame"
        >
          🌶️
        </span>
      ))}
    </div>
  )
}
