"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if it's the very first time the app mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialLoad(false);
    }, 1800); // Initial splash duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialLoad) return; // Ignore path changes during initial load gap
    
    // Trigger loading on route change
    setIsLoading(true);
    
    // We mock the transition time because NextJS 13+ app router doesn't give us
    // the exact "route change start" and "route change complete" events smoothly yet.
    // It changes the pathname only AFTER fetching. But doing an overlay for 600ms
    // right after the path changes feels like a fast, responsive transition.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [pathname, isInitialLoad]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={isInitialLoad ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={isInitialLoad ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-medium text-primary tracking-[0.2em] mb-4">
                PHANOMPHRAI
              </h1>
              <p className="text-sm font-body text-muted-foreground uppercase tracking-widest text-center">
                Architecture & Construction
              </p>
            </motion.div>
            
            <div className="w-48 md:w-64 h-[2px] bg-border overflow-hidden rounded-full mt-4">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isInitialLoad ? 1.5 : 0.6, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
