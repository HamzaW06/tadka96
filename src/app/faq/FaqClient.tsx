'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    category: 'Food & Dietary',
    items: [
      {
        q: 'Is Tadka 96 100% Halal?',
        a: 'Yes — every piece of meat and poultry served at Tadka 96 is 100% Halal certified. We are committed to serving our entire community with the highest standards.',
      },
      {
        q: 'Do you have vegetarian options?',
        a: 'Absolutely. Our "All Is Veg" section is dedicated entirely to vegetarian dishes — Palak Paneer, Butter Paneer, Paneer Tikka Masala, Dal Tadka, Bhindi Masala, and more. We also have vegetarian appetizers, drinks, and desserts.',
      },
      {
        q: 'What spice levels do you offer?',
        a: 'We customize every dish to your preference: Mild, Medium, or Spicy. Just let us know when you order — in person, by phone, or via DoorDash/Uber Eats.',
      },
      {
        q: 'Do entrees come with sides?',
        a: 'Yes! All Chicken Hit and All Is Veg entrees are served with Rice and Naan. You can substitute Garlic Naan for $1.00 or add Aloo (Potato) for $2.96.',
      },
      {
        q: 'Do you have gluten-free options?',
        a: 'Several of our curries are naturally gluten-free. Please let us know your dietary needs when ordering. Our kitchen does handle wheat products (naan, paratha) so cross-contamination is possible.',
      },
    ],
  },
  {
    category: 'Hours & Location',
    items: [
      { q: 'What are your hours?', a: 'We are open Tuesday through Sunday, 12:15 PM to 8:00 PM. We are closed on Mondays.' },
      { q: 'Where are you located?', a: '3003-A E League City Pkwy, League City, TX 77573. Plenty of parking is available.' },
      {
        q: 'Are you open on holidays?',
        a: 'Hours may vary on major holidays. Follow us on Instagram (@official.tadka96) or call (281) 339-7449 for the most current hours.',
      },
      {
        q: 'What are the Tadka Time weekend specials?',
        a: 'Friday through Sunday only, we serve Chicken Biryani, Goat Biryani, Goat Vindaloo, and 6Pcs Pani Puri. These sell out — come early!',
      },
    ],
  },
  {
    category: 'Ordering & Delivery',
    items: [
      {
        q: 'How can I order?',
        a: 'Three ways: call us at (281) 339-7449, order on DoorDash, or order on Uber Eats. We offer dine-in, takeout, and delivery.',
      },
      { q: 'Do you take reservations?', a: 'We are a walk-in restaurant and do not take reservations for regular dining. For large groups or catering, please call us or fill out our catering inquiry form.' },
      { q: 'Is there a gratuity charge?', a: 'A 10% gratuity will be added to parties of 4 or more.' },
    ],
  },
  {
    category: 'Catering',
    items: [
      { q: 'Do you offer catering?', a: 'Yes! We cater weddings, birthdays, corporate events, family gatherings, and more. We bring the authentic flavors of Tadka 96 right to your venue.' },
      { q: 'How do I book catering?', a: 'Fill out our catering inquiry form or call us at (281) 339-7449. We recommend reaching out at least 2–3 weeks in advance for larger events.' },
      { q: 'What is the minimum for catering?', a: 'Minimums vary by event size. Contact us and we will work with your needs and budget.' },
    ],
  },
  {
    category: 'About Tadka 96',
    items: [
      { q: 'What does "Tadka" mean?', a: '"Tadka" is a traditional Indian cooking technique where whole spices are bloomed in hot oil or ghee and added to a dish as a finishing flourish — the technique that elevates a good dish into an extraordinary one.' },
      { q: 'What does the "96" represent?', a: 'The 96 is a tribute to a meaningful year in our family\'s history — a symbol of the memories and inspiration behind Tadka 96.' },
      { q: 'How do I reach you?', a: 'Call (281) 339-7449, email official.tadka96@gmail.com, or use the contact form on our Contact page. You can also DM us on Instagram @official.tadka96.' },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span className="text-text-primary font-medium text-sm sm:text-base group-hover:text-accent transition-colors">{q}</span>
        <svg className={`w-5 h-5 text-accent shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {open && <p className="text-text-secondary text-sm leading-relaxed pb-4">{a}</p>}
    </div>
  )
}

export default function FaqClient() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Help</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">Frequently Asked Questions</h1>
          <p className="text-text-secondary">
            Everything you need to know about Tadka 96. Can&apos;t find your answer?{' '}
            <Link href="/contact" className="text-accent hover:underline">Contact us</Link>.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((section) => (
            <div key={section.category} className="bg-card-bg rounded-2xl border border-white/10 p-5 sm:p-6">
              <h2 className="font-heading text-lg font-bold text-text-primary mb-2">{section.category}</h2>
              {section.items.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-card-bg rounded-2xl border border-white/10 p-6">
          <p className="text-text-primary font-semibold mb-1">Still have questions?</p>
          <p className="text-text-secondary text-sm mb-4">We are happy to help.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+12813397449" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
              Call (281) 339-7449
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-dark-bg font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
