'use client';

import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const navLinks = [
    { label: 'บริการของเรา', href: 'services' },
    { label: 'ขั้นตอนการทำงาน', href: 'process' },
    { label: 'ผลงานที่ผ่านมา', href: 'portfolio' },
    { label: 'ทำไมต้องเลือกเรา', href: 'why-us' },
    { label: 'รีวิวจากลูกค้า', href: 'testimonials' },
    { label: 'ติดต่อเรา', href: 'contact' }
  ];

  const serviceLinks = [
    { label: 'ออกแบบสถาปัตยกรรม', href: '/services/architectural-design' },
    { label: 'ก่อสร้างบ้านใหม่', href: '/services/new-home-construction' },
    { label: 'ต่อเติมและปรับปรุง', href: '/services/renovation' },
    { label: 'ออกแบบตกแต่งภายใน', href: '/services/interior-design' },
    { label: 'งานระบบอาคาร', href: '/services/system-works' },
    { label: 'ที่ปรึกษาโครงการ', href: '/services/consulting' }
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'Youtube' },
  ];

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${href}`);
    }
  };

  return (
    <footer className="relative bg-dark text-primary-foreground pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <h3 className="font-display text-2xl font-bold tracking-wider mb-0 text-white group-hover:text-primary transition-colors">
                PHANOM<span className="text-primary">PHRAI PK</span>
              </h3>
              <div className="h-0.5 w-12 bg-primary mt-1 transform origin-left transition-transform group-hover:scale-x-150" />
            </Link>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              ผู้เชี่ยวชาญด้านงานรับเหมาก่อสร้างและออกแบบสถาปัตยกรรมระดับพรีเมียม 
              เรามุ่งเน้นคุณภาพ มาตรฐานวิศวกรรม และความพึงพอใจสูงสุดของลูกค้า
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-500 group"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-4 h-4 text-primary-foreground/40 group-hover:text-primary transition-colors" />
                </a>
              ))}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-500 group"
                aria-label="LINE Official"
                title="LINE Official"
              >
                <span className="font-mono text-xs font-bold text-primary-foreground/40 group-hover:text-primary transition-colors">LINE</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-8 relative inline-block">
              เมนูแนะนำ
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary" />
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="group flex items-center font-body text-sm text-primary-foreground/50 hover:text-primary transition-all cursor-pointer text-left focus:outline-none"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-8 relative inline-block">
              บริการของเรา
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary" />
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <Link 
                    href={service.href}
                    className="group flex items-center font-body text-sm text-primary-foreground/50 hover:text-primary transition-all"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-8 relative inline-block">
              ติดต่อเรา
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary" />
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-body text-xs text-primary-foreground/40 mb-1 uppercase tracking-wider font-semibold">สำนักงานใหญ่</p>
                  <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                    123 หมู่ 4 ต.พนมไพร อ.พนมไพร <br />จ.ร้อยเอ็ด 45140
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <a href="tel:0922620227" className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors">
                  092-262-0227
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <a href="mailto:contact@phanomphrai.com" className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors">
                  contact@phanomphrai.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEO Keyword Section --- */}
        <div className="mt-16 pt-12 border-t border-primary-foreground/5 bg-white/[0.02] -mx-6 px-6 lg:-mx-8 lg:px-8 rounded-t-3xl backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h5 className="font-display text-xl font-bold text-white mb-4">
              ศูนย์รวมบริการรับเหมาก่อสร้างและรับสร้างบ้านแบบครบวงจร
            </h5>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 opacity-30" />
            <p className="font-body text-xs sm:text-sm text-primary-foreground/40 leading-loose">
              <strong>บริษัท พนมไพร คอนสตรัคชั่น (Phanomphrai Construction)</strong> เรามอบความมั่นใจในงาน <strong>รับสร้างบ้านหน้าแคบ รับสร้างบ้าน 2 ชั้น รับสร้างบ้านโมเดิร์น (Modern) รับสร้างบ้านหรู</strong> และ <strong>ออกแบบบ้านเดี่ยว</strong> ครอบคลุมพื้นที่ทั่วประเทศ ดำเนินงานโดย <strong>ผู้รับเหมามืออาชีพ ไม่ทิ้งงาน</strong> มีทีมวิศวกรผู้เชี่ยวชาญดูแลทุกขั้นตอน พร้อมบริการ <strong>รับเหมาต่อเติมบ้าน ต่อเติมห้องครัว ต่อเติมโรงรถ งานรีโนเวทบ้าน (Renovate)</strong> และ <strong>ออกแบบตกแต่งภายใน (Interior Design)</strong> เรายินดี <strong>ประเมินราคาก่อสร้าง ตีราคาสร้างบ้านฟรี คุมงบไม่บานปลาย สร้างบ้านราคาถูก</strong> ได้มาตรฐานสากล
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pb-8">
            {[ 
              { label: 'ผู้รับเหมาก่อสร้าง', href: '#' },
              { label: 'บริษัทรับสร้างบ้าน', href: '#' },
              { label: 'สร้างบ้านโมเดิร์น', href: '#' },
              { label: 'ช่างรับเหมามืออาชีพ', href: '#' },
              { label: 'รับเหมาต่อเติมบ้าน', href: '#' },
              { label: 'ประเมินราคาฟรี', href: '#' },
              { label: 'แบบบ้านสวยๆ', href: '#' },
              { label: 'ผู้รับเหมาไม่ทิ้งงาน', href: '#' },
              { label: 'ต่อเติมครบวงจร', href: '#' }
            ].map((tag) => (
              <Link 
                key={tag.label} 
                href={tag.href}
                className="font-mono text-[10px] uppercase tracking-wider text-primary-foreground/30 hover:text-primary hover:translate-y-[-1px] transition-all"
              >
                #{tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-primary-foreground/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-body text-xs text-primary-foreground/30 mb-1">
              © {new Date().getFullYear()} PHANOMPHRAI CONSTRUCTION. All rights reserved.
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/40">
              Building Masterpieces with Care & Precision
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-primary-foreground/20">
            <Link href="/privacy" className="font-body text-[11px] hover:text-primary-foreground/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-body text-[11px] hover:text-primary-foreground/60 transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-1 font-body text-[11px] text-primary/60">
              <span>Verified Business</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

