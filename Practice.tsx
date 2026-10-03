import React, { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { QuizEngine } from '../components/practice/QuizEngine';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { practiceBank } from '../data/content';
import { physicsConcepts } from '../data/demoData';
import { useAppStore } from '../store';

interface PracticeProps {
  startKey?: string;
}

export const Practice: React.FC<PracticeProps> = ({ startKey }) => {
  const [session, setSession] = useState<string | null>(startKey ?? null);
  const setMode = useAppStore((s) => s.setCurrentMode);

  const sets = useMemo(
    () => [
      {
        id: 'mixed',
        title: 'Adaptive mix',
        blurb: 'AI-weighted set across weak and strong concepts.',
        questions: practiceBank,
      },
      {
        id: 'vectors',
        title: 'Vector recovery',
        blurb: 'Targeted drill for sign errors and components.',
        questions: practiceBank.filter((q) => q.conceptIds.includes('concept-2') || q.tags.includes('vectors')),
      },
      {
        id: 'newton',
        title: 'Newton fluency',
        blurb: 'Keep Laws of Motion sharp with timed independent solves.',
        questions: practiceBank.filter((q) => q.conceptIds.includes('concept-1')),
      },
      {
        id: 'electro',
        title: 'Electrostatics',
        blurb: 'Potential vs field — stop the mix-up.',
        questions: practiceBank.filter((q) => q.conceptIds.includes('concept-3') || q.conceptIds.includes('concept-4')),
      },
    ],
    []
  );

  const active = sets.find((s) => s.id === session) ?? (session ? sets[0] : null);

  if (active) {
    return (
      <PageShell eyebrow="Practice" title={active.title} subtitle={active.blurb}>
        <QuizEngine
          questions={active.questions}
          mode="practice"
          title={active.title}
          onExit={() => {
            setSession(null);
            setMode('learning');
          }}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="AI Practice Arena"
      title="Train Like The Exam Is Watching"
      subtitle="The AI Hint Ladder unlocks step-by-step guidance. Skipping hints boosts your signature Independence Score."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sets.map((set) => (
          <Card key={set.id} glass hover className="flex flex-col justify-between border-slate-200/80 shadow-xl group">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-primary-500/20">
                    🎯
                  </div>
                  <h3 className="text-xl font-black text-slate-900 font-display tracking-tight">{set.title}</h3>
                </div>
                <Badge variant="info" className="font-bold">{set.questions.length} Questions</Badge>
              </div>
              <p className="mb-6 text-xs font-medium text-slate-600 leading-relaxed">{set.blurb}</p>
            </div>
            <Button
              variant="primary"
              className="w-full font-bold shadow-md shadow-primary-500/20 py-3 text-xs"
              onClick={() => {
                setMode('practice');
                setSession(set.id);
              }}
            >
              Start Practice Session →
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-lg space-y-3">
        <h3 className="font-display text-base font-black text-slate-900 flex items-center gap-2">
          <span>🔥</span> Concept Heat & Mastery Map
        </h3>
        <p className="text-xs text-slate-500">Real-time concept confidence metrics tracked by your AI companion:</p>
        <div className="flex flex-wrap gap-2.5 pt-2">
          {physicsConcepts.map((c) => (
            <div
              key={c.id}
              className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-2 shadow-sm ${
                c.status === 'weak'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : c.status === 'mastered'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}
            >
              <span>{c.name}</span>
              <span className="px-1.5 py-0.5 rounded bg-white/80 font-display">{c.mastery}%</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};
