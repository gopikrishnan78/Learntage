import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Play,
  ChevronRight,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressRing';
import { QuizEngine } from '../components/practice/QuizEngine';
import { practiceBank } from '../data/content';

interface DiagnosisQuestion {
  id: string;
  text: string;
  options: string[];
  correct: string;
  explanation: string;
  conceptTag: string;
}

const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'dq1',
    text: 'State the correct form of Gauss\'s Law: The total electric flux through a closed surface equals...',
    options: ['Total charge × ε₀', 'Total charge / ε₀', 'ε₀ / Total charge', 'Total charge × 4πε₀'],
    correct: 'Total charge / ε₀',
    explanation: 'Gauss\'s Law: Φ = Q_enclosed / ε₀. The flux equals the enclosed charge divided by the permittivity of free space.',
    conceptTag: 'Gauss\'s Law',
  },
  {
    id: 'dq2',
    text: 'The unit of electric flux is:',
    options: ['N/C', 'Nm²/C', 'C/m²', 'V/m'],
    correct: 'Nm²/C',
    explanation: 'Electric flux = E × A. Units = (N/C) × m² = Nm²/C. This is also equivalent to V·m.',
    conceptTag: 'Electric Flux',
  },
  {
    id: 'dq3',
    text: 'Electric field inside a conductor in electrostatic equilibrium is:',
    options: ['Maximum at center', 'Zero', 'Equal to surface field', 'Depends on material'],
    correct: 'Zero',
    explanation: 'In electrostatic equilibrium, free charges rearrange until the net force on each charge is zero. This means E = 0 inside.',
    conceptTag: 'Conductors',
  },
  {
    id: 'dq4',
    text: 'A charge q is placed at the center of a cube. The flux through each face is:',
    options: ['q/ε₀', 'q/6ε₀', 'q/4πε₀', '6q/ε₀'],
    correct: 'q/6ε₀',
    explanation: 'Total flux = q/ε₀. By symmetry, this is equally distributed across all 6 faces. Each face gets q/6ε₀.',
    conceptTag: 'Gauss\'s Law Application',
  },
  {
    id: 'dq5',
    text: 'Coulomb\'s constant k = 1/(4πε₀) has a value of approximately:',
    options: ['9 × 10⁹ Nm²/C²', '6.67 × 10⁻¹¹ Nm²/kg²', '1.6 × 10⁻¹⁹ C', '8.85 × 10⁻¹² C²/Nm²'],
    correct: '9 × 10⁹ Nm²/C²',
    explanation: 'k = 9 × 10⁹ Nm²/C² is Coulomb\'s constant. ε₀ = 8.85 × 10⁻¹² C²/Nm² is the permittivity of free space.',
    conceptTag: 'Coulomb\'s Law',
  },
];

interface ConceptScore {
  concept: string;
  correct: number;
  total: number;
}

type DiagnosisPhase = 'intro' | 'quiz' | 'results';

