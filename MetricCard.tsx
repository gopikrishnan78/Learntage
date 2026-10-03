import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { animateNumber } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  delay?: number;
  showRing?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  suffix = '%',
  icon: Icon,
  color,
  trend,
  trendValue,
  delay = 0,
  showRing = true,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      animateNumber(0, value, 1000, setDisplayValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success-600';
    if (trend === 'down') return 'text-danger-600';
    return 'text-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card glass className="relative overflow-hidden group border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Subtle radial glow background overlay */}
        <div
          className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-15 blur-2xl group-hover:opacity-30 transition-all duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="p-2.5 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>
            </div>

            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="text-4xl font-extrabold text-slate-900 tracking-tight font-display"
                  key={displayValue}
                >
                  {Math.round(displayValue)}
                </motion.span>
                <span className="text-xl font-bold text-slate-500">{suffix}</span>
              </div>

              {trend && trendValue && (
                <div className="mt-3 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      trend === 'up'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : trend === 'down'
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        : 'bg-slate-500/10 text-slate-600 border border-slate-500/20'
                    }`}
                  >
                    <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
                    <span>{trendValue}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {showRing && (
            <div className="ml-3 shrink-0 group-hover:scale-105 transition-transform duration-300">
              <ProgressRing
                progress={value}
                size={76}
                strokeWidth={7}
                color={color}
                showLabel={false}
              />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
