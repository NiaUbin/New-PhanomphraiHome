"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoaderCore() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. ตรวจสอบเมื่อหน้าเว็บและชิ้นส่วนต่างๆ โหลดเสร็จครั้งแรก
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const finishLoading = () => {
      // เผื่อเวลาให้เบราว์เซอร์ Render ภาพแบบสมบูรณ์ชัวร์ๆ
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      return () => window.removeEventListener("load", finishLoading);
    }
    
    return () => clearTimeout(timeoutId);
  }, []);

  // 2. ปิดหน้าโหลดทันทีที่เปลี่ยน Route (Pathname) สำเร็จ
  useEffect(() => {
    if (document.readyState === "complete") {
      // เมื่อ Next.js เปลี่ยน pathname หมายความว่าหน้าใหม่ถูกโหลดข้อมูลครบแล้ว
      setIsLoading(false);
    }
  }, [pathname, searchParams]);

  // 3. เริ่มหน้าโหลดทันทีที่ผู้ใช้กดลิงก์ไปหน้าอื่น
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href || target.hasAttribute("download")) return;
      
      try {
        const url = new URL(target.href);
        const isInternal = url.origin === window.location.origin;
        const isSamePage = url.pathname === window.location.pathname && url.search === window.location.search;
        const isAnchorLink = !!url.hash && url.pathname === window.location.pathname;
        const hasTargetBlank = target.target === "_blank";

        // ถ้าเป็นลิงก์ภายในเว็บที่ไม่ได้เปิดหน้าต่างใหม่ และไม่ใช่การเลื่อน Anchor หน้าเดิม
        if (isInternal && !isSamePage && !isAnchorLink && !hasTargetBlank) {
          setIsLoading(true);
        }
      } catch (error) {
        // Ignore invalid URLs
      }
    };

    // ดักจับ Event แบบ Capture Phase เพื่อให้ติดชัวร์ๆ ก่อน React จะระงับ Event
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          // อยู่ชั้นบนสุดเสมอ มี z-index 99999 และบังการกดปุ่ม (pointer-events-auto)
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background pointer-events-auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-medium text-primary tracking-[0.2em] mb-4">
                PHANOMPHRAI
              </h1>
              <p className="text-sm font-body text-muted-foreground uppercase tracking-widest text-center">
                Architecture & Construction
              </p>
            </motion.div>
            
            {/* เส้นโหลดวิ่งๆ แบบไม่สิ้นสุด (Indeterminate) ทำให้ดูเหมือนว่าระบบกำลังประมวลผลอยู่ตลอด */}
            <div className="w-48 md:w-64 h-[2px] bg-border overflow-hidden rounded-full mt-4 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary w-1/2 rounded-full"
                animate={{ 
                  left: ["-50%", "150%"],
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 0.2
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ผูกเข้ากับ Suspense เพื่อแก้ปัญหา useSearchParams Bailout Error ตอน Build
export default function GlobalLoading() {
  return (
    <Suspense fallback={null}>
      <LoaderCore />
    </Suspense>
  );
}
