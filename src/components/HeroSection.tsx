'use client';

import { useEffect, useState } from 'react';
import CountUp from './CountUp';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const heroBg =
    'https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="สถาปัตยกรรมบ้านหรูสมัยใหม่"
          className="w-full h-full object-cover scale-[1.04] animate-ken-burns"
        />
        {/* soft left-side veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        {/* bottom fade for stats legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-30" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl">

          {/* eyebrow */}
          <div
            className={`mb-5 flex items-center gap-3 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="block h-px w-8 bg-primary/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50">
              Phanomphrai Construction
            </span>
          </div>

          {/* headline */}
          <h1 className="font-display font-bold leading-[1.05] mb-5">
            {/* line 1 */}
            <span className="block overflow-hidden">
              <span
                className={`block text-4xl md:text-5xl lg:text-6xl text-white transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                ออกแบบ · สร้างสรรค์
              </span>
            </span>
            {/* line 2 */}
            <span className="block overflow-hidden mt-1">
              <span
                className={`block mt-4 text-4xl md:text-5xl lg:text-6xl transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '650ms' }}
              >
               <span className="text-white">ที่อยู่ใน </span>
                  <span className="text-primary [text-shadow:0_0_24px_hsl(var(--primary)/0.6)]">
                    ฝัน
                </span>
              </span>
            </span>
          </h1>

          {/* sub-copy */}
          <p
            className={`font-body text-base md:text-lg text-white/55 max-w-sm mb-9 leading-relaxed transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            รับเหมาออกแบบ ก่อสร้าง ต่อเติม<br className="hidden" />
            ด้วยมาตรฐานสูงสุด
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1300ms' }}
          >
            <a href="#contact" className="btn-primary">
              <span>ขอใบเสนอราคาฟรี</span>
            </a>
            <a href="#portfolio" className="btn-ghost border-primary-foreground/30 text-primary-foreground hover:border-primary hover:text-primary">
              <span>ดูผลงานของเรา</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
  className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${
    loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
  }`}
  style={{ transitionDelay: '1200ms' }}
>
  {/* thin accent line */}
  <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

  {/* เพิ่มความเข้มของพื้นหลังนิดหน่อยเพื่อให้ตัวเลขเด่นขึ้น */}
  <div className="bg-black/40 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 md:py-6">
      
      {/* แก้ตรงนี้: เพิ่ม mx-auto, justify-center และเปลี่ยน max-w ให้กว้างขึ้นเพื่อให้หายใจได้ */}
      <div className="flex justify-center items-center max-w-3xl mx-auto">
        {[
          { end: 250, suffix: '+', label: 'โครงการ' },
          { end: 12, suffix: ' ปี', label: 'ประสบการณ์' },
          { end: 98, suffix: '%', label: 'พึงพอใจ' },
        ].map((stat, i) => (
          <div
            key={i}
            // เพิ่ม px-4 หรือ px-6 เพื่อให้ขอบเส้นแบ่งมีระยะห่างจากข้อความกำลังดี
            className={`flex-1 text-center px-4 md:px-6 ${
              i < 2 ? 'border-r border-white/15' : ''
            }`}
          >
            {/* ขยายขนาดตัวเลขให้เด่นขึ้นในหน้าจอใหญ่ (md:text-4xl) */}
            <div className="font-display text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
              <CountUp end={stat.end} suffix={stat.suffix} />
            </div>
            {/* ปรับสีและขนาด Label ให้อ่านง่ายขึ้น */}
            <div className="font-sans text-[11px] md:text-xs font-medium uppercase tracking-widest text-white/60 mt-1 md:mt-1.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</div>
    </section>
  );
};

export default HeroSection;