"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Clock,
  Bed,
  Bath,
  ChevronRight,
} from "lucide-react";
import {
  CalendarDays,
  Maximize2,
  BedDouble,
  ShowerHead,
  Hourglass,
  LocateFixed,
} from "lucide-react";

import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import { Project as SupabaseProject } from "@/utils/portfolioService";

// ─── Props & Types ──────────────────────────────────────────────────

type UnifiedProject = SupabaseProject & { img?: string };

interface ProjectDetailClientProps {
  id: string;
  initialProject?: SupabaseProject | null;
  relatedProjects?: SupabaseProject[];
}

// ─── Helpers ────────────────────────────────────────────────────────

const getSafeImage = (p: UnifiedProject | undefined) => {
  const url = p?.image_url || p?.img;
  return url && url.trim() !== "" ? url : "/placeholder.svg";
};

// ─── Main Component ─────────────────────────────────────────────────

const ProjectDetailClient = ({
  id,
  initialProject,
  relatedProjects,
}: ProjectDetailClientProps) => {
  const staticProject = projects.find((p) => p.id === id);
  const project = (initialProject || staticProject) as UnifiedProject | undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) return <ProjectNotFound />;

  // นำรูปภาพหลัก (Main Image) มารวมไว้เป็นรูปแรกของแกลเลอรี่เสมอ
  const mainImage = getSafeImage(project);
  
  // กรองรูปที่ไม่ใช่ string ว่างออก และไม่ให้ซ้ำกับรูประบุตัวตน
  const extraGallery = (project.gallery || []).filter(
    (img: string) => typeof img === "string" && img.trim() !== "" && img !== mainImage
  );
  
  // ให้แกลเลอรี่รวมรูปหลักและรูปเสริมเข้าด้วยกัน
  const gallery = [mainImage, ...extraGallery];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <ProjectHero
        project={project}
        onImageClick={() => openLightbox(0)}
      />

      <ProjectStatsBar project={project} />

      {gallery.length > 0 && (
        <ProjectGallery
          project={project}
          gallery={gallery}
          onImageClick={openLightbox}
        />
      )}

      <ProjectContent project={project} />

      <RelatedProjectsSection
        related={relatedProjects || []}
      />

      <ProjectCTA />

      <Lightbox
        images={gallery.length > 0 ? gallery : [getSafeImage(project)]}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

// ─── Sub-Components ────────────────────────────────────────────────

const HeaderNav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
      <Link href="/" className="font-display text-xl font-bold tracking-wider">
        PHANOMPHRAI <span className="text-primary">PK</span>
      </Link>
      <Link
        href="/#portfolio"
        className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        กลับไปหน้าผลงาน
      </Link>
    </div>
  </header>
);

