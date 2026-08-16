import React from 'react';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

interface AboutPreviewProps {
  navigate: (route: string) => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ navigate }) => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="w-8 h-1 bg-indigo-600 mb-4"></div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              About QwenJobs
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              An Independent Marketplace for Global Talent
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              QwenJobs is built to streamline the freelance economy into predictable, clear micro-jobs and research tasks. We connect verified creators and knowledge workers directly with enterprise clients and task owners.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              By replacing arbitrary client negotiations with atomic slot reservations, strict deliverable rubrics, and automated USD ledger payouts, freelancers can spend 100% of their time creating quality work.
            </p>

            <div>
              <button
                onClick={() => navigate('/about')}
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-xs font-bold text-slate-900 rounded-sm border border-slate-300 transition-colors inline-flex items-center gap-2"
              >
                <span>Learn More About Our Principles</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
              <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Escrow Guaranteed</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Task funds are locked prior to assignment, guaranteeing prompt payout upon review acceptance.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
              <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Global Accessibility</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Open to qualified freelancers worldwide across Bank, PayPal, and Wise payment rails.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 sm:col-span-2 shadow-sm">
              <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Atomic Slot Allocation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero spam bidding. Jobs are assigned on a real-time reservation basis with immediate task lock.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
