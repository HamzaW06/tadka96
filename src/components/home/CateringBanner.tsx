export default function CateringBanner() {
  return (
    <section className="relative py-14 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20" />
      <div className="absolute inset-0 border-y border-white/5" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Hosting an Event?
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Make Your Party{' '}
          <span className="gradient-text">Unforgettable</span>
        </h2>
        <p className="text-text-secondary text-lg mb-6 max-w-2xl mx-auto">
          Ask About Our Catering! We bring the authentic flavors of Tadka 96 right to your event.
          Perfect for weddings, birthdays, corporate events, and more.
        </p>
        <a
          href="tel:+12813397449"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call (281) 339-7449 to Book
        </a>
        <p className="text-text-secondary/60 text-sm mt-3">
          A 10% gratuity will be added to parties of 4 or more.
        </p>
      </div>
    </section>
  )
}
