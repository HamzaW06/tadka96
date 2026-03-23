import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn the story behind Tadka 96 — a family-founded Indian Fusion restaurant in League City, TX. Founded by a mother-son duo with love and legacy.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Our Story
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            About Tadka 96
          </h1>
          <p className="font-heading text-xl text-secondary italic">
            &ldquo;Where Flavor and Heart Meet&rdquo;
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
              The Mother-Son Story
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Founded by a Mother-Son Duo, Tadka 96 is a culinary haven born from the dreams
                of a beloved community member and her late husband. Our restaurant embodies the
                fusion of Mom&apos;s culinary expertise and heartfelt dedication.
              </p>
              <p>
                Every dish we serve carries a story — a memory of family gatherings, of spices
                carefully selected, of love poured into every pot. We believe that food is more
                than sustenance; it&apos;s a connection to culture, to family, and to community.
              </p>
              <p>
                The &ldquo;96&rdquo; in our name is more than a number — it&apos;s a symbol of
                the year that inspired us, a tribute to the memories we hold dear. And the
                flame? That&apos;s the Tadka — the tempering, the final flourish that elevates
                every dish from good to extraordinary.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 italic text-text-primary">
                &ldquo;Without Tadka, the Flavor&apos;s Not Over Yet!&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="space-y-4">
            {/* Feature cards */}
            {[
              {
                icon: '👩‍🍳',
                title: 'Family-Founded',
                desc: 'A mother-son duo bringing authentic home cooking to the community of League City, TX.',
              },
              {
                icon: '🌿',
                title: '100% Halal Certified',
                desc: 'All meat served at Tadka 96 is Halal certified. We are committed to serving every member of our community.',
              },
              {
                icon: '🍽️',
                title: 'Indian Fusion',
                desc: 'Traditional Indian recipes with creative fusion twists — the best of both worlds on one plate.',
              },
              {
                icon: '🌶️',
                title: 'Your Spice, Your Way',
                desc: 'Choose your spice level: Mild, Medium, or Spicy. We customize every dish to your preference.',
              },
            ].map((feat) => (
              <div key={feat.title} className="flex items-start gap-3 bg-card-bg rounded-xl p-4 border border-white/10">
                <span className="text-2xl mt-0.5">{feat.icon}</span>
                <div>
                  <p className="text-text-primary font-semibold">{feat.title}</p>
                  <p className="text-text-secondary text-sm">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catering */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-2xl border border-white/10 p-6 sm:p-8 mb-10">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
                Catering Services
              </h2>
              <p className="text-text-secondary mb-4">
                Make Your Party Unforgettable — Ask About Our Catering! Whether it&apos;s a
                wedding, birthday, corporate event, or family gathering, we bring the authentic
                flavors of Tadka 96 right to your venue.
              </p>
              <a
                href="tel:+12813397449"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call to Inquire: (281) 339-7449
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Find Us</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.8!2d-95.0833!3d29.5077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDMwJzI3LjciTiA5NcKwMDUnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tadka 96 Location"
            />
          </div>
          <p className="text-text-secondary text-sm mt-2 text-center">
            <a
              href="https://maps.google.com/?q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              3003-A E League City Pkwy, League City, TX 77573
            </a>
          </p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-text-secondary mb-4">Have questions? We&apos;d love to hear from you.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-dark-bg font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
