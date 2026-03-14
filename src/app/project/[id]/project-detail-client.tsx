"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Ruler, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";

interface ProjectDetailClientProps {
  id: string;
}

const ProjectDetailClient = ({ id }: ProjectDetailClientProps) => {
  const project = projects.find((p) => p.id === id);

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

  const related = projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
            FORMA <span className="text-primary">BUILD</span>
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
          src={project.img} 
          alt={project.title} 
          fill
          className="object-cover"
          priority
        />
        <div className="warm-overlay absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="font-mono text-xs uppercase tracking-widest text-primary mb-3 block"
            >
              {project.tag}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-2 text-foreground"
            >
              {project.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }} 
              className="flex items-center gap-2 text-muted-foreground font-body"
            >
              <MapPin className="w-4 h-4 text-primary" />
              {project.location}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Info bar */}
      <div className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { Icon: Calendar, label: 'ปีที่แล้วเสร็จ', value: project.year },
            { Icon: Ruler, label: 'พื้นที่', value: project.area },
            { Icon: Clock, label: 'ระยะเวลา', value: project.duration },
            { Icon: MapPin, label: 'สถานที่', value: project.location },
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

      {/* Gallery grid */}
      {project.gallery && project.gallery.length > 0 && (
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
            {project.gallery.map((img, i) => (
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 border-t border-border/50">
        <div className="grid lg:grid-cols-3 gap-16">
          <ScrollReveal className="lg:col-span-2">
            <span className="section-label mb-4 block text-primary font-mono text-xs uppercase tracking-widest">
              รายละเอียดโครงการ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              เกี่ยวกับ<span className="text-primary">โครงการนี้</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="font-body text-foreground/70 leading-relaxed text-xl mb-6">
                {project.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <span className="section-label mb-4 block text-primary font-mono text-xs uppercase tracking-widest">
              จุดเด่น
            </span>
            <div className="space-y-6 mt-8">
              {project.highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 border border-primary/30 flex items-center justify-center font-mono text-xs text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-body text-foreground/80 pt-1">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Related projects */}
      {related.length > 0 && (
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
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 100}>
                  <Link href={`/project/${p.id}`} className="group block relative overflow-hidden aspect-[4/3] rounded-sm">
                    <Image 
                      src={p.img} 
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
          </div>
        </div>
      )}

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
        images={project.gallery}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailClient;
