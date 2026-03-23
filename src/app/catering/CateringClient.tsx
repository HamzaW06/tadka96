'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

const eventTypes = ['Wedding', 'Birthday', 'Corporate Event', 'Family Gathering', 'School/University Event', 'Religious Event', 'Other']
const guestRanges = ['Under 25', '25–50', '50–100', '100–200', '200+']

export default function CateringClient() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', guestCount: '',
    eventDate: '', venue: '', dietaryNotes: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const subject = `Catering Inquiry — ${form.eventType} for ${form.guestCount} guests`
      const message = `Event Type: ${form.eventType}\nGuest Count: ${form.guestCount}\nEvent Date: ${form.eventDate}\nVenue/Location: ${form.venue}\nPhone: ${form.phone}\nDietary Notes: ${form.dietaryNotes}\n\nAdditional Info:\n${form.message}`
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject, message }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please call us directly at (281) 339-7449.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      {/* Hero banner */}
      <div className="relative py-14 overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Hosting an Event?</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">
            Catering by <span className="gradient-text">Tadka 96</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We bring the authentic flavors of Tadka 96 right to your event. 100% Halal certified.
            Perfect for weddings, birthdays, corporate events, and more.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary mb-4">What We Offer</h2>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  { icon: '🎊', text: 'Weddings & Receptions' },
                  { icon: '🎂', text: 'Birthday Parties' },
                  { icon: '💼', text: 'Corporate Lunches & Events' },
                  { icon: '🕌', text: 'Religious Celebrations' },
                  { icon: '🏫', text: 'School & University Events' },
                  { icon: '👨‍👩‍👧', text: 'Family Gatherings' },
                ].map(item => (
                  <li key={item.text} className="flex items-center gap-2">
                    <span>{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary mb-3">Prefer to Call?</h2>
              <p className="text-text-secondary text-sm mb-3">Speak with us directly to discuss your event.</p>
              <a
                href="tel:+12813397449"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (281) 339-7449
              </a>
            </div>

            <div className="bg-green-900/20 border border-green-700/30 rounded-2xl p-5">
              <p className="text-green-400 font-semibold text-sm mb-1">✓ 100% Halal Certified</p>
              <p className="text-text-secondary text-sm">All meat served at Tadka 96 is Halal certified — suitable for the entire community.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Inquiry Sent!</h2>
                <p className="text-text-secondary mb-6">We received your catering inquiry and will be in touch within 1–2 business days. For urgent matters, call us directly at (281) 339-7449.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="bg-card-bg rounded-2xl border border-white/10 p-6">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-5">Catering Inquiry Form</h2>

                {status === 'error' && (
                  <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{errorMsg}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Your Name *</label>
                      <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors"
                        placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Email *</label>
                      <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors"
                        placeholder="jane@example.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors"
                        placeholder="(555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Event Date</label>
                      <input type="date" value={form.eventDate} onChange={e => set('eventDate', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Event Type *</label>
                      <select required value={form.eventType} onChange={e => set('eventType', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors">
                        <option value="">Select event type</option>
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-1.5">Expected Guest Count *</label>
                      <select required value={form.guestCount} onChange={e => set('guestCount', e.target.value)}
                        className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors">
                        <option value="">Select range</option>
                        {guestRanges.map(r => <option key={r} value={r}>{r} guests</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Venue / Location</label>
                    <input type="text" value={form.venue} onChange={e => set('venue', e.target.value)}
                      className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors"
                      placeholder="Address or venue name" />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Dietary Requirements</label>
                    <input type="text" value={form.dietaryNotes} onChange={e => set('dietaryNotes', e.target.value)}
                      className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors"
                      placeholder="e.g. all vegetarian, nut allergy, extra spicy..." />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Additional Notes</label>
                    <textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)}
                      className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-colors resize-none"
                      placeholder="Tell us anything else about your event..." />
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                    ) : 'Send Catering Inquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
