'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { filters } from '@/data/projects';

interface SupabaseProject {
  id: string | number;
  title: string;
  image_url?: string | null;
  img?: string | null;
  tag?: string | null;
  category?: string | null;
  location?: string | null;
}

interface PortfolioSectionProps {
  supabaseProjects: SupabaseProject[];
}

const PortfolioSection = ({ supabaseProjects = [] }: PortfolioSectionProps) => {
  const [active, setActive] = useState('ทั้งหมด');

  // กรองข้อมูลหมวดหมู่
  const filtered = active === 'ทั้งหมด' 
    ? supabaseProjects 
    : supabaseProjects.filter((p) => (p.category || p.tag) === active);

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <span className="section-label mb-4">ผลงาน</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            ผลงานของ<span className="text-primary">เรา</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mb-10">
            ตัวอย่างโครงการที่เราภาคภูมิใจ จากบ้านเดี่ยวไปจนถึงคอนโดมิเนียม (ข้อมูลสดจาก Supabase)
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
                    href={`/project/${project.id}`}
                    className={`group relative overflow-hidden break-inside-avoid block ${
                      i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-[4/3]' : 'aspect-square'
                    }`}
                  >
                    <img
                      src={project.image_url || project.img || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay background: Hidden by default, show on hover/touch like desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  {/* Text Container: Slide-up effect on hover/touch */}
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 w-full">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2 block font-bold">
                      {project.tag || 'Project'}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-1 leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-white/60 mb-3">{project.location || ''}</p>
                    <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2 font-bold group/link">
                       ดูรายละเอียด <span className="text-lg transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={500}>
              <div className="flex justify-center mt-16 md:mt-20">
                <Link
                  href="/portfolio"
                  className="group relative inline-flex items-center gap-3 font-mono text-xs md:text-sm uppercase tracking-[0.2em] px-10 py-4 border border-primary text-primary hover:text-white transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10 font-bold">ดูผลงานทั้งหมด</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
