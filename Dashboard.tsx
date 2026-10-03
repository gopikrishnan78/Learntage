import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Target,
  Award,
  Zap,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { TodaysMission } from '../components/dashboard/TodaysMission';
import { TimetableWidget } from '../components/dashboard/TimetableWidget';
import { ChallengesWidget } from '../components/dashboard/ChallengesWidget';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store';
import {
  demoDailyMission,
  demoWeaknesses,
  demoAIInsights,
  demoStudyStreak,
  physicsConcepts,
} from '../data/demoData';
import { getGreeting } from '../lib/utils';
import type { MissionTask } from '../types';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

const conceptName = (id: string) => physicsConcepts.find((c) => c.id === id)?.name ?? 'Concept';

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const {
    user,
    overallMastery,
    examReadiness,
    independenceScore,
    aiDependency,
    dailyMission,
    completeMissionTask,
  } = useAppStore();

  const mission = dailyMission ?? demoDailyMission;

  const handleTaskClick = (taskId: string) => {
    const task = mission.tasks.find((t) => t.id === taskId);
    const map: Record<MissionTask['type'], string> = {
      learn: '/subjects',
      practice: '/practice',
      revise: '/revision',
      assess: '/exams',
      recover: '/recovery',
    };
    if (task) onNavigate(map[task.type]);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 font-display">AI Command Center</p>
          </div>
          <h1 className="font-display text-3xl font-black text-slate-900 sm:text-5xl tracking-tight">
            {getGreeting()}, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Student'}</span>
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 font-medium">Your AI companion already queued the highest-leverage 85 minutes for maximum retention.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8 overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-6 backdrop-blur-xl shadow-xl shadow-amber-500/5"
        >
          <motion.div
            className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-amber-400/20 blur-2xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <motion.div className="text-5xl drop-shadow-md" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                🔥
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight">{demoStudyStreak.currentStreak} Day Streak!</h3>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-700 border border-amber-500/30">Active</span>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-0.5">
                  Personal best: <strong className="text-slate-900">{demoStudyStreak.longestStreak} days</strong> · Total lifetime: <strong className="text-slate-900">{demoStudyStreak.totalDays} study sessions</strong>
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-amber-500/50 text-amber-700 hover:bg-amber-100/60 font-bold shadow-sm" onClick={() => onNavigate('/achievements')}>
              🏆 Trophy Room
            </Button>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Overall Mastery" value={overallMastery || 82} icon={Brain} color="#8b5cf6" trend="up" trendValue="+3% this week" delay={0} />
          <MetricCard title="Exam Readiness" value={examReadiness || 76} icon={Target} color="#0ea5e9" trend="up" trendValue="+5% this week" delay={80} />
          <MetricCard title="Independence" value={independenceScore || 84} icon={Award} color="#10b981" trend="up" trendValue="+7% this week" delay={160} />
          <MetricCard title="AI Dependency" value={aiDependency || 18} suffix="%" icon={Zap} color="#f59e0b" trend="down" trendValue="-4% lower" delay={240} />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <TodaysMission mission={mission} onTaskClick={handleTaskClick} onCompleteTask={completeMissionTask} />
            <TimetableWidget />
          </div>

          <div className="space-y-6">
            <ChallengesWidget />
            
            <Card glass className="border-amber-200/60">
              <CardHeader className="mb-3">
                <CardTitle className="flex items-center justify-between text-base font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <span>Needs Attention</span>
                  </div>
                  <Badge variant="warning">{demoWeaknesses.length} Weakness Areas</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoWeaknesses.slice(0, 3).map((weakness, index) => (
                    <motion.div
                      key={weakness.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 to-orange-50/60 p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="mb-1.5 flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 font-display">{conceptName(weakness.conceptId)}</h4>
                        <Badge variant="warning" size="sm" className="shrink-0 font-semibold">
                          {weakness.severity} Severity
                        </Badge>
                      </div>
                      <p className="mb-3 text-xs text-slate-600 leading-relaxed">{weakness.errorPattern}</p>
                      <Button size="sm" variant="outline" className="w-full text-xs font-bold border-amber-300 text-amber-800 hover:bg-amber-100/80" onClick={() => onNavigate('/recovery')}>
                        Launch Recovery →
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card glass className="border-sky-200/60">
              <CardHeader className="mb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <span>AI Learning Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoAIInsights.slice(0, 2).map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50/90 to-indigo-50/60 p-4 shadow-sm"
                    >
                      <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-sky-700">{insight.title}</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card glass>
              <CardHeader className="mb-3">
                <CardTitle className="text-base font-bold text-slate-900">Learning Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    ['Weak concepts flagged', '4', 'text-amber-600 bg-amber-50'],
                    ['Revision items due', '3', 'text-sky-600 bg-sky-50'],
                    ['Forgetting risk risk', '2', 'text-rose-600 bg-rose-50'],
                    ['Consistency rating', '91%', 'text-emerald-600 bg-emerald-50'],
                  ].map(([label, value, badgeStyle]) => (
                    <div key={label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                      <span className="text-xs font-semibold text-slate-600">{label}</span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${badgeStyle}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-primary-300/80 bg-gradient-to-r from-primary-600 via-indigo-600 to-secondary-600 p-8 text-white shadow-2xl shadow-primary-500/25"
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-inner">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="inline-block px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider mb-2">
                  Proactive Assessment Ready
                </span>
                <h3 className="text-2xl font-black text-white font-display">You're ready for an assessment</h3>
                <p className="text-slate-100 text-sm mt-1 max-w-2xl leading-relaxed">
                  Based on high accuracy in <strong>Laws of Motion</strong> practice problems, a 10-minute assessment will solidify long-term retention.
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-primary-700 hover:bg-slate-100 font-extrabold shadow-xl hover:shadow-2xl shrink-0 text-sm py-4 px-8 rounded-2xl" onClick={() => onNavigate('/exams')}>
              Start Assessment →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
