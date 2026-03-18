'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ArrowUpRight,
  Hammer, Paintbrush2, Wrench,
  ClipboardList, Award, MessageSquareQuote,
} from 'lucide-react';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: 'บริการ',
    href: '#services',
    items: [
      { label: 'รับเหมาก่อสร้าง',    desc: 'บ้าน อาคาร คอนโด',       href: '#services' },
      { label: 'ออกแบบตกแต่งภายใน', desc: 'Interior Design',         href: '#services' },
      { label: 'ต่อเติม–ปรับปรุง',   desc: 'Renovation & Extension', href: '#services' },
    ],
  },
  {
    label: 'เกี่ยวกับเรา',
    href: '#why-us',
    items: [
      { label: 'ขั้นตอนการทำงาน', desc: 'กระบวนการตั้งแต่ต้นจนจบ',  href: '#process'      },
      { label: 'ทำไมต้องเรา',     desc: 'จุดแข็งและความเชี่ยวชาญ',  href: '#why-us'       },
      { label: 'รีวิวลูกค้า',     desc: 'เสียงสะท้อนจากลูกค้าจริง', href: '#testimonials' },
    ],
  },
  { label: 'ผลงาน', href: '#portfolio', single: true },
  { label: 'ติดต่อ', href: '#contact',  single: true },
];

