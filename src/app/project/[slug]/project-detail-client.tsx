"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, ChevronRight } from "lucide-react";
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

// ─── Types ─────────────────────────────────────────────────────────
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

const splitValue = (raw: string) => {
  const m = raw.match(/^([\d,.]+)\s*(.*)/);
  if (m) return { num: m[1], unit: m[2] || "" };
  return { num: raw, unit: "" };
};

// ─── Shared micro-components ────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
    {children}
  </p>
);

const Hairline = ({ className = "" }: { className?: string }) => (
  <div
    className={`w-full ${className}`}
    style={{ height: "0.5px", background: "rgba(var(--border-rgb,0,0,0),0.15)" }}
  />
);

// ─── Main ────────────────────────────────────────────────────────────
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

  const mainImage = getSafeImage(project);
  const extraGallery = (project.gallery || []).filter(
    (img: string) => typeof img === "string" && img.trim() !== "" && img !== mainImage
  );
  const gallery = [mainImage, ...extraGallery];

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      <ProjectHero project={project} onImageClick={() => openLightbox(0)} />
      <ProjectStatsBar project={project} />
      {gallery.length > 0 && (
        <ProjectGallery project={project} gallery={gallery} onImageClick={openLightbox} />
      )}
      {mainImage && <ParallaxBreak image={mainImage} project={project} />}
      <ProjectContent project={project} />
      <RelatedProjectsSection related={relatedProjects || []} />
      <ProjectCTA />
      <Lightbox
        images={gallery.length > 0 ? gallery : [mainImage]}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────
// HEADER NAV
// ──────────────────────────────────────────────────────────────────
const HeaderNav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
      <Link href="/" className="font-display text-xl font-bold tracking-wider">
        PHANOMPHRAI <span className="text-primary">PK</span>
      </Link>
      <Link
        href="/#portfolio"
        className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        กลับไปหน้าผลงาน
      </Link>
    </div>
  </header>
);

// ──────────────────────────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────────────────────────
const heroCSS = `
  .hero-bg { transition: transform 0.9s cubic-bezier(0.22,1,0.36,1); }
  .hero-root:hover .hero-bg { transform: scale(1.03) translateZ(0); }
`;

