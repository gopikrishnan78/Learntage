import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon,
  BookOpen,
  Target,
  Clock,
  Sparkles,
  Shield,
  Save,
  RotateCcw,
  CheckCircle,
  Plus,
  Trash2,
  Brain,
  Sliders,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store';
import { demoUser, demoStudentProfile, demoDailyMission, demoStudyStreak } from '../data/demoData';

export const Settings: React.FC = () => {
  const { user, studentProfile, setUser, setStudentProfile, setDailyMission, updateMetrics } = useAppStore();

  const [name, setName] = useState(user?.name ?? 'Arun Kumar');
  const [studentClass, setStudentClass] = useState(studentProfile?.class ?? '12th Standard');
  const [board, setBoard] = useState(studentProfile?.board ?? 'CBSE');
  const [examGoal, setExamGoal] = useState('JEE Mains + Board Examination');
  const [studyMinutes, setStudyMinutes] = useState(studentProfile?.availableStudyTime ?? 180);
  const [language, setLanguage] = useState('English');
  const [visualLearner, setVisualLearner] = useState(studentProfile?.learningPreferences.visualLearner ?? true);
  const [frequentRevision, setFrequentRevision] = useState(studentProfile?.learningPreferences.needsFrequentRevision ?? true);
  const [practiceFirst, setPracticeFirst] = useState(studentProfile?.learningPreferences.practiceFirst ?? false);

  const [weakAreas, setWeakAreas] = useState<string[]>([
    'Electrostatics',
    'Integration',
    'Organic Reaction Mechanisms',
  ]);
  const [strongAreas, setStrongAreas] = useState<string[]>([
    'Kinematics',
    'Matrices',
    'Chemical Bonding',
  ]);

  const [newWeakInput, setNewWeakInput] = useState('');
  const [newStrongInput, setNewStrongInput] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name });
    }
    if (studentProfile) {
      setStudentProfile({
        ...studentProfile,
        class: studentClass,
        board,
        availableStudyTime: studyMinutes,
        weakSubjects: weakAreas,
        strongSubjects: strongAreas,
        learningPreferences: {
          ...studentProfile.learningPreferences,
          visualLearner,
          needsFrequentRevision: frequentRevision,
          practiceFirst,
        },
      });
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleLoadDemoArun = () => {
    setUser({
      id: 'user-arun',
      name: 'Arun Kumar',
      email: 'arun.kumar@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun',
      createdAt: new Date('2024-01-15'),
    });
    setStudentProfile({
      userId: 'user-arun',
      class: '12th Standard',
      board: 'CBSE',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      strongSubjects: ['Kinematics', 'Matrices', 'Chemical Bonding'],
      weakSubjects: ['Electrostatics', 'Integration', 'Organic Reaction Mechanisms'],
      learningGoals: ['JEE Mains 99+ Percentile', 'CBSE 95%+ in Boards'],
      availableStudyTime: 180,
      learningPreferences: {
        visualLearner: true,
        practiceFirst: false,
        needsFrequentRevision: true,
        prefersDetailedExplanations: true,
      },
      onboardingCompleted: true,
    });
    setName('Arun Kumar');
    setStudentClass('12th Standard');
    setBoard('CBSE');
    setExamGoal('JEE Mains + Board Examination');
    setStudyMinutes(180);
    setLanguage('English');
    setWeakAreas(['Electrostatics', 'Integration', 'Organic Reaction Mechanisms']);
    setStrongAreas(['Kinematics', 'Matrices', 'Chemical Bonding']);
    setVisualLearner(true);
    setFrequentRevision(true);
    setPracticeFirst(false);
    setDailyMission(demoDailyMission);
    updateMetrics({
      overallMastery: 82,
      examReadiness: 76,
      independenceScore: 84,
      consistency: 91,
      aiDependency: 18,
    });
    useAppStore.setState({ studyStreak: demoStudyStreak });

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const addWeakArea = () => {
    if (newWeakInput.trim() && !weakAreas.includes(newWeakInput.trim())) {
      setWeakAreas([...weakAreas, newWeakInput.trim()]);
      setNewWeakInput('');
    }
  };

  const removeWeakArea = (area: string) => {
    setWeakAreas(weakAreas.filter((a) => a !== area));
  };

  const addStrongArea = () => {
    if (newStrongInput.trim() && !strongAreas.includes(newStrongInput.trim())) {
      setStrongAreas([...strongAreas, newStrongInput.trim()]);
      setNewStrongInput('');
    }
  };

  const removeStrongArea = (area: string) => {
    setStrongAreas(strongAreas.filter((a) => a !== area));
  };

  return (
    <PageShell
      eyebrow="Learner Configuration"
      title="Personalized Student Profile"
      subtitle="Configure your academic baseline, weak/strong concepts, and daily availability to drive AI recommendations."
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Preset / Quick Switch Banner */}
        <Card glass className="border-primary-200/60 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-primary-500/20">
                🎓
              </div>
              <div>
                <h3 className="font-bold text-slate-900 font-display">Target Persona: Arun Kumar</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Class 12 CBSE · JEE Target · 3 hrs/day · Weak: Electrostatics, Integration, Organic
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="bg-white text-primary-700 border-primary-300 font-bold hover:bg-primary-50 shrink-0"
              onClick={handleLoadDemoArun}
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset to Arun Kumar Profile
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Profile */}
          <Card glass>
            <CardHeader className="mb-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900 font-display">
                <UserIcon className="w-4 h-4 text-primary-600" />
                Academic Baseline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Class / Standard
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                  >
                    <option value="11th Standard">11th Standard</option>
                    <option value="12th Standard">12th Standard</option>
                    <option value="Dropper / Repeater">Dropper / Repeater</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Board
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none"
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE / ISC">ICSE / ISC</option>
                    <option value="State Board">State Board</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Target Examination Goal
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none"
                  value={examGoal}
                  onChange={(e) => setExamGoal(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Daily Study Window
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none"
                    value={studyMinutes}
                    onChange={(e) => setStudyMinutes(Number(e.target.value))}
                  >
                    <option value={60}>60 minutes (1 hr)</option>
                    <option value={120}>120 minutes (2 hrs)</option>
                    <option value={180}>180 minutes (3 hrs)</option>
                    <option value={240}>240 minutes (4 hrs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Language
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 focus:border-primary-400 focus:outline-none"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Pedagogical Preferences */}
          <Card glass>
            <CardHeader className="mb-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900 font-display">
                <Brain className="w-4 h-4 text-purple-600" />
                AI Learning & Teaching Modes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
                {[
                  {
                    title: 'Visual-First Explanations',
                    desc: 'Prioritize mind maps, diagrams, and physical analogies.',
                    state: visualLearner,
                    setter: setVisualLearner,
                  },
                  {
                    title: 'Smart Spaced Repetition',
                    desc: 'Schedule automated revision tasks before forgetting curve kicks in.',
                    state: frequentRevision,
                    setter: setFrequentRevision,
                  },
                  {
                    title: 'Practice-First (Challenge Mode)',
                    desc: 'Present challenge questions before deep theoretical expositions.',
                    state: practiceFirst,
                    setter: setPracticeFirst,
                  },
                ].map((pref) => (
                  <button
                    key={pref.title}
                    type="button"
                    onClick={() => pref.setter(!pref.state)}
                    className={`w-full flex items-start justify-between p-3.5 rounded-2xl border-2 text-left transition-all ${
                      pref.state
                        ? 'border-primary-400 bg-primary-50/70 text-slate-900'
                        : 'border-slate-200 bg-white/70 text-slate-600'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{pref.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{pref.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        pref.state ? 'bg-primary-600 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {pref.state && <CheckCircle className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weak & Strong Areas Diagnostic Registry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weak Areas */}
          <Card glass className="border-rose-200/60">
            <CardHeader className="mb-3">
              <CardTitle className="flex items-center justify-between text-base font-bold text-slate-900 font-display">
                <div className="flex items-center gap-2 text-rose-700">
                  <span className="p-1.5 rounded-lg bg-rose-100">⚠️</span>
                  <span>Weak Concepts (High AI Priority)</span>
                </div>
                <Badge variant="warning">{weakAreas.length} Flagged</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-3">
                Concepts listed here will receive proactive recovery ladders, early revision alerts, and foundation protection warnings.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {weakAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800"
                  >
                    {area}
                    <button
                      onClick={() => removeWeakArea(area)}
                      className="hover:text-rose-950"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add weak concept..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-rose-400"
                  value={newWeakInput}
                  onChange={(e) => setNewWeakInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addWeakArea()}
                />
                <Button size="sm" variant="outline" className="text-xs" onClick={addWeakArea}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas */}
          <Card glass className="border-emerald-200/60">
            <CardHeader className="mb-3">
              <CardTitle className="flex items-center justify-between text-base font-bold text-slate-900 font-display">
                <div className="flex items-center gap-2 text-emerald-700">
                  <span className="p-1.5 rounded-lg bg-emerald-100">⭐</span>
                  <span>Strong Concepts (Maintenance Mode)</span>
                </div>
                <Badge variant="success">{strongAreas.length} Mastered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-3">
                Strong concepts receive periodic lightweight maintenance challenges rather than repetitive lectures.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {strongAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800"
                  >
                    {area}
                    <button
                      onClick={() => removeStrongArea(area)}
                      className="hover:text-emerald-950"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add strong concept..."
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400"
                  value={newStrongInput}
                  onChange={(e) => setNewStrongInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addStrongArea()}
                />
                <Button size="sm" variant="outline" className="text-xs" onClick={addStrongArea}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-900 text-white shadow-xl">
          <div>
            <p className="text-sm font-bold">Ready to apply learner profile?</p>
            <p className="text-xs text-slate-400">All changes immediately update the Daily Mission engine and AI Companion parameters.</p>
          </div>
          <Button
            size="md"
            className="bg-primary-500 hover:bg-primary-400 text-white font-bold"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-1.5" />
            {savedToast ? 'Saved Successfully! ✓' : 'Save Profile Changes'}
          </Button>
        </div>
      </div>
    </PageShell>
  );
};
