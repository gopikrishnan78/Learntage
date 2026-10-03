import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, MapPin, Clock, Sparkles, Sliders, BookOpen, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAppStore } from '../../store';
import type { TimetableSlot, SlotStatus } from '../../types';

interface TimetableWidgetProps {
  onNavigate?: (path: string) => void;
  dayLabel?: string;
  dateLabel?: string;
}

export const TimetableWidget: React.FC<TimetableWidgetProps> = ({
  onNavigate,
  dayLabel = 'FRI',
  dateLabel = '18 SEPT',
}) => {
  const { studentProfile, setStudentProfile } = useAppStore();
  const [showFullWeek, setShowFullWeek] = useState(false);
  const [selectedDay, setSelectedDay] = useState('FRI');

  const studyMinutes = studentProfile?.availableStudyTime || 180;
  const subjects = studentProfile?.subjects || ['Physics', 'Mathematics', 'Chemistry'];
  const weakAreas = studentProfile?.weakSubjects || ['Electrostatics', 'Integration', 'Organic Reaction Mechanisms'];

  const days = [
    { label: 'MON', date: '14 SEPT', focus: 'Mechanics & Derivatives' },
    { label: 'TUE', date: '15 SEPT', focus: 'Atomic Structure & Vectors' },
    { label: 'WED', date: '16 SEPT', focus: 'Electric Field & Kinetics' },
    { label: 'THU', date: '17 SEPT', focus: 'Definite Integrals & Bonding' },
    { label: 'FRI', date: '18 SEPT', focus: 'Gauss\'s Law & Reaction Mechanisms' },
    { label: 'SAT', date: '19 SEPT', focus: 'Full JEE Mock & Review' },
    { label: 'SUN', date: '20 SEPT', focus: 'Weakness Recovery & Spaced Repetition' },
  ];

  // Helper to generate dynamic slots for any day and study duration
  const generateSlotsForDay = (day: string, duration: number): TimetableSlot[] => {
    if (duration <= 60) {
      // 60 min express schedule
      return [
        {
          id: `${day}-slot-1`,
          startTime: '08:30',
          endTime: '08:55',
          title: `${subjects[0] || 'Physics'}: ${weakAreas[0] || 'Core Concept'} Flash Review`,
          status: 'done' as SlotStatus,
          room: 'Study Room · High Yield',
          color: '#0ea5e9',
        },
        {
          id: `${day}-slot-2`,
          startTime: '09:00',
          endTime: '09:30',
          title: `${subjects[1] || 'Mathematics'}: ${weakAreas[1] || 'Problem Solving'} 5-Problem Sprint`,
          status: 'now' as SlotStatus,
          room: 'Practice Desk · Active AI Guidance',
          color: '#8b5cf6',
        },
      ];
    } else if (duration <= 120) {
      // 120 min standard 2-hour schedule
      return [
        {
          id: `${day}-slot-1`,
          startTime: '08:30',
          endTime: '09:10',
          title: `${subjects[0] || 'Physics'}: ${weakAreas[0] || 'Concept'} Formula & Concept Drill`,
          status: 'done' as SlotStatus,
          room: 'Room 204 · Theory Review',
          color: '#0ea5e9',
        },
        {
          id: `${day}-slot-2`,
          startTime: '09:15',
          endTime: '10:00',
          title: `${subjects[1] || 'Mathematics'}: ${weakAreas[1] || 'Integration'} Deep Practice Set`,
          status: 'now' as SlotStatus,
          room: 'Desk · Step-by-Step Hints',
          color: '#8b5cf6',
        },
        {
          id: `${day}-slot-3`,
          startTime: '10:10',
          endTime: '10:40',
          title: `${subjects[2] || 'Chemistry'}: ${weakAreas[2] || 'Organic'} Rapid Mini-Quiz`,
          status: 'upcoming' as SlotStatus,
          room: 'Diagnostic Arena · Timed',
          color: '#10b981',
        },
      ];
    } else {
      // 180 min (3 hours - Target JEE baseline for Arun Kumar)
      const dayThemes: Record<string, { p: string; m: string; c: string }> = {
        MON: { p: 'Kinematics: Relative Velocity', m: 'Derivative Applications', c: 'Atomic Orbitals & Quantum Numbers' },
        TUE: { p: 'Newton\'s Laws & Friction', m: 'Matrices & Determinants', c: 'Periodic Trends & Radii' },
        WED: { p: 'Work, Energy & Power', m: 'Indefinite Integrals', c: 'Chemical Kinetics: Rate Constants' },
        THU: { p: 'Coulomb\'s Law & Force Vectors', m: 'Integration by Substitution', c: 'Chemical Bonding: Hybridization' },
        FRI: { p: 'Electrostatics: Gauss\'s Law & Flux', m: 'Definite Integration Properties', c: 'Aldehydes: Nucleophilic Addition' },
        SAT: { p: 'Electric Potential & Capacitance', m: 'Vector Cross & Dot Products', c: 'Reaction Mechanisms Clinic' },
        SUN: { p: 'Physics Speed Mock Drill', m: 'Calculus Error Pattern Review', c: 'Weekly Chemistry Assessment' },
      };

      const theme = dayThemes[day] || dayThemes['FRI'];

      return [
        {
          id: `${day}-slot-1`,
          startTime: '08:30',
          endTime: '09:20',
          title: `${subjects[0] || 'Physics'}: ${theme.p}`,
          status: 'done' as SlotStatus,
          room: 'Library Wing A · Foundation Drill',
          color: '#0ea5e9',
        },
        {
          id: `${day}-slot-2`,
          startTime: '09:30',
          endTime: '10:20',
          title: `${subjects[1] || 'Mathematics'}: ${theme.m}`,
          status: 'now' as SlotStatus,
          room: 'Study Hall · Challenge Before Answer Mode',
          color: '#8b5cf6',
        },
        {
          id: `${day}-slot-3`,
          startTime: '10:30',
          endTime: '11:20',
          title: `${subjects[2] || 'Chemistry'}: ${theme.c}`,
          status: 'upcoming' as SlotStatus,
          room: 'Chemistry Lab Annex · Mechanism Walkthrough',
          color: '#10b981',
        },
        {
          id: `${day}-slot-4`,
          startTime: '11:25',
          endTime: '11:55',
          title: 'Daily Mixed Review & AI Retention Check',
          status: 'upcoming' as SlotStatus,
          room: 'Exam Center · Timed Independence Drill',
          color: '#f59e0b',
        },
      ];
    }
  };

  const todaySlots = useMemo(
    () => generateSlotsForDay(selectedDay, studyMinutes),
    [selectedDay, studyMinutes, subjects, weakAreas]
  );

  const handleTimeChange = (mins: number) => {
    if (studentProfile) {
      setStudentProfile({
        ...studentProfile,
        availableStudyTime: mins,
      });
    }
  };

  return (
    <div className="space-y-3">
      {/* Widget Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900 font-display">Personalized Timetable</h2>
          <span className="text-slate-400 font-medium">·</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {dayLabel} · {dateLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick study time toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl text-[11px] font-bold">
            {[60, 120, 180].map((m) => (
              <button
                key={m}
                onClick={() => handleTimeChange(m)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  studyMinutes === m
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFullWeek(true)}
            className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 px-2.5 py-1 rounded-xl"
          >
            <span>Full week</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Timetable Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500">
          <span className="font-semibold">
            Configured for: <strong className="text-slate-900">{subjects.join(' · ')}</strong>
          </span>
          <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
            {studyMinutes / 60} hrs/day allocation
          </span>
        </div>

        {todaySlots.map((slot, index) => {
          const isNow = slot.status === 'now';
          const isDone = slot.status === 'done';

          return (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                if (onNavigate) {
                  if (slot.title.toLowerCase().includes('quiz') || slot.title.toLowerCase().includes('review')) {
                    onNavigate('/practice');
                  } else if (slot.title.toLowerCase().includes('physics') || slot.title.toLowerCase().includes('math') || slot.title.toLowerCase().includes('chem')) {
                    onNavigate('/subjects');
                  }
                }
              }}
              className={`flex items-stretch gap-4 p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                isNow
                  ? 'bg-gradient-to-r from-primary-50/90 via-sky-50/60 to-purple-50/40 shadow-md border border-primary-200'
                  : isDone
                  ? 'bg-slate-50/60 opacity-85 hover:opacity-100'
                  : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              {/* Time Column */}
              <div className="w-16 shrink-0 text-right flex flex-col justify-center font-mono">
                <span className={`text-sm font-bold tracking-tight ${isNow ? 'text-primary-900 font-extrabold' : 'text-slate-700'}`}>
                  {slot.startTime}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">{slot.endTime}</span>
              </div>

              {/* Vertical Accent Line */}
              <div className="w-1 shrink-0 my-0.5 rounded-full relative">
                <div
                  className={`w-full h-full rounded-full ${
                    isNow ? 'bg-primary-600 shadow-sm shadow-primary-500' : isDone ? 'bg-emerald-400' : 'bg-slate-300'
                  }`}
                />
              </div>

              {/* Subject Title & Details */}
              <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className={`text-sm tracking-tight truncate ${
                      isNow
                        ? 'font-extrabold text-slate-900 text-base font-display'
                        : isDone
                        ? 'font-medium text-slate-600'
                        : 'font-semibold text-slate-800'
                    }`}
                  >
                    {slot.title}
                  </h3>
                  {slot.room && (
                    <p className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${isNow ? 'text-primary-700 font-bold' : 'text-slate-400'}`}>
                      <MapPin className="w-3 h-3" />
                      <span>{slot.room}</span>
                    </p>
                  )}
                </div>

                {/* Status Indicator Badge */}
                <div className="shrink-0 flex items-center">
                  {isNow ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>NOW</span>
                    </span>
                  ) : isDone ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      DONE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      UPCOMING
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Week Schedule Drawer Modal */}
      <AnimatePresence>
        {showFullWeek && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">Full Week Academic Schedule</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Personalized for {studentProfile?.class || 'Class 12'} · {studentProfile?.board || 'CBSE'} ({subjects.join(', ')})
                  </p>
                </div>
                <button
                  onClick={() => setShowFullWeek(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Day Selector Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100">
                {days.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => setSelectedDay(d.label)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex flex-col items-center gap-0.5 shrink-0 ${
                      selectedDay === d.label
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[10px] opacity-80">{d.date}</span>
                  </button>
                ))}
              </div>

              {/* Day Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-primary-50/80 border border-primary-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">Day Focus</p>
                  <p className="text-sm font-extrabold text-slate-900">
                    {days.find((d) => d.label === selectedDay)?.focus}
                  </p>
                </div>
                <Badge variant="info">{studyMinutes} min budgeted</Badge>
              </div>

              {/* Day Schedule List */}
              <div className="space-y-3">
                {generateSlotsForDay(selectedDay, studyMinutes).map((slot) => (
                  <div
                    key={slot.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold font-mono text-slate-700">
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{slot.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{slot.room}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold uppercase px-2.5 py-1 rounded-md ${
                        slot.status === 'now'
                          ? 'bg-emerald-100 text-emerald-700'
                          : slot.status === 'done'
                          ? 'bg-slate-200 text-slate-600'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowFullWeek(false)}
                className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
              >
                Close Timetable
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
