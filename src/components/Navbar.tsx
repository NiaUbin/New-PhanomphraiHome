'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHome ? '#services' : '/#services', label: 'บริการ' },
    { href: isHome ? '#process' : '/#process', label: 'ขั้นตอน' },
    { href: isHome ? '#portfolio' : '/#portfolio', label: 'ผลงาน' },
    { href: isHome ? '#why-us' : '/#why-us', label: 'ทำไมต้องเรา' },
    { href: isHome ? '#testimonials' : '/#testimonials', label: 'รีวิว' },
    { href: isHome ? '#contact' : '/#contact', label: 'ติดต่อ' },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
          PHANOM<span className="text-primary">PHRAI PK</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative font-mono text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <Link href={isHome ? '#contact' : '/#contact'} className="btn-primary ml-4">
            <span>ขอใบเสนอราคา</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={closeMobile}
              className="block font-mono text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href={isHome ? '#contact' : '/#contact'} onClick={closeMobile} className="btn-primary inline-block">
            <span>ขอใบเสนอราคา</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;