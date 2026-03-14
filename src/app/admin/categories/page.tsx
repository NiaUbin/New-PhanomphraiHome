"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Loader2 } from "lucide-react"
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
      console.log("Adding category:", newCategory.trim()) // Add log for debugging
      const result = await categoryService.create(newCategory.trim())
      console.log("Category added:", result)
      toast.success("เพิ่มหมวดหมู่สำเร็จ")
      setNewCategory("")
      fetchCategories()
    } catch (error) {
      console.error("Create error:", error)
      const errorMessage = error instanceof Error ? error.message : "ไม่ทราบสาเหตุ"
      toast.error(`เกิดข้อผิดพลาด: ${errorMessage}`)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณรแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้?")) return
    
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
              <TableHead>ลำดับ</TableHead>
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
                  <TableCell className="font-medium text-lg">{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      ลบ
                    </Button>
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
