import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressRing';
import { demoWeaknesses, physicsConcepts } from '../data/demoData';
import { conceptLookup } from '../data/content';

interface RecoveryProps {
  onPractice: () => void;
}

export const Recovery: React.FC<RecoveryProps> = ({ onPractice }) => {
  const [plans, setPlans] = useState(demoWeaknesses);

  const toggleStep = (weaknessId: string, stepId: string) => {
    setPlans((items) =>
      items.map((w) => {
        if (w.id !== weaknessId || !w.recoveryPlan) return w;
        const steps = w.recoveryPlan.steps.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
        const progress = Math.round((steps.filter((s) => s.completed).length / steps.length) * 100);
        return { ...w, recoveryPlan: { ...w.recoveryPlan, steps, progress } };
      })
    );
  };

  return (
    <PageShell
      eyebrow="Weakness clinic"
      title="Recovery Center"
      subtitle="Every error pattern gets a five-step ladder: relearn, guide, independent practice, quiz, retest."
    >
      <div className="space-y-6">
        {plans.map((weakness, i) => {
          const name = conceptLookup[weakness.conceptId]?.name ?? physicsConcepts.find((c) => c.id === weakness.conceptId)?.name;
          return (
            <motion.div key={weakness.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{weakness.errorPattern}</p>
                    {weakness.rootCause && (
                      <p className="mt-1 text-sm text-slate-500">Root cause: {weakness.rootCause}</p>
                    )}
                  </div>
                  <Badge variant={weakness.severity === 'moderate' ? 'warning' : 'info'}>{weakness.severity}</Badge>
                </div>
                {weakness.recoveryPlan ? (
                  <>
                    <ProgressBar progress={weakness.recoveryPlan.progress} className="mb-5" />
                    <div className="space-y-3">
                      {weakness.recoveryPlan.steps.map((step, idx) => (
                        <button
                          key={step.id}
                          onClick={() => toggleStep(weakness.id, step.id)}
                          className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                            step.completed ? 'border-success-200 bg-success-50' : 'border-slate-200 hover:border-primary-300'
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                              step.completed ? 'bg-success-500 text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {step.completed ? <Check className="h-4 w-4" /> : idx + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{step.title}</p>
                            <p className="text-sm text-slate-600">{step.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <Button className="mt-5" onClick={onPractice}>
                      Jump to independent practice
                    </Button>
                  </>
                ) : (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    Mild confusion between similar terms. A short compare-and-contrast session is enough — no full recovery
                    ladder yet.
                    <Button className="mt-4" size="sm" onClick={onPractice}>
                      Clarify with practice
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
};
