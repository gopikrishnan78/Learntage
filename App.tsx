import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { Dashboard } from './pages/Dashboard';
import { Subjects } from './pages/Subjects';
import { Practice } from './pages/Practice';
import { MindMapPage } from './pages/MindMap';
import { Exams } from './pages/Exams';
import { Revision } from './pages/Revision';
import { Recovery } from './pages/Recovery';
import { Analytics } from './pages/Analytics';
import { Achievements } from './pages/Achievements';
import { Settings } from './pages/Settings';
import { AICompanion } from './pages/AICompanion';
import { Diagnosis } from './pages/Diagnosis';
import { MockTests } from './pages/MockTests';
import { Independence } from './pages/Independence';
import { Resources } from './pages/Resources';
import { DailyMissionPage } from './pages/DailyMissionPage';
import { FloatingLearningAgent } from './components/learning/FloatingLearningAgent';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Splash } from './components/layout/Splash';
import { useAppStore } from './store';
import { demoUser, demoStudentProfile, demoDailyMission, demoStudyStreak } from './data/demoData';
import { fullCurriculum } from './data/content';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [showSplash, setShowSplash] = useState(true);
  const { setUser, setStudentProfile, setSubjects, setDailyMission, updateMetrics } = useAppStore();

  useEffect(() => {
    setUser(demoUser);
    setStudentProfile(demoStudentProfile);
    setSubjects(fullCurriculum);
    setDailyMission(demoDailyMission);
    updateMetrics({
      overallMastery: 82,
      examReadiness: 76,
      independenceScore: 84,
      consistency: 91,
      aiDependency: 18,
    });
    useAppStore.setState({ studyStreak: demoStudyStreak });
  }, [setUser, setStudentProfile, setSubjects, setDailyMission, updateMetrics]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard onNavigate={handleNavigate} />;
      case '/subjects':
        return (
          <Subjects
            onOpenPractice={() => handleNavigate('/practice')}
            onOpenMindMap={() => handleNavigate('/mindmap')}
          />
        );
      case '/daily-mission':
        return <DailyMissionPage onNavigate={handleNavigate} />;
      case '/practice':
        return <Practice />;
      case '/mindmap':
        return <MindMapPage onPractice={() => handleNavigate('/practice')} />;
      case '/exams':
        return <Exams />;
      case '/revision':
        return <Revision />;
      case '/recovery':
        return <Recovery onPractice={() => handleNavigate('/practice')} />;
      case '/analytics':
        return <Analytics />;
      case '/achievements':
        return <Achievements />;
      case '/settings':
        return <Settings />;
      case '/ai-companion':
        return <AICompanion />;
      case '/diagnosis':
        return <Diagnosis />;
      case '/mock-tests':
        return <MockTests />;
      case '/independence':
        return <Independence />;
      case '/resources':
        return <Resources />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <AnimatePresence>{showSplash && <Splash onDone={() => setShowSplash(false)} />}</AnimatePresence>

      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />

      <div className="lg:pl-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <FloatingLearningAgent currentPath={currentPath} onNavigate={handleNavigate} />
      <BottomNav currentPath={currentPath} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
