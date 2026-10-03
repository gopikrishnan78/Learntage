# 🎓 Learntage - AI-Powered Learning Companion

> **"Learn Smarter. Think Independently."**

Learntage is a modern, highly interactive AI-powered student learning platform that continuously understands your learning state, identifies weaknesses, predicts future learning problems, proactively tests you, and gradually reduces AI assistance so you become an independent learner.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg)

---

## 🌟 Core Philosophy

**"AI That Helps You Learn, Not Depend."**

Traditional learning apps: **Question → AI → Answer**

Learntage: **Understand Student → Learn → Practice → Diagnose → Predict → Intervene → Proactive Exam → Recover → Reduce Assistance → Independence**

---

## ✨ Key Features

### 🎯 Intelligent Dashboard
- **Personalized greeting** with daily learning mission
- **Real-time metrics**: Overall Mastery, Exam Readiness, Independence Score, AI Dependency
- **Study streak tracking** with fire emoji celebrations 🔥
- **Proactive assessment notifications** when you're ready to test

### 📊 Today's Mission Engine
Learntage automatically creates daily missions based on:
- Weaknesses and forgetting risk
- Learning goals and available time
- Exam schedule and concept importance
- Previous performance and revision needs

Each task shows:
- **Why it was selected** (reasoning)
- **Estimated time** required
- **Expected benefit** to your learning
- Clear **start action** button

### 🧠 AI Learning Companion
- **Context-aware assistance** (knows your subject, chapter, concept, history)
- **Three learning modes**: Learning, Practice, Exam
- **AI Hint Ladder**: Progressive hints instead of direct answers
- **Challenge-before-answer**: Ask student first, then evaluate
- **Confidence tracking**: Detect overconfidence and underconfidence
- **Explain-back mode**: Student explains concepts back to AI

### 🗺️ Interactive Mind Maps
- **AI-generated visual mind maps** for every chapter
- **Zoomable, pannable, interactive** nodes
- Nodes show: Mastery status, Prerequisites, Related concepts
- Color-coded by status: Mastered, Learning, Weak, At-Risk, Not Started
- Click nodes to expand, learn, practice, or view questions

### 🎯 Predictive Weakness Engine
- **Continuous analysis** of errors, response time, confidence
- **Root-cause analysis**: Traces problems to prerequisite gaps
- **Error pattern memory**: Remembers recurring mistakes
- **Forgetting-risk prediction**: Identifies concepts needing revision
- **Foundation protection**: Checks prerequisites when advanced topics fail

### 🏥 Weakness Recovery Center
- Personalized recovery plans with 5-step process:
  1. Relearn concept
  2. Watch/read explanation
  3. Solve guided examples
  4. Solve independently
  5. Take mini quiz → Retest
- Visual progress tracking
- Clear reasons for each weakness detected

### 📝 Proactive Examination Engine
**The AI decides when you're ready for testing!**

Monitors:
- Chapter completion and mastery
- Practice performance and confidence
- Revision status and weakness resolution
- Upcoming exams

Shows animated notification:
> **"You're ready for an assessment."**
> 
> "Based on your progress in Laws of Motion, you're prepared for a 10-minute test."

### 📈 Performance Analytics
- **Subject-wise performance** breakdown
- **Mastery trends** over time (7d, 30d, 90d, All)
- **Accuracy and confidence** calibration
- **Response time analysis**
- **Independence trend** tracking
- Interactive animated charts

### 🏆 Independence Score
**The signature Learntage innovation!**

Tracks:
- Hints used per problem
- AI explanation requests
- Independent solve rate
- Exam performance without AI

The system **rewards needing less assistance**, not consuming more AI.

As mastery increases:
- Beginner → **High assistance**
- Intermediate → **Guided assistance**
- Advanced → **Minimal hints**
- Mastered → **Independent testing**

### 🎮 Gamification
- **Study streaks** with motivating celebrations
- **XP and achievements** for meaningful learning behaviors
- **Milestones**: First Steps, Week Warrior, Independence Day, Master of One
- **Progress visualization** without childish design

### 💡 AI Insights
Smart insights based on your learning patterns:
- "Your accuracy is 18% higher when you revise first"
- "You're using 30% fewer hints compared to last week"
- "Response time increasing - may indicate developing uncertainty"

### 🔔 Smart Notifications
Proactive, intelligent notifications:
- Revision due reminders
- Weakness detection alerts
- Assessment readiness notifications
- Confidence-accuracy gap warnings
- Improvement celebrations

