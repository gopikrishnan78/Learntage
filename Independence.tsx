import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Award,
  Target,
  Zap,
  Shield,
  ChevronUp,
  ChevronDown,
  Info,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface IndependenceEvent {
  id: string;
  date: string;
  type: 'solved_independently' | 'hint_requested' | 'ai_explained' | 'gave_up';
  question: string;
  subject: string;
  points: number;
}

const demoEvents: IndependenceEvent[] = [
  { id: 'e1', date: 'Today, 10:23 AM', type: 'solved_independently', question: 'Newton\'s Laws — Block on incline', subject: 'Physics', points: +3 },
  { id: 'e2', date: 'Today, 9:45 AM', type: 'hint_requested', question: 'Electric Flux through sphere', subject: 'Physics', points: -1 },
  { id: 'e3', date: 'Today, 9:12 AM', type: 'solved_independently', question: '∫x² dx from 0 to 3', subject: 'Mathematics', points: +3 },
  { id: 'e4', date: 'Yesterday, 8:30 PM', type: 'ai_explained', question: 'SN2 Mechanism', subject: 'Chemistry', points: -2 },
  { id: 'e5', date: 'Yesterday, 7:55 PM', type: 'solved_independently', question: 'Vectors — Dot product', subject: 'Mathematics', points: +3 },
  { id: 'e6', date: 'Yesterday, 7:20 PM', type: 'hint_requested', question: 'Gauss\'s Law — cylindrical surface', subject: 'Physics', points: -1 },
  { id: 'e7', date: '2 days ago', type: 'solved_independently', question: 'Chemical Kinetics — Rate law', subject: 'Chemistry', points: +3 },
  { id: 'e8', date: '2 days ago', type: 'gave_up', question: 'Integration by parts (complex)', subject: 'Mathematics', points: -3 },
];

const weeklyData = [
  { day: 'Mon', independent: 5, ai: 2 },
  { day: 'Tue', independent: 7, ai: 3 },
  { day: 'Wed', independent: 4, ai: 4 },
  { day: 'Thu', independent: 8, ai: 2 },
  { day: 'Fri', independent: 6, ai: 1 },
  { day: 'Sat', independent: 9, ai: 2 },
  { day: 'Sun', independent: 3, ai: 2 },
];

const subjectIndependence = [
  { subject: 'Physics', score: 78, trend: 'up', delta: '+6' },
  { subject: 'Mathematics', score: 88, trend: 'up', delta: '+11' },
  { subject: 'Chemistry', score: 62, trend: 'down', delta: '-3' },
];

