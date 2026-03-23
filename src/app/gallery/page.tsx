import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'See the food at Tadka 96 — Indian Fusion Restaurant in League City, TX. Butter Chicken, Biryani, Samosa Chaat, and more. 100% Halal certified.',
}

const photos = [
  { src: '/images/menu/butter chicken.jpg', alt: 'Butter Chicken — creamy, buttery, rich', label: 'Butter Chicken' },
  { src: '/images/menu/chicken tikka masala.jpg', alt: 'Chicken Tikka Masala — bold tomato cream sauce', label: 'Chicken Tikka Masala' },
  { src: '/images/menu/palak chicken.jpg', alt: 'Palak Chicken — spinach curry with boneless chicken', label: 'Chicken Palak' },
  { src: '/images/menu/chili chicken.jpg', alt: 'Chili Chicken — Indo-Chinese pan fried chicken', label: 'Chili Chicken' },
  { src: '/images/menu/palak paneer.jpg', alt: 'Palak Paneer — paneer in creamy spinach gravy', label: 'Palak Paneer' },
  { src: '/images/menu/butter paneer.jpg', alt: 'Butter Paneer — paneer in a buttery sauce', label: 'Butter Paneer' },
  { src: '/images/menu/bhindi masala.jpg', alt: 'Bhindi Masala — okra cooked with spices', label: 'Bhindi Masala' },
  { src: '/images/menu/dal tadka.jpg', alt: 'Dal Tadka — yellow lentils tempered with smoky flavor', label: 'Dal Tadka' },
  { src: '/images/menu/samosa chaat.jpg', alt: 'Samosa Chaat — samosas topped with yogurt and chutneys', label: 'Samosa Chaat' },
  { src: '/images/menu/chicken samosas.jpg', alt: 'Chicken Samosas — crispy pastry with spiced chicken', label: 'Chicken Samosas' },
  { src: '/images/menu/tadka pops.jpg', alt: 'Tadka Pops — bite-sized chicken fritters', label: '6Pcs Tadka Pops' },
  { src: '/images/menu/chicken paratha wrap.jpg', alt: 'Chicken Tikka Wrap — tikka in flaky paratha', label: 'Chicken Tikka Wrap' },
  { src: '/images/menu/chicken sandwich.jpg', alt: 'Tadka Chicken Sandwich — chicken tender on a toasted bun', label: 'Chicken Sandwich' },
  { src: '/images/menu/loaded chickenf ries.jpg', alt: 'Loaded Chicken Fries — fries with chicken and jalapeños', label: 'Loaded Chicken Fries' },
  { src: '/images/menu/mango lassi and chai.png', alt: 'Mango Lassi and Masala Chai', label: 'Mango Lassi & Chai' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition">
      {/* Header */}
      <div className="py-10 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">Food Gallery</p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-3">Our Food</h1>
        <p className="text-text-secondary">
          Every dish is made fresh to order with 100% Halal certified ingredients.
          Come hungry — leave happy.
        </p>
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="break-inside-avoid rounded-2xl overflow-hidden border border-white/5 group relative"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">{photo.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">Ready to taste it yourself?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              View Full Menu
            </Link>
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-dark-bg font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
