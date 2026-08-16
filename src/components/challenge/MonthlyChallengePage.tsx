import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MonthlyChallengePageProps {
  navigate: (route: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const MonthlyChallengePage: React.FC<MonthlyChallengePageProps> = ({
  navigate,
  openAuthModal
}) => {
  const { challenge, participants, currentUser, joinChallenge } = useApp();

  const isJoined = currentUser && participants.some((p) => p.userId === currentUser.id);
  const remainingSlots = challenge.maxCapacity - challenge.currentParticipantsCount;

  const handleJoin = () => {
    if (!currentUser) {
      openAuthModal('register');
      return;
    }
    joinChallenge();
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        {/* Banner */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>Monthly Competition &bull; {challenge.month} {challenge.year}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                QwenJobs Global Cash Challenge
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl">
                Compete with verified freelancers worldwide. Earn points by completing tasks on time with high ratings. Top performers share the cash prize pool on the last calendar day.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-lg p-6 text-center space-y-2 min-w-[260px]">
              <div className="text-[10px] uppercase font-bold text-indigo-400">Total Challenge Pool</div>
              <div className="font-mono text-3xl sm:text-4xl font-black">
                ${challenge.totalPrizePoolUSD.toLocaleString()} <span className="text-xs font-sans font-bold text-slate-400">USD</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                1st Prize: <strong className="text-white font-mono">${challenge.firstPrizeUSD.toLocaleString()} USD</strong>
              </div>
            </div>
          </div>

          {/* Slots & Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>
                  <strong>{challenge.currentParticipantsCount}</strong> / {challenge.maxCapacity} Registered
                </span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Closes at Month-End</span>
              </div>
            </div>

            {isJoined ? (
              <div className="px-5 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You are Registered in this Challenge!</span>
              </div>
            ) : remainingSlots <= 0 ? (
              <button disabled className="px-6 py-2.5 bg-slate-200 text-slate-400 text-xs font-bold uppercase rounded-sm">
                Challenge Full (0 Slots)
              </button>
            ) : (
              <button
                id="challenge-page-join-btn"
                onClick={handleJoin}
                className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span>Join Challenge for Free ({remainingSlots} Slots Left)</span>
              </button>
            )}
          </div>
        </div>

        {/* Standings Leaderboard */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-extrabold text-slate-900">Live Monthly Standings</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Updated Real-Time</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pr-4 text-center w-12">Rank</th>
                  <th className="pb-3 pr-4">Freelancer</th>
                  <th className="pb-3 pr-4">Country</th>
                  <th className="pb-3 pr-4 text-center">Tasks Done</th>
                  <th className="pb-3 pr-4 text-right">Points</th>
                  <th className="pb-3 text-right">Projected Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {participants.map((p, idx) => {
                  let projectedPrize = '-';
                  if (idx === 0) projectedPrize = '$1,000 USD';
                  else if (idx === 1) projectedPrize = '$300 USD';
                  else if (idx === 2) projectedPrize = '$150 USD';
                  else if (idx === 3) projectedPrize = '$100 USD';
                  else if (idx <= 5) projectedPrize = '$75 USD';

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        currentUser && p.userId === currentUser.id ? 'bg-indigo-50/50 font-bold' : ''
                      }`}
                    >
                      <td className="py-3.5 pr-4 text-center font-mono font-bold">
                        {idx === 0 ? (
                          <span className="w-6 h-6 rounded bg-amber-400 text-slate-900 inline-flex items-center justify-center font-black">1</span>
                        ) : idx === 1 ? (
                          <span className="w-6 h-6 rounded bg-slate-300 text-slate-900 inline-flex items-center justify-center font-black">2</span>
                        ) : idx === 2 ? (
                          <span className="w-6 h-6 rounded bg-amber-700 text-white inline-flex items-center justify-center font-black">3</span>
                        ) : (
                          `#${idx + 1}`
                        )}
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.avatarUrl}
                            alt={p.displayName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{p.displayName}</div>
                            {currentUser && p.userId === currentUser.id && (
                              <span className="text-[10px] text-indigo-600 font-bold">YOU</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-slate-600">{p.country}</td>
                      <td className="py-3.5 pr-4 text-center font-mono font-bold text-slate-700">
                        {p.completedQualifyingJobs}
                      </td>
                      <td className="py-3.5 pr-4 text-right font-mono font-black text-indigo-600 text-sm">
                        {p.points} <span className="text-[10px] text-slate-400 font-sans font-medium">pts</span>
                      </td>
                      <td className="py-3.5 text-right font-mono font-extrabold text-slate-900">
                        {projectedPrize}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scoring Rules & Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-2 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm">Point Calculation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Earn 50 base points for every approved task. Earn +20 bonus points for 5-star ratings and +10 points for submissions delivered 6+ hours before deadline.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-2 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm">Fair Play Policy</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero tolerance for artificial task spam, self-assigned jobs, or plagiarism. Flagged accounts are immediately disqualified from prize eligibility.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-2 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm">Automatic Payouts</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prizes are automatically credited to winners' USD balance at 23:59 UTC on the last day of the month and can be withdrawn immediately.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
