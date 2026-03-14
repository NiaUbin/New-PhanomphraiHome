"use client"

import { useState, useMemo, useEffect, ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Upload, X } from "lucide-react"
import { portfolioService, Project } from "@/utils/portfolioService"
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
  area: z.string().min(1, "กรุณาระบุพื้นที่"),
  price: z.string().min(1, "กรุณาระบุราคา"),
  img: z.string().min(1, "กรุณาอัปโหลดรูปภาพ"),
  location: z.string().optional(),
})

interface PortfolioFormProps {
  initialData?: Project
  onSuccess: () => void
}

export function PortfolioForm({ initialData, onSuccess }: PortfolioFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const defaultValues = useMemo(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    area: initialData?.area || "",
    price: initialData?.price || "",
    img: initialData?.img || "",
    location: initialData?.location || "",
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
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล")
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
      form.setValue("img", url)
      toast.success("อัปโหลดรูปภาพสำเร็จ")
    } catch (error) {
      console.error(error)
      toast.error("อัปโหลดรูปภาพไม่สำเร็จ")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="img"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อโครงการ / รูปภาพ</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อโครงการ..." {...field} />
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
                <FormLabel>หมวดหมู่บ้าน</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="บ้านใหม่">บ้านใหม่</SelectItem>
                    <SelectItem value="ต่อเติม">ต่อเติม</SelectItem>
                    <SelectItem value="รีโนเวท">รีโนเวท</SelectItem>
                    <SelectItem value="คอนโด">คอนโด</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>พื้นที่ (ตร.ม.)</FormLabel>
                <FormControl>
                  <Input placeholder="เช่น 320 ตร.ม." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สถานที่ / จังหวัด</FormLabel>
                <FormControl>
                  <Input placeholder="เช่น กรุงเทพฯ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input placeholder="เช่น 5,000,000 บาท" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>คำอธิบายผลงาน</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="รายละเอียดโครงการ..." 
                  className="min-h-[120px]" 
                  {...field} 
                />
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
