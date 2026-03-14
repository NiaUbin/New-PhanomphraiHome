"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Ruler, Clock, Bed, Bath } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import { Project as SupabaseProject } from "@/utils/portfolioService";

interface ProjectDetailClientProps {
  id: string;
  initialProject?: SupabaseProject | null;
  relatedProjects?: SupabaseProject[];
}

const ProjectDetailClient = ({ id, initialProject, relatedProjects }: ProjectDetailClientProps) => {
  // Use initialProject if provided (from Supabase), otherwise fall back to static data
  const staticProject = projects.find((p) => p.id === id);
  const project = initialProject || staticProject;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">ไม่พบโครงการ</h1>
          <Link href="/#portfolio" className="text-primary font-mono text-sm uppercase tracking-widest hover:underline">
            ← กลับไปดูผลงาน
          </Link>
        </div>
      </div>
    );
  }

  const related = relatedProjects || [];
  
  // Ensure gallery images are valid non-empty strings
  const gallery = (project.gallery || []).filter(img => typeof img === 'string' && img.trim() !== "");
  const highlights = project.highlights || ['โครงสร้างคุณภาพ', 'ตรวจสอบทุกขั้นตอน', 'รับประกันผลงาน'];

  // Safe image path logic
  const getSafeImage = (p: { image_url?: string; img?: string }) => {
    const url = p.image_url || p.img;
    return (url && url.trim() !== "") ? url : '/placeholder.svg';
  };

  const mainImage = getSafeImage(project);

  // Define images for the lightbox - ensure it's never empty to avoid Next.js Image errors
  const lightboxImages = gallery.length > 0 ? gallery : [mainImage];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
            PHANOMPHRAI <span className="text-primary">PK</span>
          </Link>
          <Link
            href="/#portfolio"
            className="font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปดูผลงาน
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[60vh] lg:h-[70vh] mt-20 overflow-hidden cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        <Image 
          src={mainImage} 
          alt={project.title} 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden lg:block" />

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary/90 font-bold">
                {project.tag || 'บ้านใหม่'}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }} 
              className="flex items-center gap-3 text-white/90 font-body bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-sm border border-white/10"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium tracking-wide">{project.location || 'กรุงเทพฯ'}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Info bar */}
      <div className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { Icon: Calendar, label: 'ปีที่แล้วเสร็จ', value: project.year || '2024' },
              { Icon: Ruler, label: 'พื้นที่', value: project.area },
              { Icon: Clock, label: 'ระยะเวลา', value: project.duration || '8 เดือน' },
              { Icon: MapPin, label: 'สถานที่', value: project.location || 'กรุงเทพฯ' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm">
                  <item.Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-body text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlighted Bedrooms/Bathrooms - Centered with same style as others */}
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 mt-10 pt-10 border-t border-border/40 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {[
              { Icon: Bed, label: 'ห้องนอน', value: project.bedroom || '3' },
              { Icon: Bath, label: 'ห้องน้ำ', value: project.bathroom || '2' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-sm">
                  <item.Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-body text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      {gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <ScrollReveal>
            <span className="section-label mb-4 block text-primary font-mono text-xs uppercase tracking-widest">
              แกลเลอรี่โครงการ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
              ภาพ<span className="text-primary">ผลงาน</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((img, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <button
                  onClick={() => openLightbox(i)}
                  className={`group relative overflow-hidden w-full rounded-sm ${
                    i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - ภาพที่ ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/20 backdrop-blur-[2px]">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground bg-background px-4 py-2 border border-border">
                      ดูรูปขยาย
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 border-t border-border/40 bg-gradient-to-b from-transparent to-card/20">
        <div className="grid lg:grid-cols-3 gap-20">
          <ScrollReveal className="lg:col-span-2">
            <div className="inline-flex items-center gap-3 mb-6 bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                Project Detail
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-10 leading-tight">
              รายละเอียด<span className="text-primary italic">ของผลงาน</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="font-body text-foreground/80 leading-relaxed text-xl mb-6 font-light">
                {project.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-8 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <span className="font-display text-xl font-bold text-foreground mb-8 block border-b border-border/40 pb-4">
                จุดบันทึก<span className="text-primary">สำคัญ</span>
              </span>
              <div className="space-y-6">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group/item">
                    <span className="flex-shrink-0 w-8 h-8 rounded-sm border border-primary/20 flex items-center justify-center font-mono text-xs text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="font-body text-foreground/70 group-hover/item:text-foreground transition-colors pt-1 leading-snug font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Related projects */}
      <div className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <ScrollReveal>
            <span className="section-label mb-4 block text-primary font-mono text-xs uppercase tracking-widest">
              ผลงานที่เกี่ยวข้อง
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-12">
              โครงการ<span className="text-primary">อื่นๆ</span>
            </h2>
          </ScrollReveal>

          {related.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 100}>
                  <Link href={`/project/${p.id}`} className="group block relative overflow-hidden aspect-[4/3] rounded-sm">
                    <Image 
                      src={getSafeImage(p)} 
                      alt={p.title} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2 block">{p.tag}</span>
                        <h3 className="font-display text-xl font-bold text-foreground">{p.title}</h3>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="py-20 text-center border border-dashed border-primary/20 rounded-sm bg-background/40 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Ruler className="w-7 h-7 text-primary/40" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground/80 mb-2">ยังไม่มีผลงานที่เกี่ยวข้อง</h3>
                  <p className="font-body text-muted-foreground/60 max-w-md mx-auto px-6">
                    เรากำลังวางแผนและสร้างสรรค์ผลงานใหม่ในหมวดหมู่นี้อย่างต่อเนื่อง โปรดติดตามเร็วๆ นี้
                  </p>
                  <div className="mt-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/40">Phanomphrai Home Portfolio</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
        <ScrollReveal>
          <p className="font-body text-muted-foreground mb-6 text-lg">สนใจโครงการแบบนี้ หรือต้องการปรึกษาเรื่องการสร้างบ้าน?</p>
          <Link 
            href="/#contact" 
            className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-display font-semibold tracking-wide hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            ขอใบเสนอราคาฟรี
          </Link>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailClient;
