import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Target,
  Brain,
  Trophy,
  BarChart3,
  Settings,
  Lightbulb,
  FileText,
  FlaskConical,
  Stethoscope,
  ClipboardList,
  Shield,
  Library,
  MessageSquare,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navSections = [
  {
    label: 'Main',
    items: [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/subjects', icon: BookOpen, label: 'My Learning' },
      { path: '/daily-mission', icon: ClipboardList, label: 'Daily Mission', badge: '2/3' },
    ],
  },
  {
    label: 'Study',
    items: [
      { path: '/practice', icon: Target, label: 'Practice' },
      { path: '/revision', icon: Lightbulb, label: 'Smart Revision' },
      { path: '/recovery', icon: FlaskConical, label: 'Recovery Center' },
      { path: '/diagnosis', icon: Stethoscope, label: 'Diagnosis' },
    ],
  },
  {
    label: 'Assessment',
    items: [
      { path: '/exams', icon: FileText, label: 'Assessments' },
      { path: '/mock-tests', icon: ClipboardList, label: 'Mock Tests' },
      { path: '/mindmap', icon: Brain, label: 'Mind Maps' },
    ],
  },
  {
    label: 'AI & Insights',
    items: [
      { path: '/ai-companion', icon: MessageSquare, label: 'AI Companion' },
      { path: '/independence', icon: Shield, label: 'Independence' },
      { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    label: 'More',
    items: [
      { path: '/resources', icon: Library, label: 'Resources' },
      { path: '/achievements', icon: Trophy, label: 'Achievements' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const user = useAppStore((s) => s.user);
  const profile = useAppStore((s) => s.studentProfile);
  const initials = (user?.name ?? 'AK')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:z-50 border-r border-white/60 bg-white/80 backdrop-blur-2xl shadow-2xl shadow-slate-200/50">
      {/* Logo */}
      <div className="flex items-center gap-3.5 h-20 px-6 border-b border-slate-200/80 shrink-0">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-500 via-secondary-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary-500/30">
          🎓
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-gradient font-display tracking-tight">Learntage</h1>
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">AI</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Independent Learning Companion</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 relative group',
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white shadow-lg shadow-primary-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn('w-4 h-4 transition-transform duration-200 group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-600')} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(item as { badge?: string }).badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-700'}`}>
                          {(item as { badge?: string }).badge}
                        </span>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="w-1 h-4 rounded-full bg-white/80 shadow-sm"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-200/80 shrink-0">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden group cursor-pointer"
          onClick={() => onNavigate('/settings')}>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary-500/20 blur-xl group-hover:bg-primary-500/30 transition-all duration-500" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-400 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-purple-500/30">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-white truncate font-display">{user?.name ?? 'Arun Kumar'}</p>
              <p className="text-xs text-indigo-200/80 font-medium">{profile?.class ?? 'Class 12'} · {profile?.board ?? 'CBSE'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 relative z-10">
            <div className="flex-1 h-1 rounded-full bg-white/10">
              <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-primary-400 to-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-indigo-200">84% Independent</span>
          </div>
        </div>
      </div>
    </div>
  );
};
