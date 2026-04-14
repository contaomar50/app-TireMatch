import React from 'react';
import { motion } from 'motion/react';
import { CircleDot } from 'lucide-react';

export function TireLogo() {
  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="text-accent"
      >
        <CircleDot size={48} strokeWidth={2.5} />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
      </div>
    </div>
  );
}
