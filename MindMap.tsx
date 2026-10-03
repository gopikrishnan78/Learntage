import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mindMapLayout, conceptLookup } from '../data/content';

interface MindMapPageProps {
  onPractice: () => void;
}

const statusColor: Record<string, string> = {
  mastered: '#10b981',
  strong: '#22c55e',
  learning: '#0ea5e9',
  weak: '#f59e0b',
  at_risk: '#ef4444',
  not_started: '#94a3b8',
};

export const MindMapPage: React.FC<MindMapPageProps> = ({ onPractice }) => {
  const [selected, setSelected] = useState(mindMapLayout.nodes[4]);
  const [zoom, setZoom] = useState(1);

  const nodeById = Object.fromEntries(mindMapLayout.nodes.map((n) => [n.id, n]));

  return (
    <PageShell
      eyebrow="Neural Knowledge Graph"
      title="AI Interactive Mind Maps"
      subtitle="Visual graph of Laws of Motion concept dependencies. Node colors indicate mastery level. Tap any node to inspect prerequisite trees."
      actions={
        <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <Button variant="outline" size="sm" className="h-9 px-3 text-xs font-bold" onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}>
            Zoom +
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3 text-xs font-bold" onClick={() => setZoom((z) => Math.max(0.65, z - 0.15))}>
            Zoom −
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3 text-xs font-bold" onClick={() => setZoom(1)}>
            Reset
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card glass className="relative min-h-[540px] overflow-hidden lg:col-span-2 border-slate-200/80 shadow-2xl flex flex-col justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />
          
          {/* Legend Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl text-white text-xs border border-white/10 shadow-lg">
            <div className="font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span>Chapter 3: Laws of Motion Hub</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span> Mastered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span> Learning</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span> Weak</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span> At Risk</span>
            </div>
          </div>

          <svg viewBox="0 0 100 100" className="relative h-[460px] w-full transition-transform duration-300 ease-out my-auto" style={{ transform: `scale(${zoom})` }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {mindMapLayout.links.map(([from, to]) => {
              const a = nodeById[from];
              const b = nodeById[to];
              return (
                <g key={`${from}-${to}`}>
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#lineGrad)"
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                </g>
              );
            })}

            {mindMapLayout.nodes.map((node, i) => {
              const isSelected = selected.id === node.id;
              const isRoot = node.id === 'm1';
              return (
                <g key={node.id} onClick={() => setSelected(node)} className="cursor-pointer group">
                  {isSelected && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={isRoot ? 8.5 : 7.2}
                      fill="none"
                      stroke={statusColor[node.status]}
                      strokeWidth="0.8"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? (isRoot ? 7.2 : 6.2) : (isRoot ? 5.8 : 4.8)}
                    fill={statusColor[node.status]}
                    stroke="#ffffff"
                    strokeWidth="0.6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                  <text
                    x={node.x}
                    y={node.y + (isRoot ? 9.5 : 8.5)}
                    textAnchor="middle"
                    fontSize={isRoot ? "3.6" : "3.0"}
                    fill="#1e293b"
                    fontWeight={isSelected ? 900 : 700}
                    className="select-none transition-all"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </Card>

        <Card glass className="flex flex-col justify-between border-slate-200/80 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={selected.status === 'mastered' ? 'success' : selected.status === 'weak' ? 'warning' : 'info'}>
                {selected.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <span className="text-xs font-bold text-slate-500">ID: {selected.conceptId}</span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-black text-slate-900 tracking-tight">{selected.label}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Concept Hub: {conceptLookup[selected.conceptId]?.name ?? 'Core Chapter Concept'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Calculated Concept Mastery</span>
                <span className="text-slate-900 font-display text-sm">{selected.mastery}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 shadow-inner">
                <motion.div
                  className="h-full rounded-full shadow-sm"
                  style={{ background: statusColor[selected.status] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.mastery}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 space-y-1.5 leading-relaxed">
              <p className="font-bold flex items-center gap-1.5 text-indigo-950">
                <span>🧠</span> AI Prerequisite Intelligence:
              </p>
              <p>
                Prerequisites light up when this node drops. Vector Components currently feeds structural energy into F = ma calculations — recovering it boosts the entire cluster mastery by +14%.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200/80">
            <Button variant="primary" className="w-full font-bold shadow-lg shadow-primary-500/20 py-3 text-sm" onClick={onPractice}>
              Practice This Cluster →
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
};
