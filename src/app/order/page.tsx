import type { Metadata } from 'next'
import OpenStatusLive from '@/components/ui/OpenStatusLive'

export const metadata: Metadata = {
  title: 'Order',
  description: 'Order Tadka 96 online via DoorDash or Uber Eats, or call us directly. Indian fusion food delivered to you in League City, TX.',
}

export default function OrderPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Ready to Eat?
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">
            Order Tadka 96
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Order for delivery or pickup through your favorite platform, or call us directly.
          </p>
        </div>

        {/* Open Status */}
        <div className="flex justify-center mb-10">
          <OpenStatusLive />
        </div>

        {/* Order Options */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {/* Call to Order */}
          <div className="bg-card-bg rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-lg mb-1">Call to Order</h3>
              <p className="text-text-secondary text-sm mb-4">Speak with us directly for pickup or custom orders</p>
              <a
                href="tel:+12813397449"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                (281) 339-7449
              </a>
            </div>
          </div>

          {/* DoorDash */}
          <div className="bg-card-bg rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-900/30 flex items-center justify-center">
              <span className="text-2xl">🚗</span>
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-lg mb-1">DoorDash</h3>
              <p className="text-text-secondary text-sm mb-4">Order delivery through DoorDash</p>
              <a
                href="https://www.doordash.com/store/tadka-96-league-city-36384499/81527146/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF3008] hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Order on DoorDash
              </a>
            </div>
          </div>

          {/* Uber Eats */}
          <div className="bg-card-bg rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-900/30 flex items-center justify-center">
              <span className="text-2xl">🛵</span>
            </div>
            <div>
              <h3 className="text-text-primary font-semibold text-lg mb-1">Uber Eats</h3>
              <p className="text-text-secondary text-sm mb-4">Order delivery through Uber Eats</p>
              <a
                href="https://www.ubereats.com/store/tadka-96/ifUyGqnpWVm1xzuxLeX8uw?diningMode=DELIVERY&surfaceName="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C167] hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Order on Uber Eats
              </a>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-card-bg rounded-2xl border border-white/10 p-6 mb-6">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Hours of Operation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-secondary text-sm">Monday</span>
              <span className="text-red-400 text-sm font-medium">CLOSED</span>
            </div>
            {['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex justify-between py-2 border-b border-white/5">
                <span className="text-text-secondary text-sm">{day}</span>
                <span className="text-green-400 text-sm font-medium">12:15 PM – 8:00 PM</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-xl p-4">
            <span className="text-lg">💳</span>
            <p className="text-text-secondary text-sm">
              <span className="text-secondary font-semibold">Gratuity Note:</span> A 10% gratuity will be added to parties of 4 or more.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-green-900/10 border border-green-700/30 rounded-xl p-4">
            <span className="text-lg">✅</span>
            <p className="text-text-secondary text-sm">
              <span className="text-green-400 font-semibold">100% Halal Certified:</span> All meat at Tadka 96 is Halal certified.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4">
            <span className="text-lg">🌶️</span>
            <p className="text-text-secondary text-sm">
              <span className="text-accent font-semibold">Spice Levels:</span> Request Mild, Medium, or Spicy when you order.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
