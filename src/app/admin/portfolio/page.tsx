"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Loader2 } from "lucide-react"
import { portfolioService, Project } from "@/utils/portfolioService"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { PortfolioForm } from "@/components/admin/PortfolioForm"
import Image from "next/image"

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await portfolioService.getAll()
      setProjects(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    try {
      await portfolioService.delete(id)
      toast.success("Project deleted successfully")
      fetchProjects()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete project")
    }
  }

  const handleCreateNew = () => {
    setEditingProject(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">จัดการผลงาน</h2>
          <p className="text-muted-foreground">Manage your portfolio items and showcase your work.</p>
        </div>
        <Button onClick={handleCreateNew} className="btn-primary flex items-center gap-2">
          <Plus className="size-4" />
          <span>เพิ่มผลงานใหม่</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-card p-4 rounded-lg border">
        <Search className="size-4 text-muted-foreground" />
        <Input 
          placeholder="ค้นหาโครงการหรือหมวดหมู่..." 
          className="border-none bg-transparent focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">รูปภาพ</TableHead>
              <TableHead>ชื่อโครงการ</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>พื้นที่</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <Loader2 className="size-8 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  ไม่พบข้อมูลผลงาน
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="relative size-12 rounded-md overflow-hidden bg-muted">
                      {project.image_url && (
                        <Image 
                          src={project.image_url} 
                          alt={project.title} 
                          fill 
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase font-medium">
                      {project.category}
                    </span>
                  </TableCell>
                  <TableCell>{project.area}</TableCell>
                  <TableCell>{project.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                      แก้ไข
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => project.id && handleDelete(project.id)}>
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingProject ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}
            </DialogTitle>
          </DialogHeader>
          <PortfolioForm 
            initialData={editingProject || undefined} 
            onSuccess={() => {
              setIsDialogOpen(false)
              fetchProjects()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
