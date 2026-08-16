import React from 'react';
import { ShieldCheck, Globe, Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="py-8 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-4">
          <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Company &amp; Mission</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About QwenJobs
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            QwenJobs was founded to eliminate the friction, unpaid bidding loops, and payment uncertainty of modern freelancing. We treat micro-jobs, creative writing, translation, and research synthesis as structured engineering disciplines with predictable deliverables and instant USD payouts.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Escrow Protected</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every job reward is pre-funded and held safely in escrow before a freelancer claims the task. Once your work meets acceptance criteria, the funds transfer instantly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Atomic Reservation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No proposal writing or bid competition. If a job has open slots, you click Take Job and the slot is locked to your account with a firm deadline.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Global Financial Rails</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We disburse directly to international bank accounts, PayPal, and Wise with a clear $100.00 USD minimum threshold and 0% withdrawal markup.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-slate-900 text-white rounded-lg p-8 sm:p-10 space-y-4">
          <h2 className="text-2xl font-extrabold text-white">Our Operating Principles</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span><strong>Unambiguous Acceptance Rubrics:</strong> Clients must specify objective criteria, target audience, format, and forbidden items so work is never rejected subjectively.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span><strong>Fair Revisions:</strong> Revisions are limited to 2 structured rounds with actionable notes from the client.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span><strong>Community Growth:</strong> Monthly cash challenges reward top talent transparently, distributing thousands in cash bonuses every 30 days.</span>
            </li>
          </ul>

          <div className="pt-4">
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm inline-flex items-center gap-2"
            >
              <span>Explore Marketplace Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
