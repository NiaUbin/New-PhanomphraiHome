"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff, Home } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState<string | null>(null);
  const [isLoading, setIsLoading]   = useState(false);
  const [showPw, setShowPw]         = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsLoading(false);
    }
  };

  const ORANGE = "#c9601a";

  return (
    <div className="min-h-screen flex relative" style={{ background: "#f0ebe3", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif" }}>
      
      {/* ── Return to Home (Top Right) ── */}
      <Link 
        href="/" 
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 flex items-center gap-2 group transition-all duration-300 px-4 py-2 rounded-full border border-transparent hover:border-[#c9601a30] hover:bg-[#c9601a08]"
        style={{ color: ORANGE }}
      >
        <Home className="w-[15px] h-[15px] group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
          กลับสู่หน้าหลัก
        </span>
      </Link>

      {/* ── Left decorative panel (desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-14"
        style={{ background: "#2a2118" }}>

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }} />

        {/* Accent lines */}
        <div className="absolute top-0 right-0 w-[3px] h-full" style={{ background: ORANGE }} />
        <div className="absolute bottom-0 left-0 w-40 h-[3px]" style={{ background: ORANGE }} />

        {/* Top brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-0.5 mb-20">
            <span className="text-2xl font-bold tracking-widest text-white">PHANOM</span>
            <span className="text-2xl font-bold tracking-widest" style={{ color: ORANGE }}>PHRAI</span>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px]" style={{ background: ORANGE }} />
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: ORANGE }}>Admin Dashboard</p>
            </div>
            <h2 className="text-4xl font-bold text-white leading-snug mb-6">
              จัดการข้อมูล<br />
              <span style={{ color: ORANGE }}>อย่างมืออาชีพ</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a7264" }}>
              ระบบจัดการเว็บไซต์สำหรับทีมงาน<br />
              PHANOMPHRAI รับก่อสร้างและออกแบบ
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="w-8 h-[2px] mb-4" style={{ background: ORANGE }} />
          <p className="text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
            "สร้างบ้านในฝัน ด้วยทีมผู้เชี่ยวชาญกว่า 12 ปี"
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-0.5 mb-10">
          <span className="text-xl font-bold tracking-widest" style={{ color: "#2a2118" }}>PHANOM</span>
          <span className="text-xl font-bold tracking-widest" style={{ color: ORANGE }}>PHRAI</span>
        </div>

        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-9">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-[2px]" style={{ background: ORANGE }} />
              <p className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: ORANGE }}>เข้าสู่ระบบ</p>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#2a2118" }}>Admin Access</h1>
            <p className="text-sm" style={{ color: "#8a7a6a" }}>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm"
                style={{ background: `${ORANGE}12`, border: `1px solid ${ORANGE}35`, color: ORANGE }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide uppercase transition-colors duration-200"
                style={{ color: focusField === 'email' ? ORANGE : '#7a6a5a' }}>
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-200"
                  style={{ color: focusField === 'email' ? ORANGE : '#b0a090' }} />
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusField('email')} onBlur={() => setFocusField(null)}
                  placeholder="admin@phanomphrai.com"
                  className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl focus:outline-none transition-all duration-300 placeholder:text-stone-400"
                  style={{
                    background: focusField === 'email' ? '#fff' : '#e8e1d8',
                    border: `1.5px solid ${focusField === 'email' ? ORANGE : 'transparent'}`,
                    color: '#2a2118',
                    boxShadow: focusField === 'email' ? `0 0 0 3px ${ORANGE}15` : 'none',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide uppercase transition-colors duration-200"
                style={{ color: focusField === 'pw' ? ORANGE : '#7a6a5a' }}>
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-200"
                  style={{ color: focusField === 'pw' ? ORANGE : '#b0a090' }} />
                <input
                  type={showPw ? 'text' : 'password'} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusField('pw')} onBlur={() => setFocusField(null)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 text-sm rounded-xl focus:outline-none transition-all duration-300 placeholder:text-stone-400"
                  style={{
                    background: focusField === 'pw' ? '#fff' : '#e8e1d8',
                    border: `1.5px solid ${focusField === 'pw' ? ORANGE : 'transparent'}`,
                    color: '#2a2118',
                    boxShadow: focusField === 'pw' ? `0 0 0 3px ${ORANGE}15` : 'none',
                  }}
                />
                <button type="button" tabIndex={-1}
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: '#b0a090' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#b0a090'; }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-60 mt-2"
              style={{
                background: ORANGE,
                color: '#fff',
                boxShadow: `0 8px 20px ${ORANGE}40`,
              }}
              onMouseEnter={e => { if (!isLoading) { const el = e.currentTarget as HTMLElement; el.style.background='#b5541a'; el.style.boxShadow=`0 10px 28px ${ORANGE}55`; } }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background=ORANGE; el.style.boxShadow=`0 8px 20px ${ORANGE}40`; }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }} />
              {isLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" />กำลังเข้าสู่ระบบ...</>
                : <><span>เข้าสู่ระบบ</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}