'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';


interface SupabaseProject {
  id: string | number;
  slug?: string;
  title: string;
  image_url?: string | null;
  img?: string | null;
  tag?: string | null;
  category?: string | null;
  location?: string | null;
}

interface PortfolioSectionProps {
  supabaseProjects: SupabaseProject[];
  categories?: string[];
}

const PortfolioSection = ({ 
  supabaseProjects = [], 
  categories = [] 
}: PortfolioSectionProps) => {
  const filters = ['ทั้งหมด', ...categories];
  const [active, setActive] = useState('ทั้งหมด');

  // แก้ปัญหาเมื่อกด "กลับไปหน้าผลงาน" จากหน้าโปรเจกต์แล้วไม่เลื่อนลงมาที่ส่วนผลงาน
  useEffect(() => {
    // ฟังก์ชันช่วยเลื่อนหน้าจอ
    const handleScroll = () => {
      if (window.location.hash === '#portfolio') {
        const element = document.getElementById('portfolio');
        if (element) {
          const offset = 90; // ระยะห่างจากด้านบน (เผื่อ Navbar)
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    };

    // เลื่อนทันทีที่โหลดเสร็จ (ใส่ดีเลย์เล็กน้อยเพื่อให้ Component โหลดครบและ Global Loader หายไป)
    const timeoutId = setTimeout(handleScroll, 500);

    // ดักจับการเปลี่ยน hash ในกรณีที่อยู่ในหน้าเดียวกัน
    window.addEventListener('hashchange', handleScroll);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  // กรองข้อมูลหมวดหมู่
  const filtered = active === 'ทั้งหมด' 
    ? supabaseProjects 
    : supabaseProjects.filter((p) => (p.category || p.tag) === active);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <span className="section-label mb-4">Portfolio</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            ผลงานของ<span className="text-primary">เรา</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mb-10">
            ตัวอย่างโครงการที่เราภาคภูมิใจ จากบ้านเดี่ยวไปจนถึงคอนโดมิเนียม
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 ${
                  active === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-foreground/60 border-border hover:border-primary hover:text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry grid (รูปแบบเดิม) */}
        {filtered.length > 0 ? (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id + active} delay={i * 100}>
                  <Link
                    href={`/project/${project.slug || project.id}`}
                    className="group relative overflow-hidden block break-inside-avoid"
                  >
                    {/* Image */}
                    <img
                      src={project.image_url || project.img || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />

                    {/* Top Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-[10px] tracking-widest uppercase font-semibold bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full">
                        {project.category || project.tag || 'Project'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 p-6 w-full z-10">
                      <div className="translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <MapPin className="w-3 h-3 text-primary" />
                          {project.location || 'กรุงเทพมหานคร'}
                        </div>

                        {/* underline animation */}
                        <div className="mt-4 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

        <ScrollReveal delay={400}>
          <div className="flex flex-col items-center mt-16 md:mt-24">
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-3 mt-20"
            >
              <span className="text-sm uppercase tracking-[0.4em] font-semibold text-foreground group-hover:text-primary transition">
                ดูผลงานทั้งหมด
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-2 text-lg">
                →
              </span>

              <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
            </Link>
          </div>
        </ScrollReveal>
          </>
          
        ) : (
          <div className="py-20 text-center border border-dashed border-border rounded-lg">
             <p className="font-body text-muted-foreground">ไม่พบข้อมูลในหมวดหมู่นี้</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