---

## 🎨 Design System

### Visual Style
- **Futuristic but friendly** education interface
- **Glassmorphism** effects with soft gradients
- **Rounded cards** with subtle shadows
- **Clean typography** (Inter font family)
- **Premium color palette**: Primary (Blue), Secondary (Purple), Success (Green)
- **Large visual hierarchy** with smooth transitions

### Animations
All animations use **meaningful motion**:
- Page transitions: Fade + slide (300ms)
- Dashboard numbers: Count-up animation (1s)
- Progress rings: Smooth stroke animation
- Cards: Hover scale (1.02x)
- Buttons: Press feedback (0.98x)
- Success: Gentle celebration effects
- Loading: Skeleton screens instead of spinners

**Respects reduced-motion preferences** for accessibility.

### Responsive Design
- **Mobile-first** approach
- **Desktop**: Sidebar navigation (left)
- **Mobile**: Bottom navigation (5 tabs)
- **Touch-friendly** interactions
- **Tablet-optimized** layouts

---

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualizations
- **date-fns** - Date utilities

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to the project
cd learntage

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
learntage/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Modal.tsx
│   │   ├── navigation/      # Navigation components
│   │   │   ├── Sidebar.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── MetricCard.tsx
│   │   │   └── TodaysMission.tsx
│   │   ├── learning/        # Learning components (TBD)
│   │   ├── practice/        # Practice components (TBD)
│   │   └── analytics/       # Analytics components (TBD)
│   ├── pages/              # Page components
│   │   └── Dashboard.tsx
│   ├── store/              # Zustand state management
│   │   └── index.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── data/               # Demo data
│   │   └── demoData.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── hooks/              # Custom React hooks (TBD)
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🎯 Current Implementation Status

### ✅ Completed Features
- ✅ Project setup and tech stack configuration
- ✅ Design system (colors, animations, utilities)
- ✅ Comprehensive type definitions
- ✅ Zustand store with state management
- ✅ Reusable UI components (Button, Card, ProgressRing, Badge, Modal)
- ✅ Navigation (Desktop sidebar + Mobile bottom nav)
- ✅ Dashboard with animated metrics
- ✅ Today's Mission component with progress tracking
- ✅ Weakness alerts and AI insights
- ✅ Study streak tracking
- ✅ Proactive assessment notifications
- ✅ Demo data for realistic demonstration
- ✅ Responsive mobile-first design
- ✅ Smooth animations and micro-interactions

### 🚧 Planned Features (Not Yet Implemented)
- 🚧 Subject pages with chapter roadmaps
- 🚧 Interactive AI Mind Maps (with zoom/pan)
- 🚧 Knowledge graph and concept dependencies
- 🚧 AI Learning Companion interface
- 🚧 Practice system with adaptive difficulty
- 🚧 Confidence tracking and explain-back mode
- 🚧 Predictive weakness engine
- 🚧 Weakness recovery workflows
- 🚧 Proactive examination generation
- 🚧 Mock tests and handwritten answer evaluation
- 🚧 Smart revision engine
- 🚧 Performance analytics dashboard
- 🚧 Independence score detailed tracking
- 🚧 Achievements and progress page
- 🚧 Settings and profile management
- 🚧 Onboarding flow (7-step setup)
- 🚧 Landing page

---

## 👤 Demo User Profile

The application comes pre-populated with demo data:

**Student**: Aarav Kumar  
**Class**: 12th Grade (CBSE)  
**Subjects**: Physics, Mathematics, Chemistry

**Current Stats**:
- Overall Mastery: 82%
- Exam Readiness: 76%
- Independence Score: 84%
- AI Dependency: 18%
- Study Streak: 12 days 🔥

---

## 🎨 Color Palette

```css
Primary (Blue): #0ea5e9 → #0284c7
Secondary (Purple): #a855f7 → #9333ea
Success (Green): #22c55e → #16a34a
Warning (Yellow): #f59e0b → #d97706
Danger (Red): #ef4444 → #dc2626
```

---

## 🤝 Contributing

This is currently a demonstration project. Future contributions may be welcome.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

Built for students who want to **learn effectively** and **think independently**.

**Learntage** - Because learning should make you **less dependent** on AI, not more.

---

## 📞 Contact

For questions or feedback, please open an issue in the repository.

---

**Made with ❤️ for students everywhere**
