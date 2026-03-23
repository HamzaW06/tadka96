import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="font-heading text-6xl font-bold text-text-primary mb-2">404</h1>
        <p className="text-text-secondary text-lg mb-2">Page not found</p>
        <p className="text-accent italic mb-8">&ldquo;This dish isn&apos;t on our menu...&rdquo;</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
