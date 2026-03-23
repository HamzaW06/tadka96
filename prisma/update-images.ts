import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Map each menu item name → image path (local) or URL (Pexels CDN)
// Local files are in public/images/menu/ — spaces are fine, Next.js encodes them
const imageMap: Record<string, string> = {
  // ── Chicken Hit ───────────────────────────────────────────────────────────
  'Chicken Tikka Masala': '/images/menu/chicken tikka masala.jpg',
  'Butter Chicken':       '/images/menu/butter chicken.jpg',
  'Chicken Palak':        '/images/menu/palak chicken.jpg',
  'Chili Chicken':        '/images/menu/chili chicken.jpg',
  // Pexels — Indian red curry (close match for vindaloo / kadai / tawa)
  'Chicken Vindaloo':
    'https://images.pexels.com/photos/19781599/pexels-photo-19781599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Chicken Kadai':
    'https://images.pexels.com/photos/12312104/pexels-photo-12312104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Tawa Chicken':
    'https://images.pexels.com/photos/614692/pexels-photo-614692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',

  // ── All Is Veg ────────────────────────────────────────────────────────────
  'Bindi Masala':  '/images/menu/bhindi masala.jpg',
  'Palak Paneer':  '/images/menu/palak paneer.jpg',
  'Butter Paneer': '/images/menu/butter paneer.jpg',
  'Daal Tadka':    '/images/menu/dal tadka.jpg',
  // Pexels — paneer tikka masala
  'Paneer Tikka Masala':
    'https://images.pexels.com/photos/28674559/pexels-photo-28674559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  // Pexels — reuse kadai photo (stir-fried paneer in sauce)
  'Chili Paneer':
    'https://images.pexels.com/photos/12312104/pexels-photo-12312104.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  // Pexels — green spinach curry
  'Aloo Palak':
    'https://images.pexels.com/photos/19781599/pexels-photo-19781599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',

  // ── Tadka Twists ─────────────────────────────────────────────────────────
  'Tadka Chicken Sandwich': '/images/menu/chicken sandwich.jpg',
  'Chicken Tikka Wrap':     '/images/menu/chicken paratha wrap.jpg',
  'Loaded Chicken Fries':   '/images/menu/loaded chickenf ries.jpg',
  // Pexels
  'Chicken Tikka Philly':
    'https://images.pexels.com/photos/750075/pexels-photo-750075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Paneer Tikka Wrap':
    'https://images.pexels.com/photos/614692/pexels-photo-614692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  '3pc Chicken Tenders':
    'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Cheese Burger':
    'https://images.pexels.com/photos/18713424/pexels-photo-18713424.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Beef Philly Cheesesteak':
    'https://images.pexels.com/photos/750075/pexels-photo-750075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',

  // ── Tadka Bites ───────────────────────────────────────────────────────────
  '3Pcs Chicken Samosa': '/images/menu/chicken samosas.jpg',
  'Samosa Chaat':        '/images/menu/samosa chaat.jpg',
  '6Pcs Tadka Pops':     '/images/menu/tadka pops.jpg',
  // Pexels
  '2Pcs Veg Samosa':
    'https://images.pexels.com/photos/14477873/pexels-photo-14477873.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  '4Pcs Veg Rolls':
    'https://images.pexels.com/photos/218769/pexels-photo-218769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Tadka Fries':
    'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',

  // ── Tadka Time (Weekend Specials) ─────────────────────────────────────────
  'Chicken Biryani':
    'https://images.pexels.com/photos/4224304/pexels-photo-4224304.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Goat Biryani':
    'https://images.pexels.com/photos/16229982/pexels-photo-16229982.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  '6Pcs Pani Puri':
    'https://images.pexels.com/photos/34270741/pexels-photo-34270741.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Goat Vindaloo':
    'https://images.pexels.com/photos/19781599/pexels-photo-19781599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',

  // ── Drinks ────────────────────────────────────────────────────────────────
  'Mango Lassi': '/images/menu/mango lassi and chai.png',
  'Masala Chai': '/images/menu/mango lassi and chai.png',

  // ── Desserts ──────────────────────────────────────────────────────────────
  '3Pcs Gulab Jamun':
    'https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Mango Ice Cream':
    'https://images.pexels.com/photos/5060377/pexels-photo-5060377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Coconut Ice Cream':
    'https://images.pexels.com/photos/12310609/pexels-photo-12310609.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  // Rose/Pistachio/Tutti Frutti — share the mango photo until real shots are available
  'Rose Ice Cream':
    'https://images.pexels.com/photos/5060377/pexels-photo-5060377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Pistachio Ice Cream':
    'https://images.pexels.com/photos/5060377/pexels-photo-5060377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  'Tutti Frutti Ice Cream':
    'https://images.pexels.com/photos/5060377/pexels-photo-5060377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
}

async function main() {
  console.log('🖼️  Updating menu item images...\n')
  let updated = 0
  let missing = 0

  for (const [name, image] of Object.entries(imageMap)) {
    const result = await prisma.menuItem.updateMany({
      where: { name },
      data: { image },
    })
    if (result.count > 0) {
      console.log(`✅  ${name}`)
      updated++
    } else {
      console.log(`⚠️   Not found in DB: "${name}"`)
      missing++
    }
  }

  console.log(`\n🎉 Done — ${updated} updated, ${missing} not found.`)
  if (missing > 0) {
    console.log('    Check spelling vs. the actual item names in the database.')
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
