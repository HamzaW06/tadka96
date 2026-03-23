import { prisma } from '@/lib/prisma'
import AdminContactsClient from '@/components/admin/AdminContactsClient'

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-1">Contact Submissions</h1>
        <p className="text-text-secondary">
          {contacts.filter((c) => !c.isRead).length} unread messages
        </p>
      </div>
      <AdminContactsClient initialContacts={contacts} />
    </div>
  )
}