export const Diagnosis: React.FC = () => {
  const [phase, setPhase] = useState<DiagnosisPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<{ qId: string; correct: boolean; concept: string }[]>([]);
  const [topic, setTopic] = useState('Electrostatics');

  const topics = [
    { name: 'Electrostatics', icon: '⚡', description: 'Electric charge, Coulomb\'s Law, Gauss\'s Law', mastery: 52 },
    { name: 'Integration', icon: '∫', description: 'Definite & indefinite integration techniques', mastery: 58 },
    { name: 'Organic Chemistry', icon: '🧪', description: 'Nomenclature, reactions, mechanisms', mastery: 61 },
    { name: 'Kinematics', icon: '🎯', description: 'Motion, velocity, acceleration', mastery: 88 },
  ];

  const q = diagnosisQuestions[currentQ];

  const submit = () => {
    if (!selected || revealed) return;
    const correct = selected === q.correct;
    setAnswers((prev) => [...prev, { qId: q.id, correct, concept: q.conceptTag }]);
    setRevealed(true);
  };

  const next = () => {
    if (currentQ + 1 >= diagnosisQuestions.length) {
      setPhase('results');
      return;
    }
    setCurrentQ((i) => i + 1);
    setSelected('');
    setRevealed(false);
  };

  const conceptScores = answers.reduce<Record<string, ConceptScore>>((acc, a) => {
    if (!acc[a.concept]) acc[a.concept] = { concept: a.concept, correct: 0, total: 0 };
    acc[a.concept].total++;
    if (a.correct) acc[a.concept].correct++;
    return acc;
  }, {});

  const totalCorrect = answers.filter((a) => a.correct).length;
  const overallPct = Math.round((totalCorrect / diagnosisQuestions.length) * 100);

  const getMasteryLabel = (pct: number) => {
    if (pct >= 80) return { label: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (pct >= 60) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Needs Work', color: 'text-rose-600', bg: 'bg-rose-50' };
  };

  if (phase === 'intro') {
    return (
      <PageShell
        eyebrow="Knowledge Diagnosis"
        title="Where do you really stand?"
        subtitle="A short diagnostic checks your true mastery before we plan your learning path."
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <Card glass className="border-primary-200/60">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">How Diagnosis Works</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Learntage won't assume you know something. Each topic starts with a 5-question diagnostic to measure your actual mastery level.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: '1', label: 'Answer 5 questions', icon: '❓', desc: 'No time pressure — think carefully' },
                { step: '2', label: 'AI evaluates gaps', icon: '🔍', desc: 'Concept-level analysis' },
                { step: '3', label: 'Personalized plan', icon: '🗺️', desc: 'Tailored recovery path' },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-center">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="font-bold text-sm text-slate-900">{s.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <h3 className="text-lg font-bold text-slate-900">Select a Topic to Diagnose</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => {
              const ml = getMasteryLabel(t.mastery);
              return (
                <motion.button
                  key={t.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setTopic(t.name)}
                  className={`text-left rounded-3xl border-2 p-5 transition-all ${
                    topic === t.name
                      ? 'border-primary-400 bg-primary-50/60 shadow-lg shadow-primary-100'
                      : 'border-slate-200 bg-white hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{t.icon}</span>
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${ml.bg} ${ml.color}`}>
                      Current: {t.mastery}% — {ml.label}
                    </span>
                    {topic === t.name && <CheckCircle className="w-4 h-4 text-primary-600" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <Button size="lg" className="w-full" onClick={() => setPhase('quiz')}>
            Start Diagnosis — {topic} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </PageShell>
    );
  }

  if (phase === 'results') {
    return (
      <PageShell eyebrow="Diagnosis Complete" title="Your Concept Map" subtitle="Here's what the AI found about your knowledge gaps.">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card glass className={`border-2 ${overallPct >= 80 ? 'border-emerald-300' : overallPct >= 60 ? 'border-amber-300' : 'border-rose-300'}`}>
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl text-4xl font-black mb-3 ${
                overallPct >= 80 ? 'bg-emerald-100 text-emerald-700' : overallPct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {overallPct}%
              </div>
              <h3 className="text-xl font-bold text-slate-900">Overall Diagnostic Score</h3>
              <p className="text-sm text-slate-600 mt-1">
                {totalCorrect} of {diagnosisQuestions.length} correct · {getMasteryLabel(overallPct).label} understanding
              </p>
            </div>
            <ProgressBar progress={overallPct} />
          </Card>

          <h3 className="text-lg font-bold text-slate-900">Concept-Level Breakdown</h3>
          <div className="space-y-3">
            {Object.values(conceptScores).map((cs) => {
              const pct = Math.round((cs.correct / cs.total) * 100);
              const ml = getMasteryLabel(pct);
              return (
                <Card key={cs.concept} className="flex items-center gap-4 py-3">
                  <div className={`w-2 h-10 rounded-full ${pct >= 80 ? 'bg-emerald-400' : pct >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-slate-900 text-sm">{cs.concept}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${ml.bg} ${ml.color}`}>
                        {pct}% — {ml.label}
                      </span>
                    </div>
                    <ProgressBar progress={pct} />
                  </div>
                  {pct < 60 ? <XCircle className="w-5 h-5 text-rose-500 shrink-0" /> : <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                </Card>
              );
            })}
          </div>

          {overallPct < 70 && (
            <Card glass className="border-amber-200/60 bg-amber-50/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">Foundation Protection Active</p>
                  <p className="text-sm text-amber-800 mt-1">
                    Your score suggests some prerequisite concepts need strengthening before moving to advanced topics. Learntage has generated a recovery plan.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { setPhase('intro'); setCurrentQ(0); setAnswers([]); setSelected(''); setRevealed(false); }}>
              <RotateCcw className="w-4 h-4 mr-2" /> Retake
            </Button>
            <Button className="flex-1">
              View Recovery Plan <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  // Quiz Phase
  return (
    <PageShell eyebrow={`Knowledge Diagnosis — ${topic}`} title={`Question ${currentQ + 1} of ${diagnosisQuestions.length}`} subtitle="Take your time. Think carefully before selecting.">
      <div className="max-w-2xl mx-auto space-y-6">
        <ProgressBar progress={((currentQ + (revealed ? 1 : 0)) / diagnosisQuestions.length) * 100} />

        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <Card>
              <p className="text-lg font-bold text-slate-900 leading-relaxed mb-6">{q.text}</p>
              <div className="space-y-3">
                {q.options.map((opt) => {
                  const chosen = selected === opt;
                  const showCorrect = revealed && opt === q.correct;
                  const showWrong = revealed && chosen && opt !== q.correct;
                  return (
                    <motion.button
                      key={opt}
                      whileTap={{ scale: 0.99 }}
                      disabled={revealed}
                      onClick={() => setSelected(opt)}
                      className={`w-full rounded-2xl border-2 px-4 py-3 text-left font-medium text-sm transition-all ${
                        showCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : showWrong
                          ? 'border-rose-400 bg-rose-50 text-rose-800'
                          : chosen
                          ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-lg'
                          : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {showCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {showWrong && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        {opt}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 rounded-2xl p-4 ${selected === q.correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-2">
                    {selected === q.correct ? (
                      <><CheckCircle className="w-4 h-4 text-emerald-600" /> <span className="text-emerald-800">Correct!</span></>
                    ) : (
                      <><XCircle className="w-4 h-4 text-rose-600" /> <span className="text-rose-800">Incorrect — Answer: {q.correct}</span></>
                    )}
                  </div>
                  <p className="text-sm text-slate-700">{q.explanation}</p>
                </motion.div>
              )}

              <div className="flex justify-end mt-6">
                {!revealed ? (
                  <Button onClick={submit} disabled={!selected}>Check Answer</Button>
                ) : (
                  <Button onClick={next}>
                    {currentQ + 1 >= diagnosisQuestions.length ? 'See Results' : 'Next Question'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2">
          {diagnosisQuestions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i < currentQ
                  ? answers[i]?.correct ? 'bg-emerald-400' : 'bg-rose-400'
                  : i === currentQ
                  ? 'bg-primary-400'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
};
