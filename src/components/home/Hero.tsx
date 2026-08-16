import React from 'react';
import { ArrowRight, Trophy, Sparkles, ShieldCheck, Users, DollarSign, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeroProps {
  navigate: (route: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate, openAuthModal }) => {
  const { currentUser, challenge, jobs } = useApp();

  const activeJobsCount = jobs.filter((j) => j.status === 'ACTIVE').length;

  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden">
      
      {/* Structural 2-Column Geometric Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left Col: Precision Typography & Action */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Geometric Accent Line */}
          <div className="w-12 h-1.5 bg-indigo-600 mb-6"></div>

          {/* Monthly Challenge Announcement Chip */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Trophy className="w-3.5 h-3.5 text-indigo-600" />
            <span>{challenge.month} {challenge.year} Challenge Pool: ${challenge.totalPrizePoolUSD.toLocaleString()} USD</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
            Turn Your Skills Into <span className="text-indigo-600">Real Rewards</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
            Work smarter. Earn from anywhere. Explore verified writing, language translation, research synthesis, and digital micro-tasks with guaranteed USD escrow payouts.
          </p>

          {/* Geometric CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="hero-find-jobs-btn"
              onClick={() => navigate('/jobs')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-start-earning-btn"
              onClick={() => (currentUser ? navigate('/dashboard') : openAuthModal('register'))}
              className="px-6 py-3.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-sm transition-all"
            >
              Start Earning
            </button>

            <button
              id="hero-challenge-btn"
              onClick={() => navigate('/challenge')}
              className="px-4 py-3.5 text-indigo-600 hover:text-indigo-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Join Challenge</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-10 mt-10 border-t border-slate-100 grid grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Min. Withdrawal</div>
              <div className="font-mono text-base font-extrabold text-slate-900">$100.00 USD</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Tasks</div>
              <div className="font-mono text-base font-extrabold text-indigo-600">{activeJobsCount} Open</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Global Rails</div>
              <div className="text-xs font-bold text-slate-900">Bank / PayPal / Wise</div>
            </div>
          </div>

        </div>

        {/* Right Col: Geometric Balance Visual Centerpiece */}
        <div className="lg:col-span-5 relative bg-slate-100 flex items-center justify-center p-8 sm:p-12 overflow-hidden">
          
          {/* Subtle Geometric Dot Grid */}
          <div className="absolute inset-0 bg-geometric-grid opacity-25"></div>

          {/* Precision Geometric Composition */}
          <div className="relative w-full max-w-sm flex items-center justify-center py-8">
            
            {/* Outer Circular Ring */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 border-2 border-indigo-600/20 rounded-full flex items-center justify-center relative">
              
              {/* Rotated Indigo Geometric Card */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 bg-indigo-600 rounded-lg rotate-12 flex items-center justify-center shadow-2xl transition-transform hover:rotate-6 duration-500">
                <div className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center -rotate-12">
                  <div className="w-16 h-16 bg-white/10 rounded-sm rotate-45 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white -rotate-45" />
                  </div>
                </div>
              </div>

              {/* Floating Geometric Metric Card: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white border border-slate-200 shadow-xl p-4 rounded-sm flex flex-col justify-between z-10 w-28">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">1ST PRIZE</div>
                <div className="text-2xl font-black text-indigo-600 font-mono">$1,000</div>
                <div className="text-[9px] text-slate-500 font-semibold">USD CASH</div>
              </div>

              {/* Floating Geometric Metric Card: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-slate-900 text-white border border-slate-800 shadow-xl p-4 rounded-sm flex flex-col justify-between z-10 w-36">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">TASK ESCROW</div>
                <div className="text-xl font-black font-mono">100% SECURE</div>
                <div className="text-[9px] text-slate-400 font-semibold">DIRECT DEPOSIT</div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 4-Box Structural Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200">
        
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-700 mb-4">
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Fixed USD Payouts</h3>
            <p className="text-xs text-slate-500">Transparent task rewards without bidding reductions.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-700 mb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Structured Reviews</h3>
            <p className="text-xs text-slate-500">Objective acceptance criteria protect your deliverables.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-700 mb-4">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Atomic Slots</h3>
            <p className="text-xs text-slate-500">Instant reservation on open tasks with zero spam bidding.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between bg-slate-900 text-white">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">Monthly Standings</div>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Challenge Slots</span>
              <span className="font-mono text-indigo-300">{challenge.currentParticipantsCount}/{challenge.maxCapacity}</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500"
                style={{ width: `${(challenge.currentParticipantsCount / challenge.maxCapacity) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 uppercase mt-1">Updated live in real-time</span>
          </div>
        </div>

      </div>

    </section>
  );
};
