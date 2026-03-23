import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const [totalItems, activeItems, categories, unreadContacts] = await Promise.all([
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { isAvailable: true } }),
    prisma.category.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
  ])

  const recentContacts = await prisma.contactSubmission.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const stats = [
    {
      label: 'Total Menu Items',
      value: totalItems,
      icon: '🍽️',
      href: '/admin/menu',
      color: 'from-primary/20 to-primary/5',
    },
    {
      label: 'Active Items',
      value: activeItems,
      icon: '✅',
      href: '/admin/menu',
      color: 'from-green-900/30 to-green-900/10',
    },
    {
      label: 'Categories',
      value: categories,
      icon: '📂',
      href: '/admin/menu',
      color: 'from-secondary/20 to-secondary/5',
    },
    {
      label: 'Unread Messages',
      value: unreadContacts,
      icon: '📧',
      href: '/admin/contacts',
      color: unreadContacts > 0 ? 'from-accent/20 to-accent/5' : 'from-white/5 to-white/0',
    },
  ]

  const quickActions = [
    { href: '/admin/menu', label: 'Add Menu Item', icon: '➕' },
    { href: '/admin/settings', label: 'Edit Settings', icon: '⚙️' },
    { href: '/admin/contacts', label: 'View Messages', icon: '📨' },
    { href: '/menu', label: 'View Public Menu', icon: '👀' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-1">Dashboard</h1>
        <p className="text-text-secondary">Welcome back to Tadka 96 Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors`}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-text-secondary text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
          <h2 className="font-heading text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 bg-dark-bg hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-3 py-3 text-sm text-text-secondary hover:text-text-primary transition-all"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-card-bg rounded-2xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-text-primary">Recent Messages</h2>
            <Link href="/admin/contacts" className="text-accent text-sm hover:underline">
              View all
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-text-secondary text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-2">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      contact.isRead ? 'bg-white/20' : 'bg-accent'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-text-secondary text-xs truncate">{contact.subject}</p>
                    <p className="text-text-secondary/50 text-xs">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
