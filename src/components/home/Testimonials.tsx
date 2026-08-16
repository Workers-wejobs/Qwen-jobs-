import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sofia Hernandez',
      role: 'Bilingual Editor & Translator',
      country: 'Spain',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      rating: 5.0,
      completedCount: 62,
      quote: 'The structured acceptance criteria are a breath of fresh air. On QwenJobs, you know exactly what the client expects, and payouts are credited the moment your deliverable is approved.'
    },
    {
      name: 'Marcus Vance',
      role: 'Technical Writer & Researcher',
      country: 'United Kingdom',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      rating: 4.98,
      completedCount: 89,
      quote: 'I placed in the top 3 during last month’s challenge and earned the $300 prize bonus on top of my task fees. The bank withdrawal processed into my account seamlessly.'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Labeling & AI Micro-Tasks',
      country: 'India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rating: 4.95,
      completedCount: 114,
      quote: 'Zero bidding wars, zero client ghosting. You simply take an open slot, follow instructions, submit work, and earn in USD. Truly the cleanest platform out there.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-8 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Community Voices
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Freelancer Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{t.name}</span>
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.role} &bull; {t.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
