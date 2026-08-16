import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, TrendingUp, CheckCircle, Star, ArrowUpRight } from 'lucide-react';

interface EarningsPreviewProps {
  navigate: (route: string) => void;
}

export const EarningsPreview: React.FC<EarningsPreviewProps> = ({ navigate }) => {
  const { currentUser } = useApp();

  const available = currentUser?.availableBalance ?? 245.50;
  const pending = currentUser?.pendingBalance ?? 65.00;
  const total = currentUser?.totalEarned ?? 1840.00;
  const completed = currentUser?.completedJobsCount ?? 48;
  const rating = currentUser?.rating ?? 4.96;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left intro */}
            <div className="space-y-3 max-w-xl">
              <div className="w-8 h-1 bg-indigo-600 mb-4"></div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
                <Wallet className="w-3.5 h-3.5" />
                <span>Financial Transparency</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Real-Time Wallet &amp; Rewards Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Track your active earnings, pending reviews, and verified withdrawals with an immutable transaction ledger. Withdraw anytime once your available balance reaches $100.00 USD.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/dashboard?tab=wallet')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white uppercase tracking-wider rounded-sm transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Your Wallet</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Right live metric grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 w-full lg:w-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Available Balance</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-indigo-600">
                  ${available.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">Ready to withdraw</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Pending Review</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-amber-600">
                  ${pending.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">In client review</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Earnings</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  ${total.toFixed(2)}
                </div>
                <div className="text-[10px] text-indigo-600 font-semibold">All-time USD</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Completed Jobs</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  {completed}
                </div>
                <div className="text-[10px] text-slate-500">Accepted tasks</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Average Rating</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-amber-500 flex items-center gap-1">
                  <span>{rating.toFixed(2)}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <div className="text-[10px] text-slate-500">5-star system</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Min. Payout</div>
                <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                  $100.00
                </div>
                <div className="text-[10px] text-slate-500">Bank / PayPal / Wise</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
