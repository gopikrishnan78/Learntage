import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, XCircle, Award } from 'lucide-react';
import { demoQuestionOfDay } from '../../data/demoData';
import type { QuestionOfDay } from '../../types';

interface ChallengesWidgetProps {
  challenge?: QuestionOfDay;
  onRewardClaimed?: (xp: number) => void;
}

export const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({
  challenge = demoQuestionOfDay,
  onRewardClaimed,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [xpEarned, setXpEarned] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (submitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);

    if (selectedOption === challenge.correctIndex) {
      setXpEarned(true);
      if (onRewardClaimed) {
        onRewardClaimed(challenge.xpReward);
      }
    }
  };

  const isCorrect = selectedOption === challenge.correctIndex;

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-xl font-bold text-slate-900 font-display">Challenges</h2>
        <span className="text-slate-400 font-medium">·</span>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          BUILD YOUR PREP
        </span>
      </div>

      {/* Main Challenge Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Card Sub-Header */}
        <div className="p-5 bg-gradient-to-r from-slate-50/90 via-indigo-50/30 to-slate-50/90 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-900 font-mono">
              {challenge.title}
            </span>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{challenge.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/60 capitalize">
              {challenge.difficulty}
            </span>
            <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/80 flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
              <span>+{challenge.xpReward} XP</span>
            </span>
          </div>
        </div>

        {/* Question & Options Content */}
        <div className="p-5 space-y-4">
          <p className="text-sm font-semibold text-slate-800 leading-relaxed font-sans">
            {challenge.questionText}
          </p>

          <div className="space-y-2">
            {challenge.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'border-slate-200/80 bg-slate-50/60 text-slate-700 hover:bg-slate-100/80';

              if (submitted) {
                if (idx === challenge.correctIndex) {
                  optionStyle = 'border-emerald-300 bg-emerald-50/90 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-300 bg-rose-50/90 text-rose-900 font-bold';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-primary-500 bg-primary-50/80 text-primary-900 font-bold ring-2 ring-primary-500/20';
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center text-[11px] font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {submitted && idx === challenge.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Submit Answer →
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950'
                    : 'bg-rose-50/90 border-rose-200/90 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Correct Answer! +{challenge.xpReward} XP Earned</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Incorrect Solution</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  {challenge.explanation}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};
