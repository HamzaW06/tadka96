'use client'

import { useState } from 'react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date | string
}

interface AdminContactsClientProps {
  initialContacts: ContactSubmission[]
}

export default function AdminContactsClient({ initialContacts }: AdminContactsClientProps) {
  const [contacts, setContacts] = useState(initialContacts)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filtered = contacts.filter((c) => filter === 'all' || !c.isRead)

  const handleMarkRead = async (id: string, isRead: boolean) => {
    const res = await fetch(`/api/admin/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead }),
    })
    if (res.ok) {
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, isRead } : c)))
      if (selected?.id === id) setSelected((s) => s ? { ...s, isRead } : s)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setContacts((prev) => prev.filter((c) => c.id !== id))
      if (selected?.id === id) setSelected(null)
    }
  }

  const handleOpen = (contact: ContactSubmission) => {
    setSelected(contact)
    if (!contact.isRead) handleMarkRead(contact.id, true)
  }

  return (
    <div className="grid md:grid-cols-5 gap-4 h-[calc(100vh-12rem)]">
      {/* List */}
      <div className="md:col-span-2 bg-card-bg rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-white/10 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary'}`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === 'unread' ? 'bg-primary text-white' : 'bg-white/5 text-text-secondary'}`}
          >
            Unread ({contacts.filter((c) => !c.isRead).length})
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-text-secondary text-sm p-6">No messages.</p>
          ) : (
            filtered.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleOpen(contact)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/3 ${
                  selected?.id === contact.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${contact.isRead ? 'bg-white/20' : 'bg-accent'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start">
                      <p className={`text-sm font-medium truncate ${contact.isRead ? 'text-text-secondary' : 'text-text-primary'}`}>
                        {contact.name}
                      </p>
                      <span className="text-text-secondary/50 text-xs shrink-0 ml-2">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs truncate">{contact.subject}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="md:col-span-3 bg-card-bg rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            <p>Select a message to read</p>
          </div>
        ) : (
          <>
            <div className="p-5 border-b border-white/10">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-text-primary font-semibold">{selected.subject}</h3>
                  <p className="text-text-secondary text-sm">
                    From: {selected.name} &lt;{selected.email}&gt;
                  </p>
                  <p className="text-text-secondary/50 text-xs">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleMarkRead(selected.id, !selected.isRead)}
                    className="text-xs text-text-secondary hover:text-accent transition-colors"
                  >
                    {selected.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="text-xs text-accent hover:underline"
              >
                Reply via Email →
              </a>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap text-sm">
                {selected.message}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
