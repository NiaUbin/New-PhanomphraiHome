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

  const showNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

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

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#828282]/80 backdrop-blur-2xl flex items-center justify-center text-foreground"
      >
        {/* Decorative Brown Gradient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/10 blur-[120px] rounded-full" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full transition-all duration-300 group"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-black/70 group-hover:text-primary transition-colors" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          {images.length > 1 && (
            <>
              <button
                onClick={showPrev}
                className="absolute left-4 md:left-8 z-[110] p-4 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full transition-all duration-300 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-black/70 group-hover:text-primary transition-colors" />
              </button>
              <button
                onClick={showNext}
                className="absolute right-4 md:left-auto md:right-8 z-[110] p-4 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full transition-all duration-300 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-black/70 group-hover:text-primary transition-colors" />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative max-w-5xl w-full aspect-[4/3] max-h-[80vh]"
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
              <div className="flex items-center justify-center w-full h-full text-muted-foreground bg-muted/20">
                ไม่พบรูปภาพ
              </div>
            )}
          </motion.div>

          {images.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {index + 1} / {images.length}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
