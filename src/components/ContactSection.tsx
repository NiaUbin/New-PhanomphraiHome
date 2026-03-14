'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

const projectTypes = ['เลือกประเภทงาน', 'ก่อสร้างบ้านใหม่', 'ต่อเติม/ปรับปรุง', 'รีโนเวท', 'ตกแต่งภายใน', 'งานระบบ', 'ที่ปรึกษา'];
const budgets = ['เลือกงบประมาณโดยประมาณ', 'ต่ำกว่า 500,000 บาท', '500,000 - 1,000,000 บาท', '1,000,000 - 3,000,000 บาท', '3,000,000 - 5,000,000 บาท', '5,000,000 - 10,000,000 บาท', 'มากกว่า 10,000,000 บาท'];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: '', budget: '', details: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับภายใน 24 ชั่วโมง');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <span className="section-label mb-4">ติดต่อ</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-16">
            ติดต่อ<span className="text-primary">เรา</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อ-นามสกุล"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="เบอร์โทรศัพท์"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="อีเมล"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t === 'เลือกประเภทงาน' ? '' : t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {budgets.map((b) => (
                    <option key={b} value={b === 'เลือกงบประมาณโดยประมาณ' ? '' : b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="รายละเอียดโครงการ"
                rows={5}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-card border border-border px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <span>ส่งข้อมูล</span>
              </button>
            </form>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal delay={200}>
            <div className="space-y-8">
              {[
                { icon: Phone, label: 'โทรศัพท์', value: '02-XXX-XXXX / 08X-XXX-XXXX' },
                { icon: Mail, label: 'อีเมล', value: 'info@formabuild.co.th' },
                { icon: MapPin, label: 'LINE ID', value: '@formabuild' },
                { icon: Clock, label: 'เวลาทำการ', value: 'จันทร์ - เสาร์ 08:00 - 18:00' },
              ].map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{info.label}</p>
                      <p className="font-body text-foreground">{info.value}</p>
                    </div>
                  </div>
                );
              })}

              {/* Map placeholder */}
              <div className="w-full h-64 bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">แผนที่สำนักงาน</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
