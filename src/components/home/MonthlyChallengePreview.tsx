import React from 'react';
import { Trophy, Award, Users, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MonthlyChallengePreviewProps {
  navigate: (route: string) => void;
}

export const MonthlyChallengePreview: React.FC<MonthlyChallengePreviewProps> = ({ navigate }) => {
  const { challenge, participants } = useApp();

  const top3 = participants.slice(0, 3);
  const remainingSlots = challenge.maxCapacity - challenge.currentParticipantsCount;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-2">
              <div className="w-8 h-1 bg-indigo-600 mb-4"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>QwenJobs Monthly Challenge &bull; {challenge.month} {challenge.year}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Work. Compete. Earn More.
              </h3>
              <p className="text-sm text-slate-500 max-w-xl">
                Complete verified jobs to climb the leaderboard. Stand out among global peers and win your share of the verified cash pool.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">1st Place Prize</div>
                <div className="font-mono text-2xl sm:text-3xl font-black text-indigo-600">
                  ${challenge.firstPrizeUSD.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-400">USD</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-3 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Prize Pool</div>
                <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
                  ${challenge.totalPrizePoolUSD.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-400">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body: Prize Breakdown & Live Leaderboard Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Left Col: Prize Tiers */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Prize Distribution
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-50/60 border border-indigo-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">1</span>
                    <span className="text-xs font-bold text-slate-900">1st Place Grand Winner</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-indigo-600">$1,000 USD</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">2</span>
                    <span className="text-xs font-bold text-slate-900">2nd Place Runner-Up</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-slate-900">$300 USD</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">3</span>
                    <span className="text-xs font-bold text-slate-900">3rd Place Finalist</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-slate-900">$150 USD</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Best Freelancer</div>
                    <div className="font-mono text-xs font-black text-indigo-600">$100</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Rising Star</div>
                    <div className="font-mono text-xs font-black text-indigo-600">$75</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Consistency</div>
                    <div className="font-mono text-xs font-black text-indigo-600">$75</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Top Leaderboard */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Provisional Leaderboard Top 3</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {challenge.currentParticipantsCount} / {challenge.maxCapacity} Registered
                </span>
              </div>

              <div className="space-y-2">
                {top3.map((p, idx) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-mono font-bold text-xs text-slate-400">
                        #{idx + 1}
                      </span>
                      <img
                        src={p.avatarUrl}
                        alt={p.displayName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{p.displayName}</div>
                        <div className="text-[10px] text-slate-500">{p.country} &bull; {p.completedQualifyingJobs} tasks</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-extrabold text-indigo-600">
                        {p.points}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">pts</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="join-challenge-btn"
                  onClick={() => navigate('/challenge')}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
                >
                  <span>Join Challenge ({remainingSlots} Slots Left)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate('/challenge')}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-300 transition-colors"
                >
                  View Full Standings &amp; Rules
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
