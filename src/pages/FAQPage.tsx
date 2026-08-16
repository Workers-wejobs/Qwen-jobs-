import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FAQPageProps {
  navigate: (route: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
  const { faqs, voteFAQ } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = ['ALL', 'General', 'Payments & Withdrawals', 'Jobs & Delivery', 'Monthly Challenge', 'Account & Security'];

  const filteredFaqs = faqs.filter((f) => {
    if (selectedCat !== 'ALL' && f.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
          <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base &amp; FAQ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Detailed guidance on tasks, USD payouts, withdrawal thresholds, challenge scoring, and client acceptance criteria.
          </p>

          {/* Search bar */}
          <div className="relative pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help questions, payment rules, or guidelines..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCat === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c === 'ALL' ? 'All Questions' : c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-10 text-center text-xs text-slate-500">
              No matching questions found for "{search}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        {faq.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                    </div>
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 space-y-4">
                      <p className="leading-relaxed">{faq.answer}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>Was this answer helpful?</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => voteFAQ(faq.id, 'helpful')}
                            className={`flex items-center gap-1 hover:text-indigo-600 font-semibold ${
                              faq.userVote === 'helpful' ? 'text-indigo-600' : ''
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{faq.helpfulCount}</span>
                          </button>
                          <button
                            onClick={() => voteFAQ(faq.id, 'notHelpful')}
                            className={`flex items-center gap-1 hover:text-rose-600 font-semibold ${
                              faq.userVote === 'notHelpful' ? 'text-rose-600' : ''
                            }`}
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
            })
          )}
        </div>

        {/* Support Callout */}
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">Still have questions?</h4>
            <p className="text-xs text-slate-400">Our customer support specialists respond within 4 business hours.</p>
          </div>
          <button
            onClick={() => navigate('/help')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Support Ticket</span>
          </button>
        </div>

      </div>
    </div>
  );
};
