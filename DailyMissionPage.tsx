import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Zap,
  Target,
  BookOpen,
  Lightbulb,
  FlaskConical,
  FileText,
  ArrowRight,
  RefreshCw,
  Award,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressRing';
import { useAppStore } from '../store';
import type { MissionTask } from '../types';

interface DailyMissionPageProps {
  onNavigate: (path: string) => void;
}

export const DailyMissionPage: React.FC<DailyMissionPageProps> = ({ onNavigate }) => {
  const { dailyMission, completeMissionTask, studentProfile, setDailyMission } = useAppStore();
  const [selectedDuration, setSelectedDuration] = useState<number>(
    studentProfile?.availableStudyTime || 180
  );

  const mission = dailyMission || {
    id: 'dm-1',
    userId: 'user-1',
    date: new Date(),
    tasks: [
      {
        id: 't-1',
        type: 'revise' as const,
        title: 'Physics — Revise Gauss\'s Law & Flux',
        description: 'Review surface integral formulation and 3 standard symmetry derivations.',
        reason: 'Mastery in Electric Flux is 52% and it has not been revised in 5 days.',
        estimatedTime: 25,
        benefit: '+6% Electric Flux mastery',
        resourceId: 'concept-gauss',
        completed: true,
        priority: 1,
      },
      {
        id: 't-2',
        type: 'practice' as const,
        title: 'Mathematics — 5 Definite Integration Problems',
        description: 'Solve substitution and integration by parts with definite limits.',
        reason: 'Integration mastery is 58%. Frequent practice prevents formula decay.',
        estimatedTime: 35,
        benefit: '+8% Definite Integrals mastery',
        resourceId: 'concept-integration',
        completed: true,
        priority: 2,
      },
      {
        id: 't-3',
        type: 'assess' as const,
        title: 'Chemistry — Organic Reaction Mini Quiz',
        description: '10 quick questions on Aldehyde nucleophilic addition & oxidation.',
        reason: 'Weakness detected in C=O addition selectivity.',
        estimatedTime: 25,
        benefit: '+5% Organic chemistry exam readiness',
        resourceId: 'concept-aldehydes',
        completed: false,
        priority: 3,
      },
      {
        id: 't-4',
        type: 'recover' as const,
        title: 'Physics — Rebuild Electric Field Foundation',
        description: 'Complete 3-step recovery ladder before moving to Capacitance.',
        reason: 'Electric Field is prerequisite for Capacitors; current mastery is 48%.',
        estimatedTime: 30,
        benefit: 'Unlocks Capacitance module without friction',
        resourceId: 'concept-efield',
        completed: false,
        priority: 4,
      },
    ],
    totalEstimatedTime: 115,
    progress: 50,
    completed: false,
  };

  const completedCount = mission.tasks.filter((t) => t.completed).length;
  const progressPct = Math.round((completedCount / mission.tasks.length) * 100);

  const taskTypeConfig = {
    learn: { icon: BookOpen, color: 'text-sky-600 bg-sky-50 border-sky-200', label: 'Concept Learning', path: '/subjects' },
    practice: { icon: Target, color: 'text-purple-600 bg-purple-50 border-purple-200', label: 'Targeted Practice', path: '/practice' },
    revise: { icon: Lightbulb, color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Smart Revision', path: '/revision' },
    assess: { icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'Assessment', path: '/exams' },
    recover: { icon: FlaskConical, label: 'Weakness Recovery', color: 'text-rose-600 bg-rose-50 border-rose-200', path: '/recovery' },
  };

  const handleGenerateMission = (mins: number) => {
    setSelectedDuration(mins);
    // Dynamic generation based on time
    let generatedTasks: MissionTask[] = [];
    if (mins <= 60) {
      generatedTasks = [
        {
          id: `t-${Date.now()}-1`,
          type: 'revise',
          title: 'Physics — Gauss\'s Law High-Yield Flash Review',
          description: 'Focus exclusively on flux formulas and Gaussian sphere cases.',
          reason: 'Short 60m session: prioritized your #1 weakest concept.',
          estimatedTime: 20,
          benefit: '+5% Electrostatics boost',
          resourceId: 'concept-gauss',
          completed: false,
          priority: 1,
        },
        {
          id: `t-${Date.now()}-2`,
          type: 'practice',
          title: 'Math — 3 Quick Integration Problems',
          description: 'Rapid-fire definite integral evaluation.',
          reason: 'Maintenance practice for Calculus.',
          estimatedTime: 35,
          benefit: '+4% Speed & accuracy',
          resourceId: 'concept-integration',
          completed: false,
          priority: 2,
        },
      ];
    } else {
      generatedTasks = [
        {
          id: `t-${Date.now()}-1`,
          type: 'revise',
          title: 'Physics — Revise Gauss\'s Law & Flux',
          description: 'Review surface integral formulation and 3 standard symmetry derivations.',
          reason: 'Mastery in Electric Flux is 52% and it has not been revised in 5 days.',
          estimatedTime: 30,
          benefit: '+6% Electric Flux mastery',
          resourceId: 'concept-gauss',
          completed: false,
          priority: 1,
        },
        {
          id: `t-${Date.now()}-2`,
          type: 'practice',
          title: 'Mathematics — 8 Integration Problems (Standard + JEE)',
          description: 'Solve substitution, trigonometric powers, and by parts.',
          reason: 'Deep session allows higher complexity problem solving.',
          estimatedTime: 50,
          benefit: '+10% Calculus mastery',
          resourceId: 'concept-integration',
          completed: false,
          priority: 2,
        },
        {
          id: `t-${Date.now()}-3`,
          type: 'recover',
          title: 'Chemistry — Aldehyde Reaction Mechanism Clinic',
          description: 'Step-by-step nucleophilic attack practice with mechanism breakdown.',
          reason: 'Weak area detected in last diagnostic.',
          estimatedTime: 40,
          benefit: '+8% Organic Chemistry confidence',
          resourceId: 'concept-aldehydes',
          completed: false,
          priority: 3,
        },
        {
          id: `t-${Date.now()}-4`,
          type: 'assess',
          title: 'Full Daily Mini-Mock',
          description: '15-question mixed speed drill across Physics, Chemistry, Math.',
          reason: 'Validates today\'s learning under timed conditions.',
          estimatedTime: 40,
          benefit: '+0.4x Exam stamina',
          resourceId: 'daily-mock',
          completed: false,
          priority: 4,
        },
      ];
    }

    setDailyMission({
      id: `dm-${Date.now()}`,
      userId: 'user-1',
      date: new Date(),
      tasks: generatedTasks,
      totalEstimatedTime: generatedTasks.reduce((acc, t) => acc + t.estimatedTime, 0),
      progress: 0,
      completed: false,
    });
  };

  return (
    <PageShell
      eyebrow="AI Learning Loop"
      title="Daily Mission Command"
      subtitle="Dynamic, high-leverage study missions generated specifically for your cognitive state today."
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Mission Status Header Card */}
        <Card glass className="border-primary-200/60 overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="info">
                  <Sparkles className="w-3 h-3 mr-1 inline" /> AI Generated for Arun Kumar
                </Badge>
                <Badge variant={progressPct === 100 ? 'success' : 'warning'}>
                  {completedCount}/{mission.tasks.length} Complete
                </Badge>
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-display">
                {progressPct === 100 ? '🎉 All Mission Tasks Complete!' : 'Today\'s 4-Stage Learning Mission'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Estimated duration: <strong className="text-slate-900">{mission.totalEstimatedTime} minutes</strong> · Focus: Weakness Recovery & Retention
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mission Progress</p>
                <p className="text-2xl font-black text-primary-600 font-display">{progressPct}%</p>
              </div>
              <div className="w-20">
                <ProgressBar progress={progressPct} />
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Study Time Selector */}
        <Card glass>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Adjust Available Study Time</p>
                <p className="text-xs text-slate-500">AI automatically scales task depth to fit your schedule.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: '60 min (Express)', value: 60 },
                { label: '120 min (Standard)', value: 120 },
                { label: '180 min (Target JEE)', value: 180 },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleGenerateMission(item.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDuration === item.value
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary-600" />
            Scheduled Tasks
          </h3>

          <AnimatePresence>
            {mission.tasks.map((task, index) => {
              const cfg = taskTypeConfig[task.type];
              const Icon = cfg.icon;

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card
                    hover
                    className={`transition-all ${
                      task.completed
                        ? 'border-emerald-200/80 bg-emerald-50/40'
                        : 'border-slate-200/80 bg-white/90'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Checkbox + Title + Reason */}
                      <div className="flex items-start gap-4 flex-1">
                        <button
                          onClick={() => completeMissionTask(task.id)}
                          className="mt-1 transition-transform active:scale-90"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-300 hover:text-primary-500" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <Badge className={cfg.color}>
                              <Icon className="w-3 h-3 mr-1 inline" />
                              {cfg.label}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              {task.estimatedTime} min
                            </span>
                            {task.priority === 1 && (
                              <Badge variant="warning">High Priority</Badge>
                            )}
                          </div>

                          <h4
                            className={`text-base font-bold font-display ${
                              task.completed
                                ? 'text-slate-500 line-through'
                                : 'text-slate-900'
                            }`}
                          >
                            {task.title}
                          </h4>

                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {task.description}
                          </p>

                          {/* AI Recommendation Reason Banner */}
                          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                            <div className="flex items-start gap-1.5">
                              <span className="font-bold text-primary-700 shrink-0">💡 Why this is recommended:</span>
                              <span className="text-slate-600">{task.reason}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-emerald-700 font-semibold">
                              <Zap className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>Benefit: {task.benefit}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                        {!task.completed ? (
                          <Button
                            size="sm"
                            className="text-xs font-bold"
                            onClick={() => onNavigate(cfg.path)}
                          >
                            Launch Task <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        ) : (
                          <Badge variant="success" size="md">
                            Completed ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Foundation Protection Notice */}
        <Card glass className="border-amber-200/60 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 font-display">Foundation Protection Engine Active</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Learntage detected that <strong>Electric Flux</strong> and <strong>Electric Field</strong> are prerequisites for upcoming advanced electromagnetism topics. Advanced assessments remain gently gated until foundation mastery crosses 70%.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};
