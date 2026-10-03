import React from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressRing';
import { demoAchievements, demoStudyStreak } from '../data/demoData';

export const Achievements: React.FC = () => {
  return (
    <PageShell
      eyebrow="Trophy room"
      title="Achievements"
      subtitle={`${demoStudyStreak.currentStreak}-day flame. Unlock the rest by solving independently.`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {demoAchievements.map((ach, i) => {
          const unlocked = Boolean(ach.unlockedAt);
          const pct = Math.min(100, Math.round((ach.progress / ach.target) * 100));
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className={`relative overflow-hidden ${unlocked ? '' : 'opacity-80'}`}>
                <motion.div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-300/40 to-fuchsia-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative">
                  <div className="mb-3 text-4xl">{ach.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{ach.category}</p>
                  <h3 className="mt-1 text-xl font-bold">{ach.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{ach.description}</p>
                  <div className="mt-4">
                    <ProgressBar progress={pct} color={unlocked ? 'bg-success-500' : 'bg-primary-500'} />
                    <p className="mt-2 text-xs text-slate-500">
                      {ach.progress} / {ach.target}
                      {unlocked ? ' · unlocked' : ''}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
};
