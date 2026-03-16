'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}

const Lightbox = ({ images = [], initialIndex = 0, open, onClose }: LightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const showNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Sync index immediately when Lightbox opens (prevents wrong image flash)
  const [lastOpen, setLastOpen] = useState(open);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      setIndex(initialIndex);
      setDirection(0);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, showNext, showPrev]);

  // Variants สำหรับ Framer Motion เลื่อนสไลด์ซ้าย-ขวา
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center text-white"
        >
        {/* Decorative Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-primary/20 blur-[150px] rounded-full opacity-50" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 group"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          {images.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-4 md:left-8 z-[110] p-4 bg-black/20 hover:bg-black/40 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </button>
              
              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-4 md:right-8 z-[110] p-4 bg-black/20 hover:bg-black/40 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </>
          )}

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
              }}
              className="absolute flex items-center justify-center w-full max-w-6xl max-h-[85vh] px-16"
              style={{ aspectRatio: "16/9" }}
            >
              {images[index] ? (
                <Image
                  src={images[index]}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground bg-white/5 backdrop-blur-md rounded-2xl">
                  ไม่พบรูปภาพ
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {images.length > 0 && (
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-white/50 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-white">{index + 1}</span> / {images.length}
            </div>
          )}
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