const ProjectHero = ({
  project,
  onImageClick,
}: {
  project: UnifiedProject;
  onImageClick: () => void;
}) => {
  const mainImage = getSafeImage(project);
  return (
    <>
      <style>{heroCSS}</style>
      <div
        className="hero-root relative w-full mt-[68px] overflow-hidden"
        style={{ height: "min(88vh, 900px)" }}
        onClick={onImageClick}
      >
        {/* Background */}
        <div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ clipPath: "inset(0)" }}
        >
          <div
            className="hero-bg fixed inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{ backgroundImage: `url("${mainImage}")`, transform: "translateZ(0)" }}
          />
          <div className="absolute inset-0 bg-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
            }}
          />
        </div>

        {/* Top-right mark */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-10 pointer-events-none flex items-center gap-3 opacity-40">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="0" x2="7" y2="14" stroke="white" strokeWidth="0.75" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="white" strokeWidth="0.75" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white">
            Project Detail
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 lg:px-16 lg:pb-14">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left mb-6"
                style={{ height: "0.5px", background: "rgba(255,255,255,0.2)" }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="font-mono text-[10px] uppercase tracking-[0.45em] mb-4 text-primary"
              >
                ◆&nbsp;&nbsp;{project.category}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.03] tracking-tight mb-8"
              >
                {project.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin
                    className="w-3.5 h-3.5 shrink-0 text-primary"
                  />
                  <span className="font-body text-sm tracking-wide text-white/65">
                    {project.location}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {project.area && <GlassChip>{project.area}</GlassChip>}
                  <GlassChip accent>
                    View Gallery
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </GlassChip>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
          <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
            <motion.div
              className="w-full"
              style={{ height: "40%", background: "rgba(255,255,255,0.55)" }}
              animate={{ y: ["0%", "250%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

const GlassChip = ({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) => (
  <span
    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 transition-all duration-300 hover:bg-white/20 cursor-pointer"
    style={{
      border: `0.5px solid ${accent ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)"}`,
      color: accent ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
      backdropFilter: "blur(10px)",
      background: accent ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
    }}
  >
    {children}
  </span>
);

// ──────────────────────────────────────────────────────────────────
// STATS BAR — Editorial Specification Sheet
// ──────────────────────────────────────────────────────────────────
const ProjectStatsBar = ({ project }: { project: UnifiedProject }) => {
  const statsConfig = [
    { Icon: Maximize2,    label: "พื้นที่ใช้สอย", value: project.area,     unit: "" },       // มี unit อยู่ใน string แล้ว เช่น "320 ตร.ม."
    { Icon: BedDouble,    label: "ห้องนอน",        value: project.bedroom,  unit: "ห้อง" },
    { Icon: ShowerHead,   label: "ห้องน้ำ",        value: project.bathroom, unit: "ห้อง" },
    { Icon: LocateFixed,  label: "สถานที่",        value: project.location, unit: "" },       // text-only ไม่ต้องมี unit
    { Icon: CalendarDays, label: "ปีที่เสร็จ",     value: project.year,     unit: "" },       // text-only
    { Icon: Hourglass,    label: "ระยะเวลา",       value: project.duration, unit: "" },       // มี unit อยู่ใน string แล้ว เช่น "6 เดือน"
  ];

  const active = statsConfig.filter(
    (s) => s.value && String(s.value).trim() !== "" && s.value !== "—"
  );
  const price = project.price;
  const hasPrice = price && price.trim() !== "" && price !== "—";

  if (active.length === 0 && !hasPrice) return null;

  // แยก numeric / unit จาก string
  const resolveValue = (raw: string, configUnit: string) => {
    const m = raw.match(/^([\d,.]+)\s*(.*)/);
    if (m) {
      const num = m[1];
      const unit = configUnit || m[2] || "";
      return { num, unit, isText: false };
    }
    return { num: raw, unit: "", isText: true };
  };

  const formatPrice = (p: string) => {
    const num = p.match(/[\d,.]+/)?.[0] || "";
    const unit = p.replace(num, "").trim() || "บาท";
    return { num, unit };
  };

  return (
    <section className="bg-background border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Centered label ── */}
        <div className="flex items-center gap-5 py-6">
          <div className="flex-1 h-px bg-border/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/80">
            รายละเอียดโครงการ
          </span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* ── Stats grid ── */}
        {active.length > 0 && (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(active.length, 6)} divide-x divide-border/15`}
          >
            {active.map((item, idx) => {
              const { num, unit, isText } = resolveValue(String(item.value), item.unit);
              return (
                <ScrollReveal key={item.label} delay={idx * 50}>
                  <div className="group flex flex-col gap-1.5 py-5 px-4 lg:px-6 transition-colors duration-300">
                    <span className="text-[15px] font-semibold uppercase tracking-[0.15em] text-primary transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 min-w-0">
                      <item.Icon className="w-5 h-5 shrink-0 text-primary transition-colors duration-300" strokeWidth={1.9} />
                      <span
                        className={`font-display font-bold leading-none ${
                          isText ? "text-lg lg:text-xl" : "text-xl lg:text-xl"
                        } text-foreground/80`}
                      >
                        {num}
                      </span>
                      {unit && (
                        <span className="font-body mt-1 text-sm text-foreground/80 shrink-0">
                          {unit}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ── Price ── */}
        {hasPrice && (() => {
          const { num, unit } = formatPrice(price);
          return (
            <>
              <Hairline />
                <ScrollReveal>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    
                    <span className="text-[15px] font-medium uppercase tracking-[0.2em] text-foreground/60 mb-2">
                      งบประมาณ
                    </span>

                    <div className="flex items-end justify-center gap-1">
                      <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                        {num}
                      </span>
                      <span className="text-[11px] text-foreground/40 mb-[2px]">
                        {unit}
                      </span>
                    </div>

                  </div>
                </ScrollReveal>
            </>
          );
        })()}

        <Hairline />
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────
// GALLERY — Editorial masonry with index overlay
// ──────────────────────────────────────────────────────────────────
const ProjectGallery = ({
  project,
  gallery,
  onImageClick,
}: {
  project: UnifiedProject;
  gallery: string[];
  onImageClick: (i: number) => void;
}) => (
  <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-20 lg:pb-32">
    <ScrollReveal>
      <div className="flex items-end justify-between mb-3">
        <div>
          <SectionLabel>แกลเลอรี่</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground/90 leading-none tracking-tight">
            ภาพ
            <span className="text-primary">ผลงาน</span>
          </h2>
        </div>
        {/* Giant ghost count */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <span
            className="font-display text-5xl font-bold leading-none opacity-[0.08] text-primary"
          >
            {String(gallery.length).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            ภาพ
          </span>
        </div>
      </div>
      <Hairline className="mb-8" />
    </ScrollReveal>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {gallery.map((img, i) => (
        <ScrollReveal key={i} delay={i * 50}>
          <button
            onClick={() => onImageClick(i)}
            className={`group relative overflow-hidden w-full bg-muted ${
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img}
              alt={`${project.title} — ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/50 transition-all duration-500" />

            {/* Index */}
            <div className="absolute top-3 left-4 font-mono text-[10px] text-white/25 group-hover:text-white/60 transition-colors duration-400 select-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-white px-4 py-2"
                style={{ border: "0.5px solid rgba(255,255,255,0.4)" }}
              >
                ดูภาพ
              </span>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out group-hover:w-full"
              style={{ width: "0%", background: "var(--color-primary, #c9a96e)" }}
            />
          </button>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────────
// PARALLAX BREAK — Full-bleed interstitial with editorial overlay
// ──────────────────────────────────────────────────────────────────
const ParallaxBreak = ({
  image,
  project,
}: {
  image: string;
  project: UnifiedProject;
}) => (
  <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ clipPath: "inset(0)" }}
    >
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${image}")`, transform: "translateZ(0)" }}
      />
      <div className="absolute inset-0 bg-neutral-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-neutral-950/20" />
    </div>

    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5 px-8 text-center">
      {/* Top rule */}
      <div className="flex items-center gap-4 w-full max-w-xs opacity-35">
        <div className="flex-1" style={{ height: "0.5px", background: "rgba(255,255,255,0.5)" }} />
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <rect x="3" y="0" width="2" height="8" fill="white" />
          <rect x="0" y="3" width="8" height="2" fill="white" />
        </svg>
        <div className="flex-1" style={{ height: "0.5px", background: "rgba(255,255,255,0.5)" }} />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/45">
        {project.category}
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
        {project.title}
      </h2>
      {project.location && (
        <p className="flex items-center gap-2 font-body text-sm text-white/40 tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          {project.location}
        </p>
      )}

      {/* Bottom rule */}
      <div className="flex items-center gap-4 w-full max-w-xs opacity-35">
        <div className="flex-1" style={{ height: "0.5px", background: "rgba(255,255,255,0.5)" }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
        <div className="flex-1" style={{ height: "0.5px", background: "rgba(255,255,255,0.5)" }} />
      </div>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────────
// CONTENT — Description + Highlights
// ──────────────────────────────────────────────────────────────────
const ProjectContent = ({ project }: { project: UnifiedProject }) => {
  const highlights = project.highlights || [
    "โครงสร้างคุณภาพ",
    "ตรวจสอบทุกขั้นตอน",
    "รับประกันผลงาน",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
        {/* Left — Description */}
        <ScrollReveal className="lg:col-span-7">
          <SectionLabel>รายละเอียด</SectionLabel>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-2">
            {project.title}
          </h2>
          <div
            className="mb-8"
            style={{ height: "2px", width: "40px", background: "var(--color-primary, #c9a96e)" }}
          />
          <p className="font-body text-base lg:text-[1.05rem] text-muted-foreground leading-[1.85] whitespace-pre-line">
            {project.description}
          </p>
        </ScrollReveal>

        {/* Right — Highlights card */}
        <ScrollReveal delay={120} className="lg:col-span-5">
          <div
            className="relative overflow-hidden h-full"
            style={{
              border: "0.5px solid rgba(var(--border-rgb, 0,0,0),0.12)",
              background: "var(--color-card, hsl(var(--card)))",
            }}
          >
            {/* Amber top accent */}
            <div
              className="h-0.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-primary, #c9a96e), transparent)",
              }}
            />

            <div className="p-8 lg:p-10">
              <SectionLabel>ไฮไลต์</SectionLabel>
              <h3 className="font-display text-2xl font-bold text-foreground mb-8">
                จุดเด่น
                <span className="text-primary">สำคัญ</span>
              </h3>

              <ul className="divide-y divide-border/30">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-5 py-5 hover:pl-1 transition-all duration-300 cursor-default"
                  >
                    <span
                      className="shrink-0 font-mono text-[10px] tracking-widest mt-0.5 opacity-35 group-hover:opacity-100 transition-opacity duration-300 text-primary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {item}
                    </span>
                    <ChevronRight
                      className="shrink-0 w-3.5 h-3.5 ml-auto mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary"
                      strokeWidth={1.5}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Ghost watermark */}
            <div
              className="absolute bottom-3 right-4 font-display text-[6rem] font-bold leading-none select-none pointer-events-none"
              style={{ color: "var(--color-primary, #c9a96e)", opacity: 0.04 }}
            >
              {String(highlights.length).padStart(2, "0")}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────
// RELATED PROJECTS
// ──────────────────────────────────────────────────────────────────
const RelatedProjectsSection = ({ related }: { related: UnifiedProject[] }) => (
  <section className="border-t border-border/30 bg-card/20">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-4">
          <div>
            <SectionLabel>ผลงานอื่นๆ</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground/90 leading-none tracking-tight">
              โครงการ
              <span className="text-primary">ที่เกี่ยวข้อง</span>
            </h2>
          </div>
          <Link
            href="/#portfolio"
            className="hidden md:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 mb-1"
          >
            ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <Hairline className="mb-10" />
      </ScrollReveal>

      {related.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 70}>
              <Link
                href={`/project/${p.slug || p.id}`}
                className="group block relative overflow-hidden aspect-[4/3] bg-muted"
              >
                <Image
                  src={getSafeImage(p)}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/88 via-neutral-950/15 to-transparent" />

                {/* Bottom slide-in accent */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out group-hover:w-full"
                  style={{ width: "0%", background: "var(--color-primary, #c9a96e)" }}
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1.5 text-primary"
                  >
                    {p.category || "โครงการ"}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white leading-snug mb-3">
                    {p.title}
                  </h3>
                  {/* Slide-up CTA text */}
                  <div className="overflow-hidden h-4">
                    <div className="flex items-center gap-1 font-mono text-[10px] text-white/45 uppercase tracking-widest transition-transform duration-400 translate-y-5 group-hover:translate-y-0">
                      ดูโครงการ <ChevronRight className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <div className="py-20 text-center border border-dashed border-border/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              กำลังเพิ่มผลงานในหมวดหมู่นี้เร็วๆ นี้
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────────
// CTA — Dramatic closer with grid pattern + ghost logo
// ──────────────────────────────────────────────────────────────────
const ProjectCTA = () => (
  <section className="relative overflow-hidden border-t border-border/30">
    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, rgba(var(--primary-rgb,201,169,110),0.06) 0px, rgba(var(--primary-rgb,201,169,110),0.06) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(var(--primary-rgb,201,169,110),0.06) 0px, rgba(var(--primary-rgb,201,169,110),0.06) 1px, transparent 1px, transparent 64px)`,
      }}
    />

    <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center">
          {/* Ghost monogram */}
          <div
            className="font-display font-bold leading-none select-none text-primary"
            style={{
              fontSize: "clamp(6rem, 18vw, 14rem)",
              opacity: 0.05,
              marginBottom: "-2.5rem",
              letterSpacing: "-0.04em",
            }}
          >
            PK
          </div>

          <SectionLabel>ติดต่อเรา</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
            สนใจสร้างบ้าน
            <span className="text-primary">ในฝัน?</span>
          </h2>
          <p className="font-body text-base text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
            ปรึกษาฟรี ไม่มีค่าใช้จ่าย เราพร้อมดูแลทุกขั้นตอน ตั้งแต่ออกแบบจนถึงส่งมอบงาน
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 px-10 py-4 font-display text-sm font-semibold tracking-wide transition-all duration-300 hover:gap-5"
              style={{
                background: "var(--color-primary, #c9a96e)",
                color: "white",
              }}
            >
              ขอใบเสนอราคาฟรี
              <ChevronRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              ดูผลงานอื่นๆ
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ──────────────────────────────────────────────────────────────────
// NOT FOUND
// ──────────────────────────────────────────────────────────────────
const ProjectNotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">404</p>
      <h1 className="font-display text-4xl font-bold text-foreground">ไม่พบโครงการ</h1>
      <Hairline className="max-w-[60px] mx-auto my-4" />
      <Link
        href="/#portfolio"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> กลับไปดูผลงาน
      </Link>
    </div>
  </div>
);

export default ProjectDetailClient;   