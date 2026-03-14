"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { supabase } from "@/utils/supabase"

import Link from "next/link"
import { Home } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session && !isLoginPage) {
        router.push("/admin/login")
      } else if (session && isLoginPage) {
        router.push("/admin")
      } else {
        setIsAuthenticated(!!session)
        setIsLoading(false)
      }
    }

    checkUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isLoginPage) {
        router.push("/admin/login")
      }
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [isLoginPage, router])

  if (isLoading && !isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    )
  }

  // If we are on the login page, just render the children without sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
              <h1 className="text-xl font-display font-semibold tracking-tight">Admin Dashboard</h1>
              
              <Link 
                href="/" 
                className="flex items-center gap-2 group transition-all duration-300 px-4 py-2 rounded-full border border-transparent hover:border-primary/20 hover:bg-primary/5 text-primary"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  กลับสู่หน้าหลัก
                </span>
              </Link>
            </header>
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


