import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Brain,
  Lightbulb,
  BookOpen,
  Target,
  Zap,
  ChevronDown,
  Sparkles,
  MessageCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store';

type AIMode = 'learning' | 'practice' | 'exam';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  type?: 'teach' | 'challenge' | 'feedback' | 'hint' | 'normal';
  timestamp: Date;
  awaitsResponse?: boolean;
}

// Deterministic AI responses based on keywords
const aiResponses: Record<string, { response: string; type: Message['type']; awaitsResponse?: boolean }> = {
  electrostatics: {
    response: `Great choice! Let's explore **Electrostatics** together.\n\nElectrostatics deals with electric charges at rest and the forces between them.\n\n**Core Concept:** Electric charge is a fundamental property of matter. Like charges repel, unlike charges attract.\n\n**Coulomb's Law:** F = kq₁q₂/r²\n\nNow, here's a question for you to think about:\n\n🤔 *If two charges are both doubled, what happens to the force between them?*\n\nTake your time — work it out step by step using Coulomb's Law!`,
    type: 'challenge',
    awaitsResponse: true,
  },
  gauss: {
    response: `**Gauss's Law** is one of the four Maxwell equations and a powerful tool in electrostatics.\n\n**Statement:** The total electric flux through any closed surface is equal to the total charge enclosed divided by ε₀.\n\n**Formula:** Φ = Q_enclosed / ε₀\n\nA real-world analogy: Imagine you're inside a room with a heater. No matter where in the room you measure heat, the total heat flowing out through the walls equals the total heat produced by the heater. Gauss's Law works similarly with electric field lines.\n\n🤔 **Challenge Question:**\nA closed spherical surface contains a charge of +5μC. What is the total electric flux through the surface?\n\n*Hint: ε₀ = 8.85 × 10⁻¹² C²/Nm²*\n\nTry to calculate this yourself before I explain further!`,
    type: 'challenge',
    awaitsResponse: true,
  },
  integration: {
    response: `Let's tackle **Integration** — I know this is a weak area for you, so let's build up carefully.\n\n**Types of Integrals:**\n1. Indefinite: ∫f(x)dx = F(x) + C\n2. Definite: ∫ₐᵇ f(x)dx = F(b) - F(a)\n\n**Key Rules:**\n- Power Rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)\n- ∫eˣ dx = eˣ + C\n- ∫sin(x) dx = -cos(x) + C\n\nBefore I give examples, let me check your current understanding:\n\n🤔 **Try this:** What is ∫3x² dx?\n\nShow me your working!`,
    type: 'challenge',
    awaitsResponse: true,
  },
  hint: {
    response: `Here's a structured hint for your problem:\n\n**Hint Level 1:** Think about what physical principle applies here.\n\n**Hint Level 2:** Write down the known values and what you need to find.\n\n**Hint Level 3:** Which formula connects these quantities?\n\nTry working through it with these clues before asking for the full solution — that way, the understanding sticks much better! 💪`,
    type: 'hint',
  },
  organic: {
    response: `**Organic Reaction Mechanisms** can seem overwhelming, but they follow clear patterns.\n\n**The Big Picture:**\nAlmost all organic reactions involve either:\n1. **Nucleophiles** attacking electron-poor centers\n2. **Electrophiles** attacking electron-rich centers\n\n**Key Reaction Types:**\n- SN1 / SN2 (Substitution)\n- E1 / E2 (Elimination)\n- Addition to C=C\n- Addition to C=O (Aldehydes/Ketones)\n\nYou're particularly working on Aldehyde reactions. Let's check your understanding:\n\n🤔 **Question:** In a nucleophilic addition to an aldehyde (RCHO), which atom does the nucleophile attack?\n\n*Think about the polarity of the C=O bond.*`,
    type: 'challenge',
    awaitsResponse: true,
  },
};

function getAIResponse(input: string, mode: AIMode): { response: string; type: Message['type']; awaitsResponse?: boolean } {
  const lower = input.toLowerCase();

  if (lower.includes('gauss') || lower.includes('flux')) return aiResponses.gauss;
  if (lower.includes('electrostatics') || lower.includes('electric') || lower.includes('coulomb')) return aiResponses.electrostatics;
  if (lower.includes('integr') || lower.includes('calculus')) return aiResponses.integration;
  if (lower.includes('organic') || lower.includes('aldehyde') || lower.includes('reaction')) return aiResponses.organic;
  if (lower.includes('hint') || lower.includes('stuck') || lower.includes('help')) return aiResponses.hint;

  if (mode === 'exam') {
    return {
      response: `You're in **Exam Mode** — I won't provide solutions during the assessment.\n\nThis is exactly what builds real exam confidence. Work through the problem independently.\n\nAfter you submit, I'll give you detailed feedback on any mistakes and explain the correct approach.`,
      type: 'normal',
    };
  }

  if (mode === 'practice') {
    return {
      response: `In **Practice Mode**, I'll guide you without giving away the answer.\n\n**Step-by-step approach:**\n1. Identify what type of problem this is\n2. List what information you have\n3. Determine which formula or principle applies\n4. Substitute and solve\n\nWhich step are you stuck on? Tell me more about your attempt!`,
      type: 'hint',
    };
  }

  return {
    response: `I'm here to help you learn and grow! 🌟\n\nI can help you with:\n- **Physics** (Electrostatics, Kinematics, Optics)\n- **Mathematics** (Integration, Derivatives, Algebra)\n- **Chemistry** (Organic reactions, Kinetics, Atomic structure)\n\nTry asking me about a specific concept like "Explain Gauss's Law" or "Help me with integration" — and I'll teach you in a structured way that builds real understanding!\n\nRemember: My goal is to build **your** ability, not replace your thinking. 🎯`,
    type: 'teach',
  };
}

