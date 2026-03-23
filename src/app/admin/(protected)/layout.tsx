import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 md:pt-6">{children}</div>
      </main>
    </div>
  )
}
