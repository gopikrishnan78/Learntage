import React, { useEffect, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { QuizEngine } from '../components/practice/QuizEngine';
import { demoAssessments } from '../data/content';
import { Clock, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';

export const Exams: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const setMode = useAppStore((s) => s.setCurrentMode);
  const exam = demoAssessments.find((e) => e.id === activeId);

  useEffect(() => {
    if (!exam) return;
    setSeconds(exam.duration * 60);
    const id = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [exam?.id]);

  if (exam) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return (
      <PageShell
        eyebrow="Examination"
        title={exam.title}
        subtitle={exam.reason}
        actions={
          <div className="rounded-2xl bg-slate-900 px-4 py-2 font-mono text-lg text-white shadow-lg">
            {mm}:{ss}
          </div>
        }
      >
        <QuizEngine
          questions={exam.questions}
          mode="exam"
          title={exam.title}
          onExit={() => {
            setActiveId(null);
            setMode('learning');
          }}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Examinations"
      title="Test when the AI says you're ready"
      subtitle="Proactive papers appear when mastery, practice volume, and revision line up — not on a random calendar."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoAssessments.map((item) => (
          <Card key={item.id} hover>
            <div className="mb-3 flex items-center gap-2">
              {item.isProactive && (
                <Badge variant="info">
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  AI generated
                </Badge>
              )}
              <Badge>{item.type}</Badge>
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.reason ?? 'Board-style mock coverage.'}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              {item.duration} min · {item.questions.length} questions · {item.totalMarks} marks
            </div>
            <Button
              className="mt-5"
              onClick={() => {
                setMode('exam');
                setActiveId(item.id);
              }}
            >
              Begin paper
            </Button>
          </Card>
        ))}
      </div>
    </PageShell>
  );
};