const HIGHLIGHT_ICONS: Record<string, { icon: React.ElementType; text: string }[]> = {
  บริการ: [
    { icon: Hammer,      text: 'ก่อสร้างครบวงจร' },
    { icon: Paintbrush2, text: 'ออกแบบตกแต่ง'    },
    { icon: Wrench,      text: 'ต่อเติม–ปรับปรุง' },
  ],
  เกี่ยวกับเรา: [
    { icon: ClipboardList,      text: 'กระบวนการชัดเจน' },
    { icon: Award,              text: 'มาตรฐานสูงสุด'   },
    { icon: MessageSquareQuote, text: 'ลูกค้าไว้วางใจ'  },
  ],
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function MegaLeftPanel({ label, count }: { label: string; count: number }) {
  return (
    <div className="w-60 shrink-0 py-10 pr-10 flex flex-col gap-6 relative">
      {/* Rail ซ้าย */}
      <div className="absolute left-0 top-6 bottom-6 flex flex-col items-center w-[12px]">
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-50" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-60 shrink-0" />
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-300 to-transparent opacity-30" />
      </div>

      {/* Rail ขวา */}
      <div className="absolute right-0 top-6 bottom-6 flex flex-col items-center w-[12px]">
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-stone-300 to-transparent opacity-40" />
        <div className="w-1 h-1 rotate-45 border border-stone-300 opacity-40 shrink-0" />
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-stone-200 to-transparent opacity-30" />
      </div>

      <div className="pl-5">
        {/* Micro label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-amber-400 to-transparent opacity-60" />
          <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-amber-500 shrink-0">หมวดหมู่</p>
          <div className="w-2 h-[1px] bg-amber-300 opacity-40" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl font-bold text-stone-800 leading-tight tracking-tight">
          {label}
        </h2>

        {/* Cascade lines */}
        <div className="flex items-end gap-1 mt-4">
          <div className="flex flex-col gap-1">
            <div className="h-[1.5px] w-10 bg-amber-500" />
            <div className="h-[1px] w-7 bg-amber-300 opacity-70" />
            <div className="h-[1px] w-4 bg-amber-200 opacity-50" />
          </div>
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 opacity-60 mb-[1px]" />
        </div>

        {/* Node rule */}
        <div className="flex items-center gap-1.5 mt-5 opacity-30">
          <div className="w-2 h-[1px] bg-stone-400" />
          <div className="w-1 h-1 rounded-full bg-stone-400" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-stone-300 to-transparent" />
        </div>

        {/* Info bars */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-3 bg-amber-400 opacity-80" />
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-stone-500">{count} รายการ</p>
          </div>
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-[2px] h-3 bg-stone-300" />
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-400">PHANOM PHRAI PK</p>
          </div>
        </div>
      </div>

      {/* Bottom L-bracket */}
      <div className="pl-5 mt-auto">
        <div className="flex items-end">
          <div className="w-[1px] h-4 bg-gradient-to-b from-transparent to-amber-300 opacity-50" />
          <div className="h-[1px] w-4 bg-gradient-to-r from-amber-300 to-transparent opacity-50" />
        </div>
      </div>
    </div>
  );
}

function MegaCenterPanel({
  items, isHome, handleLink, setOpenGroup,
}: {
  items: { label: string; desc: string; href: string }[];
  isHome: boolean;
  handleLink: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  setOpenGroup: (v: string | null) => void;
}) {
  return (
    <div className="flex-1 py-8 px-10">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100">
        <div className="w-1.5 h-3 bg-amber-400" />
        <p className="font-body text-[10px] uppercase tracking-widest text-stone-400 font-bold">เลือกบริการ</p>
      </div>

      <div className="grid grid-cols-1 gap-1">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.22 }}
          >
            <Link
              href={isHome ? item.href : `/${item.href}`}
              onClick={(e) => { handleLink(e, isHome ? item.href : `/${item.href}`); setOpenGroup(null); }}
              className="flex items-center gap-5 px-4 py-4 relative group/item
                before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px]
                before:bg-amber-400 before:scale-y-0 before:origin-top
                hover:before:scale-y-100 before:transition-transform before:duration-200
                hover:bg-white/70 transition-all duration-200"
            >
              <span className="font-mono text-[10px] text-amber-300 group-hover/item:text-amber-500 transition-colors w-5 shrink-0 select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="w-[1px] h-8 shrink-0" style={{ backgroundColor: '#e2ddd6' }} />
              <div className="flex-1">
                <p className="font-display text-base font-semibold uppercase tracking-wider text-stone-700 group-hover/item:text-stone-900 transition-colors">
                  {item.label}
                </p>
                <p className="font-body text-xs tracking-wide text-stone-400 mt-1">{item.desc}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-200 group-hover/item:text-amber-500 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 shrink-0" />
            </Link>

            {idx < items.length - 1 && (
              <div className="h-[1px] mx-4" style={{ background: 'linear-gradient(to right, #e8e2d8, #f0ebe3, transparent)' }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MegaRightPanel({
  openGroup, isHome, handleLink, setOpenGroup,
}: {
  openGroup: string;
  isHome: boolean;
  handleLink: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  setOpenGroup: (v: string | null) => void;
}) {
  const highlights = HIGHLIGHT_ICONS[openGroup] ?? [];

  return (
    <div className="w-56 shrink-0 bg-stone-50/60 py-8 pl-10 pr-6 flex flex-col gap-5">
      <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
        <div className="w-1.5 h-3 bg-amber-400" />
        <p className="font-body text-[10px] uppercase tracking-widest text-stone-400 font-bold">ไฮไลท์</p>
      </div>

      <div className="flex flex-col gap-3">
        {highlights.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.22 }}
            className="flex items-center gap-3 group/tag"
          >
            <div className="w-7 h-7 border border-amber-200/80 bg-white flex items-center justify-center shrink-0 group-hover/tag:border-amber-400 group-hover/tag:bg-amber-50 transition-all duration-200">
              <Icon className="w-3.5 h-3.5 text-amber-400 group-hover/tag:text-amber-600 transition-colors" />
            </div>
            <span className="font-body text-[11px] uppercase tracking-wider text-stone-500 group-hover/tag:text-stone-700 transition-colors font-medium">
              {text}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-stone-100" />
        <div className="w-1 h-1 rounded-full bg-amber-300" />
        <div className="flex-1 h-[1px] bg-stone-100" />
      </div>

      <Link
        href={isHome ? '#contact' : '/#contact'}
        onClick={(e) => { handleLink(e, isHome ? '#contact' : '/#contact'); setOpenGroup(null); }}
        className="flex items-center justify-between px-4 py-3 bg-white border border-stone-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 group/side"
      >
        <span className="font-body text-[11px] uppercase tracking-widest text-stone-600 group-hover/side:text-amber-700 transition-colors font-bold">
          ปรึกษาฟรี
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover/side:text-amber-500 transition-all group-hover/side:translate-x-0.5 group-hover/side:-translate-y-0.5" />
      </Link>
    </div>
  );
}

function MegaDecor() {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <line x1="0" y1="30" x2="420" y2="220" stroke="#d6a832" strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="0" y1="55" x2="380" y2="220" stroke="#d6a832" strokeWidth="0.4" strokeOpacity="0.15" />
      <polyline points="94%,8 100%,8 100%,40%" fill="none" stroke="#d4a84b" strokeWidth="0.7" strokeOpacity="0.3" />
      <polyline points="100%,60% 100%,100% 94%,100%" fill="none" stroke="#d4a84b" strokeWidth="0.7" strokeOpacity="0.2" />
      <polyline points="6%,8 0,8 0,35%" fill="none" stroke="#d4a84b" strokeWidth="0.7" strokeOpacity="0.2" />
      <line x1="4%" y1="50%" x2="96%" y2="50%" stroke="#c8bfb0" strokeWidth="0.4" strokeOpacity="0.3" strokeDasharray="4 8" />
      <line x1="79%" y1="12" x2="79%" y2="88%" stroke="#d4a84b" strokeWidth="0.5" strokeOpacity="0.2" />
      <line x1="88%" y1="18" x2="92%" y2="22" stroke="#d4a84b" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="92%" y1="18" x2="88%" y2="22" stroke="#d4a84b" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="100%" y1="60%" x2="55%" y2="100%" stroke="#d6a832" strokeWidth="0.5" strokeOpacity="0.12" />
      <path d="M 240,0 Q 280,110 240,220" fill="none" stroke="#d4a84b" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="5 10" />
      <circle cx="79%" cy="88%" r="3" fill="none" stroke="#d4a84b" strokeWidth="0.8" strokeOpacity="0.3" />
      <circle cx="4%" cy="50%" r="2.5" fill="#d4a84b" fillOpacity="0.2" />
      <circle cx="96%" cy="50%" r="2.5" fill="#d4a84b" fillOpacity="0.2" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const Navbar = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openGroup,      setOpenGroup]      = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef   = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome   = pathname === '/';

  // สถานะที่ทำให้ navbar มีพื้นหลัง
  const hasBg = scrolled || mobileOpen || !!openGroup;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace(/\/?#/, '');
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    }
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const anchor = href.startsWith('/#') ? href.slice(1) : href;
    if (anchor.startsWith('#')) { e.preventDefault(); scrollTo(anchor); }
  };

  const activeGroup = NAV_GROUPS.find((g) => g.label === openGroup);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hasBg
          ? 'bg-[#f7f5f2]/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line — ซ่อนตอนอยู่บนสุด */}
      <div className={`h-[2px] w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 transition-opacity duration-500 ${
        hasBg ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
          className="flex flex-col leading-none"
        >
          <span className={`font-display text-2xl font-bold tracking-tight transition-colors duration-500 ${
            hasBg ? 'text-stone-800' : 'text-white'
          }`}>
            PHANOM<span className="text-amber-600">PHRAI</span>
          </span>
          <span className={`font-body text-[10px] uppercase tracking-[0.2em] font-medium mt-1 transition-colors duration-500 ${
            hasBg ? 'text-stone-400/80' : 'text-white/60'
          }`}>
            Construction & Design
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-3">
          {NAV_GROUPS.map((group) =>
            group.single ? (
              <Link
                key={group.label}
                href={isHome ? group.href : `/${group.href}`}
                onClick={(e) => handleLink(e, isHome ? group.href : `/${group.href}`)}
                className={`relative font-body text-[15px] font-medium tracking-wide px-4 py-2 transition-colors duration-300 group hover:text-amber-500 ${
                  hasBg ? 'text-stone-600' : 'text-white/80'
                }`}
              >
                {group.label}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            ) : (
              <button
                key={group.label}
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                className={`flex items-center gap-1.5 font-body text-[15px] font-medium tracking-wide px-4 py-2 transition-colors duration-300 ${
                  openGroup === group.label
                    ? 'text-amber-500'
                    : hasBg
                      ? 'text-stone-600 hover:text-amber-700'
                      : 'text-white/80 hover:text-amber-500'
                }`}
              >
                {group.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openGroup === group.label ? 'rotate-180 text-amber-500' : ''}`} />
              </button>
            )
          )}

          {/* CTA */}
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => handleLink(e, isHome ? '#contact' : '/#contact')}
            className={`ml-4 flex items-center gap-2 font-body text-[13px] font-bold uppercase tracking-wider px-6 py-2.5 transition-all duration-300 group/cta rounded-full shadow-sm hover:shadow-md ${
              hasBg
                ? 'bg-stone-800 hover:bg-amber-600 text-white'
                : 'bg-white/10 hover:bg-amber-500 text-white border border-white/20 hover:border-amber-500 backdrop-blur-md'
            }`}
          >
            ขอใบเสนอราคา
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col gap-[5px] p-2 group" aria-label="Toggle menu">
          <span className={`block w-6 h-[1.5px] transition-all duration-300 ${hasBg ? 'bg-stone-700' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-4 h-[1.5px] transition-all duration-300 ${hasBg ? 'bg-stone-700' : 'bg-white'} ${mobileOpen ? 'opacity-0 w-6' : 'group-hover:w-6'}`} />
          <span className={`block w-6 h-[1.5px] transition-all duration-300 ${hasBg ? 'bg-stone-700' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* ── Mega Menu ── */}
      <AnimatePresence>
        {openGroup && activeGroup && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-0 right-0 bg-[#f7f5f2] border-b border-stone-200 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.18)] overflow-hidden"
            onMouseEnter={() => setOpenGroup(openGroup)}
            onMouseLeave={() => setOpenGroup(null)}
          >
            <div className="flex h-[3px]">
              <div className="flex-1 bg-amber-600" />
              <div className="flex-1 bg-amber-400" />
              <div className="flex-1 bg-amber-200" />
            </div>

            <MegaDecor />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex divide-x divide-stone-100">
                <MegaLeftPanel   label={activeGroup.label} count={activeGroup.items?.length ?? 0} />
                <MegaCenterPanel items={activeGroup.items ?? []} isHome={isHome} handleLink={handleLink} setOpenGroup={setOpenGroup} />
                <MegaRightPanel  openGroup={openGroup} isHome={isHome} handleLink={handleLink} setOpenGroup={setOpenGroup} />
              </div>
            </div>

            {/* Bottom strip */}
            <div className="border-t border-stone-100">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                  </div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-stone-400">
                    Since 2010 — สร้างบ้านด้วยความใส่ใจ
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {activeGroup.items?.map((_, i) => (
                    <div key={i} className={`h-[2px] transition-all duration-200 ${i === 0 ? 'w-6 bg-amber-500' : 'w-4 bg-amber-200'}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden overflow-hidden border-t border-stone-200 bg-[#f7f5f2]/98 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-1">
              {NAV_GROUPS.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.07, duration: 0.25 }}
                >
                  {group.single ? (
                      <Link
                        href={isHome ? group.href : `/${group.href}`}
                        onClick={(e) => handleLink(e, isHome ? group.href : `/${group.href}`)}
                        className="flex items-center justify-between py-4 border-b border-stone-100 font-display text-[17px] font-semibold text-stone-800 hover:text-amber-700 transition-colors"
                      >
                        {group.label}
                        <ArrowUpRight className="w-5 h-5 text-amber-500" />
                      </Link>
                  ) : (
                    <div>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                          className="flex items-center justify-between w-full py-4 border-b border-stone-100"
                        >
                          <span className="font-display text-[17px] font-semibold text-stone-800">{group.label}</span>
                          <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${mobileExpanded === group.label ? 'rotate-180 text-amber-600' : ''}`} />
                        </button>

                      <AnimatePresence>
                        {mobileExpanded === group.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-2 space-y-0.5 border-l-2 border-amber-400 ml-1 mb-2">
                              {group.items?.map((item, idx) => (
                                <Link
                                  key={item.label}
                                  href={isHome ? item.href : `/${item.href}`}
                                  onClick={(e) => handleLink(e, isHome ? item.href : `/${item.href}`)}
                                  className="flex items-center gap-3 py-2.5 group/mi"
                                >
                                  <div className="w-7 h-7 rounded border border-amber-100 flex items-center justify-center bg-white shrink-0 group-hover/mi:border-amber-400 transition-colors">
                                    <span className="font-body text-[10px] text-amber-500 font-bold">
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-body text-[13px] font-semibold tracking-wide text-stone-800 group-hover/mi:text-amber-700 transition-colors">
                                      {item.label}
                                    </p>
                                    <p className="font-body text-[10px] text-stone-400 mt-0.5">{item.desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pt-4">
                <Link
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={(e) => handleLink(e, isHome ? '#contact' : '/#contact')}
                  className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-amber-600 text-white font-body text-[14px] font-bold uppercase tracking-wider py-4 transition-all duration-300 rounded-xl shadow-lg"
                >
                  ขอใบเสนอราคา
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;