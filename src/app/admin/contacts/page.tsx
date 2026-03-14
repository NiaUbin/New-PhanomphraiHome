"use client"

import { useState, useEffect } from "react"
import { Trash2, Loader2, Mail, Phone, Calendar, MessageSquare, Briefcase, DollarSign, RefreshCw, Inbox } from "lucide-react"
import { contactService, Contact } from "@/utils/portfolioService"
import { toast } from "sonner"

const ORANGE = "#c9601a"

const formatDate = (dateString?: string) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

/* ── Contact card (mobile-first) ── */
const ContactCard: React.FC<{ contact: Contact; onDelete: (id: string) => void }> = ({ contact, onDelete }) => {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? ORANGE + "30" : "#e0d8ce"}`,
        boxShadow: hovered ? `0 6px 24px ${ORANGE}10` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(90deg,${ORANGE},#e8a060)` : "#f0ebe3" }} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

          {/* Left: contact info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold mb-2" style={{ color: "#2a2118" }}>{contact.name}</h3>

            <div className="flex flex-col gap-1.5 mb-4">
              <a href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 w-fit"
                style={{ color: ORANGE }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#b5541a" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ORANGE }}>
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {contact.phone}
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-150 w-fit truncate max-w-xs"
                  style={{ color: "#8a7a6a" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#2a2118" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8a7a6a" }}>
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {contact.email}
                </a>
              )}
            </div>

            {/* Type + Budget badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {contact.type && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${ORANGE}12`, color: ORANGE, border: `1px solid ${ORANGE}25` }}>
                  <Briefcase className="w-3 h-3" />
                  {contact.type}
                </span>
              )}
              {contact.budget && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "#f0ebe3", color: "#6b5b4b", border: "1px solid #ddd5c8" }}>
                  <DollarSign className="w-3 h-3" />
                  {contact.budget}
                </span>
              )}
            </div>

            {/* Details */}
            {contact.details && (
              <div>
                <p className="text-sm leading-relaxed"
                  style={{
                    color: "#6b5b4b",
                    display: "-webkit-box",
                    WebkitLineClamp: expanded ? "unset" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: expanded ? "visible" : "hidden",
                  }}>
                  {contact.details}
                </p>
                {contact.details.length > 120 && (
                  <button onClick={() => setExpanded(v => !v)}
                    className="text-xs font-semibold mt-1 transition-colors duration-150"
                    style={{ color: ORANGE }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#b5541a" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ORANGE }}>
                    {expanded ? "ย่อข้อความ" : "อ่านเพิ่มเติม"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: date + delete */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#b0a090" }}>
              <Calendar className="w-3 h-3" />
              {formatDate(contact.created_at)}
            </div>
            <button
              onClick={() => onDelete(contact.id!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{ color: "#8a7a6a", background: "transparent" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(220,38,38,0.08)"; el.style.color = "#dc2626" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#8a7a6a" }}
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
    <div className="max-w-4xl space-y-8" style={{ fontFamily: "'Sarabun','Noto Sans Thai',sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-[2px]" style={{ background: ORANGE }} />
            <p className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: ORANGE }}>
              ข้อมูลลูกค้า
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "#2a2118" }}>จัดการการติดต่อ</h2>
          <p className="text-sm" style={{ color: "#8a7a6a" }}>
            รายการข้อความจากผู้สนใจผ่านหน้าเว็บไซต์
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!loading && contacts.length > 0 && (
            <span className="text-sm" style={{ color: "#8a7a6a" }}>
              ทั้งหมด{" "}
              <span className="font-bold" style={{ color: ORANGE }}>{contacts.length}</span>{" "}
              รายการ
            </span>
          )}
          <button onClick={fetchContacts} disabled={loading}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
            style={{ background: "#fff", border: "1.5px solid #e0d8ce", color: "#8a7a6a" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=`${ORANGE}50`; el.style.color=ORANGE }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="#e0d8ce"; el.style.color="#8a7a6a" }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            รีเฟรช
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: ORANGE }} />
          <p className="text-sm" style={{ color: "#a89880" }}>กำลังโหลดข้อมูล...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl"
          style={{ background: "#fff", border: "1.5px solid #e0d8ce" }}>
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: "#f0ebe3" }}>
            <Inbox className="w-6 h-6" style={{ color: "#c4b4a0" }} />
          </div>
          <div className="text-center">
            <p className="font-semibold mb-1" style={{ color: "#6b5b4b" }}>ยังไม่มีข้อความติดต่อ</p>
            <p className="text-sm" style={{ color: "#a89880" }}>เมื่อมีคนสนใจส่งข้อมูลผ่านหน้าเว็บ รายการจะแสดงที่นี่</p>
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