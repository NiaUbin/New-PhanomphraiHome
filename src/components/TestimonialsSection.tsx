'use client';

import { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { stars: 5, quote: 'บ้านสวยมาก ตรงตามแบบที่ออกแบบไว้ ทีมงานมืออาชีพ ทำงานเรียบร้อย ประทับใจมากค่ะ', name: 'คุณพิมพ์ชนก ศรีสุข', type: 'บ้านเดี่ยว — กรุงเทพฯ' },
  { stars: 5, quote: 'ต่อเติมหลังบ้านเสร็จเร็วกว่ากำหนด งานคุณภาพ ราคาสมเหตุสมผล ตรงไหนไม่พอใจแก้ไขให้ทันที', name: 'คุณธนวัฒน์ อมรชัย', type: 'ต่อเติม — นนทบุรี' },
  { stars: 5, quote: 'รีโนเวทคอนโดเก่าให้กลายเป็นห้องใหม่หมด ดีไซน์สวย ใช้งานได้จริง คุ้มค่ามากครับ', name: 'คุณนภัส จันทร์ดี', type: 'รีโนเวท คอนโด — สุขุมวิท' },
  { stars: 5, quote: 'ทำบ้านตั้งแต่เริ่มต้นจนเสร็จ ทุกขั้นตอนโปร่งใส เห็นความคืบหน้าตลอด ไว้ใจได้จริงๆ', name: 'คุณวิภาวดี รัตนกุล', type: 'บ้านใหม่ — เชียงใหม่' },
  { stars: 5, quote: 'ออกแบบห้องน้ำใหม่ สวยหรู เหมือนสปาส่วนตัว ดีมากค่ะ จะกลับมาใช้บริการอีกแน่นอน', name: 'คุณอรุณ ทองดี', type: 'รีโนเวท — กรุงเทพฯ' },
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-card relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label mb-4">Customer reviews</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4">
                เสียงจาก<span className="text-primary">ลูกค้า</span>
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] bg-background border border-border/50 p-8 snap-start group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-body font-semibold text-foreground text-sm">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{t.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
