"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Loader2, Edit2, Check, X } from "lucide-react"
import { categoryService, Category } from "@/utils/portfolioService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  
  // States for editing
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

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

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newCategory.trim()) {
      toast.error("กรุณากรอกชื่อหมวดหมู่")
      return
    }

    try {
      setIsAdding(true)
      await categoryService.create(newCategory.trim())
      toast.success("เพิ่มหมวดหมู่สำเร็จ")
      setNewCategory("")
      fetchCategories()
    } catch (error) {
      console.error("Create error:", error)
      toast.error("เกิดข้อผิดพลาดในการสร้างโหมดหมู่")
    } finally {
      setIsAdding(false)
    }
  }

  const handleStartEdit = (category: Category) => {
    setEditingId(category.id)
    setEditValue(category.name)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleUpdate = async (id: string) => {
    if (!editValue.trim()) {
      toast.error("กรุณากรอกชื่อหมวดหมู่")
      return
    }

    try {
      setIsUpdating(true)
      await categoryService.update(id, editValue.trim())
      toast.success("แก้ไขหมวดหมู่สำเร็จ")
      setEditingId(null)
      fetchCategories()
    } catch (error) {
      console.error(error)
      toast.error("เกิดข้อผิดพลาดในการแก้ไข")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้?")) return
    
    try {
      await categoryService.delete(id)
      toast.success("ลบหมวดหมู่สำเร็จ")
      fetchCategories()
    } catch (error) {
      console.error(error)
      toast.error("ไม่สามารถลบหมวดหมู่ได้")
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-foreground">จัดการหมวดหมู่</h2>
        <p className="text-muted-foreground">จัดการหมวดหมู่บ้านสำหรับผลงานของคุณ</p>
      </div>

      <div className="bg-card p-6 rounded-xl border-2 border-primary/10 shadow-sm">
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input 
            placeholder="ชื่อหมวดหมู่ใหม่ เช่น บ้านเดี่ยว, อาคารพานิชย์" 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isAdding || !newCategory.trim()} className="btn-primary">
            {isAdding ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4 mr-2" />}
            เพิ่มหมวดหมู่
          </Button>
        </form>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-20">ลำดับ</TableHead>
              <TableHead>ชื่อหมวดหมู่</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-32 text-center">
                  <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                  ไม่พบข้อมูลหมวดหมู่
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                  <TableCell>
                    {editingId === category.id ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-9 min-w-[200px]"
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-primary hover:bg-primary/10"
                          onClick={() => handleUpdate(category.id)}
                          disabled={isUpdating}
                        >
                          {isUpdating ? <Loader2 className="size-4 animate-spin" /> : "บันทึก"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCancelEdit}
                        >
                          ยกเลิก
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium text-lg">{category.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleStartEdit(category)}
                      >
                        <Edit2 className="size-4 mr-2" />
                        แก้ไข
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="size-4 mr-2" />
                        ลบ
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


