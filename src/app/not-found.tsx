'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #e8d5bc 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956a22 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 text-center px-8">
        {/* Eyebrow line */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-8" style={{ backgroundColor: "#c0622f" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: "#c0622f", fontFamily: "var(--font-body, Georgia, serif)" }}
          >
            ข้อผิดพลาด
          </span>
          <div className="h-px w-8" style={{ backgroundColor: "#c0622f" }} />
        </div>

           {/* 404 */}
            <h1
              className="mb-4 font-bold leading-none"
              style={{
                fontSize: "clamp(4rem, 12vw, 7rem)",
                color: "#1a1209",
                fontFamily: "var(--font-heading, Georgia, serif)",
                letterSpacing: "-0.02em",
                opacity: 0.08,
                lineHeight: 1,
              }}
            >
              404
            </h1>

        <div style={{ marginTop: "-0.75rem" }}>
          <h2
            className="mb-3 text-2xl font-semibold"
            style={{ color: "#1a1209", fontFamily: "var(--font-heading, Georgia, serif)" }}
          >
            ไม่พบหน้าที่ต้องการ
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#7a6a56" }}>
            หน้าที่คุณค้นหาอาจถูกย้าย ลบออก หรือไม่มีอยู่ในระบบ
          </p>
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-8 h-px w-16"
          style={{ backgroundColor: "#c0622f", opacity: 0.4 }}
        />

        <Link href="/" className="inline-block px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200"
          style={{
            backgroundColor: "#c0622f",
            color: "#fff",
            fontFamily: "var(--font-body, sans-serif)",
            letterSpacing: "0.12em",
            fontSize: "0.75rem",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#a3501f")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#c0622f")}
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
}