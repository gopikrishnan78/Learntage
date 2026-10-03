import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Target, BarChart3, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavigate }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/subjects', icon: BookOpen, label: 'Learn' },
    { path: '/practice', icon: Target, label: 'Practice' },
    { path: '/analytics', icon: BarChart3, label: 'Stats' },
    { path: '/settings', icon: User, label: 'Profile' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/50 bg-white/80 backdrop-blur-xl safe-area-inset-bottom">
      <nav className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <motion.button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
            >
              <div
                className={cn(
                  'p-2 rounded-xl transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'text-slate-600'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  'text-xs font-medium',
                  isActive ? 'text-primary-600' : 'text-slate-600'
                )}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};
