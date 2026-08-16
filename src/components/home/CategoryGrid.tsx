import React from 'react';
import {
  PenTool,
  BookOpen,
  CheckSquare,
  Search,
  Languages,
  Mic,
  Binary,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { JobCategory } from '../../types';

interface CategoryGridProps {
  onSelectCategory: (cat: JobCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const categories: { name: JobCategory; icon: any; count: number; subtypes: string }[] = [
    {
      name: 'Writing',
      icon: PenTool,
      count: 14,
      subtypes: 'Article, SEO Writing, Web Content, Newsletter, Technical'
    },
    {
      name: 'Creative Writing',
      icon: BookOpen,
      count: 8,
      subtypes: 'Short Story, Speculative Fiction, Worldbuilding, Scripts'
    },
    {
      name: 'Editing',
      icon: CheckSquare,
      count: 11,
      subtypes: 'Proofreading, Copy Editing, Tone Editing, Grammar'
    },
    {
      name: 'Research',
      icon: Search,
      count: 7,
      subtypes: 'Market Research, Literature Review, Competitor Briefs'
    },
    {
      name: 'Language',
      icon: Languages,
      count: 9,
      subtypes: 'Localization, Transcreation, Bilingual Proofreading'
    },
    {
      name: 'Transcription',
      icon: Mic,
      count: 6,
      subtypes: 'Podcast Audio, Interviews, Webinars, Video SRT'
    },
    {
      name: 'Data / Digital Micro-Jobs',
      icon: Binary,
      count: 22,
      subtypes: 'Sentiment Tagging, Classification, Search Relevance'
    },
    {
      name: 'Content Moderation',
      icon: ShieldAlert,
      count: 15,
      subtypes: 'Spam Detection, Policy Review, Guideline Scoring'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-4"></div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
              Explore Disciplines
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Job Categories
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('Writing')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>View All Marketplace Tasks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectCategory(cat.name)}
                className="bg-white border border-slate-200 hover:border-indigo-400 rounded-lg p-5 cursor-pointer transition-all duration-200 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-slate-100 group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-200 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 group-hover:text-indigo-600">
                      {cat.count} jobs
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.subtypes}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
