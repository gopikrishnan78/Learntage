import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return date.toLocaleDateString();
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    not_started: 'text-slate-500 bg-slate-100',
    learning: 'text-blue-600 bg-blue-100',
    weak: 'text-orange-600 bg-orange-100',
    at_risk: 'text-red-600 bg-red-100',
    strong: 'text-green-600 bg-green-100',
    mastered: 'text-emerald-600 bg-emerald-100',
  };
  return colors[status] || 'text-slate-500 bg-slate-100';
}

export function getMasteryLabel(mastery: number): string {
  if (mastery >= 90) return 'Mastered';
  if (mastery >= 75) return 'Strong';
  if (mastery >= 60) return 'Good';
  if (mastery >= 40) return 'Learning';
  if (mastery >= 20) return 'Weak';
  return 'Not Started';
}

export function getMasteryColor(mastery: number): string {
  if (mastery >= 90) return 'text-emerald-600';
  if (mastery >= 75) return 'text-green-600';
  if (mastery >= 60) return 'text-blue-600';
  if (mastery >= 40) return 'text-yellow-600';
  if (mastery >= 20) return 'text-orange-600';
  return 'text-red-600';
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-orange-600 bg-orange-100',
    advanced: 'text-red-600 bg-red-100',
  };
  return colors[difficulty] || 'text-slate-500 bg-slate-100';
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function calculateReadiness(metrics: {
  mastery: number;
  practiceCount: number;
  revisionComplete: boolean;
  confidence: number;
}): number {
  const { mastery, practiceCount, revisionComplete, confidence } = metrics;
  
  let readiness = mastery * 0.4; // 40% weight
  readiness += Math.min(practiceCount * 5, 25); // 25% weight, max 5 practice sessions
  readiness += revisionComplete ? 20 : 0; // 20% weight
  readiness += confidence * 0.15; // 15% weight
  
  return Math.min(Math.round(readiness), 100);
}

export function getConfidenceAccuracyGap(
  confidence: number,
  accuracy: number
): { gap: number; type: 'overconfident' | 'underconfident' | 'calibrated' } {
  const gap = confidence - accuracy;
  
  if (gap > 20) return { gap, type: 'overconfident' };
  if (gap < -20) return { gap, type: 'underconfident' };
  return { gap, type: 'calibrated' };
}

export function animateNumber(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (end - start) * easeOutQuart);
    
    callback(current);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}
