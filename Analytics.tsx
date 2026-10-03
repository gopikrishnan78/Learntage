import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { accuracyTrend, independenceTrend, masteryTrend, fullCurriculum } from '../data/content';
import { format } from 'date-fns';

const toChart = (points: { date: Date; value: number }[]) =>
  points.map((p) => ({ name: format(p.date, 'MMM d'), value: Math.round(p.value) }));

export const Analytics: React.FC = () => {
  const radar = fullCurriculum.map((s) => ({
    subject: s.name,
    mastery: s.overallMastery,
    readiness: s.examReadiness,
  }));

  return (
    <PageShell
      eyebrow="Diagnostic Intelligence"
      title="Performance Analytics & Growth"
      subtitle="Mastery growth, independence tracking, and accuracy trends across 14-day study trajectories."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card glass className="border-purple-200/60 shadow-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                📈
              </div>
              <span>Overall Mastery Growth Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={toChart(masteryTrend)}>
                <defs>
                  <linearGradient id="mastery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#mastery)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card glass className="border-sky-200/60 shadow-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                🏆
              </div>
              <span>Independence Score Trajectory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={toChart(independenceTrend)}>
                <defs>
                  <linearGradient id="ind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="url(#ind)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card glass className="border-emerald-200/60 shadow-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                ⚡
              </div>
              <span>Practice Accuracy Pulse</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={toChart(accuracyTrend)}>
                <defs>
                  <linearGradient id="acc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#acc)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card glass className="border-indigo-200/60 shadow-xl">
          <CardHeader className="mb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                🎯
              </div>
              <span>Subject Readiness Radar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                <Radar name="Mastery" dataKey="mastery" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                <Radar name="Readiness" dataKey="readiness" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
};
