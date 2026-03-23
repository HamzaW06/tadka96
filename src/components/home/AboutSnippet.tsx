import Link from 'next/link'

export default function AboutSnippet() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-warm-cream/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Founded with Love &amp; Legacy
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Founded by a Mother-Son Duo, Tadka 96 is a culinary haven born from the dreams of
              a beloved community member and her late husband. We embody the fusion of
              Mom&apos;s culinary expertise and heartfelt dedication.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6 italic font-heading text-lg text-text-primary/80">
              &ldquo;Without Tadka, the Flavor&apos;s Not Over Yet!&rdquo;
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent hover:text-secondary font-semibold transition-colors"
            >
              Read Our Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-card-bg rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👩‍🍳</span>
                  <div>
                    <p className="text-text-primary font-semibold">Mother-Son Duo</p>
                    <p className="text-text-secondary text-sm">Family-founded, community-loved</p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌿</span>
                  <div>
                    <p className="text-text-primary font-semibold">100% Halal Certified</p>
                    <p className="text-text-secondary text-sm">All meat is Halal certified</p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌶️</span>
                  <div>
                    <p className="text-text-primary font-semibold">Spice Levels</p>
                    <p className="text-text-secondary text-sm">Mild · Medium · Spicy — your choice!</p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🍽️</span>
                  <div>
                    <p className="text-text-primary font-semibold">Indian Fusion</p>
                    <p className="text-text-secondary text-sm">Traditional recipes, modern twists</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
