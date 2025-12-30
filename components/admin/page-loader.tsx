"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="h-16 w-16 border-4 border-[#E7EAEF] rounded-full"></div>
          <div className="absolute top-0 left-0 h-16 w-16 border-4 border-[#6139DB] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-[#3A3C40]">Loading...</p>
      </motion.div>
    </div>
  );
}

