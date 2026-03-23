export default function InfoBar() {
  return (
    <section className="bg-card-bg border-y border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Hours */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">Hours</p>
              <p className="text-text-secondary text-xs">Tue–Sun: 12:15–8 PM</p>
              <p className="text-red-400/80 text-xs">Mon: Closed</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">Location</p>
              <a
                href="https://maps.google.com/?q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent text-xs transition-colors"
              >
                3003-A E League City Pkwy
                <br />League City, TX
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">Call Us</p>
              <a href="tel:+12813397449" className="text-text-secondary hover:text-accent text-xs transition-colors">
                (281) 339-7449
              </a>
            </div>
          </div>

          {/* Halal */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <p className="text-green-400 font-semibold text-sm">100% Halal</p>
              <p className="text-text-secondary text-xs">All meat is Halal certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
