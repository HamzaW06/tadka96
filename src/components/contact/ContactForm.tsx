'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-text-secondary">Thank you for reaching out. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-accent text-sm hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-text-secondary text-sm mb-1.5 font-medium">
            Name *
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-colors input-focus"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm mb-1.5 font-medium">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-colors input-focus"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-text-secondary text-sm mb-1.5 font-medium">
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          required
          maxLength={200}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-colors input-focus"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-text-secondary text-sm mb-1.5 font-medium">
          Message *
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-dark-bg border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/40 outline-none transition-colors resize-none input-focus"
          placeholder="Tell us more..."
        />
        <p className="text-text-secondary/40 text-xs mt-1 text-right">{form.message.length}/2000</p>
      </div>

      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
