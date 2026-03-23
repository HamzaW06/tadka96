import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Items that are vegetarian
const vegetarianItems = [
  // All Is Veg
  'Paneer Tikka Masala', 'Bindi Masala', 'Palak Paneer', 'Butter Paneer',
  'Daal Tadka', 'Chili Paneer', 'Aloo Palak',
  // Tadka Twists
  'Paneer Tikka Wrap',
  // Tadka Bites
  '2Pcs Veg Samosa', '4Pcs Veg Rolls', 'Tadka Fries', 'Samosa Chaat',
  // Tadka Time
  '6Pcs Pani Puri',
  // Drinks
  'Water Bottle', 'Soda', 'Chai', 'Masala Chai', 'Mango Lassi', 'Sweet Lassi',
  // Desserts
  'Coconut Ice Cream', 'Mango Ice Cream', 'Rose Ice Cream', 'Pistachio Ice Cream',
  'Tutti Frutti Ice Cream', '3Pcs Gulab Jamun',
  // Add Ons
  'Naan', 'Garlic Naan', 'Papad', 'Rice', 'Fries', 'Paratha',
]

async function main() {
  await prisma.menuItem.updateMany({ data: { isVegetarian: false } })
  for (const name of vegetarianItems) {
    const r = await prisma.menuItem.updateMany({ where: { name }, data: { isVegetarian: true } })
    console.log(`${r.count > 0 ? '✅' : '⚠️ '} ${name}`)
  }
  console.log('\n🎉 Done')
}

main().then(() => prisma.$disconnect()).catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
