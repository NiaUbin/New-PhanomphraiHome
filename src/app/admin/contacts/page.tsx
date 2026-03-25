"use client"

import { useState, useEffect } from "react"
import { Trash2, Loader2, Mail, Phone, Calendar, Briefcase, DollarSign, RefreshCw, Inbox, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { contactService, Contact } from "@/utils/portfolioService"
import { toast } from "sonner"

const formatDate = (dateString?: string) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

/* ── Contact Card ── */
const ContactCard: React.FC<{ contact: Contact; onDelete: (id: string) => void }> = ({ contact, onDelete }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-border/30 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/15 transition-all duration-200 group">
      {/* Top accent bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent group-hover:from-primary/60 group-hover:via-primary/20 transition-all duration-300" />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

          {/* Left: contact info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground mb-2">{contact.name}</h3>

            <div className="flex flex-col gap-1.5 mb-4">
              <a href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-fit">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {contact.phone}
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit truncate max-w-xs">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {contact.email}
                </a>
              )}
            </div>

            {/* Type + Budget badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {contact.type && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/8 text-primary text-[11px] font-semibold border border-primary/10">
                  <Briefcase className="w-3 h-3" />
                  {contact.type}
                </span>
              )}
              {contact.budget && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/30 text-foreground/70 text-[11px] font-semibold border border-border/20">
                  <DollarSign className="w-3 h-3" />
                  {contact.budget}
                </span>
              )}
            </div>

            {/* Details */}
            {contact.details && (
              <div>
                <p className={`text-sm leading-relaxed text-muted-foreground ${!expanded ? "line-clamp-3" : ""}`}>
                  {contact.details}
                </p>
                {contact.details.length > 120 && (
                  <button onClick={() => setExpanded(v => !v)}
                    className="flex items-center gap-1 text-xs font-semibold mt-2 text-primary hover:text-primary/80 transition-colors">
                    {expanded ? <><ChevronUp className="size-3" />ย่อข้อความ</> : <><ChevronDown className="size-3" />อ่านเพิ่มเติม</>}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: date + delete */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              <Calendar className="w-3 h-3" />
              {formatDate(contact.created_at)}
            </div>
            <button
              onClick={() => onDelete(contact.id!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />ลบข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ── */
export default function ContactManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading]   = useState(true)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAll()
      setContacts(data)
    } catch {
      toast.error("ไม่สามารถโหลดข้อมูลการติดต่อได้")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลการติดต่อนี้?")) return
    try {
      await contactService.delete(id)
      toast.success("ลบข้อมูลสำเร็จ")
      fetchContacts()
    } catch {
      toast.error("ไม่สามารถลบข้อมูลได้")
    }
  }

  return (
    <div className="max-w-4xl space-y-6">

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">จัดการการติดต่อ</h2>
          <p className="text-sm text-muted-foreground mt-1">
            รายการข้อความจากผู้สนใจผ่านหน้าเว็บไซต์
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!loading && contacts.length > 0 && (
            <span className="text-xs text-muted-foreground">
              ทั้งหมด <strong className="text-primary">{contacts.length}</strong> รายการ
            </span>
          )}
          <button onClick={fetchContacts} disabled={loading}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 bg-white border border-border/40 text-muted-foreground hover:border-primary/30 hover:text-primary"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            รีเฟรช
          </button>
        </div>
      </div>

      {/* ─── Content ─── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/30 shadow-sm flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-muted/30">
            <Inbox className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground/70 mb-1">ยังไม่มีข้อความติดต่อ</p>
            <p className="text-sm text-muted-foreground">เมื่อมีคนสนใจส่งข้อมูลผ่านหน้าเว็บ รายการจะแสดงที่นี่</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map(c => (
            <ContactCard key={c.id} contact={c} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}