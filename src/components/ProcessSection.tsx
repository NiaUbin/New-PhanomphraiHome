import ScrollReveal from './ScrollReveal';
import { MessageCircle, PenTool, Calculator, HardHat, CheckCircle } from 'lucide-react';

const steps = [
  { num: '01', icon: MessageCircle, title: 'ปรึกษาฟรี', desc: 'พูดคุยความต้องการ สไตล์ที่ชอบ และงบประมาณเบื้องต้น' },
  { num: '02', icon: PenTool, title: 'วางแผน & ออกแบบ', desc: 'ออกแบบแปลนและ 3D ให้เห็นภาพก่อนก่อสร้างจริง' },
  { num: '03', icon: Calculator, title: 'เสนอราคา', desc: 'จัดทำใบเสนอราคาโปร่งใส แจกแจงรายละเอียดทุกรายการ' },
  { num: '04', icon: HardHat, title: 'ก่อสร้าง', desc: 'ลงมือก่อสร้างด้วยทีมช่างมืออาชีพ รายงานความคืบหน้าสม่ำเสมอ' },
  { num: '05', icon: CheckCircle, title: 'ส่งมอบงาน', desc: 'ตรวจสอบคุณภาพ ส่งมอบงาน พร้อมรับประกัน 2 ปี' },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20rem] font-bold text-foreground/[0.02] leading-none pointer-events-none select-none">
        PROCESS
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <span className="section-label mb-4">กระบวนการ</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-16">
            ขั้นตอนการ<span className="text-primary">ทำงาน</span>
          </h2>
        </ScrollReveal>

        {/* Desktop horizontal / Mobile vertical */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-px border-t-2 border-dashed border-primary/20" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="relative text-center group">
                  <div className="font-display text-6xl font-bold text-primary/10 mb-2 group-hover:text-primary/20 transition-colors duration-300">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 mx-auto bg-background border-2 border-primary/30 flex items-center justify-center mb-4 relative z-10 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
