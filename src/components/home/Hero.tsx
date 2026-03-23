import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero food photo — replace src with any image from public/images/menu/ */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu/butter chicken.jpg"
          alt="Signature Butter Chicken at Tadka 96"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Dark gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/70 to-dark-bg/90" />
        <div className="absolute inset-0 bg-dark-bg/30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          <div className="inline-flex items-center gap-1.5 bg-green-900/50 border border-green-700/50 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            100% Halal Certified
          </div>
          {/* Google rating — update ratingValue and reviewCount once you have them */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="text-yellow-400 font-bold" id="google-rating">4.8★</span>
            <span className="text-white/70">on Google</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            🍽️ Indian Fusion · League City, TX
          </div>
        </div>

        {/* Logo mark */}
        <div className="flex items-center justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 ring-2 ring-white/10">
              <span className="text-white font-heading font-bold text-2xl">96</span>
            </div>
            <span className="absolute -top-1 -right-1 text-2xl" role="img" aria-label="flame">🔥</span>
          </div>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading font-bold text-white mb-3 leading-tight drop-shadow-lg"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
        >
          Tadka <span className="gradient-text">96</span>
        </h1>
        <p className="text-white/80 text-lg sm:text-xl mb-4 font-medium tracking-wide drop-shadow">
          Indian Fusion Restaurant
        </p>

        {/* Tagline */}
        <p
          className="font-heading text-white italic mb-2 drop-shadow"
          style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.875rem)' }}
        >
          &ldquo;Where Flavor and Heart Meet&rdquo;
        </p>
        <p className="text-secondary text-sm sm:text-base mb-10 drop-shadow">
          Taste Abhi Baaki Hai, Tadka Ke Saath!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Our Menu
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-accent text-accent hover:bg-accent hover:text-dark-bg font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Order Now
          </Link>
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tue–Sun: 12:15–8:00 PM
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            League City, TX
          </div>
          <a href="tel:+12813397449" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (281) 339-7449
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
        <span>Scroll to explore</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
