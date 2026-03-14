import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import { Shield, Users, Clock, Award } from 'lucide-react';

const features = [
  { icon: Shield, stat: '100%', title: 'วัสดุคุณภาพสูง', desc: 'คัดสรรวัสดุเกรด A จากแบรนด์ชั้นนำ ไม่มีการตัดมุมด้านคุณภาพ' },
  { icon: Users, stat: '50+', title: 'ทีมช่างมืออาชีพ', desc: 'ทีมงานที่ผ่านการฝึกอบรมและมีประสบการณ์ในทุกสาขาก่อสร้าง' },
  { icon: Clock, stat: '98%', title: 'ตรงเวลาทุกโครงการ', desc: 'ระบบบริหารจัดการโครงการที่มีประสิทธิภาพ ส่งมอบงานตามกำหนด' },
  { icon: Award, stat: '2 ปี', title: 'รับประกันงาน', desc: 'รับประกันคุณภาพงานก่อสร้าง 2 ปี พร้อมบริการหลังการขาย' },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-dark text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 font-display text-[16rem] font-bold text-primary-foreground/[0.02] leading-none pointer-events-none select-none">
        WHY
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <span className="section-label mb-4 text-primary-foreground/40 before:bg-primary">ข้อได้เปรียบ</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-16">
            ทำไมต้องเลือก<span className="text-primary">เรา</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="text-center group">
                  <Icon className="w-10 h-10 text-primary mx-auto mb-6" strokeWidth={1.5} />
                  <div className="font-display text-4xl font-bold text-primary mb-3">{f.stat}</div>
                  <h3 className="font-display text-xl font-semibold mb-3">{f.title}</h3>
                  <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="border-t border-primary-foreground/10 pt-12 max-w-3xl mx-auto text-center">
            <blockquote className="font-display text-2xl md:text-3xl italic text-primary-foreground/80 leading-relaxed mb-6">
              "ผลงานออกมาเกินความคาดหมาย ทีมงานมืออาชีพ ใส่ใจทุกรายละเอียด แนะนำเลยครับ"
            </blockquote>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              — คุณสมชาย วิทยากร, เจ้าของโครงการ วิลล่า พัทยา
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyUsSection;
