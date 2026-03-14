"use client"

import * as React from "react"
import { LayoutDashboard, Image, Settings, Home, LogOut, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import { supabase } from "@/utils/supabase"

const items = [
  {
    title: "จัดการผลงาน",
    url: "/admin/portfolio",
    icon: Image,
  },
  {
    title: "จัดการหมวดหมู่",
    url: "/admin/categories",
    icon: LayoutDashboard,
  },
  {
    title: "จัดการการติดต่อ",
    url: "/admin/contacts",
    icon: MessageSquare,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // ใช้ window.location.href เพื่อล้าง state ทั้งหมดและกลับไปหน้า login ทันที
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error signing out:", error);
      // ถ้า error ก็ให้ force ไปหน้า login อยู่ดี
      window.location.href = "/admin/login";
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-16 flex items-center px-4">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
          <div className="size-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            P
          </div>
          <span className="group-data-[collapsible=icon]:hidden">PHANOMPHRAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive/90 transition-colors">
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden">ออกจากระบบ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

