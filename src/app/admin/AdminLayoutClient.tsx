"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { supabase } from "@/utils/supabase"
import Link from "next/link"
import { Home, Loader2 } from "lucide-react"

export function AdminLayoutClient({
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
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f0ea]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse">กำลังตรวจสอบสิทธิ์...</p>
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
      <div className="flex min-h-screen w-full bg-[#f5f0ea]">
        <AdminSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            {/* ─── Top Header Bar ─── */}
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/30 px-6 bg-white/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 rounded-full bg-primary" />
                <h1 className="text-sm font-display font-bold tracking-wide text-foreground/80 uppercase">
                  Admin Dashboard
                </h1>
              </div>
              
              <Link 
                href="/" 
                className="flex items-center gap-2 group transition-all duration-300 px-4 py-1.5 rounded-full border border-border/30 hover:border-primary/30 hover:bg-primary/5 text-foreground/50 hover:text-primary"
              >
                <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase group-hover:opacity-100 transition-opacity">
                  หน้าหลัก
                </span>
              </Link>
            </header>

            {/* ─── Main Content ─── */}
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
