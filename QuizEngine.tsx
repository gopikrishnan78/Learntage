import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, Sparkles, XCircle } from 'lucide-react';
import type { LearningMode, Question } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressRing';
import { Card } from '../ui/Card';
import { getDifficultyColor } from '../../lib/utils';

interface QuizEngineProps {
  questions: Question[];
  mode?: LearningMode;
  title?: string;
  onExit: () => void;
  onFinish?: (result: { score: number; hintsUsed: number; total: number }) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  mode = 'practice',
  title = 'Practice session',
  onExit,
  onFinish,
}) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const examLock = mode === 'exam';

  const options = useMemo(() => {
    if (!question) return [];
    if (question.options?.length) return question.options;
    if (question.type === 'true_false') return ['True', 'False'];
    return [];
  }, [question]);

  const isCorrect = (answer: string) =>
    answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

  const submit = () => {
    if (!selected.trim() || revealed) return;
    if (isCorrect(selected)) setScore((s) => s + 1);
    setRevealed(true);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      onFinish?.({ score: isCorrect(selected) && revealed ? score : score, hintsUsed, total: questions.length });
      return;
    }
    setIndex((i) => i + 1);
    setSelected('');
    setHintLevel(0);
    setRevealed(false);
  };

  if (!question) {
    return (
      <Card className="text-center">
        <p className="text-slate-600">No questions in this set yet.</p>
        <Button className="mt-4" onClick={onExit}>
          Back
        </Button>
      </Card>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-sky-400/10 to-transparent" />
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-violet-500" />
          <h2 className="font-display text-3xl font-extrabold text-slate-900">Session complete</h2>
          <p className="mt-2 text-slate-600">{title}</p>
          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4">
            <Stat label="Score" value={`${score}/${questions.length}`} />
            <Stat label="Accuracy" value={`${pct}%`} />
            <Stat label="Hints used" value={`${hintsUsed}`} />
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {pct >= 80
              ? 'Strong independent work. AI assistance stayed low — keep this rhythm.'
              : 'Review the missed concepts, then retry without extra hints.'}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="outline" onClick={onExit}>
              Leave
            </Button>
            <Button
              onClick={() => {
                setIndex(0);
                setSelected('');
                setHintLevel(0);
                setRevealed(false);
                setScore(0);
                setHintsUsed(0);
                setDone(false);
              }}
            >
              Retry
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">{title}</p>
          <p className="text-sm text-slate-500">
            Question {index + 1} of {questions.length}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit
        </Button>
      </div>
      <ProgressBar progress={((index + (revealed ? 1 : 0)) / questions.length) * 100} className="mb-6" />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
        >
          <Card>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
              {question.previousYear && <Badge variant="info">Previous year</Badge>}
              {examLock && <Badge variant="warning">Exam mode — no hints</Badge>}
            </div>
            <h3 className="text-xl font-bold leading-relaxed text-slate-900">{question.text}</h3>

            <div className="mt-6 space-y-3">
              {options.length > 0 ? (
                options.map((option) => {
                  const chosen = selected === option;
                  const showKey = revealed && option === question.correctAnswer;
                  const showWrong = revealed && chosen && !isCorrect(option);
                  return (
                    <motion.button
                      key={option}
                      whileTap={{ scale: 0.99 }}
                      disabled={revealed}
                      onClick={() => setSelected(option)}
                      className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-medium transition-all ${
                        showKey
                          ? 'border-success-500 bg-success-50 text-success-800'
                          : showWrong
                            ? 'border-danger-400 bg-danger-50 text-danger-800'
                            : chosen
                              ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-lg'
                              : 'border-slate-200 bg-white hover:border-primary-300'
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })
              ) : (
                <input
                  className="input-field"
                  placeholder="Type your answer"
                  value={selected}
                  disabled={revealed}
                  onChange={(e) => setSelected(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                />
              )}
            </div>

            {!examLock && hintLevel > 0 && (
              <div className="mt-5 space-y-2">
                {question.hints.slice(0, hintLevel).map((hint, i) => (
                  <div key={hint} className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Hint {i + 1}: {hint}
                  </div>
                ))}
              </div>
            )}

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 rounded-2xl p-4 ${isCorrect(selected) ? 'bg-success-50' : 'bg-danger-50'}`}
              >
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  {isCorrect(selected) ? (
                    <CheckCircle2 className="h-5 w-5 text-success-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-danger-600" />
                  )}
                  {isCorrect(selected) ? 'Correct' : `Answer: ${question.correctAnswer}`}
                </div>
                <p className="text-sm text-slate-700">{question.explanation}</p>
              </motion.div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {!examLock ? (
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Lightbulb className="h-4 w-4" />}
                  disabled={hintLevel >= question.hints.length || revealed}
                  onClick={() => {
                    setHintLevel((h) => h + 1);
                    setHintsUsed((h) => h + 1);
                  }}
                >
                  Hint ladder
                </Button>
              ) : (
                <span />
              )}
              {!revealed ? (
                <Button onClick={submit} disabled={!selected.trim()}>
                  Check answer
                </Button>
              ) : (
                <Button onClick={next}>{index + 1 >= questions.length ? 'See results' : 'Next'}</Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl bg-slate-50 py-4">
    <div className="text-2xl font-black text-slate-900">{value}</div>
    <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
  </div>
);
