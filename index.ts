import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  StudentProfile,
  Subject,
  Chapter,
  DailyMission,
  LearningMode,
  Weakness,
  AIInsight,
  Notification,
  StudyStreak,
  IndependenceMetric,
} from '../types';

interface AppState {
  // User & Profile
  user: User | null;
  studentProfile: StudentProfile | null;
  isAuthenticated: boolean;
  
  // Learning State
  currentMode: LearningMode;
  subjects: Subject[];
  currentSubject: Subject | null;
  currentChapter: Chapter | null;
  
  // Daily Mission
  dailyMission: DailyMission | null;
  
  // Performance
  overallMastery: number;
  examReadiness: number;
  independenceScore: number;
  consistency: number;
  aiDependency: number;
  
  // Issues & Insights
  weaknesses: Weakness[];
  aiInsights: AIInsight[];
  notifications: Notification[];
  
  // Streak
  studyStreak: StudyStreak | null;
  
  // Independence tracking
  independenceHistory: IndependenceMetric[];
  
  // Actions
  setUser: (user: User) => void;
  setStudentProfile: (profile: StudentProfile) => void;
  logout: () => void;
  
  setCurrentMode: (mode: LearningMode) => void;
  setSubjects: (subjects: Subject[]) => void;
  setCurrentSubject: (subject: Subject | null) => void;
  setCurrentChapter: (chapter: Chapter | null) => void;
  
  setDailyMission: (mission: DailyMission) => void;
  completeMissionTask: (taskId: string) => void;
  
  updateMetrics: (metrics: {
    overallMastery?: number;
    examReadiness?: number;
    independenceScore?: number;
    consistency?: number;
    aiDependency?: number;
  }) => void;
  
  addWeakness: (weakness: Weakness) => void;
  resolveWeakness: (weaknessId: string) => void;
  
  addAIInsight: (insight: AIInsight) => void;
  markInsightAsRead: (insightId: string) => void;
  
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  
  updateStudyStreak: () => void;
  
  addIndependenceMetric: (metric: IndependenceMetric) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      studentProfile: null,
      isAuthenticated: false,
      
      currentMode: 'learning',
      subjects: [],
      currentSubject: null,
      currentChapter: null,
      
      dailyMission: null,
      
      overallMastery: 0,
      examReadiness: 0,
      independenceScore: 0,
      consistency: 0,
      aiDependency: 0,
      
      weaknesses: [],
      aiInsights: [],
      notifications: [],
      
      studyStreak: null,
      independenceHistory: [],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setStudentProfile: (profile) => set({ studentProfile: profile }),
      
      logout: () =>
        set({
          user: null,
          studentProfile: null,
          isAuthenticated: false,
          subjects: [],
          currentSubject: null,
          currentChapter: null,
          dailyMission: null,
        }),
      
      setCurrentMode: (mode) => set({ currentMode: mode }),
      
      setSubjects: (subjects) => set({ subjects }),
      
      setCurrentSubject: (subject) => set({ currentSubject: subject }),
      
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      
      setDailyMission: (mission) => set({ dailyMission: mission }),
      
      completeMissionTask: (taskId) => {
        const mission = get().dailyMission;
        if (!mission) return;
        
        const updatedTasks = mission.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        const progress = (completedCount / updatedTasks.length) * 100;
        
        set({
          dailyMission: {
            ...mission,
            tasks: updatedTasks,
            progress,
            completed: progress === 100,
          },
        });
      },
      
      updateMetrics: (metrics) =>
        set((state) => ({
          overallMastery: metrics.overallMastery ?? state.overallMastery,
          examReadiness: metrics.examReadiness ?? state.examReadiness,
          independenceScore: metrics.independenceScore ?? state.independenceScore,
          consistency: metrics.consistency ?? state.consistency,
          aiDependency: metrics.aiDependency ?? state.aiDependency,
        })),
      
      addWeakness: (weakness) =>
        set((state) => ({
          weaknesses: [weakness, ...state.weaknesses],
        })),
      
      resolveWeakness: (weaknessId) =>
        set((state) => ({
          weaknesses: state.weaknesses.map((w) =>
            w.id === weaknessId
              ? { ...w, resolved: true, resolvedAt: new Date() }
              : w
          ),
        })),
      
      addAIInsight: (insight) =>
        set((state) => ({
          aiInsights: [insight, ...state.aiInsights],
        })),
      
      markInsightAsRead: (insightId) =>
        set((state) => ({
          aiInsights: state.aiInsights.map((i) =>
            i.id === insightId ? { ...i, read: true } : i
          ),
        })),
      
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      
      markNotificationAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      updateStudyStreak: () => {
        const streak = get().studyStreak;
        const today = new Date().toDateString();
        
        if (!streak) {
          set({
            studyStreak: {
              userId: get().user?.id || '',
              currentStreak: 1,
              longestStreak: 1,
              lastStudyDate: new Date(),
              totalDays: 1,
            },
          });
          return;
        }
        
        const lastStudy = new Date(streak.lastStudyDate).toDateString();
        if (lastStudy === today) return; // Already updated today
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        const newStreak = lastStudy === yesterdayStr ? streak.currentStreak + 1 : 1;
        
        set({
          studyStreak: {
            ...streak,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, streak.longestStreak),
            lastStudyDate: new Date(),
            totalDays: streak.totalDays + 1,
          },
        });
      },
      
      addIndependenceMetric: (metric) =>
        set((state) => ({
          independenceHistory: [metric, ...state.independenceHistory].slice(0, 90),
        })),
    }),
    {
      name: 'learntage-storage',
      partialize: (state) => ({
        user: state.user,
        studentProfile: state.studentProfile,
        isAuthenticated: state.isAuthenticated,
        studyStreak: state.studyStreak,
      }),
    }
  )
);
