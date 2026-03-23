import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
  await prisma.setting.deleteMany()
  await prisma.contactSubmission.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('Tadka96Admin!', 12)
  await prisma.user.create({
    data: {
      email: 'admin@tadka96.com',
      password: hashedPassword,
      name: 'Tadka 96 Admin',
    },
  })
  console.log('✅ Admin user created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Chicken Hit',
        slug: 'chicken-hit',
        note: 'All Entrees served with Rice and Naan. Add Aloo (Potato) for 2.96',
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'All Is Veg',
        slug: 'all-is-veg',
        note: 'All Entrees served with Rice and Naan. Substitute Garlic Naan for 1.00',
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Tadka Twists',
        slug: 'tadka-twists',
        note: 'All served with Fries',
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Tadka Bites',
        slug: 'tadka-bites',
        note: 'Appetizers — Perfect for sharing!',
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Tadka Time',
        slug: 'tadka-time',
        note: 'Friday–Sunday Only! Weekend Specials',
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Drinks',
        slug: 'drinks',
        note: null,
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        slug: 'desserts',
        note: 'Try Our Handmade Ice Cream!',
        sortOrder: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Add Ons',
        slug: 'add-ons',
        note: null,
        sortOrder: 8,
      },
    }),
  ])

  const [
    chickenHit,
    allIsVeg,
    tadkaTwists,
    tadkaBites,
    tadkaTime,
    drinks,
    desserts,
    addOns,
  ] = categories

  console.log('✅ Categories created')

  // Chicken Hit items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Chicken Tikka Masala',
        description: 'Boneless chicken simmered in a creamy, spiced tomato sauce. Rich, flavorful, and aromatic.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        name: 'Butter Chicken',
        description: 'Boneless chicken cooked in a creamy, buttery sauce with mild spices. Smooth and rich.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: true,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        name: 'Chicken Vindaloo',
        description: 'Spicy boneless chicken and potatoes cooked in a tangy, flavorful chili curry sauce.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: true,
        sortOrder: 3,
      },
      {
        name: 'Chicken Kadai',
        description: 'Chicken sautéed with bell peppers, onions, and bold spices in a kadai style curry.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 4,
      },
      {
        name: 'Chicken Palak',
        description: 'Boneless chicken cooked in spinach paste in mildly spiced, creamy curry.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 5,
      },
      {
        name: 'Chili Chicken',
        description: 'Chicken pan fried with onions, garlic, peppers, and sauce.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 6,
      },
      {
        name: 'Tawa Chicken',
        description: 'Boldly spiced chicken leg quarter, seared on the tawa for smoky, juicy flavor.',
        price: 19.96,
        categoryId: chickenHit.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 7,
      },
    ],
  })

  // All Is Veg items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Paneer Tikka Masala',
        description: 'Paneer cubes cooked in a creamy tomato-based sauce with bold, flavorful spices.',
        price: 17.96,
        categoryId: allIsVeg.id,
        isBestSeller: true,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        name: 'Bindi Masala',
        description: 'Cut okra cooked in onion and tomato sauces, dry with homemade spices.',
        price: 14.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        name: 'Palak Paneer',
        description: 'Paneer cubes simmered in a creamy spinach gravy with mild, aromatic spices.',
        price: 16.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 3,
      },
      {
        name: 'Butter Paneer',
        description: 'Paneer cubes in a creamy, buttery sauce with warm, aromatic Indian spices.',
        price: 17.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 4,
      },
      {
        name: 'Daal Tadka',
        description: 'Yellow lentil cooked with onion and tomato, tempered with smoky flavor.',
        price: 14.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 5,
      },
      {
        name: 'Chili Paneer',
        description: 'Paneer tossed with onions, bell peppers, and spicy Indo Chinese chili sauce.',
        price: 16.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 6,
      },
      {
        name: 'Aloo Palak',
        description: 'Potatoes and spinach cooked with house spices.',
        price: 14.96,
        categoryId: allIsVeg.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 7,
      },
    ],
  })

  // Tadka Twists items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Tadka Chicken Sandwich',
        description: 'Chicken tender with lettuce, and tadka sauce on a toasted bun.',
        price: 13.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        name: 'Chicken Tikka Philly',
        description: 'Chicken tikka with sautéed onions, bell peppers, and melted cheese on a toasted hoagie roll.',
        price: 15.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        name: 'Chicken Tikka Wrap',
        description: 'Chicken tikka wrapped in a flaky paratha with onions, bell peppers, and flavorful spices.',
        price: 14.96,
        categoryId: tadkaTwists.id,
        isBestSeller: true,
        isSpicy: false,
        sortOrder: 3,
      },
      {
        name: 'Paneer Tikka Wrap',
        description: 'Paneer tikka cubes wrapped in a flaky paratha with onions, bell peppers, and flavorful spices.',
        price: 14.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 4,
      },
      {
        name: 'Loaded Chicken Fries',
        description: 'Crispy fries and chicken fritters, topped with jalapeños, and signature sauce.',
        price: 15.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 5,
      },
      {
        name: '3pc Chicken Tenders',
        description: 'Three crispy, golden chicken tenders, perfectly seasoned.',
        price: 12.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 6,
      },
      {
        name: 'Cheese Burger',
        description: 'Cheeseburger with two beef patties, cheese, lettuce, tomato, onion, mustard, mayo, and ketchup on a toasted bun.',
        price: 15.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 7,
      },
      {
        name: 'Beef Philly Cheesesteak',
        description: 'Thinly sliced beef with melted cheese, sautéed onions, and peppers on a toasted hoagie roll.',
        price: 16.96,
        categoryId: tadkaTwists.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 8,
      },
    ],
  })

  // Tadka Bites items
  await prisma.menuItem.createMany({
    data: [
      {
        name: '2Pcs Veg Samosa',
        description: 'Crispy pastry filled with spiced potatoes and peas.',
        price: 5.96,
        categoryId: tadkaBites.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        name: '3Pcs Chicken Samosa',
        description: 'Crispy pastry filled with spiced minced chicken, deep fried to golden perfection.',
        price: 5.96,
        categoryId: tadkaBites.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        name: 'Samosa Chaat',
        description: 'Samosas topped with yogurt, chutneys and spices. Tangy, sweet, and crunchy.',
        price: 8.96,
        categoryId: tadkaBites.id,
        isBestSeller: true,
        isSpicy: false,
        sortOrder: 3,
      },
      {
        name: '4Pcs Veg Rolls',
        description: 'Golden fried rolls filled with seasoned vegetables, crispy outside, flavorful inside.',
        price: 5.96,
        categoryId: tadkaBites.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 4,
      },
      {
        name: '6Pcs Tadka Pops',
        description: 'Sweet, spicy, and savory bite sized chicken fritters, packed with bold flavor.',
        price: 10.96,
        categoryId: tadkaBites.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 5,
      },
      {
        name: 'Tadka Fries',
        description: 'Crispy fries tossed with bold house spices and a drizzle of sauce. Spicy and satisfying.',
        price: 6.96,
        categoryId: tadkaBites.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 6,
      },
    ],
  })

  // Tadka Time (Weekend Specials)
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Chicken Biryani',
        description: 'Weekend special chicken biryani — fragrant basmati rice layered with spiced chicken.',
        price: 19.96,
        categoryId: tadkaTime.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        name: 'Goat Biryani',
        description: 'Weekend special goat biryani — slow-cooked goat with aromatic basmati rice.',
        price: 21.96,
        categoryId: tadkaTime.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        name: '6Pcs Pani Puri',
        description: 'Weekend special pani puri — crispy hollow shells filled with spiced water and chutneys.',
        price: 6.96,
        categoryId: tadkaTime.id,
        isBestSeller: false,
        isSpicy: false,
        sortOrder: 3,
      },
      {
        name: 'Goat Vindaloo',
        description: 'Weekend special goat vindaloo — tender goat in a bold, tangy chili curry sauce.',
        price: 20.96,
        categoryId: tadkaTime.id,
        isBestSeller: false,
        isSpicy: true,
        sortOrder: 4,
      },
    ],
  })

  // Drinks
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Water Bottle',
        description: 'Bottled water',
        price: 1.96,
        categoryId: drinks.id,
        sortOrder: 1,
      },
      {
        name: 'Soda',
        description: 'Fountain soda',
        price: 2.96,
        categoryId: drinks.id,
        sortOrder: 2,
      },
      {
        name: 'Chai',
        description: 'Traditional Indian tea',
        price: 2.96,
        categoryId: drinks.id,
        sortOrder: 3,
      },
      {
        name: 'Masala Chai',
        description: 'Spiced masala tea',
        price: 4.96,
        categoryId: drinks.id,
        sortOrder: 4,
      },
      {
        name: 'Mango Lassi',
        description: 'Sweet mango yogurt drink',
        price: 5.96,
        categoryId: drinks.id,
        isBestSeller: false,
        sortOrder: 5,
      },
      {
        name: 'Sweet Lassi',
        description: 'Traditional sweet yogurt drink',
        price: 3.96,
        categoryId: drinks.id,
        sortOrder: 6,
      },
    ],
  })

  // Desserts
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Coconut Ice Cream',
        description: 'Handmade coconut ice cream',
        price: 3.96,
        priceSmall: 3.96,
        priceLarge: 5.96,
        categoryId: desserts.id,
        sortOrder: 1,
      },
      {
        name: 'Mango Ice Cream',
        description: 'Handmade mango ice cream',
        price: 3.96,
        priceSmall: 3.96,
        priceLarge: 5.96,
        categoryId: desserts.id,
        sortOrder: 2,
      },
      {
        name: 'Rose Ice Cream',
        description: 'Handmade rose ice cream',
        price: 3.96,
        priceSmall: 3.96,
        priceLarge: 5.96,
        categoryId: desserts.id,
        sortOrder: 3,
      },
      {
        name: 'Pistachio Ice Cream',
        description: 'Handmade pistachio ice cream',
        price: 3.96,
        priceSmall: 3.96,
        priceLarge: 5.96,
        categoryId: desserts.id,
        sortOrder: 4,
      },
      {
        name: 'Tutti Frutti Ice Cream',
        description: 'Handmade tutti frutti ice cream',
        price: 3.96,
        priceSmall: 3.96,
        priceLarge: 5.96,
        categoryId: desserts.id,
        sortOrder: 5,
      },
      {
        name: '3Pcs Gulab Jamun',
        description: 'Classic Indian dessert — soft milk dumplings soaked in rose-scented sugar syrup.',
        price: 4.96,
        categoryId: desserts.id,
        sortOrder: 6,
      },
    ],
  })

  // Add Ons
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Naan',
        description: 'Soft, freshly baked naan bread',
        price: 2.96,
        categoryId: addOns.id,
        sortOrder: 1,
      },
      {
        name: 'Garlic Naan',
        description: 'Naan topped with garlic and butter',
        price: 3.96,
        categoryId: addOns.id,
        sortOrder: 2,
      },
      {
        name: 'Papad',
        description: 'Crispy thin lentil wafer',
        price: 1.96,
        categoryId: addOns.id,
        sortOrder: 3,
      },
      {
        name: 'Rice',
        description: 'Steamed basmati rice',
        price: 1.96,
        categoryId: addOns.id,
        sortOrder: 4,
      },
      {
        name: 'Fries',
        description: 'Crispy golden fries',
        price: 3.96,
        categoryId: addOns.id,
        sortOrder: 5,
      },
      {
        name: 'Paratha',
        description: 'Flaky whole wheat flatbread',
        price: 2.96,
        categoryId: addOns.id,
        sortOrder: 6,
      },
    ],
  })

  console.log('✅ Menu items created')

  // Create default settings
  const settings = [
    { key: 'restaurant_name', value: 'Tadka 96 — Indian Fusion Restaurant' },
    { key: 'address', value: '3003-A E League City Pkwy, League City, TX 77573' },
    { key: 'phone', value: '(281) 339-7449' },
    { key: 'email', value: 'official.tadka96@gmail.com' },
    { key: 'instagram', value: 'https://instagram.com/official.tadka96' },
    { key: 'facebook', value: 'https://facebook.com/official.tadka96' },
    { key: 'instagram_handle', value: '@official.tadka96' },
    { key: 'facebook_handle', value: '@official.tadka96' },
    {
      key: 'hours',
      value: JSON.stringify({
        monday: { open: false, openTime: '', closeTime: '' },
        tuesday: { open: true, openTime: '12:15', closeTime: '20:00' },
        wednesday: { open: true, openTime: '12:15', closeTime: '20:00' },
        thursday: { open: true, openTime: '12:15', closeTime: '20:00' },
        friday: { open: true, openTime: '12:15', closeTime: '20:00' },
        saturday: { open: true, openTime: '12:15', closeTime: '20:00' },
        sunday: { open: true, openTime: '12:15', closeTime: '20:00' },
      }),
    },
    { key: 'hours_display', value: 'Tuesday–Sunday: 12:15 PM – 8:00 PM | Monday: CLOSED' },
    { key: 'tagline_main', value: 'Without Tadka, the Flavor\'s Not Over Yet!' },
    { key: 'tagline_hindi', value: 'Taste Abhi Baaki Hai, Tadka Ke Saath!' },
    { key: 'tagline_short', value: 'Where Flavor and Heart Meet' },
    {
      key: 'about_text',
      value: 'Founded by a Mother-Son Duo, Tadka 96 is a culinary haven born from the dreams of a beloved community member and her late husband. Tadka 96 embodies the fusion of Mom\'s culinary expertise and heartfelt dedication. Where Flavor and Heart Meet.',
    },
    { key: 'halal_certified', value: 'true' },
    { key: 'catering_available', value: 'true' },
    {
      key: 'catering_text',
      value: 'Make Your Party Unforgettable, Ask About Our Catering!',
    },
    {
      key: 'gratuity_note',
      value: 'A 10% gratuity will be added to parties of 4 or more.',
    },
    { key: 'spice_levels', value: JSON.stringify(['Mild', 'Medium', 'Spicy']) },
    { key: 'google_maps_url', value: 'https://maps.google.com/?q=3003-A+E+League+City+Pkwy,+League+City,+TX+77573' },
    { key: 'doordash_url', value: 'https://www.doordash.com/store/tadka-96-league-city-24517361/' },
    { key: 'ubereats_url', value: 'https://www.ubereats.com/store/tadka-96/search' },
    { key: 'timezone', value: 'America/Chicago' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Settings created')
  console.log('')
  console.log('🎉 Database seeded successfully!')
  console.log('')
  console.log('📧 Admin Login:')
  console.log('   Email:    admin@tadka96.com')
  console.log('   Password: Tadka96Admin!')
  console.log('')
  console.log('⚠️  IMPORTANT: Change the admin password immediately after first login!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