const ProjectHero = ({ project, onImageClick }: { project: UnifiedProject; onImageClick: () => void }) => {
  const mainImage = getSafeImage(project);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="relative w-full mt-[68px] overflow-hidden cursor-pointer"
      style={{ height: "min(72vh, 760px)" }}
      onClick={onImageClick}
    >
      <Image
        src={mainImage}
        alt={project.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 lg:px-16 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary mb-3"
          >
            {project.category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="font-display text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-2 text-white/70"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="font-body text-sm tracking-wide">
              {project.location}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ProjectStatsBar = ({ project }: { project: UnifiedProject }) => {
  const stats = [
    { Icon: CalendarDays, label: "ปีที่แล้วเสร็จ", value: project.year || "2024" },
    { Icon: Maximize2, label: "พื้นที่", value: project.area || "—" },
    { Icon: BedDouble, label: "ห้องนอน", value: project.bedroom || "3" },
    { Icon: ShowerHead, label: "ห้องน้ำ", value: project.bathroom || "2" },
    { Icon: Hourglass, label: "ระยะเวลา", value: project.duration || "8 เดือน" },
    { Icon: LocateFixed, label: "สถานที่", value: project.location || "กรุงเทพฯ" },
  ];

  return (
    <div className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
          {stats.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-xl shrink-0">
                <item.Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5 truncate">
                  {item.label}
                </p>
                <p className="font-body text-sm font-semibold text-foreground truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectGallery = ({
  project,
  gallery,
  onImageClick,
}: {
  project: UnifiedProject;
  gallery: string[];
  onImageClick: (idx: number) => void;
}) => (
  <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
    <ScrollReveal>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
            แกลเลอรี่
          </p>
          <h2 className="font-display text-3xl font-bold text-muted-foreground">ภาพผลงาน</h2>
        </div>
        <span className="hidden md:block font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          {gallery.length} ภาพ
        </span>
      </div>
    </ScrollReveal>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {gallery.map((img, i) => (
        <ScrollReveal key={i} delay={i * 60}>
          <button
            onClick={() => onImageClick(i)}
            className={`group relative overflow-hidden w-full rounded-sm bg-muted ${
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img}
              alt={`${project.title} — ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white border border-white/50 px-4 py-2">
                ขยาย
              </span>
            </div>
          </button>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const ProjectContent = ({ project }: { project: UnifiedProject }) => {
  const highlights = project.highlights || [
    "โครงสร้างคุณภาพ",
    "ตรวจสอบทุกขั้นตอน",
    "รับประกันผลงาน",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
        <ScrollReveal className="lg:col-span-7 lg:pr-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
            รายละเอียด
          </p>
          <h2 className="font-display text-2xl text-muted-foreground lg:text-3xl font-bold mb-6">
            รายละเอียดโครงการ : <span className=" font-bold text-4xl text-primary">{project.title}</span>
          </h2>
          <div className="w-10 h-px bg-primary mb-4" />
          <p className="font-body text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} className="lg:col-span-5">
          <div className="border border-border/70 rounded-xl p-8 lg:p-10 bg-card/40 h-full">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
              ไฮไลต์
            </p>
            <h3 className="font-display text-xl text-muted-foreground font-bold mb-8">จุดเด่น<span className="text-primary">สำคัญ</span></h3>

            <ul className="space-y-5">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group/hi">
                  <span className="shrink-0 w-7 h-7 rounded-full border border-primary/30 flex items-center justify-center font-mono text-[10px] text-primary mt-0.5 group-hover/hi:bg-primary group-hover/hi:text-primary-foreground group-hover/hi:border-primary transition-all duration-300">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm text-foreground/80 pt-1.5 leading-snug group-hover/hi:text-foreground transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const RelatedProjectsSection = ({ related }: { related: UnifiedProject[] }) => (
  <section className="border-t border-border/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
              ผลงานอื่นๆ
            </p>
            <h2 className="font-display text-3xl text-muted-foreground font-bold">โครงการที่เกี่ยวข้อง</h2>
          </div>
          <Link
            href="/#portfolio"
            className="hidden md:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </ScrollReveal>

      {related.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 80}>
              <Link
                href={`/project/${p.id}`}
                className="group block relative overflow-hidden rounded-sm aspect-[4/3] bg-muted"
              >
                <Image
                  src={getSafeImage(p)}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-1.5">
                    {p.category || p.tag || "โครงการ"}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-3 font-mono text-[10px] text-white/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                    ดูโครงการ <ChevronRight className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <div className="py-16 text-center border border-dashed border-border rounded-sm">
            <p className="font-body text-muted-foreground text-sm">
              กำลังเพิ่มผลงานในหมวดหมู่นี้เร็วๆ นี้
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  </section>
);

const ProjectCTA = () => (
  <section className="border-t border-border/50 bg-card/30">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
            ติดต่อเรา
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            สนใจสร้างบ้านในฝัน?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
            ปรึกษาฟรี ไม่มีค่าใช้จ่าย เราพร้อมดูแลทุกขั้นตอน
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-10 py-3.5 bg-primary text-primary-foreground font-display text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all hover:gap-4"
          >
            ขอใบเสนอราคาฟรี <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const ProjectNotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404</p>
      <h1 className="font-display text-3xl font-bold text-foreground">ไม่พบโครงการ</h1>
      <Link
        href="/#portfolio"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4" /> กลับไปดูผลงาน
      </Link>
    </div>
  </div>
);

export default ProjectDetailClient;