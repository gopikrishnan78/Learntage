import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  BookOpen,
  Download,
  Search,
  Star,
  Clock,
  Filter,
  ChevronRight,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface Resource {
  id: string;
  title: string;
  type: 'textbook' | 'notes' | 'pyq' | 'formula' | 'video' | 'summary';
  subject: string;
  chapter?: string;
  year?: string;
  pages?: number;
  duration?: string;
  important: boolean;
  bookmarked: boolean;
  description: string;
  tags: string[];
}

const demoResources: Resource[] = [
  {
    id: 'r1', title: 'NCERT Physics Part 1 — Class 12', type: 'textbook', subject: 'Physics',
    pages: 320, important: true, bookmarked: true,
    description: 'Official NCERT textbook covering Electrostatics, Current Electricity, and Magnetism.',
    tags: ['NCERT', 'Electrostatics', 'Magnetism'],
  },
  {
    id: 'r2', title: 'Electrostatics Formula Sheet', type: 'formula', subject: 'Physics', chapter: 'Electrostatics',
    pages: 2, important: true, bookmarked: false,
    description: 'All key formulas: Coulomb\'s Law, Gauss\'s Law, capacitance, and energy stored.',
    tags: ['Formulas', 'Quick Reference', 'Electrostatics'],
  },
  {
    id: 'r3', title: 'JEE Mains 2024 — Physics PYQ', type: 'pyq', subject: 'Physics', year: '2024',
    pages: 40, important: true, bookmarked: true,
    description: '35 previous year questions from JEE Mains 2024 with detailed solutions.',
    tags: ['PYQ', 'JEE', '2024'],
  },
  {
    id: 'r4', title: 'Integration Techniques — Handwritten Notes', type: 'notes', subject: 'Mathematics',
    chapter: 'Integration', pages: 18, important: true, bookmarked: false,
    description: 'Comprehensive notes covering all integration methods: substitution, by parts, partial fractions.',
    tags: ['Integration', 'Notes', 'Methods'],
  },
  {
    id: 'r5', title: 'Mathematics Formula Compendium', type: 'formula', subject: 'Mathematics',
    pages: 4, important: true, bookmarked: true,
    description: 'All Class 12 Math formulas — Calculus, Vectors, Matrices, Probability.',
    tags: ['Formulas', 'All Chapters', 'Quick Reference'],
  },
  {
    id: 'r6', title: 'Organic Chemistry Reaction Map', type: 'notes', subject: 'Chemistry',
    chapter: 'Organic Chemistry', pages: 6, important: true, bookmarked: false,
    description: 'Visual mind map of all organic reactions — SN1, SN2, E1, E2, addition, elimination.',
    tags: ['Organic', 'Reactions', 'Mind Map'],
  },
  {
    id: 'r7', title: 'CBSE Board 2023 — Chemistry PYQ', type: 'pyq', subject: 'Chemistry', year: '2023',
    pages: 28, important: false, bookmarked: false,
    description: 'Full question paper with answers from CBSE Board Examination 2023.',
    tags: ['PYQ', 'CBSE', '2023', 'Board'],
  },
  {
    id: 'r8', title: 'Chapter-wise Quick Summaries — Physics', type: 'summary', subject: 'Physics',
    pages: 12, important: false, bookmarked: true,
    description: 'One-page summaries for every chapter. Perfect for last-minute revision.',
    tags: ['Summary', 'Revision', 'Quick Review'],
  },
  {
    id: 'r9', title: 'JEE Advanced 2022 & 2023 PYQs', type: 'pyq', subject: 'Physics', year: '2022-23',
    pages: 55, important: true, bookmarked: false,
    description: 'Two-year collection of JEE Advanced questions — all subjects, with hints.',
    tags: ['PYQ', 'JEE Advanced', 'Hard'],
  },
  {
    id: 'r10', title: 'NCERT Chemistry Part 2 — Class 12', type: 'textbook', subject: 'Chemistry',
    pages: 268, important: true, bookmarked: false,
    description: 'Official NCERT textbook covering d-block elements, coordination compounds, and organic chemistry.',
    tags: ['NCERT', 'Organic', 'Inorganic'],
  },
];

const typeConfig = {
  textbook: { label: 'Textbook', icon: BookOpen, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  notes: { label: 'Notes', icon: FileText, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  pyq: { label: 'PYQ', icon: Star, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  formula: { label: 'Formula Sheet', icon: FileText, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  video: { label: 'Video', icon: Clock, color: 'bg-rose-100 text-rose-700 border-rose-200' },
  summary: { label: 'Summary', icon: BookOpen, color: 'bg-teal-100 text-teal-700 border-teal-200' },
};

export const Resources: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [bookmarks, setBookmarks] = useState<Set<string>>(
    new Set(demoResources.filter((r) => r.bookmarked).map((r) => r.id))
  );

  const subjects = ['All', 'Physics', 'Mathematics', 'Chemistry'];
  const types = ['All', 'textbook', 'notes', 'pyq', 'formula', 'summary'];

  const filtered = demoResources.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchSubject = selectedSubject === 'All' || r.subject === selectedSubject;
    const matchType = selectedType === 'All' || r.type === selectedType;
    return matchSearch && matchSubject && matchType;
  });

  const bookmarked = demoResources.filter((r) => bookmarks.has(r.id));

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <PageShell
      eyebrow="Learning Resources"
      title="Your Study Library"
      subtitle="Textbooks, notes, formula sheets, and previous year questions — all in one place."
    >
      <div className="space-y-6">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources, topics, tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedSubject === s
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border capitalize transition-all ${
                selectedType === t
                  ? 'bg-secondary-600 text-white border-secondary-600'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-secondary-300'
              }`}
            >
              {t === 'pyq' ? 'PYQ' : t}
            </button>
          ))}
        </div>

        {/* Bookmarked (quick access) */}
        {bookmarked.length > 0 && !search && (
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" /> Bookmarked ({bookmarked.length})
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {bookmarked.map((r) => {
                const cfg = typeConfig[r.type];
                return (
                  <div key={r.id} className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-2xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold cursor-pointer hover:bg-amber-100 transition-colors">
                    {React.createElement(cfg.icon, { className: 'w-3 h-3' })}
                    {r.title.length > 30 ? r.title.slice(0, 30) + '…' : r.title}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-4">{filtered.length} resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((resource, i) => {
              const cfg = typeConfig[resource.type];
              const TypeIcon = cfg.icon;
              const isBookmarked = bookmarks.has(resource.id);
              return (
                <motion.div key={resource.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${cfg.color}`}>
                        <TypeIcon className="w-3 h-3" />
                        {cfg.label}
                      </div>
                      <button onClick={() => toggleBookmark(resource.id)} className="text-slate-300 hover:text-amber-500 transition-colors">
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{resource.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 flex-1 leading-relaxed">{resource.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-semibold">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium mt-auto pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold ${resource.subject === 'Physics' ? 'text-sky-600' : resource.subject === 'Mathematics' ? 'text-purple-600' : 'text-emerald-600'}`}>
                          {resource.subject}
                        </span>
                        {resource.pages && <span className="flex items-center gap-0.5"><FileText className="w-3 h-3" /> {resource.pages} pg</span>}
                        {resource.year && <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {resource.year}</span>}
                      </div>
                      {resource.important && <span className="text-amber-600 font-bold">⭐ Important</span>}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 text-xs">
                        <Download className="w-3 h-3 mr-1" /> Open
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
};
