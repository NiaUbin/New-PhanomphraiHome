import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TestDescript from "@/components/TestDescript";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import LineButton from "@/components/LineButton";
import { supabase } from '@/utils/supabase';
import { categoryService, Category } from '@/utils/portfolioService';

// ระบบ ISR: ให้หน้าเว็บโหลดเร็วขึ้น และป้องกัน Timeout
// 3600 คือคืนข้อมูลเดิมถ้านานเกิน 1 ชั่วโมง แต่อัปเดตอัตโนมัติเมื่อใช้ Webhook
export const revalidate = 3600;

/**
 * แยกส่วนดึงข้อมูลออกมา เพื่อใช้ระบบ Streaming (Suspense)
 * ช่วยให้เข้าหน้าเว็บได้ทันที แม้ฐานข้อมูลจะยังไม่ตอบสนอง
 */
async function PortfolioContainer() {
  try {
    const [projectsResponse, categoriesResponse] = await Promise.all([
      supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }),
      categoryService.getAll().catch(() => [])
    ]);

    if (projectsResponse.error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลโครงการ:', projectsResponse.error);
    }

    const projectsFromSupabase = projectsResponse.data || [];
    const categories = (categoriesResponse || []).map((c: Category) => c.name);

    return (
      <PortfolioSection 
        supabaseProjects={projectsFromSupabase} 
        categories={categories} 
      />
    );
  } catch (err) {
    console.error('Error in PortfolioContainer:', err);
    return <PortfolioSection supabaseProjects={[]} categories={[]} />;
  }
}

/**
 * หน้าจอขณะรอข้อมูล (Skeleton)
 */
function PortfolioSkeleton() {
  return (
    <div className="py-24 text-center">
      <div className="animate-pulse space-y-4 max-w-7xl mx-auto px-6">
        <div className="h-4 bg-primary/10 w-32 mx-auto rounded"></div>
        <div className="h-10 bg-primary/10 w-64 mx-auto rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          <div className="aspect-[4/3] bg-muted/50 rounded-lg"></div>
          <div className="aspect-[4/3] bg-muted/50 rounded-lg"></div>
          <div className="aspect-[4/3] bg-muted/50 rounded-lg"></div>
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 animate-pulse">
          กำลังเรียกข้อมูลโครงการล่าสุด...
        </p>
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TestDescript />
        <ServicesSection />
        <ProcessSection />
        
        {/* ใช้ Suspense เพื่อไม่ให้หน้าเว็บทั้งหน้าค้างถ้าระบบฐานข้อมูลช้า */}
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContainer />
        </Suspense>
        
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <LineButton />
    </>
  );
}
