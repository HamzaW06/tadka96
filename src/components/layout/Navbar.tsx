'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import OpenStatusBadge from '@/components/ui/OpenStatusBadge'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/catering', label: 'Catering' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-accent text-dark-bg font-semibold px-4 py-2 rounded-lg text-sm">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Tadka 96 — Home">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm font-heading">96</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-text-primary font-heading font-bold text-lg leading-tight">
                Tadka <span className="text-accent">96</span>
              </span>
              <p className="text-text-secondary text-xs -mt-0.5">Indian Fusion Restaurant</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <OpenStatusBadge />
            <Link
              href="/order"
              className="hidden md:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200"
            >
              Order Now
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-dark-bg/98 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-text-secondary hover:text-text-primary text-base font-medium transition-colors hover:bg-white/5 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center bg-primary text-white py-3 rounded-full font-semibold"
          >
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
