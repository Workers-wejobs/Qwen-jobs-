import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FAQPreviewProps {
  navigate: (route: string) => void;
}

export const FAQPreview: React.FC<FAQPreviewProps> = ({ navigate }) => {
  const { faqs, voteFAQ } = useApp();
  const popularFaqs = faqs.filter((f) => f.isPopular).slice(0, 5);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="w-8 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Clear Answers
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {popularFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 shadow-sm">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-200 space-y-4">
                    <p className="leading-relaxed">{faq.answer}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200">
                      <span>Was this helpful?</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => voteFAQ(faq.id, 'helpful')}
                          className={`flex items-center gap-1 hover:text-indigo-600 font-semibold ${faq.userVote === 'helpful' ? 'text-indigo-600' : ''}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{faq.helpfulCount}</span>
                        </button>
                        <button
                          onClick={() => voteFAQ(faq.id, 'notHelpful')}
                          className={`flex items-center gap-1 hover:text-rose-600 font-semibold ${faq.userVote === 'notHelpful' ? 'text-rose-600' : ''}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>{faq.notHelpfulCount}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/faq')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <span>View All 50+ FAQs &amp; Help Guides</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
