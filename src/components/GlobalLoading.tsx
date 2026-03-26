"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LETTERS = "PHANOMPHRAI".split("");

function LoaderCore() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);
    const t1 = setTimeout(() => setProgress(38), 200);
    const t2 = setTimeout(() => setProgress(65), 650);
    const t3 = setTimeout(() => setProgress(85), 1200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [isLoading]);

  useEffect(() => {
    let tid: NodeJS.Timeout;
    const finish = () => {
      setProgress(100);
      tid = setTimeout(() => setIsLoading(false), 700);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
    return () => clearTimeout(tid);
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      setProgress(100);
      const t = setTimeout(() => setIsLoading(false), 450);
      return () => clearTimeout(t);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href || target.hasAttribute("download")) return;
      try {
        const url = new URL(target.href);
        const isInternal = url.origin === window.location.origin;
        const isSamePage =
          url.pathname === window.location.pathname &&
          url.search === window.location.search;
        const isAnchorLink =
          !!url.hash && url.pathname === window.location.pathname;
        if (isInternal && !isSamePage && !isAnchorLink && target.target !== "_blank") {
          setIsLoading(true);
        }
      } catch (error) {
        // Silently ignore if URL parsing fails (e.g. mailto:, tel:, or invalid links)
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col items-center justify-center gap-9"
          style={{ backgroundColor: "#F5F0E8" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Geometric mark ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              width: 96,
              height: 96,
              perspective: "360px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Outer square — rotates on Y */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 88,
                height: 88,
                border: "1.5px solid #92400e",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Cross hairlines — co-rotate with outer square */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 88,
                height: 1.5,
                background: "#92400e22",
                transformStyle: "preserve-3d",
              }}
            />
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 88,
                height: 1,
                background: "#92400e18",
                transformStyle: "preserve-3d",
                transform: "rotate(90deg)",
              }}
            />

            {/* Mid square — rotates on X */}
            <motion.div
              animate={{ rotateX: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 62,
                height: 62,
                border: "1px solid #92400eaa",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Inner square — rotates on Z, reversed */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: 38,
                height: 38,
                border: "0.75px solid #92400e66",
                transformStyle: "preserve-3d",
              }}
            />

            {/* Center dot */}
            <motion.div
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.6, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#92400e",
              }}
            />
          </motion.div>

          {/* ── Wordmark — letters stagger in ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}
          >
            <div style={{ display: "flex" }}>
              {LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: "#1C1208",
                    display: "inline-block",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.57rem",
                letterSpacing: "0.32em",
                color: "#9C7A52",
                textTransform: "uppercase" as const,
              }}
            >
              Architecture &amp; Construction
            </motion.span>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            style={{
              width: 140,
              height: 1,
              backgroundColor: "#D6C9B0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "#78583A",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GlobalLoading() {
  return (
    <Suspense fallback={null}>
      <LoaderCore />
    </Suspense>
  );
}