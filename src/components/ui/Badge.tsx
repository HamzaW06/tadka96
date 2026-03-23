import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'bestseller' | 'spicy' | 'halal' | 'new' | 'weekend' | 'default'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    bestseller: 'bg-secondary/20 border border-secondary/40 text-secondary',
    spicy: 'bg-primary/20 border border-primary/40 text-red-400',
    halal: 'bg-green-900/30 border border-green-700/50 text-green-400',
    new: 'bg-accent/20 border border-accent/40 text-accent',
    weekend: 'bg-purple-900/30 border border-purple-700/50 text-purple-400',
    default: 'bg-white/10 border border-white/20 text-text-secondary',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
