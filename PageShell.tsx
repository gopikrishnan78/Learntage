import React from 'react';
import { motion } from 'framer-motion';

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({
  eyebrow,
  title,
  subtitle,
  actions,
  children,
}) => {
  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-600">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {title}
            </h1>
            {subtitle && <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>}
          </div>
          {actions}
        </motion.div>
        {children}
      </div>
    </div>
  );
};
