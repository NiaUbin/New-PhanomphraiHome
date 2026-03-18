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
}

export function PortfolioForm({ initialData, onSuccess }: PortfolioFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

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
  }, [initialData, form, defaultValues])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if (initialData?.id) {
        await portfolioService.update(initialData.id, values)
        toast.success("อัปเดตข้อมูลสำเร็จ")
      } else {
        await portfolioService.create(values as Project)
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รูปภาพหน้าปก</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value ? (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                      <Image 
                        src={field.value} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => field.onChange("")}
                        className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer relative">
                      <Upload className="size-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">คลิกเพื่ออัปโหลดรูปภาพ</p>
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                    </div>
                  )}
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
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

        {/* ข้อมูลพื้นฐาน */}
        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 space-y-6">
          <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-2 mb-4">
            <Info className="size-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">ข้อมูลพื้นฐาน</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Home className="size-3.5 text-muted-foreground" />
                    ชื่อโครงการ
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น บ้านเดี่ยว วงศ์สว่าง" className="bg-background" {...field} />
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
                  <FormLabel className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-muted-foreground" />
                    หมวดหมู่โครงการ
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <ImageIcon className="size-3.5 text-muted-foreground" />
                  คำอธิบายผลงาน
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="รายละเอียดโครงการที่ต้องการแสดง..." 
                    className="min-h-[100px] bg-background resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ข้อมูลรายละเอียดโครงการ */}
        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 space-y-6">
          <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-2 mb-4">
            <Ruler className="size-4" />
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">รายละเอียดโครงการ</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xs">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    สถานที่
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น กรุงเทพฯ" className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xs">
                    <Ruler className="size-3.5 text-muted-foreground" />
                    พื้นที่ใช้สอย
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น 320 ตร.ม." className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-xs">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    งบประมาณ / ราคา
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น 5.5 ล้านบาท" className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-2 border-t border-border/30">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Calendar className="size-3.5" />
                    ปีที่เสร็จ
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="2024" className="bg-background" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Clock className="size-3.5" />
                    ระยะเวลา
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="8 เดือน" className="bg-background" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedroom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Bed className="size-3.5" />
                    ห้องนอน
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="4" className="bg-background" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathroom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Bath className="size-3.5" />
                    ห้องน้ำ
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="3" className="bg-background" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="highlights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>จุดเด่นโครงการ (ทีละข้อ)</FormLabel>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="เช่น ระบบ Smart Home, สระว่ายน้ำส่วนตัว..." 
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addHighlight()
                      }
                    }}
                  />
                  <Button type="button" onClick={addHighlight} variant="outline" className="shrink-0">
                    <Plus className="size-4 mr-2" />
                    เพิ่มข้อความ
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {field.value?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border group animate-in slide-in-from-left-2 duration-200">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                  {(!field.value || field.value.length === 0) && (
                    <p className="text-xs text-muted-foreground italic text-center py-2">ยังไม่มีการระบุจุดเด่นโครงการ</p>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gallery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>แกลเลอรี่รูปภาพเพิ่มเติม</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {field.value?.map((url, index) => (
                      <div key={url + index} className="relative aspect-square rounded-lg overflow-hidden border group">
                        <Image 
                          src={url} 
                          alt={`Gallery ${index}`} 
                          fill 
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 p-1 bg-destructive/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                    <div className="relative aspect-square border-2 border-dashed rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                      <Upload className="size-6 text-muted-foreground mb-1" />
                      <span className="text-[10px] text-muted-foreground">เพิ่มรูป</span>
                      <input
                        type="file"
                        multiple
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleGalleryUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="submit" disabled={loading} className="btn-primary w-full md:w-auto">
            {loading && <Loader2 className="size-4 animate-spin mr-2" />}
            {initialData ? "อัปเดตการเปลี่ยนแปลง" : "บันทึกผลงาน"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
