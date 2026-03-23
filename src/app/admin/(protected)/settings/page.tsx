import { prisma } from '@/lib/prisma'
import AdminSettingsClient from '@/components/admin/AdminSettingsClient'

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-1">Settings</h1>
        <p className="text-text-secondary">Manage restaurant information, hours, and content.</p>
      </div>
      <AdminSettingsClient initialSettings={settingsMap} />
    </div>
  )
}
