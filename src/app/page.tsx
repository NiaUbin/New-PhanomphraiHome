import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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

// ฟังก์ชันดึงข้อมูลจาก Supabase
async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const projectsFromSupabase = await getProjects();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        
        {/* ใช้ PortfolioSection รูปแบบเดิมที่ดึงข้อมูลจาก Supabase */}
        <PortfolioSection supabaseProjects={projectsFromSupabase} />
        
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
