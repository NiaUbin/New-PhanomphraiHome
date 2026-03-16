"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // เคลียร์ค่าตำแหน่ง Scroll และเลื่อนกลับขึ้นบนสุดทันทีที่เปิดหน้าใหม่ เพื่อความสวยงาม
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // ดีเลย์เล็กน้อยเพื่อให้เนื้อหาไม่กระแทกเข้ามาพร้อมกับการหายไปของหน้า Loading 
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full h-full"
      >
        {children}
    </motion.div>
  );
}
