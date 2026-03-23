import { prisma } from '@/lib/prisma'
import Hero from '@/components/home/Hero'
import FeaturedItems from '@/components/home/FeaturedItems'
import InfoBar from '@/components/home/InfoBar'
import AboutSnippet from '@/components/home/AboutSnippet'
import CateringBanner from '@/components/home/CateringBanner'
import ReviewsSection from '@/components/home/ReviewsSection'
import InstagramSection from '@/components/home/InstagramSection'

export const revalidate = 60

export default async function HomePage() {
  const bestSellers = await prisma.menuItem.findMany({
    where: { isBestSeller: true, isAvailable: true },
    include: { category: { select: { slug: true } } },
    take: 6,
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="page-transition">
      <Hero />
      <InfoBar />
      <FeaturedItems items={bestSellers} />
      <ReviewsSection />
      <AboutSnippet />
      <CateringBanner />
      <InstagramSection />
    </div>
  )
}
