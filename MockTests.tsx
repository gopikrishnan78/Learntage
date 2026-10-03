import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trophy,
  Target,
  ArrowRight,
  RotateCcw,
  Zap,
  FileText,
  ChevronRight,
  Star,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressRing';

interface MockQuestion {
  id: string;
  text: string;
  options: string[];
  correct: string;
  subject: string;
  marks: number;
  negativeMarks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const mockTestBank: MockQuestion[] = [
  { id: 'mt1', text: 'A particle moves with initial velocity 20 m/s and decelerates at 4 m/s². Time to stop is:', options: ['2 s', '4 s', '5 s', '8 s'], correct: '5 s', subject: 'Physics', marks: 4, negativeMarks: 1, difficulty: 'easy' },
  { id: 'mt2', text: 'The work done by a conservative force in a closed loop is:', options: ['Positive', 'Negative', 'Zero', 'Depends on path'], correct: 'Zero', subject: 'Physics', marks: 4, negativeMarks: 1, difficulty: 'easy' },
  { id: 'mt3', text: '∫₀^π sin(x) dx equals:', options: ['0', '1', '2', 'π'], correct: '2', subject: 'Mathematics', marks: 4, negativeMarks: 1, difficulty: 'medium' },
  { id: 'mt4', text: 'The rate constant of a first-order reaction has units:', options: ['mol/L·s', 's⁻¹', 'L/mol·s', 'L²/mol²·s'], correct: 's⁻¹', subject: 'Chemistry', marks: 4, negativeMarks: 1, difficulty: 'easy' },
  { id: 'mt5', text: 'Electric field due to an infinite plane sheet of charge density σ is:', options: ['σ/ε₀', 'σ/2ε₀', '2σ/ε₀', 'σ/4πε₀'], correct: 'σ/2ε₀', subject: 'Physics', marks: 4, negativeMarks: 1, difficulty: 'hard' },
  { id: 'mt6', text: 'The derivative of ln(sin x) is:', options: ['cot x', 'tan x', 'cos x / sin x', 'Both A and C'], correct: 'Both A and C', subject: 'Mathematics', marks: 4, negativeMarks: 1, difficulty: 'medium' },
  { id: 'mt7', text: 'Which of the following is a nucleophile?', options: ['BF₃', 'AlCl₃', 'NH₃', 'H⁺'], correct: 'NH₃', subject: 'Chemistry', marks: 4, negativeMarks: 1, difficulty: 'medium' },
  { id: 'mt8', text: 'The angle between vectors A and B is 60°. If |A|=|B|=5, then |A+B| is:', options: ['5', '5√2', '5√3', '10'], correct: '5√3', subject: 'Mathematics', marks: 4, negativeMarks: 1, difficulty: 'hard' },
  { id: 'mt9', text: 'In SN2 reaction, the attacking nucleophile approaches:', options: ['Same side as leaving group', 'Opposite side to leaving group', 'Top face only', 'Randomly'], correct: 'Opposite side to leaving group', subject: 'Chemistry', marks: 4, negativeMarks: 1, difficulty: 'hard' },
  { id: 'mt10', text: 'A 10 Ω and 20 Ω resistor in parallel. Equivalent resistance is:', options: ['30 Ω', '15 Ω', '6.67 Ω', '5 Ω'], correct: '6.67 Ω', subject: 'Physics', marks: 4, negativeMarks: 1, difficulty: 'medium' },
];

interface MockTest {
  id: string;
  title: string;
  type: 'subject' | 'full' | 'chapter';
  duration: number;
  totalMarks: number;
  questionCount: number;
  subjects: string[];
  icon: string;
  color: string;
}

const availableMocks: MockTest[] = [
  { id: 'mock1', title: 'JEE Full Mock — Paper 1', type: 'full', duration: 60, totalMarks: 40, questionCount: 10, subjects: ['Physics', 'Chemistry', 'Mathematics'], icon: '🎯', color: 'from-primary-500 to-secondary-600' },
  { id: 'mock2', title: 'Physics Unit Test', type: 'subject', duration: 30, totalMarks: 16, questionCount: 4, subjects: ['Physics'], icon: '⚛️', color: 'from-sky-500 to-blue-600' },
  { id: 'mock3', title: 'Mathematics Practice Test', type: 'subject', duration: 25, totalMarks: 12, questionCount: 3, subjects: ['Mathematics'], icon: '📐', color: 'from-purple-500 to-indigo-600' },
  { id: 'mock4', title: 'Chemistry Assessment', type: 'subject', duration: 20, totalMarks: 12, questionCount: 3, subjects: ['Chemistry'], icon: '🧪', color: 'from-emerald-500 to-teal-600' },
];

type TestPhase = 'select' | 'active' | 'results';

interface MockResult {
  questionId: string;
  selected: string | null;
  correct: boolean;
  skipped: boolean;
  marksObtained: number;
}

export const MockTests: React.FC = () => {
  const [phase, setPhase] = useState<TestPhase>('select');
  const [selectedMock, setSelectedMock] = useState<MockTest | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<MockResult[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<MockQuestion[]>([]);

  useEffect(() => {
    if (phase !== 'active' || !selectedMock) return;
    setTimeLeft(selectedMock.duration * 60);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { submitTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, selectedMock?.id]);

  const startTest = (mock: MockTest) => {
    setSelectedMock(mock);
    const qs = mockTestBank.slice(0, mock.questionCount);
    setActiveQuestions(qs);
    setAnswers({});
    setCurrentQ(0);
    setPhase('active');
  };

  const submitTest = () => {
    const res: MockResult[] = activeQuestions.map((q) => {
      const sel = answers[q.id] ?? null;
      const correct = sel === q.correct;
      return {
        questionId: q.id,
        selected: sel,
        correct,
        skipped: sel === null,
        marksObtained: sel === null ? 0 : correct ? q.marks : -q.negativeMarks,
      };
    });
    setResults(res);
    setPhase('results');
  };

  const totalScore = results.reduce((s, r) => s + r.marksObtained, 0);
  const maxScore = activeQuestions.reduce((s, q) => s + q.marks, 0);
  const pct = maxScore > 0 ? Math.round((Math.max(0, totalScore) / maxScore) * 100) : 0;
  const correct = results.filter((r) => r.correct).length;
  const wrong = results.filter((r) => !r.correct && !r.skipped).length;
  const skipped = results.filter((r) => r.skipped).length;

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const timeWarning = timeLeft < 120;

  if (phase === 'active' && selectedMock) {
    const q = activeQuestions[currentQ];
    const currentAnswer = answers[q?.id];
    const attempted = Object.values(answers).filter((v) => v !== null).length;

    return (
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{selectedMock.title}</p>
              <p className="text-sm text-slate-300">Q {currentQ + 1}/{activeQuestions.length} · {attempted} answered</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xl font-black border ${
              timeWarning ? 'border-rose-500/50 bg-rose-900/30 text-rose-300 animate-pulse' : 'border-slate-600 bg-slate-800 text-white'
            }`}>
              <Clock className="w-4 h-4" />
              {mm}:{ss}
            </div>
            <Button size="sm" onClick={submitTest} className="bg-rose-600 hover:bg-rose-500">
              Submit Test
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={q?.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="text-xs border-slate-600 bg-slate-700 text-slate-300">{q?.subject}</Badge>
                    <Badge className={`text-xs ${q?.difficulty === 'easy' ? 'bg-emerald-900/50 text-emerald-300' : q?.difficulty === 'medium' ? 'bg-amber-900/50 text-amber-300' : 'bg-rose-900/50 text-rose-300'}`}>
                      {q?.difficulty}
                    </Badge>
                    <span className="ml-auto text-xs text-slate-400">+{q?.marks} / -{q?.negativeMarks}</span>
                  </div>
                  <p className="text-lg font-semibold text-white leading-relaxed mb-6">{q?.text}</p>
                  <div className="space-y-3">
                    {q?.options.map((opt, i) => {
                      const labels = ['A', 'B', 'C', 'D'];
                      const chosen = currentAnswer === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                            chosen
                              ? 'border-primary-400 bg-primary-900/30 text-primary-200'
                              : 'border-slate-600 bg-slate-700/50 text-slate-200 hover:border-slate-500 hover:bg-slate-700'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            chosen ? 'bg-primary-500 text-white' : 'bg-slate-600 text-slate-300'
                          }`}>{labels[i]}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: null }))}>
                      Clear
                    </Button>
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => setCurrentQ((i) => Math.max(0, i - 1))} disabled={currentQ === 0}>
                        ← Prev
                      </Button>
                      <Button size="sm" onClick={() => setCurrentQ((i) => Math.min(activeQuestions.length - 1, i + 1))}
                        disabled={currentQ === activeQuestions.length - 1}>
                        Next →
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-4 sticky top-24">
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">Question Palette</p>
              <div className="grid grid-cols-5 gap-1.5 mb-4">
                {activeQuestions.map((aq, i) => {
                  const ans = answers[aq.id];
                  return (
                    <button
                      key={aq.id}
                      onClick={() => setCurrentQ(i)}
                      className={`w-full aspect-square rounded-lg text-xs font-bold transition-all ${
                        i === currentQ
                          ? 'ring-2 ring-primary-400 bg-primary-700 text-white'
                          : ans !== undefined && ans !== null
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-600" /> <span className="text-slate-400">Answered ({attempted})</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-600" /> <span className="text-slate-400">Not answered ({activeQuestions.length - attempted})</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const subjectMap: Record<string, { correct: number; total: number }> = {};
    activeQuestions.forEach((q, i) => {
      if (!subjectMap[q.subject]) subjectMap[q.subject] = { correct: 0, total: 0 };
      subjectMap[q.subject].total++;
      if (results[i]?.correct) subjectMap[q.subject].correct++;
    });

    return (
      <PageShell eyebrow="Test Analysis" title="Mock Test Results" subtitle="Detailed performance breakdown with AI insights.">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Score Card */}
          <Card glass className={`border-2 ${pct >= 70 ? 'border-emerald-300' : pct >= 50 ? 'border-amber-300' : 'border-rose-300'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className={`text-4xl font-black font-display ${pct >= 70 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {Math.max(0, totalScore)}/{maxScore}
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-1">Score (after -ve)</p>
              </div>
              <div>
                <div className="text-4xl font-black font-display text-emerald-600">{correct}</div>
                <p className="text-xs text-slate-500 font-semibold mt-1">Correct</p>
              </div>
              <div>
                <div className="text-4xl font-black font-display text-rose-600">{wrong}</div>
                <p className="text-xs text-slate-500 font-semibold mt-1">Wrong (−{wrong} marks)</p>
              </div>
              <div>
                <div className="text-4xl font-black font-display text-slate-400">{skipped}</div>
                <p className="text-xs text-slate-500 font-semibold mt-1">Skipped</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>Percentile Score</span>
                <span>{pct}%</span>
              </div>
              <ProgressBar progress={pct} />
            </div>
          </Card>

          {/* Subject Breakdown */}
          <Card glass>
            <CardHeader className="mb-4"><CardTitle>Subject-wise Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(subjectMap).map(([subject, data]) => {
                  const subPct = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={subject}>
                      <div className="flex justify-between text-sm font-semibold mb-1.5">
                        <span>{subject}</span>
                        <span className={subPct >= 70 ? 'text-emerald-600' : subPct >= 50 ? 'text-amber-600' : 'text-rose-600'}>
                          {data.correct}/{data.total} correct ({subPct}%)
                        </span>
                      </div>
                      <ProgressBar progress={subPct} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card glass>
            <CardHeader className="mb-4"><CardTitle>Question-by-Question Review</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeQuestions.map((q, i) => {
                  const r = results[i];
                  return (
                    <div key={q.id} className={`rounded-2xl border p-4 ${
                      r?.correct ? 'border-emerald-200 bg-emerald-50' : r?.skipped ? 'border-slate-200 bg-slate-50' : 'border-rose-200 bg-rose-50'
                    }`}>
                      <div className="flex items-start gap-3">
                        {r?.correct ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> :
                          r?.skipped ? <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> :
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{q.text}</p>
                          {!r?.skipped && (
                            <p className={`text-xs mt-1 ${r?.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                              Your answer: <strong>{r?.selected}</strong>
                              {!r?.correct && <> · Correct: <strong className="text-emerald-700">{q.correct}</strong></>}
                            </p>
                          )}
                          {r?.skipped && <p className="text-xs text-slate-500 mt-1">Skipped</p>}
                        </div>
                        <span className={`text-sm font-black ${r?.marksObtained > 0 ? 'text-emerald-600' : r?.marksObtained < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                          {r?.marksObtained > 0 ? '+' : ''}{r?.marksObtained}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setPhase('select')}>
              <RotateCcw className="w-4 h-4 mr-2" /> Back to Tests
            </Button>
            <Button className="flex-1" onClick={() => selectedMock && startTest(selectedMock)}>
              Retake Test <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  // Select Phase
  return (
    <PageShell
      eyebrow="Mock Tests"
      title="Test Your Readiness"
      subtitle="Full-length and subject-wise mocks with JEE-style negative marking and real-time timer."
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {availableMocks.map((mock, i) => (
            <motion.div key={mock.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card hover className="h-full">
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${mock.color} mb-5`} />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-3xl">{mock.icon}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{mock.title}</h3>
                  </div>
                  <Badge variant={mock.type === 'full' ? 'info' : 'default'}>{mock.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mock.subjects.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">{s}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { icon: Clock, val: `${mock.duration} min` },
                    { icon: FileText, val: `${mock.questionCount} Qs` },
                    { icon: Star, val: `${mock.totalMarks} marks` },
                  ].map(({ icon: Icon, val }) => (
                    <div key={val} className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Icon className="w-3 h-3" /> {val}
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4">
                  <p className="text-xs text-amber-700 font-semibold">
                    +{mockTestBank[0].marks} correct · −{mockTestBank[0].negativeMarks} wrong · 0 skipped
                  </p>
                </div>
                <Button className="w-full" onClick={() => startTest(mock)}>
                  Start Test <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Previous Attempts */}
        <Card glass>
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { test: 'Physics Unit Test', score: 28, max: 40, date: '2 days ago', trend: 'up' },
                { test: 'JEE Full Mock', score: 52, max: 80, date: '5 days ago', trend: 'up' },
                { test: 'Chemistry Assessment', score: 18, max: 36, date: '1 week ago', trend: 'down' },
              ].map((r) => {
                const pct = Math.round((r.score / r.max) * 100);
                return (
                  <div key={r.test} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${pct >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {pct}%
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-900">{r.test}</p>
                      <p className="text-xs text-slate-500">{r.score}/{r.max} marks · {r.date}</p>
                    </div>
                    {r.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-rose-500" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
};


