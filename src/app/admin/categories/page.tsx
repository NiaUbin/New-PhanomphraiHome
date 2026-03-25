"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Loader2, Edit2, ArrowUp, ArrowDown, LayoutDashboard } from "lucide-react"
import { categoryService, Category } from "@/utils/portfolioService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const inputClass = "bg-white border border-border/40 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary/50 transition-all h-10"
  const sectionCardClass = "bg-white rounded-2xl border border-border/30 shadow-sm overflow-hidden"

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) { toast.error("กรุณากรอกชื่อหมวดหมู่"); return }
    try {
      setIsAdding(true)
      const maxPosition = categories.length > 0 ? Math.max(...categories.map(c => c.position)) : 0
      await categoryService.create(newCategory.trim(), maxPosition + 1)
      toast.success("เพิ่มหมวดหมู่สำเร็จ")
      setNewCategory("")
      fetchCategories()
    } catch (error) {
      console.error("Create error:", error)
      toast.error("เกิดข้อผิดพลาดในการสร้างหมวดหมู่")
    } finally { setIsAdding(false) }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    const currentList = [...categories]
    const current = currentList[index]
    const above = currentList[index - 1]
    const tempPos = current.position
    current.position = above.position
    above.position = tempPos
    try {
      await Promise.all([
        categoryService.updatePosition(current.id, current.position),
        categoryService.updatePosition(above.id, above.position)
      ])
      fetchCategories()
    } catch (error) { console.error(error); toast.error("ไม่สามารถเปลี่ยนลำดับได้") }
  }

  const handleMoveDown = async (index: number) => {
    if (index === categories.length - 1) return
    const currentList = [...categories]
    const current = currentList[index]
    const below = currentList[index + 1]
    const tempPos = current.position
    current.position = below.position
    below.position = tempPos
    try {
      await Promise.all([
        categoryService.updatePosition(current.id, current.position),
        categoryService.updatePosition(below.id, below.position)
      ])
      fetchCategories()
    } catch (error) { console.error(error); toast.error("ไม่สามารถเปลี่ยนลำดับได้") }
  }

  const handleStartEdit = (category: Category) => { setEditingId(category.id); setEditValue(category.name) }
  const handleCancelEdit = () => { setEditingId(null); setEditValue("") }

  const handleUpdate = async (id: string) => {
    if (!editValue.trim()) { toast.error("กรุณากรอกชื่อหมวดหมู่"); return }
    try {
      setIsUpdating(true)
      await categoryService.update(id, editValue.trim())
      toast.success("แก้ไขหมวดหมู่สำเร็จ")
      setEditingId(null)
      fetchCategories()
    } catch (error) { console.error(error); toast.error("เกิดข้อผิดพลาดในการแก้ไข") }
    finally { setIsUpdating(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้?")) return
    try {
      await categoryService.delete(id)
      toast.success("ลบหมวดหมู่สำเร็จ")
      fetchCategories()
    } catch (error) { console.error(error); toast.error("ไม่สามารถลบหมวดหมู่ได้") }
  }

  return (
    <div className="max-w-4xl space-y-6">

      {/* ─── Page Header ─── */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">จัดการหมวดหมู่</h2>
        <p className="text-sm text-muted-foreground mt-1">จัดการหมวดหมู่โครงการสำหรับผลงานของคุณ</p>
      </div>

      {/* ─── Add Category Card ─── */}
      <div className={sectionCardClass}>
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/20">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Plus className="size-4 text-primary" />
          </div>
          <h3 className="font-display font-bold text-sm tracking-wide">เพิ่มหมวดหมู่ใหม่</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleCreate} className="flex gap-3">
            <Input 
              placeholder="ชื่อหมวดหมู่ใหม่ เช่น บ้านเดี่ยว, อาคารพานิชย์" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className={`flex-1 ${inputClass}`}
            />
            <Button type="submit" disabled={isAdding || !newCategory.trim()} className="btn-primary h-10 px-6">
              {isAdding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4 mr-2" />}
              <span>เพิ่ม</span>
            </Button>
          </form>
        </div>
      </div>

      {/* ─── Categories Table ─── */}
      <div className={sectionCardClass}>
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/20">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <LayoutDashboard className="size-4 text-primary" />
          </div>
          <h3 className="font-display font-bold text-sm tracking-wide">รายการหมวดหมู่</h3>
          {!loading && (
            <span className="ml-auto text-xs text-muted-foreground">
              ทั้งหมด <strong className="text-primary">{categories.length}</strong> รายการ
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="size-7 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-muted/30">
              <LayoutDashboard className="size-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">ยังไม่มีข้อมูลหมวดหมู่</p>
          </div>
        ) : (
          <div className="divide-y divide-border/20">
            {categories.map((category, index) => (
              <div key={category.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/10 transition-colors group">
                
                {/* Order number */}
                <span className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                  {index + 1}
                </span>

                {/* Move buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button 
                    onClick={() => handleMoveUp(index)} disabled={index === 0}
                    className="p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button 
                    onClick={() => handleMoveDown(index)} disabled={index === categories.length - 1}
                    className="p-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  {editingId === category.id ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={`${inputClass} min-w-[200px]`}
                        autoFocus
                        onKeyDown={(e) => { if (e.key === 'Enter') handleUpdate(category.id) }}
                      />
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 h-9 px-4" onClick={() => handleUpdate(category.id)} disabled={isUpdating}>
                        {isUpdating ? <Loader2 className="size-4 animate-spin" /> : "บันทึก"}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-9 px-3" onClick={handleCancelEdit}>
                        ยกเลิก
                      </Button>
                    </div>
                  ) : (
                    <span className="font-medium text-foreground">{category.name}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    onClick={() => handleStartEdit(category)}
                  >
                    <Edit2 className="size-3.5" />
                    แก้ไข
                  </button>
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="size-3.5" />
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
