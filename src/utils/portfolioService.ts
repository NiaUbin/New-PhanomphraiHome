import { supabase } from './supabase'

export interface Project {
  id?: string
  title: string
  description: string
  category: string
  area: string
  price: string
  image_url: string // เปลี่ยนจาก img เป็น image_url ตามที่คุณต้องการ
  location?: string
  tag?: string;
  year?: string;
  duration?: string;
  highlights?: string[]
  gallery?: string[]
  bedroom?: string;
  bathroom?: string;
  created_at?: string
}

export const portfolioService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Project[]
  },

  async create(project: Project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
    
    if (error) throw error
    return data[0] as Project
  },

  async update(id: string, project: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Project
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('project-images') // เปลี่ยนชื่อ Bucket ตามที่คุณต้องการ
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath)

  return data.publicUrl
  }
}

export interface Category {
  id: string
  name: string
  created_at?: string
}

export const categoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data as Category[]
  },

  async create(name: string) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select()
    
    if (error) throw error
    return data[0] as Category
  },

  async update(id: string, name: string) {
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Category
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

export interface Contact {
  id?: string
  name: string
  phone: string
  email: string
  type: string
  budget: string
  details: string
  created_at?: string
}

export const contactService = {
  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Contact[]
  },

  async create(contact: Contact) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
    
    if (error) throw error
    return data[0] as Contact
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
