'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Ruler } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { supabase } from '@/utils/supabase';
import { categoryService } from '@/utils/portfolioService';

interface SupabaseProject {
  id: string | number;
  slug?: string;
  title: string;
  image_url?: string | null;
  img?: string | null;
  tag?: string | null;
  category?: string | null;
  location?: string | null;
  year?: string | null;
  area?: string | null;
}

const PortfolioClient = () => {
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState('ทั้งหมด');
  const [loading, setLoading] = useState(true);

  const filters = ['ทั้งหมด', ...categories];

  useEffect(() => {
    async function fetchData() {
      const [projectsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false }),
        categoryService.getAll().catch(() => [])
      ]);

      if (!projectsResponse.error && projectsResponse.data) {
        setProjects(projectsResponse.data);
      }
      
      if (Array.isArray(categoriesResponse)) {
        setCategories(categoriesResponse.map(c => c.name));
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = active === 'ทั้งหมด' 
    ? projects 
    : projects.filter((p) => (p.category || p.tag) === active);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-background">
        {/* Hero header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4">Portfolio</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-6xl font-bold text-foreground mb-6">
              ผลงาน<span className="text-primary">ทั้งหมด</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              รวมผลงานการออกแบบและก่อสร้างที่เราภาคภูมิใจ ทุกโครงการสร้างด้วยมาตรฐานสูงสุด
              และความใส่ใจในทุกรายละเอียด
            </p>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto px-6 lg:px-8 mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => {
              const count = f === 'ทั้งหมด' 
                ? projects.length 
                : projects.filter((p) => (p.category || p.tag) === f).length;
              
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`font-mono text-xs uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${
                    active === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-foreground/60 border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {f}
                  <span className="ml-2 opacity-50">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <p className="font-body text-muted-foreground">กำลังโหลดผลงาน...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <Link
                        href={`/project/${project.slug || project.id}`}
                        className="group block relative overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-colors"
                      >
                      {/* Image */}
                      <div className={`relative overflow-hidden ${i % 4 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                        <img
                          src={project.image_url || project.img || '/placeholder.svg'}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        
                        {/* Category tag */}
                        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1 font-bold">
                          {project.tag || project.category}
                        </span>

                        {/* Hover CTA */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                          <span className="font-mono text-xs uppercase tracking-widest text-white border border-white/30 px-6 py-3">
                            ดูรายละเอียด →
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span className="font-body text-sm">{project.location || 'ไม่ระบุสถานที่'}</span>
                          </div>
                          <div className="flex gap-4 border-t border-border/50 pt-3 mt-1 underline-offset-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" />{project.year || '-'}</span>
                            <span className="flex items-center gap-1.5"><Ruler className="w-3 h-3 text-primary" />{project.area || '-'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center border border-dashed border-border rounded-lg">
               <p className="font-body text-muted-foreground">ไม่พบข้อมูลในหมวดหมู่นี้</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default PortfolioClient;
