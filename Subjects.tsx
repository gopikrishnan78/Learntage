import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, ProgressRing } from '../components/ui/ProgressRing';
import { Button } from '../components/ui/Button';
import { fullCurriculum } from '../data/content';
import { getStatusColor } from '../lib/utils';
import type { Subject } from '../types';

interface SubjectsProps {
  onOpenPractice: (subjectId?: string) => void;
  onOpenMindMap: () => void;
}

export const Subjects: React.FC<SubjectsProps> = ({ onOpenPractice, onOpenMindMap }) => {
  const [active, setActive] = React.useState<Subject | null>(fullCurriculum[0]);

  return (
    <PageShell
      eyebrow="Interactive Curriculum"
      title="My Learning"
      subtitle="Every subject is a living map of mastery. Select a subject and tap a chapter to practice or open its neural mind map."
    >
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {fullCurriculum.map((subject, i) => {
          const isActive = active?.id === subject.id;
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(subject)}
              whileHover={{ y: -3 }}
              className={`rounded-3xl border p-6 text-left transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? 'border-primary-500 bg-white/95 shadow-2xl shadow-primary-500/15 ring-2 ring-primary-500/20'
                  : 'border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 shadow-lg shadow-slate-200/30'
              }`}
            >
              <div
                className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-all pointer-events-none"
                style={{ backgroundColor: subject.color }}
              />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="text-4xl drop-shadow-sm mb-2">{subject.icon}</div>
                  <h3 className="font-display text-xl font-black text-slate-900 tracking-tight">{subject.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{subject.chapters.length} Chapters · CBSE Class 12</p>
                </div>
                <ProgressRing progress={subject.overallMastery} size={74} strokeWidth={7} color={subject.color} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {active && (
        <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-6 flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Diagnostic Summary:</span>
            {active.strongAreas.map((area) => (
              <Badge key={area} variant="success" className="font-semibold">
                ✓ Strong: {area}
              </Badge>
            ))}
            {active.weakAreas.map((area) => (
              <Badge key={area} variant="warning" className="font-semibold">
                ⚠️ Target: {area}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {active.chapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card glass hover className="flex flex-col gap-5 sm:flex-row sm:items-center border-slate-200/80">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        CH {chapter.order < 10 ? `0${chapter.order}` : chapter.order}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 font-display tracking-tight">{chapter.name}</h4>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold capitalize ${getStatusColor(chapter.status)}`}>
                        {chapter.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="mb-3 text-xs font-medium text-slate-600 leading-relaxed">{chapter.description}</p>
                    <ProgressBar progress={chapter.mastery} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <Button size="sm" variant="outline" className="font-bold text-xs border-slate-300" onClick={onOpenMindMap} icon={<BookOpen className="h-4 w-4" />}>
                      Mind Map
                    </Button>
                    <Button size="sm" variant="primary" className="font-bold text-xs shadow-md shadow-primary-500/20" onClick={() => onOpenPractice(active.id)} icon={<ChevronRight className="h-4 w-4" />}>
                      Start Practice
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </PageShell>
  );
};
