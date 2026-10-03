import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { physicsConcepts } from '../data/demoData';
import { revisionQueue, conceptLookup } from '../data/content';
import { RotateCcw } from 'lucide-react';

export const Revision: React.FC = () => {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [flip, setFlip] = useState<string | null>(null);

  const cards = revisionQueue.map((task) => {
    const concept = physicsConcepts.find((c) => c.id === task.conceptId);
    return { ...task, concept };
  });

  return (
    <PageShell
      eyebrow="Spaced memory"
      title="Revision Center"
      subtitle="Cards surface just before forgetting risk spikes. Flip, recall, then mark recovered."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card, i) => {
          const open = flip === card.id;
          const complete = done[card.id];
          return (
            <motion.div key={card.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="perspective-1000">
                <Card className={complete ? 'opacity-60' : ''}>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant={card.priority >= 8 ? 'danger' : 'warning'}>Priority {card.priority}</Badge>
                    <RotateCcw className="h-4 w-4 text-slate-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    {conceptLookup[card.conceptId]?.name ?? card.concept?.name}
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={open ? 'back' : 'front'}
                      initial={{ opacity: 0, rotateX: -8 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      className="mt-3 min-h-[96px] text-sm text-slate-600"
                    >
                      {open
                        ? card.concept?.description ?? 'Recall the core idea, then a worked example from memory.'
                        : card.reason}
                    </motion.p>
                  </AnimatePresence>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setFlip(open ? null : card.id)}>
                      {open ? 'Hide prompt' : 'Flip card'}
                    </Button>
                    <Button size="sm" variant="success" disabled={complete} onClick={() => setDone((d) => ({ ...d, [card.id]: true }))}>
                      {complete ? 'Reviewed' : 'I recalled it'}
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
};
