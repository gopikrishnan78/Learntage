import React from 'react';
import { motion } from 'framer-motion';

interface SplashProps {
  onDone: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onDone }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6 }}
    >
      <div className="orb orb-a opacity-40" />
      <div className="orb orb-b opacity-40" />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500 shadow-[0_0_60px_rgba(139,92,246,0.55)]"
          animate={{ rotate: [0, 6, -6, 0], y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-3xl font-black text-white">L</span>
        </motion.div>
        <h1 className="font-display text-5xl font-extrabold text-white sm:text-6xl">Learntage</h1>
        <p className="mt-3 text-lg text-slate-300">Learn smarter. Think independently.</p>
        <motion.div
          className="mx-auto mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            onAnimationComplete={onDone}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
