import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FinalCTAProps {
  navigate: (route: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ navigate, openAuthModal }) => {
  const { currentUser } = useApp();

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-geometric-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="w-12 h-1 bg-indigo-600 mx-auto mb-6"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Registration &bull; Global Access</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Ready to turn your skills into rewards?
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Join thousands of global freelancers completing micro-tasks, earning USD, and competing in monthly cash challenges today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-find-jobs-btn"
            onClick={() => navigate('/jobs')}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
          >
            <span>Find Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="final-cta-start-earning-btn"
            onClick={() => (currentUser ? navigate('/dashboard') : openAuthModal('register'))}
            className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            Start Earning
          </button>
        </div>

      </div>
    </section>
  );
};
