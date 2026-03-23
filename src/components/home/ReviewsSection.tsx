// Update GOOGLE_URL with your actual Google listing URL
const GOOGLE_URL = 'https://maps.google.com/?q=Tadka+96+League+City+TX'

const reviews = [
  {
    name: 'Melodie',
    badge: 'Local Guide · 59 reviews',
    date: '3 months ago',
    rating: 5,
    text: 'We tried Tadka 96 and really liked it. I had the chicken tikka masala and my husband had the butter chicken, both were flavorful and came with basmati rice and naan. I like that you can pick your spice level, which makes a big difference. I also got a plain lassi, and it was really good and perfect for cooling down. The menu is simple, but it works.',
  },
  {
    name: 'YouTube',
    badge: 'Local Guide · 9 reviews',
    date: '2 months ago',
    rating: 5,
    text: 'We were traveling to Houston from Galveston and stopped in League City to eat at Tadka 96 and the food was absolutely amazing. We ordered butter chicken, chicken kadai, chicken biryani, and daal tadka — everything had excellent flavor and tasted authentic. The staff was very nice and welcoming. Highly recommended!',
  },
  {
    name: 'Kayla Derks',
    badge: 'Local Guide · 9 reviews',
    date: '7 months ago',
    rating: 5,
    text: 'How have I not been to TADKA 96 before today?! The food was AMAZING!!! We ordered the tadka fries, chicken kadai, loaded chicken fries, and garlic naan. Every dish was bursting with flavor! The kadai was savory, bold, and spicy. I absolutely will be going back. Also, they were so kind!',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-card-bg/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Reviews</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            What Our Guests Say
          </h2>
          {/* Aggregate rating */}
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-colors"
          >
            {/* Google G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-sm">4.8</span>
            <span className="text-text-secondary text-xs">on Google</span>
            <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-card-bg rounded-2xl border border-white/10 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{review.name[0]}</span>
                </div>
                {/* Google G */}
                <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-semibold text-sm">{review.name}</p>
                <p className="text-text-secondary text-xs">{review.badge}</p>
              </div>
              <StarRating count={review.rating} />
              <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
              <p className="text-text-secondary/50 text-xs">{review.date}</p>
            </div>
          ))}
        </div>

        {/* Leave a review CTA */}
        <div className="text-center">
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-accent text-text-secondary hover:text-accent text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Leave Us a Review on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
