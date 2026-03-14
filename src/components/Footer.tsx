import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const navLinks = ['บริการ', 'ขั้นตอน', 'ผลงาน', 'ทำไมต้องเรา', 'รีวิว', 'ติดต่อ'];
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
                <li key={link}>
                  <a href={`#${link}`} className="font-body text-sm text-primary-foreground/50 hover:text-primary transition-colors">
                    {link}
                  </a>
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
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">ติดตามเรา</h4>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={`Social ${i}`}
                >
                  <Icon className="w-4 h-4 text-primary-foreground/60" />
                </a>
              ))}
              {/* LINE */}
              <a
                href="#"
                className="w-10 h-10 border border-primary-foreground/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="LINE"
              >
                <span className="font-mono text-xs font-bold text-primary-foreground/60">L</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-primary-foreground/30">
            © 2025 PHANOMPHRAI. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/20">
            ใบอนุญาตก่อสร้างเลขที่ กทม. XXXX/XXXX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
