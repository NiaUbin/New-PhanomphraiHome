"use client"

import * as React from "react"
import { LayoutDashboard, Image, LogOut, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error signing out:", error);
      window.location.href = "/admin/login";
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/20 h-14 flex items-center px-4 bg-white/40">
        <div className="flex items-center gap-2.5 font-display font-bold text-lg">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm shadow-sm">
            P
          </div>
          <span className="group-data-[collapsible=icon]:hidden tracking-wider">
            <span className="text-foreground">PHANOM</span>
            <span className="text-primary">PHRAI</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white/20">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60 px-4 pt-4 pb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url || pathname?.startsWith(item.url + "/")}
                    className="rounded-lg h-10 transition-all duration-200"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/20 p-3 bg-white/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              className="text-destructive/70 hover:text-destructive hover:bg-destructive/5 transition-all rounded-lg h-10"
            >
              <LogOut className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">ออกจากระบบ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
