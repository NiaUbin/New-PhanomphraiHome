import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import { Shield, Users, Clock, Award, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Shield, stat: '100%', title: 'วัสดุคุณภาพสูง', desc: 'คัดสรรวัสดุเกรด A จากแบรนด์ชั้นนำ ไม่มีการตัดมุมด้านคุณภาพ' },
  { icon: Users, stat: '50+', title: 'ทีมช่างมืออาชีพ', desc: 'ทีมงานที่ผ่านการฝึกอบรมและมีประสบการณ์ในทุกสาขาก่อสร้าง' },
  { icon: Clock, stat: '98%', title: 'ตรงเวลาทุกโครงการ', desc: 'ระบบบริหารจัดการโครงการที่มีประสิทธิภาพ ส่งมอบงานตามกำหนด' },
  { icon: Award, stat: '2 ปี', title: 'รับประกันงาน', desc: 'รับประกันคุณภาพงานก่อสร้าง 2 ปี พร้อมบริการหลังการขาย' },
];

const WhyUsSection = () => {
  return (
    <section
      id="why-us"
      className="py-12 md:py-24 lg:py-32 text-primary-foreground relative"
    >
      {/* Optimized Fixed Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ clipPath: 'inset(0)' }}>
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop")',
            transform: 'translateZ(0)' // HW acceleration
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-neutral-950/85" />
      </div>

      <div className="absolute top-10 right-1/2 translate-x-1/2 md:translate-x-0 md:top-0 md:right-0 font-display text-[6rem] md:text-[12rem] lg:text-[16rem] font-bold text-primary-foreground/[0.04] leading-none pointer-events-none select-none z-0">
        WHY
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="section-label mb-4 text-primary-foreground/40 before:bg-primary after:bg-primary md:after:hidden">Why us</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16">
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
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2 md:mb-3">{f.stat}</div>
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-3">{f.title}</h3>
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

        {/* SEO & Description Text Section */}
        <ScrollReveal delay={200}>
          <div className="mt-24 lg:mt-32 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Description & Keywords */}
              <div className="lg:sticky lg:top-32">
                <p className="text-xs tracking-widest text-primary/80 mb-3 uppercase font-mono">รายละเอียด</p>
                <h3 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 md:mb-8 text-primary-foreground leading-[1.2]">
                  บริษัท<span className="text-primary">รับสร้างบ้าน</span> : <br className="hidden md:block" />Phanomphrai Construction
                </h3>
                <div className="w-16 h-1 bg-primary/80 mb-8 rounded-full" />
                <p className="font-body text-base md:text-lg text-primary-foreground/70 leading-loose">
                  ด้วยประสบการณ์ในฐานะ <strong>บริษัทรับสร้างบ้าน บริการรับเหมาก่อสร้าง</strong> แบบครบวงจร 
                  ผู้เชี่ยวชาญด้าน <strong>ออกแบบบ้าน สร้างบ้านหรู สร้างบ้านโมเดิร์น</strong> และ <strong>รับเหมาต่อเติมบ้าน</strong> ด้วยมาตรฐานวิศวกรรมระดับสากล 
                  เราคัดสรร <strong>วัสดุก่อสร้างคุณภาพสูง</strong> ควบคุมงานทุกขั้นตอนโดย 
                  <strong>ทีมช่างผู้รับเหมามืออาชีพ</strong> ไม่ทิ้งงาน โครงสร้างแข็งแรง ปลอดภัย 
                  พร้อมให้คำปรึกษา <strong>ตีราคาสร้างบ้าน</strong> และ <strong>คุมงบประมาณก่อสร้างไม่ให้บานปลาย</strong> 
                  เพื่อให้คุณได้แบบบ้านสวยๆ ตรงตามความต้องการ เนรมิตบ้านในฝันของคุณให้เป็นจริง
                </p>

                <div className="mt-10 flex flex-wrap gap-2">
                  {[
                    'รับสร้างบ้าน', 'รับเหมาก่อสร้าง', 'บริษัทรับสร้างบ้าน',
                    'ออกแบบบ้านหรู', 'ช่างรับเหมามืออาชีพ', 'ต่อเติมบ้าน',
                    'สร้างบ้านครบวงจร', 'ผู้รับเหมาไม่ทิ้งงาน', 'สร้างบ้านโมเดิร์น',
                    'ตีราคาสร้างบ้านฟรี', 'รับเหมาต่อเติม'
                  ].map((keyword, idx) => (
                    <span key={idx} className="px-3 py-1.5 text-[10px] md:text-[11px] font-mono rounded-full bg-primary/5 text-primary-foreground/50 border border-primary-foreground/5 cursor-default hover:text-primary hover:border-primary/30 transition-colors">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Highlights Card */}
              <div className="relative rounded-[1.5rem] md:rounded-[2rem] border border-primary-foreground/10 bg-primary-foreground/[0.02] p-8 md:p-12 lg:p-14 backdrop-blur-md shadow-2xl">
                {/* Background Glow inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10 rounded-full pointer-events-none" />

                <p className="text-xs tracking-widest text-primary/80 mb-3 uppercase font-mono">ไฮไลต์</p>
                <h4 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-10">
                  จุดเด่น<span className="text-primary">สำคัญ</span>
                </h4>

                <div className="space-y-8 md:space-y-10">
                  {[
                    { 
                      num: '01', 
                      title: 'รับสร้างบ้านและออกแบบบ้านครบวงจร', 
                      desc: 'บริการตั้งแต่ ออกแบบ เขียนแบบ 3D ขออนุญาตก่อสร้าง จนถึงส่งมอบบ้านพร้อมอยู่ คุณไม่ต้องเหนื่อยติดต่อหลายฝ่าย สะดวก รวดเร็ว' 
                    },
                    { 
                      num: '02', 
                      title: 'ช่างรับเหมามืออาชีพ ไม่ทิ้งงาน', 
                      desc: 'หมดปัญหาผู้รับเหมาหนีงาน เรามีทีมงานประจำและควบคุมงานโดยวิศวกรผู้เชี่ยวชาญ ตรวจสอบคุณภาพงานรับเหมาก่อสร้างทุกขั้นตอน' 
                    },
                    { 
                      num: '03', 
                      title: 'วัสดุก่อสร้างคุณภาพสูง เกรดพรีเมียม', 
                      desc: 'คัดสรรวัสดุที่รับรองมาตรฐาน มอก. แข็งแรง ทนทาน เพื่อให้โครงสร้างบ้านของคุณปลอดภัย สวยงาม และอยู่คู่ครอบครัวไปอีกยาวนาน' 
                    },
                    { 
                      num: '04', 
                      title: 'ประเมินราคาก่อสร้าง คุมงบไม่บานปลาย', 
                      desc: 'ให้คำปรึกษาและ ตีราคาสร้างบ้านฟรี โปร่งใส เพื่อให้ได้บ้านตรงใจในงบประมาณที่คุณกำหนดได้ คุ้มค่าทุกตารางเมตร' 
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 md:gap-5 items-start">
                      <div className="flex-shrink-0 mt-1 w-8 h-8 md:w-11 md:h-11 rounded-full border border-primary/40 text-primary flex items-center justify-center font-mono text-xs md:text-sm">
                        {item.num}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-display font-semibold text-primary-foreground text-base md:text-lg mb-1 md:mb-2">
                          {item.title} <span className="hidden md:inline text-primary-foreground/30 ml-1">:</span>
                        </h5>
                        <p className="font-body text-xs md:text-base text-primary-foreground/60 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyUsSection;
