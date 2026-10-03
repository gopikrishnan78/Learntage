import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  BookOpen,
  Zap,
  HelpCircle,
  RotateCcw,
  ChevronDown,
  Maximize2,
  Minimize2,
  Shield,
  Award,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  type?: 'guide' | 'hint' | 'challenge' | 'feedback' | 'recommendation';
  timestamp: Date;
  quickReplies?: string[];
}

interface FloatingLearningAgentProps {
  currentPath: string;
  onNavigate?: (path: string) => void;
}

export const FloatingLearningAgent: React.FC<FloatingLearningAgentProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user, studentProfile, currentMode, setCurrentMode } = useAppStore();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Get human-readable page name for context
  const getContextName = (path: string) => {
    switch (path) {
      case '/':
        return 'Dashboard Command Center';
      case '/subjects':
        return 'Subject Modules & Concepts';
      case '/practice':
        return 'Practice & Problem Solving';
      case '/daily-mission':
        return 'Daily Study Mission';
      case '/mindmap':
        return 'Concept Mind Maps';
      case '/exams':
        return 'Exam & Assessments';
      case '/mock-tests':
        return 'Mock Tests Arena';
      case '/revision':
        return 'Smart Spaced Revision';
      case '/recovery':
        return 'Weakness Recovery Clinic';
      case '/diagnosis':
        return 'Knowledge Diagnosis';
      case '/independence':
        return 'Independence Tracker';
      case '/resources':
        return 'Study Resources Library';
      case '/analytics':
        return 'Performance Analytics';
      default:
        return 'Learntage Learning Hub';
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: `Hi ${user?.name?.split(' ')[0] || 'Arun'}! 👋 I'm your **Learntage AI Learning Agent**.\n\nI'm here to coach and guide your thinking, not just give out solutions.\n\nHow can I support your study session right now?`,
      type: 'guide',
      timestamp: new Date(),
      quickReplies: [
        '💡 Give me a hint on my weak topics',
        '⚡ Explain Gauss\'s Law simply',
        '📐 How to solve Definite Integrals',
        '🎯 What should I do next today?',
      ],
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const generateAgentResponse = (userText: string): { text: string; type: Message['type']; quickReplies?: string[] } => {
    const text = userText.toLowerCase();

    if (text.includes('gauss') || text.includes('flux') || text.includes('electrostatics')) {
      return {
        text: `⚡ **Electrostatics Coach:**\n\nLet's understand **Electric Flux & Gauss's Law** step-by-step:\n\n1. **Flux (Φ)** is the measure of electric field lines passing through a surface (Φ = E · A = EA cos θ).\n2. **Gauss's Law:** Total flux through *any* closed surface equals Q_enclosed / ε₀.\n\n🤔 **Try this quick check:**\nIf a point charge +q is at the exact center of a cube, what fraction of total flux exits through ONE face?\n\n*Think about the symmetry of 6 identical faces!*`,
        type: 'challenge',
        quickReplies: ['q / 6ε₀', 'q / ε₀', '6q / ε₀', 'Explain step-by-step'],
      };
    }

    if (text.includes('integr') || text.includes('calculus') || text.includes('derivative')) {
      return {
        text: `📐 **Mathematics Coach:**\n\nIntegration is the inverse operation of differentiation. For definite integrals ∫ₐᵇ f(x) dx:\n\n**Strategy:**\n• Look for a substitution: is the derivative of an inner term present? (e.g. ∫ 2x e^(x²) dx)\n• If it's a product of algebraic & trig/exp functions, use **Integration by Parts** (ILATE rule).\n• Remember property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx.\n\nWould you like a guided problem to test this technique?`,
        type: 'guide',
        quickReplies: ['Give me an integral problem', 'Show ILATE rule example', 'Explain substitution method'],
      };
    }

    if (text.includes('organic') || text.includes('aldehyde') || text.includes('reaction') || text.includes('chemistry')) {
      return {
        text: `🧪 **Chemistry Coach:**\n\nIn Organic Chemistry, reactions follow electron flow:\n• **Nucleophiles (Nu⁻)** seek positive centers (electrophiles).\n• Aldehydes (R-CHO) have a polar carbonyl group: Carbon is δ+ and Oxygen is δ-.\n• Therefore, nucleophiles attack the **carbonyl carbon**, breaking the C=O π-bond.\n\n🤔 **Self-Check Question:**\nWhy are Aldehydes generally more reactive than Ketones towards nucleophilic attack?`,
        type: 'challenge',
        quickReplies: ['Steric hindrance & +I effect', 'Oxygen electronegativity', 'Give me a hint'],
      };
    }

    if (text.includes('next') || text.includes('what should i do') || text.includes('mission') || text.includes('recommend')) {
      return {
        text: `🎯 **AI Recommendation for Today:**\n\nBased on your profile (3 hrs/day target for JEE):\n1. **High Priority:** 25 min revision of Gauss's Law (52% current mastery).\n2. **Practice:** 5 Definite Integration problems to maintain calculus fluency.\n3. **Recovery:** Organic Chemistry Aldehyde mechanism clinic.\n\nWould you like me to take you directly to your Daily Mission or Practice Arena?`,
        type: 'recommendation',
        quickReplies: ['Take me to Daily Mission', 'Start Practice Arena', 'Open Weakness Recovery'],
      };
    }

    if (text.includes('hint') || text.includes('stuck') || text.includes('help')) {
      return {
        text: `💡 **Socratic Hint Ladder:**\n\n**Level 1 Hint:** What fundamental law or theorem connects the given parameters?\n**Level 2 Hint:** Write down the knowns, unknowns, and appropriate units.\n**Level 3 Hint:** Break the complex problem into 2 smaller sub-equations.\n\nTell me which specific step you're currently working on, and I'll give you a focused clue!`,
        type: 'hint',
        quickReplies: ['I have the formula, need algebra help', 'How to find the initial boundary conditions?'],
      };
    }

    if (text.includes('q / 6ε₀') || text.includes('q/6e0')) {
      return {
        text: `🎉 **Spot on! That is correct!**\n\nBecause the cube has 6 identical faces and the charge is at the symmetrical center, the total flux (q/ε₀) is equally divided: **Φ_face = q / (6ε₀)**.\n\nYour independence score just gained **+3 points** for solving without full solution reveal! 🚀`,
        type: 'feedback',
        quickReplies: ['Give me another challenge', 'Explain cylindrical symmetry', 'Back to dashboard'],
      };
    }

    if (text.includes('steric') || text.includes('hindrance')) {
      return {
        text: `✨ **Excellent understanding!**\n\nAldehydes have only one alkyl group (less steric crowding) and less electron donation (+I effect) than ketones with two alkyl groups, making the aldehyde carbonyl carbon significantly more electrophilic! 👍`,
        type: 'feedback',
        quickReplies: ['Next chemistry concept', 'Explain SN1 vs SN2', 'Review my weak areas'],
      };
    }

    return {
      text: `I understand! As your AI learning companion, I'm here to build your understanding so you can solve problems with minimal assistance.\n\nFeel free to ask me:\n• To break down a tough concept in **Physics, Math, or Chemistry**\n• To provide a **Socratic hint** without spoiling the solution\n• To check your answer or logic\n• For guidance on your next optimal study task!`,
      type: 'guide',
      quickReplies: ['Explain Gauss\'s Law', 'Integration help', 'Daily mission review', 'How to test my knowledge?'],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Handle instant navigation quick replies
    if (query === 'Take me to Daily Mission' && onNavigate) {
      onNavigate('/daily-mission');
    } else if (query === 'Start Practice Arena' && onNavigate) {
      onNavigate('/practice');
    } else if (query === 'Open Weakness Recovery' && onNavigate) {
      onNavigate('/recovery');
    }

    setTimeout(() => {
      const resp = generateAgentResponse(query);
      const agentMsg: Message = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        text: resp.text,
        type: resp.type,
        timestamp: new Date(),
        quickReplies: resp.quickReplies,
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 700 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Agent Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white shadow-2xl shadow-primary-500/40 border border-white/20 group"
        >
          {/* Animated Glow Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-400 to-purple-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />

          <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
            🎓
          </div>

          <div className="relative text-left hidden sm:block">
            <p className="text-xs font-black tracking-tight leading-none flex items-center gap-1.5">
              <span>AI Learning Agent</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </p>
            <p className="text-[10px] text-indigo-100/90 font-semibold mt-0.5">Ask for coaching & hints</p>
          </div>

          <div className="relative ml-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            {isOpen ? <X className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={`fixed z-50 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'inset-4 md:inset-10'
                : 'bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh]'
            }`}
          >
            {/* Agent Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-white font-black text-base shadow-md shadow-primary-500/30">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold font-display">Learntage AI Guide</h3>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      LIVE COACH
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
                    Context: {getContextName(currentPath)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors hidden sm:block"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode & Pedagogical Pill Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mode:</span>
                <span className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-200">
                  {currentMode === 'learning' ? '📚 Learning (High Guidance)' : currentMode === 'practice' ? '🎯 Practice (Hints Only)' : '⚡ Exam Mode'}
                </span>
              </div>
              <button
                onClick={() => setMessages([messages[0]])}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {msg.type === 'challenge' && (
                        <Badge variant="warning" size="sm">
                          🤔 Challenge Check
                        </Badge>
                      )}
                      {msg.type === 'hint' && (
                        <Badge variant="info" size="sm">
                          💡 Guided Hint
                        </Badge>
                      )}
                      {msg.type === 'feedback' && (
                        <Badge variant="success" size="sm">
                          ✅ Evaluation
                        </Badge>
                      )}
                      {msg.type === 'recommendation' && (
                        <Badge variant="info" size="sm">
                          🎯 Next Step
                        </Badge>
                      )}
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed max-w-[88%] shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-br-sm'
                        : 'bg-slate-100/90 text-slate-800 rounded-bl-sm border border-slate-200/70'
                    }`}
                  >
                    {msg.text.split('\n').map((line, idx) => {
                      const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p
                          key={idx}
                          className={line === '' ? 'h-2' : 'my-0.5'}
                          dangerouslySetInnerHTML={{ __html: boldLine }}
                        />
                      );
                    })}
                  </div>

                  {/* Quick Action Chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSendMessage(reply)}
                          className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:border-primary-400 hover:bg-primary-50/70 hover:text-primary-700 transition-all shadow-xs"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-2 bg-slate-100/70 rounded-2xl rounded-bl-sm w-20">
                  <div className="flex gap-1 items-center justify-center w-full">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200/80 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask for guidance, concept help, or a hint..."
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
                💡 Learntage builds student thinking — press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
