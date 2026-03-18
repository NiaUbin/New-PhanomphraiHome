'use client';

import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { label: 'บริการ', href: 'services' },
    { label: 'ขั้นตอน', href: 'process' },
    { label: 'ผลงาน', href: 'portfolio' },
    { label: 'ทำไมต้องเรา', href: 'why-us' },
    { label: 'รีวิว', href: 'testimonials' },
    { label: 'ติดต่อ', href: 'contact' }
  ];
  const serviceLinks = ['ออกแบบสถาปัตยกรรม', 'ก่อสร้างบ้านใหม่', 'ต่อเติม/ปรับปรุง', 'ตกแต่งภายใน', 'งานระบบ', 'ที่ปรึกษาโครงการ'];

  return (
    <footer className="bg-dark text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-wider mb-4">
              PHANOM<span className="text-primary">PHRAI PK</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">
              รับเหมาก่อสร้างและออกแบบสถาปัตยกรรมระดับพรีเมียม
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">เมนู</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', `#${link.href}`);
                      }
                    }}
                    className="font-body text-sm text-primary-foreground/50 hover:text-primary transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">บริการ</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="font-body text-sm text-primary-foreground/50">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">ติดต่อเรา</h4>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={`Social ${i}`}
                >
                  <Icon className="w-4 h-4 text-primary-foreground/60" />
                </a>
              ))}
              {/* LINE */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="LINE"
              >
                <span className="font-mono text-xs font-bold text-primary-foreground/60">L</span>
              </a>
            </div>
            
            <div className="mt-8 space-y-2">
              <p className="font-body text-sm text-primary-foreground/50">
                <strong className="text-primary-foreground/80">โทร:</strong> 081-XXX-XXXX
              </p>
              <p className="font-body text-sm text-primary-foreground/50">
                <strong className="text-primary-foreground/80">อีเมล:</strong> contact@phanomphrai.com
              </p>
            </div>
          </div>
        </div>

        {/* --- SEO Keyword Footer Section --- */}
        <div className="border-t border-primary-foreground/10 pt-10 pb-6">
          <h5 className="font-display text-base font-semibold text-primary-foreground/80 mb-4">
            ศูนย์รวมบริการรับเหมาก่อสร้างและรับสร้างบ้านแบบครบวงจร ที่ดีที่สุด
          </h5>
          <p className="font-body text-[11px] sm:text-xs text-primary-foreground/40 leading-loose text-justify md:text-left">
            <strong>บริษัท พนมไพร คอนสตรัคชั่น (Phanomphrai Construction)</strong> บริการ <strong>รับสร้างบ้านหน้าแคบ รับสร้างบ้าน 2 ชั้น รับสร้างบ้านโมเดิร์น (Modern) รับสร้างบ้านหรู</strong> และ <strong>ออกแบบบ้านเดี่ยว</strong> ทั่วประเทศ ดำเนินงานโดย <strong>ผู้รับเหมามืออาชีพ ไม่ทิ้งงาน</strong> มีวิศวกรควบคุมงานทุกขั้นตอน ใช้วัสดุก่อสร้างเกรดพรีเมียม มาตรฐาน มอก. พร้อมบริการ <strong>รับเหมาต่อเติมบ้าน ต่อเติมห้องครัว ต่อเติมโรงรถ งานรีโนเวทบ้าน (Renovate)</strong> และ <strong>ออกแบบตกแต่งภายใน (Interior Design)</strong> เรายินดี <strong>ประเมินราคาก่อสร้าง ตีราคาสร้างบ้านฟรี คุมงบไม่บานปลาย สร้างบ้านราคาถูก</strong> ได้บ้านสวย ทนทาน โครงสร้างปลอดภัย ส่งมอบตรงเวลา ให้คุณได้บ้านในฝันอย่างแท้จริง
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {[ 
              'ผู้รับเหมาก่อสร้าง', 'บริษัทรับสร้างบ้าน', 'สร้างบ้านโมเดิร์น', 'ช่างรับเหมา', 
              'รับเหมาต่อเติม', 'ประเมินราคาสร้างบ้าน', 'แบบบ้าน 2 ชั้น', 'ผู้รับเหมาไม่ทิ้งงาน', 'ต่อเติมหลังคาหน้าบ้าน'
            ].map(keyword => (
              <span key={keyword} className="font-mono text-[10px] text-primary-foreground/30 hover:text-primary transition-colors cursor-default">
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/30">
            © 2026 PHANOMPHRAI CONSTRUCTION. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/20">
            สร้างบ้านด้วยความใส่ใจ ในระดับมาสเตอร์พีซ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
