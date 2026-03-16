import ScrollReveal from './ScrollReveal';
import { Compass, Home, Wrench, Zap, Palette, Users } from 'lucide-react';

const services = [
  { icon: Compass, title: 'ออกแบบสถาปัตยกรรม', subtitle: 'Architecture Design', desc: 'ออกแบบบ้านและอาคารตามสไตล์ที่คุณต้องการ ด้วยทีมสถาปนิกมืออาชีพ' },
  { icon: Home, title: 'ก่อสร้างบ้านใหม่', subtitle: 'New Home Construction', desc: 'สร้างบ้านในฝันของคุณตั้งแต่เริ่มต้นจนสมบูรณ์ ด้วยวัสดุคุณภาพสูง' },
  { icon: Wrench, title: 'ต่อเติม/ปรับปรุง', subtitle: 'Renovation & Addition', desc: 'ต่อเติมและปรับปรุงพื้นที่ให้ตอบโจทย์การใช้งานมากยิ่งขึ้น' },
  { icon: Zap, title: 'งานระบบ', subtitle: 'MEP Systems', desc: 'ระบบไฟฟ้า ประปา แอร์ ครบวงจร ตามมาตรฐานวิศวกรรม' },
  { icon: Palette, title: 'ตกแต่งภายใน', subtitle: 'Interior Design', desc: 'ออกแบบตกแต่งภายในให้สวยงาม ลงตัว และใช้งานได้จริง' },
  { icon: Users, title: 'ที่ปรึกษาโครงการ', subtitle: 'Project Consultation', desc: 'ให้คำปรึกษาด้านการก่อสร้างและการลงทุนอสังหาริมทรัพย์' },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <span className="section-label mb-4">Our services</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            สิ่งที่เรา<span className="text-primary">ทำ</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mb-16">
            เราให้บริการครบวงจรตั้งแต่การออกแบบจนถึงการส่งมอบงาน ด้วยทีมผู้เชี่ยวชาญที่มีประสบการณ์กว่า 12 ปี
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isTall = i === 0 || i === 4;
            return (
              <ScrollReveal
                key={i}
                delay={i * 100}
                className={isTall ? 'md:row-span-2' : ''}
              >
                <div
                  className={`group relative bg-card grain-overlay border border-border/50 p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 h-full ${
                    isTall ? 'min-h-[380px] flex flex-col justify-between' : 'min-h-[180px]'
                  }`}
                >
                  <div>
                    <Icon
                      className="w-8 h-8 text-primary mb-6 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {service.subtitle}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
                    {service.desc}
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

export default ServicesSection;
