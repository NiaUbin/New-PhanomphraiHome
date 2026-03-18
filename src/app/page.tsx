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
import { categoryService } from '@/utils/portfolioService';

// ฟังก์ชันดึงข้อมูลจาก Supabase
async function getHomePageData() {
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

  return {
    projects: projectsResponse.data || [],
    categories: categoriesResponse || []
  };
}

export default async function Home() {
  const { projects: projectsFromSupabase, categories } = await getHomePageData();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TestDescript />
        <ServicesSection />
        <ProcessSection />
        
        {/* ใช้ PortfolioSection รูปแบบเดิมที่ดึงข้อมูลจาก Supabase */}
        <PortfolioSection 
          supabaseProjects={projectsFromSupabase} 
          categories={categories.map(c => c.name)} 
        />
        
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
