"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Loader2, Image as ImageIcon, Edit2, Trash2, ArrowLeft } from "lucide-react"
import { portfolioService, Project } from "@/utils/portfolioService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { PortfolioForm } from "@/components/admin/PortfolioForm"
import Image from "next/image"

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const sectionCardClass = "bg-white rounded-2xl border border-border/30 shadow-sm overflow-hidden"
  const inputClass = "bg-white border border-border/40 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary/50 transition-all h-10"

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

  useEffect(() => { fetchProjects() }, [])

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?")) return
    try {
      await portfolioService.delete(id)
      toast.success("ลบโครงการสำเร็จ")
      fetchProjects()
    } catch (error) {
      console.error(error)
      toast.error("ไม่สามารถลบผลงานได้")
    }
  }

  const handleCreateNew = () => {
    setEditingProject(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {isDialogOpen ? (
        /* ═══════ FORM VIEW ═══════ */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">
                {editingProject ? "แก้ไขผลงาน" : "เพิ่มผลงานใหม่"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {editingProject ? "แก้ไขข้อมูลโครงการที่เลือก" : "กรอกข้อมูลเพื่อเพิ่มผลงานใหม่ลงในระบบ"}
              </p>
            </div>
            <Button 
              onClick={() => setIsDialogOpen(false)} 
              variant="outline" 
              className="flex items-center gap-2 h-10 px-5 border-border/40"
            >
              <ArrowLeft className="size-4" />
              <span>กลับรายการ</span>
            </Button>
          </div>
          <PortfolioForm 
            initialData={editingProject || undefined} 
            onSuccess={() => {
              setIsDialogOpen(false)
              fetchProjects()
            }}
            onCancel={() => setIsDialogOpen(false)}
          />
        </div>
      ) : (
        /* ═══════ LIST VIEW ═══════ */
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">จัดการผลงาน</h2>
              <p className="text-sm text-muted-foreground mt-1">จัดการรายการผลงานและโครงการต่างๆ ของคุณ</p>
            </div>
            <Button onClick={handleCreateNew} className="btn-primary flex items-center gap-2 h-10 px-6">
              <Plus className="size-4" />
              <span>เพิ่มผลงานใหม่</span>
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <Input 
              placeholder="ค้นหาโครงการหรือหมวดหมู่..." 
              className={`${inputClass} pl-11`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Projects Grid / Table */}
          <div className={sectionCardClass}>
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/20">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <ImageIcon className="size-4 text-primary" />
              </div>
              <h3 className="font-display font-bold text-sm tracking-wide">รายการผลงาน</h3>
              {!loading && (
                <span className="ml-auto text-xs text-muted-foreground">
                  ทั้งหมด <strong className="text-primary">{filteredProjects.length}</strong> รายการ
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="size-7 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-muted/30">
                  <ImageIcon className="size-6 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground">ไม่พบข้อมูลผลงาน</p>
              </div>
            ) : (
              <div className="divide-y divide-border/15">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/10 transition-colors group">
                    
                    {/* Thumbnail */}
                    <div className="relative size-14 rounded-xl overflow-hidden bg-muted/30 shrink-0 border border-border/20">
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <ImageIcon className="size-5 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{project.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/8 text-primary text-[10px] font-semibold uppercase tracking-wide">
                          {project.category}
                        </span>
                        {project.area && (
                          <span className="text-xs text-muted-foreground">{project.area}</span>
                        )}
                        {project.price && (
                          <span className="text-xs text-muted-foreground">• {project.price}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit2 className="size-3.5" />
                        แก้ไข
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                        onClick={() => project.id && handleDelete(project.id)}
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
        </>
      )}
    </div>
  )
}