const eventConfig = {
  solved_independently: { label: 'Solved Independently', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', dot: 'bg-emerald-500', icon: '✅' },
  hint_requested: { label: 'Hint Used', color: 'bg-amber-50 border-amber-200 text-amber-800', dot: 'bg-amber-500', icon: '💡' },
  ai_explained: { label: 'AI Explained', color: 'bg-blue-50 border-blue-200 text-blue-800', dot: 'bg-blue-500', icon: '🤖' },
  gave_up: { label: 'Skipped/Gave Up', color: 'bg-rose-50 border-rose-200 text-rose-800', dot: 'bg-rose-500', icon: '⚠️' },
};

export const Independence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'insights'>('overview');
  const overallScore = 84;
  const aiDependency = 16;

  const maxBar = Math.max(...weeklyData.map((d) => d.independent + d.ai));

  return (
    <PageShell
      eyebrow="Independence Tracker"
      title="Your Learning Independence"
      subtitle="Tracks how often you solve problems independently vs relying on AI assistance."
    >
      {/* Score Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card glass className="md:col-span-1 relative overflow-hidden border-emerald-200/60">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/10 pointer-events-none" />
          <div className="relative text-center py-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-4xl font-black font-display shadow-xl shadow-emerald-500/30 mb-3">
              {overallScore}
            </div>
            <p className="text-lg font-bold text-slate-900">Independence Score</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <p className="text-sm text-emerald-700 font-semibold">+7 this week</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">Target: 90 by exam date</p>
          </div>
        </Card>

        <Card glass className="relative overflow-hidden border-rose-200/40">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-orange-500/5 pointer-events-none" />
          <div className="relative py-4 flex flex-col items-center justify-center h-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 text-2xl font-black font-display mb-2">
              {aiDependency}%
            </div>
            <p className="font-bold text-slate-900">AI Dependency</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <p className="text-sm text-emerald-700 font-semibold">-4% improvement</p>
            </div>
            <p className="text-xs text-slate-500 mt-1">Target: below 10%</p>
          </div>
        </Card>

        <Card glass className="border-primary-200/40">
          <div className="h-full flex flex-col gap-4">
            {subjectIndependence.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700">{s.subject}</span>
                  <div className="flex items-center gap-1">
                    {s.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-600" /> : <TrendingDown className="w-3 h-3 text-rose-600" />}
                    <span className={`text-xs font-bold ${s.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>{s.delta}%</span>
                    <span className="text-xs font-black text-slate-900 ml-1">{s.score}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${s.score >= 80 ? 'bg-emerald-400' : s.score >= 65 ? 'bg-amber-400' : 'bg-rose-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-0">
        {(['overview', 'history', 'insights'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 -mb-px transition-all ${
              activeTab === tab
                ? 'border-primary-500 text-primary-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Weekly Bar Chart */}
          <Card glass>
            <CardHeader className="mb-4">
              <CardTitle>Weekly Solve Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-40">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '120px' }}>
                      <motion.div
                        className="w-full rounded-t-lg bg-rose-200"
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.ai / maxBar) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ minHeight: d.ai > 0 ? '4px' : '0' }}
                      />
                      <motion.div
                        className="w-full rounded-t-lg bg-emerald-400"
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.independent / maxBar) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        style={{ minHeight: d.independent > 0 ? '4px' : '0' }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{d.day}</span>
                    <span className="text-xs font-bold text-slate-900">{d.independent + d.ai}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <div className="w-3 h-3 rounded-sm bg-emerald-400" /> Independent
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <div className="w-3 h-3 rounded-sm bg-rose-200" /> AI-Assisted
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Builds Independence */}
          <Card glass className="border-primary-200/40">
            <CardHeader className="mb-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                How Your Score is Calculated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { action: 'Solved with no hints', points: '+3', icon: '✅', color: 'emerald' },
                  { action: 'Used 1 hint', points: '+1', icon: '💡', color: 'lime' },
                  { action: 'Used 2+ hints', points: '-1', icon: '⚠️', color: 'amber' },
                  { action: 'Asked AI to explain', points: '-2', icon: '🤖', color: 'orange' },
                  { action: 'Skipped / gave up', points: '-3', icon: '❌', color: 'rose' },
                  { action: 'Revised independently', points: '+2', icon: '📚', color: 'sky' },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="text-sm text-slate-700 font-medium">{item.action}</span>
                    </div>
                    <span className={`text-sm font-black ${item.points.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {demoEvents.map((event, i) => {
            const cfg = eventConfig[event.type];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${cfg.color}`}
              >
                <span className="text-xl">{cfg.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{event.question}</p>
                  <p className="text-xs opacity-70 mt-0.5">{event.date} · {event.subject} · {cfg.label}</p>
                </div>
                <span className={`text-lg font-black ${event.points > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {event.points > 0 ? '+' : ''}{event.points}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-5">
          <Card glass className="border-sky-200/60">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-600"><Brain className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900">AI Pattern Analysis</p>
                <p className="text-sm text-slate-600 mt-1">
                  You request AI hints most often in <strong>Electrostatics</strong> (avg. 2.3 hints/problem) and least in <strong>Kinematics</strong> (0.4 hints/problem).
                  This aligns with your mastery scores.
                </p>
              </div>
            </div>
          </Card>
          <Card glass className="border-emerald-200/60">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900">Independence Trend</p>
                <p className="text-sm text-slate-600 mt-1">
                  Your independence score has improved by <strong>+12 points over the last 14 days</strong>. At this rate, you'll hit the 90% target before your exam date.
                </p>
              </div>
            </div>
          </Card>
          <Card glass className="border-amber-200/60">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600"><Target className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900">Next Milestone</p>
                <p className="text-sm text-slate-600 mt-1">
                  Solve <strong>5 Chemistry problems independently</strong> this week to push your Chemistry independence score above 70%.
                </p>
              </div>
            </div>
          </Card>
          <Card glass className="border-purple-200/60">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-600"><Award className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-slate-900">Unlockable Achievement</p>
                <p className="text-sm text-slate-600 mt-1">
                  Reach an independence score of 90 to unlock the <strong>🦅 Eagle Mode</strong> badge — the highest tier of independent learner.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PageShell>
  );
};
