import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Tadka 96 Indian Fusion Restaurant in League City, TX. Call, email, or send us a message.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">
            Contact Us
          </h1>
          <p className="text-text-secondary">
            We&apos;d love to hear from you. Reach out for reservations, catering inquiries, or just to say hi!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold">Address</h3>
              </div>
              <a
                href="https://maps.google.com/?q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent text-sm transition-colors"
              >
                3003-A E League City Pkwy<br />League City, TX 77573
              </a>
            </div>

            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold">Phone</h3>
              </div>
              <a href="tel:+12813397449" className="text-text-secondary hover:text-primary text-sm transition-colors">
                (281) 339-7449
              </a>
            </div>

            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold">Email</h3>
              </div>
              <a href="mailto:official.tadka96@gmail.com" className="text-text-secondary hover:text-secondary text-sm transition-colors">
                official.tadka96@gmail.com
              </a>
            </div>

            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-text-primary font-semibold">Hours</h3>
              </div>
              <div className="text-text-secondary text-sm space-y-0.5">
                <p className="text-red-400/80">Monday: Closed</p>
                <p>Tuesday–Sunday: 12:15 PM – 8:00 PM</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/official.tadka96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card-bg hover:bg-accent/10 border border-white/10 hover:border-accent/30 text-text-secondary hover:text-accent rounded-xl px-4 py-3 text-sm transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @official.tadka96
              </a>
              <a
                href="https://facebook.com/official.tadka96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card-bg hover:bg-blue-900/20 border border-white/10 hover:border-blue-500/30 text-text-secondary hover:text-blue-400 rounded-xl px-4 py-3 text-sm transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-5">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-10">
          <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.8!2d-95.0833!3d29.5077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDMwJzI3LjciTiA5NcKwMDUnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tadka 96 on Google Maps"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
