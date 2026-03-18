'use client';

import { CheckCircle, Award, Users, BadgeCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const TestDescript = () => {
  return (
    <section className="py-20 lg:py-10 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <ScrollReveal>
          {/* Main headline */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
              บริษัทรับเหมาก่อสร้าง{' '}
              <span className="text-primary">PHANOMPHRAI PK</span>{' '}
              ให้บริการ รับสร้างบ้านราคาถูก และงานรับเหมาก่อสร้างทุกประเภท
            </h2>
            <p className="mt-4 font-body text-foreground/60 text-base md:text-lg">
              โดยทีมช่างมืออาชีพ ด้วยประสบการณ์กว่า 10 ปี
            </p>
            
            {/* Decorative line */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-border" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px w-16 bg-border" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {/* Sub headline */}
          <div className="text-center mb-10">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
              คุณกำลังมองหาบริษัทรับเหมาก่อสร้าง ที่มีความรับผิดชอบในการทำงานและมีผลงานได้มาตรฐานอยู่หรือเปล่า?
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {/* Description paragraph */}
          <div className="bg-card/50 border border-border/50 rounded-lg p-6 md:p-8 mb-10">
            <p className="font-body text-foreground/70 leading-relaxed text-center text-sm md:text-base">
              เลือกใช้บริการจาก <span className="text-primary font-semibold">PHANOMPHRAI PK</span> ได้เลย เราเป็นบริษัทรับสร้างบ้านราคาถูก 
              ที่ได้รับการการันตีคุณภาพ จากความประทับใจและการบอกต่อของลูกค้าถึง <span className="text-primary font-bold">99%</span> 
              ทำให้มั่นใจได้ว่า การให้บริการรับสร้างบ้าน และรับเหมาก่อสร้างทุกประเภทของเรา จะมีคุณภาพดีได้มาตรฐาน 
              คุ้มค่ากับการลงทุนของคุณ ด้วยประสบการณ์ในการดำเนินธุรกิจรับเหมาสร้างบ้านมายาวนานกว่า 10 ปี 
              ทำให้ผลงานรับเหมาก่อสร้างบ้าน โครงการต่างๆ และฝีมือของทีมงานของเราเป็นที่ยอมรับของลูกค้าทุกราย
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          {/* Trust badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              รู้จริง ทำได้จริง เสร็จจริง
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          {/* Highlight stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-colors duration-300">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">99%</p>
              <p className="font-body text-sm text-foreground/60">
                ยินดีด้วยผลงาน<br />ลูกค้าบอกต่อถึง 99%
              </p>
            </div>
            
            <div className="text-center p-6 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-colors duration-300">
              <BadgeCheck className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">ไม่แรง</p>
              <p className="font-body text-sm text-foreground/60">
                ราคาไม่แรง<br />ผลงานระดับพรีเมียม
              </p>
            </div>
            
            <div className="text-center p-6 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-colors duration-300">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">10 ปี</p>
              <p className="font-body text-sm text-foreground/60">
                ประสบการณ์กว่า<br />10 ปี
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestDescript;
