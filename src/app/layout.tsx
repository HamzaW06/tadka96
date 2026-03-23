import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import { Analytics } from '@vercel/analytics/next'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Tadka 96 — Indian Fusion Restaurant | League City, TX',
    template: '%s | Tadka 96',
  },
  description:
    'Authentic Indian Fusion cuisine in League City, TX. All Halal certified. Dine-in, takeout, catering available. Tuesday–Sunday 12:15 PM – 8:00 PM.',
  keywords: [
    'Indian restaurant League City',
    'Halal restaurant Texas',
    'Indian fusion food',
    'Tadka 96',
    'butter chicken',
    'biryani',
    'curry',
    'Indian food near me',
  ],
  authors: [{ name: 'Tadka 96' }],
  creator: 'Tadka 96',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tadka96.com',
    siteName: 'Tadka 96',
    title: 'Tadka 96 — Indian Fusion Restaurant',
    description: 'Where Flavor and Heart Meet. Authentic Halal Indian Fusion in League City, TX.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tadka 96 Indian Fusion Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tadka 96 — Indian Fusion Restaurant',
    description: 'Where Flavor and Heart Meet. Authentic Halal Indian Fusion in League City, TX.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1A2E',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Tadka 96',
              description: 'Indian Fusion Restaurant — Where Flavor and Heart Meet. 100% Halal certified.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tadka96.com',
              telephone: '+12813397449',
              email: 'official.tadka96@gmail.com',
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tadka96.com'}/images/og-image.jpg`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '3003-A E League City Pkwy',
                addressLocality: 'League City',
                addressRegion: 'TX',
                postalCode: '77573',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 29.5077,
                longitude: -95.0833,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '12:15',
                  closes: '20:00',
                },
              ],
              servesCuisine: ['Indian', 'Indian Fusion', 'Halal'],
              priceRange: '$$',
              hasMenu: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tadka96.com'}/menu`,
              acceptsReservations: false,
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Halal', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Takeout', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Delivery', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Catering', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Dine-in', value: true },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                bestRating: '5',
                ratingCount: '50',
              },
              sameAs: [
                'https://instagram.com/official.tadka96',
                'https://facebook.com/official.tadka96',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-dark-bg text-text-primary min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
        <Analytics />
      </body>
    </html>
  )
}