const modeConfig = {
  learning: { label: 'Learning Mode', color: 'text-sky-600 bg-sky-50 border-sky-200', icon: BookOpen, desc: 'Full explanations & guidance' },
  practice: { label: 'Practice Mode', color: 'text-purple-600 bg-purple-50 border-purple-200', icon: Target, desc: 'Hints & partial guidance' },
  exam: { label: 'Exam Mode', color: 'text-rose-600 bg-rose-50 border-rose-200', icon: Zap, desc: 'No solutions during assessment' },
};

const suggestedTopics = [
  { label: 'Explain Gauss\'s Law', icon: '⚡' },
  { label: 'Help with Integration', icon: '∫' },
  { label: 'Organic Reactions', icon: '🧪' },
  { label: 'Electrostatics basics', icon: '⚛️' },
  { label: 'Give me a hint', icon: '💡' },
];

export const AICompanion: React.FC = () => {
  const { currentMode, setCurrentMode } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      type: 'teach',
      content: `Hi Arun! 👋 I'm your **Learntage AI Companion**.\n\nI'm not here to give you answers — I'm here to help you **understand concepts deeply** so you can solve problems independently.\n\nCurrent focus areas based on your profile:\n• ⚡ Electrostatics (52% mastery — needs attention)\n• ∫ Integration (58% mastery — practice needed)\n• 🧪 Organic Reactions (61% mastery — building up)\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));

    const aiReply = getAIResponse(msg, currentMode as AIMode);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: aiReply.response,
      type: aiReply.type,
      awaitsResponse: aiReply.awaitsResponse,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setTyping(false);
  };

  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p
          key={i}
          className={line === '' ? 'h-2' : 'leading-relaxed'}
          dangerouslySetInnerHTML={{ __html: boldLine }}
        />
      );
    });
  };

  return (
    <PageShell
      eyebrow="AI Learning Companion"
      title="Your AI Tutor"
      subtitle="I teach, challenge, and guide — not just answer."
    >
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {/* Mode Selector */}
        <div className="relative">
          <button
            onClick={() => setShowModeMenu(!showModeMenu)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${modeConfig[currentMode as AIMode].color}`}
          >
            {React.createElement(modeConfig[currentMode as AIMode].icon, { className: 'w-4 h-4' })}
            {modeConfig[currentMode as AIMode].label}
            <span className="text-xs font-normal opacity-70">— {modeConfig[currentMode as AIMode].desc}</span>
            <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showModeMenu ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showModeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 mt-2 z-20 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden min-w-64"
              >
                {Object.entries(modeConfig).map(([mode, cfg]) => (
                  <button
                    key={mode}
                    onClick={() => { setCurrentMode(mode as AIMode); setShowModeMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${currentMode === mode ? 'bg-slate-50' : ''}`}
                  >
                    {React.createElement(cfg.icon, { className: 'w-4 h-4 text-slate-500' })}
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{cfg.label}</p>
                      <p className="text-xs text-slate-500">{cfg.desc}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggested Topics */}
        <div className="flex flex-wrap gap-2">
          {suggestedTopics.map((t) => (
            <button
              key={t.label}
              onClick={() => send(t.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50/50 transition-all font-medium shadow-sm"
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Chat Container */}
        <Card className="flex flex-col min-h-[520px] max-h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '55vh' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                    msg.role === 'ai'
                      ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white'
                      : 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                  }`}>
                    {msg.role === 'ai' ? <Brain className="w-4 h-4" /> : 'A'}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {msg.role === 'ai' && msg.type && msg.type !== 'normal' && (
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {msg.type === 'challenge' && <Badge variant="warning" size="sm">🤔 Challenge</Badge>}
                        {msg.type === 'teach' && <Badge variant="info" size="sm">📚 Teaching</Badge>}
                        {msg.type === 'hint' && <Badge variant="default" size="sm">💡 Hint</Badge>}
                        {msg.type === 'feedback' && <Badge variant="success" size="sm">✅ Feedback</Badge>}
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white rounded-tr-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm'
                      }`}
                    >
                      <div className="space-y-1">{renderMessageContent(msg.content)}</div>
                    </div>
                    {msg.awaitsResponse && (
                      <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> Awaiting your attempt...
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask a question, share your attempt, or request an explanation..."
                  rows={1}
                  className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                  style={{ maxHeight: '120px' }}
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">⏎ send</span>
                </div>
              </div>
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-lg hover:shadow-primary-500/30 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-400">Shift+Enter for new line • Enter to send</p>
              <button
                onClick={() => setMessages((prev) => [prev[0]])}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Clear chat
              </button>
            </div>
          </div>
        </Card>

        {/* Learning Memory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, label: 'AI Sessions Today', value: '3', color: 'text-sky-600 bg-sky-50' },
            { icon: Lightbulb, label: 'Hints Used', value: '4', color: 'text-amber-600 bg-amber-50' },
            { icon: Sparkles, label: 'Independent Answers', value: '7', color: 'text-emerald-600 bg-emerald-50' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} glass className="flex items-center gap-4 p-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{label}</p>
                <p className="text-2xl font-black text-slate-900 font-display">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
};
