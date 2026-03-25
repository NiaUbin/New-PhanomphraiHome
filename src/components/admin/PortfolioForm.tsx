"use client"

import { useState, useMemo, useEffect, ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Upload, X, Plus, Info, Home, Ruler, MapPin, DollarSign, Calendar, Clock, Bed, Bath, Sparkles, Image as ImageIcon } from "lucide-react"
import { portfolioService, Project, categoryService, Category } from "@/utils/portfolioService"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import Image from "next/image"

const formSchema = z.object({
  title: z.string().min(2, "ชื่อโครงการต้องมีอย่างน้อย 2 ตัวอักษร"),
  description: z.string().min(10, "คำอธิบายต้องมีอย่างน้อย 10 ตัวอักษร"),
  category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
  area: z.string().optional(),
  price: z.string().optional(),
  image_url: z.string().min(1, "กรุณาอัปโหลดรูปภาพ"),
  slug: z.string().optional(),
  location: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  year: z.string().optional(),
  duration: z.string().optional(),
  bedroom: z.string().optional(),
  bathroom: z.string().optional(),
})

interface PortfolioFormProps {
  initialData?: Project
  onSuccess: () => void
  onCancel?: () => void
}

export function PortfolioForm({ initialData, onSuccess, onCancel }: PortfolioFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isSlugEdited, setIsSlugEdited] = useState(false)

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\s-]/g, '') // Keep Thai, English, Numbers
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-'); // Replace multiple - with single -
  }

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await categoryService.getAll()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCats()
  }, [])

  const defaultValues = useMemo(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    area: initialData?.area || "",
    price: initialData?.price || "",
    image_url: initialData?.image_url || "",
    slug: initialData?.slug || "",
    location: initialData?.location || "",
    gallery: initialData?.gallery || [],
    highlights: initialData?.highlights || [],
    year: initialData?.year || "",
    duration: initialData?.duration || "",
    bedroom: initialData?.bedroom || "",
    bathroom: initialData?.bathroom || "",
  }), [initialData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Update form when initialData changes (e.g. when opening a different project to edit)
  useEffect(() => {
    form.reset(defaultValues)
    setIsSlugEdited(!!initialData?.slug)
  }, [initialData, form, defaultValues])

  // Watch title for auto-slug
  const watchTitle = form.watch("title")
  useEffect(() => {
    if (!isSlugEdited && watchTitle && !initialData?.id) {
      form.setValue("slug", slugify(watchTitle))
    }
  }, [watchTitle, isSlugEdited, form, initialData])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      
      // Ensure slug exists
      const finalValues = {
        ...values,
        slug: values.slug || slugify(values.title || "")
      }

      if (initialData?.id) {
        await portfolioService.update(initialData.id, finalValues)
        toast.success("อัปเดตข้อมูลสำเร็จ")
      } else {
        await portfolioService.create(finalValues as Project)
        toast.success("บันทึกข้อมูลสำเร็จ")
      }
      onSuccess()
    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการบันทึกข้อมูล"
      toast.error(`ไม่สามารถบันทึกได้: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await portfolioService.uploadImage(file)
      form.setValue("image_url", url)
      toast.success("อัปโหลดรูปภาพสำเร็จ")
    } catch (error) {
      console.error(error)
      toast.error("อัปโหลดรูปภาพไม่สำเร็จ")
    } finally {
      setUploading(false)
    }
  }

  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      const currentGallery = form.getValues("gallery") || []
      const uploadPromises = Array.from(files).map(file => portfolioService.uploadImage(file))
      const newUrls = await Promise.all(uploadPromises)
      
      form.setValue("gallery", [...currentGallery, ...newUrls])
      toast.success(`อัปโหลดรูปภาพ ${newUrls.length} รูปสำเร็จ`)
    } catch (error) {
      console.error(error)
      toast.error("อัปโหลดรูปภาพบางส่วนไม่สำเร็จ")
    } finally {
      setUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    const currentGallery = form.getValues("gallery") || []
    const newGallery = currentGallery.filter((_, i) => i !== index)
    form.setValue("gallery", newGallery)
  }

  const [highlightInput, setHighlightInput] = useState("")

  const addHighlight = () => {
    if (!highlightInput.trim()) return
    const current = form.getValues("highlights") || []
    form.setValue("highlights", [...current, highlightInput.trim()])
    setHighlightInput("")
  }

  const removeHighlight = (index: number) => {
    const current = form.getValues("highlights") || []
    form.setValue("highlights", current.filter((_, i) => i !== index))
  }

  // Shared input class for consistency
  const inputClass = "bg-white border border-border/40 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary/50 focus:bg-white transition-all h-10"
  const textareaClass = "bg-white border border-border/40 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30 focus:border-primary/50 focus:bg-white transition-all resize-none"
  const sectionCardClass = "bg-white rounded-2xl border border-border/30 shadow-sm overflow-hidden"
  const sectionHeaderClass = "flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/20"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  MAIN 2-COLUMN LAYOUT                                  */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ─── LEFT COLUMN: Cover Image (sticky) ─── */}
          <div className="lg:col-span-4">
            <div className={`${sectionCardClass} lg:sticky lg:top-6`}>
              <div className={sectionHeaderClass}>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <ImageIcon className="size-4 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm tracking-wide">รูปภาพหน้าปก</h3>
              </div>
              <div className="p-5">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          {field.value ? (
                            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border/20 shadow-md group">
                              <Image
                                src={field.value}
                                alt="Preview"
                                fill
                                className="object-cover transition-transform group-hover:scale-[1.03] duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <button
                                type="button"
                                onClick={() => field.onChange("")}
                                className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                              >
                                <X className="size-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-xl py-12 px-6 bg-muted/20 hover:bg-muted/30 hover:border-primary/30 transition-all cursor-pointer group min-h-[260px]">
                              <div className="bg-primary/8 p-4 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-primary/12 transition-all">
                                <Upload className="size-7 text-primary/70" />
                              </div>
                              <p className="text-sm font-medium text-foreground/70 mb-1">คลิกเพื่ออัปโหลดรูปภาพ</p>
                              <p className="text-[11px] text-muted-foreground">PNG, JPG หรือ WEBP (สูงสุด 5MB)</p>
                              <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileUpload}
                                accept="image/*"
                              />
                            </div>
                          )}
                          {uploading && (
                            <div className="flex justify-center items-center gap-2 text-sm text-primary animate-pulse py-3 bg-primary/5 rounded-lg">
                              <Loader2 className="size-4 animate-spin" />
                              กำลังอัปโหลด...
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: All Form Sections ─── */}
          <div className="lg:col-span-8 space-y-6">

            {/* ──────────── SECTION 1: ข้อมูลพื้นฐาน ──────────── */}
            <div className={sectionCardClass}>
              <div className={sectionHeaderClass}>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Info className="size-4 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm tracking-wide">ข้อมูลพื้นฐาน</h3>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                          <Home className="size-3.5 text-primary/60" />
                          ชื่อโครงการ
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="เช่น บ้านเดี่ยว วงศ์สว่าง" className={inputClass} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                          <Sparkles className="size-3.5 text-primary/60" />
                          หมวดหมู่โครงการ
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={inputClass}>
                              <SelectValue placeholder="เลือกหมวดหมู่" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        <Sparkles className="size-3.5 text-primary/60" />
                        Slug ID ผลงาน
                        <span className="text-[10px] font-normal text-muted-foreground">(สำหรับ URL โครงการ)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="เช่น baan-song-chan หรือ บ้านสองชั้นริมหาด"
                          className={inputClass}
                          {...field}
                          onChange={(e) => { field.onChange(e); setIsSlugEdited(true) }}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        * ลิงก์หน้าผลงาน: phanomphrai.com/project/<strong className="text-primary">{field.value || "slug-name"}</strong>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        <ImageIcon className="size-3.5 text-primary/60" />
                        คำอธิบายผลงาน
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="รายละเอียดโครงการที่ต้องการแสดง..."
                          className={`min-h-[100px] ${textareaClass}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ──────────── SECTION 2: รายละเอียดโครงการ ──────────── */}
            <div className={sectionCardClass}>
              <div className={sectionHeaderClass}>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Ruler className="size-4 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm tracking-wide">รายละเอียดโครงการ</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <Ruler className="size-3 text-primary/50" />
                          พื้นที่ใช้สอย
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="320 ตร.ม." className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bedroom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <Bed className="size-3 text-primary/50" />
                          ห้องนอน
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="3 ห้อง" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathroom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <Bath className="size-3 text-primary/50" />
                          ห้องน้ำ
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="2 ห้อง" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <MapPin className="size-3 text-primary/50" />
                          สถานที่
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="กรุงเทพฯ" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <Calendar className="size-3 text-primary/50" />
                          ปีที่เสร็จ
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="2569" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <Clock className="size-3 text-primary/50" />
                          ระยะเวลา
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="6 เดือน" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* ราคา/งบประมาณ - แยกแถวออกมาให้ชัดเจน */}
                <div className="mt-4 pt-4 border-t border-border/15">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="max-w-sm">
                        <FormLabel className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground/70">
                          <DollarSign className="size-3 text-primary/50" />
                          งบประมาณ / ราคา
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="เช่น 5.5 ล้านบาท" className={inputClass} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>


            {/* ──────────── SECTION 3: จุดเด่น & แกลเลอรี่ ──────────── */}
            <div className={sectionCardClass}>
              <div className={sectionHeaderClass}>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Sparkles className="size-4 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm tracking-wide">จุดเด่น & แกลเลอรี่</h3>
              </div>
              <div className="p-6 space-y-6">

                {/* Highlights */}
                <FormField
                  control={form.control}
                  name="highlights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        จุดเด่นโครงการ (ทีละข้อ)
                      </FormLabel>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="เช่น ระบบ Smart Home, สระว่ายน้ำส่วนตัว..."
                            className={inputClass}
                            value={highlightInput}
                            onChange={(e) => setHighlightInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHighlight() } }}
                          />
                          <Button type="button" onClick={addHighlight} variant="outline" size="sm" className="shrink-0 h-10 px-4 gap-1.5">
                            <Plus className="size-4" />
                            เพิ่ม
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {field.value?.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border border-border/20 group animate-in slide-in-from-left-2 duration-200">
                              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                                {index + 1}
                              </span>
                              <span className="flex-1 text-sm">{item}</span>
                              <button type="button" onClick={() => removeHighlight(index)} className="p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-md transition-colors opacity-0 group-hover:opacity-100">
                                <X className="size-3.5" />
                              </button>
                            </div>
                          ))}
                          {(!field.value || field.value.length === 0) && (
                            <div className="text-center py-4 text-xs text-muted-foreground bg-muted/15 rounded-lg border border-dashed border-border/20">
                              ยังไม่มีการระบุจุดเด่นโครงการ
                            </div>
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border/20" />

                {/* Gallery */}
                <FormField
                  control={form.control}
                  name="gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        แกลเลอรี่รูปภาพเพิ่มเติม
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {field.value?.map((url, index) => (
                            <div key={url + index} className="relative aspect-square rounded-xl overflow-hidden border border-border/20 shadow-sm group">
                              <Image src={url} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ))}
                          <div className="relative aspect-square border-2 border-dashed border-border/30 rounded-xl bg-muted/15 hover:bg-muted/25 hover:border-primary/30 transition-all flex flex-col items-center justify-center cursor-pointer group">
                            <div className="bg-primary/5 p-3 rounded-full mb-2 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                              <Upload className="size-5 text-primary/60" />
                            </div>
                            <span className="text-[11px] text-muted-foreground font-medium group-hover:text-primary/80 transition-colors">เพิ่มรูปภาพ</span>
                            <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleGalleryUpload} accept="image/*" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  ACTION BAR                                            */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between gap-4 pt-6 mt-2 border-t border-border/30">
          <p className="text-xs text-muted-foreground hidden sm:block">
            กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน
          </p>
          <div className="flex gap-3 ml-auto">
            <Button type="button" variant="outline" onClick={() => onCancel ? onCancel() : window.history.back()} className="px-6 h-10">
              ยกเลิก
            </Button>
            <Button type="submit" disabled={loading} className="btn-primary px-8 h-10">
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}
              <span>{initialData ? "อัปเดตข้อมูล" : "สร้างผลงาน"}</span>
            </Button>
          </div>
        </div>

      </form>
    </Form>
  )
}
