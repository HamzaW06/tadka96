import { prisma } from '@/lib/prisma'
import AdminMenuClient from '@/components/admin/AdminMenuClient'

export default async function AdminMenuPage() {
  const [categories, items] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.menuItem.findMany({
      orderBy: [{ categoryId: 'asc' }, { sortOrder: 'asc' }],
      include: { category: true },
    }),
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-1">Menu Management</h1>
        <p className="text-text-secondary">Add, edit, and manage your menu items and categories.</p>
      </div>
      <AdminMenuClient
        initialCategories={categories}
        initialItems={items as Parameters<typeof AdminMenuClient>[0]['initialItems']}
      />
    </div>
  )
}
