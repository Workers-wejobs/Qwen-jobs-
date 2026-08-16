import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Briefcase,
  DollarSign,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Activity,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const {
    allUsers,
    jobs,
    withdrawals,
    challenge,
    processWithdrawal,
    updateChallenge,
    auditLogs
  } = useApp();

  const [activeTab, setActiveTab] = useState<'withdrawals' | 'users' | 'challenge' | 'audit'>('withdrawals');

  // Challenge edit state
  const [firstPrize, setFirstPrize] = useState(challenge.firstPrizeUSD);
  const [totalPool, setTotalPool] = useState(challenge.totalPrizePoolUSD);
  const [challengeSaved, setChallengeSaved] = useState(false);

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'PENDING');

  const handleUpdateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    updateChallenge({
      firstPrizeUSD: Number(firstPrize),
      totalPrizePoolUSD: Number(totalPool)
    });
    setChallengeSaved(true);
    setTimeout(() => setChallengeSaved(false), 3000);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Platform Admin Command Center
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded uppercase">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Disburse withdrawal requests, configure monthly challenges, and inspect the platform audit trail.
            </p>
          </div>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Users</div>
            <div className="font-mono text-2xl font-black text-slate-900">{allUsers.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Jobs</div>
            <div className="font-mono text-2xl font-black text-slate-900">{jobs.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Pending Payouts</div>
            <div className="font-mono text-2xl font-black text-amber-600">{pendingWithdrawals.length}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Active Challenge Pool</div>
            <div className="font-mono text-2xl font-black text-indigo-600">${challenge.totalPrizePoolUSD}</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex items-center gap-2 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'withdrawals'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Withdrawals Queue ({pendingWithdrawals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Directory ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'challenge'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Challenge Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: WITHDRAWALS QUEUE */}
        {activeTab === 'withdrawals' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Withdrawals Queue (Min $100.00 USD)</h3>
            {withdrawals.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">No withdrawal requests found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3 pr-4">User</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3 pr-4">Rail / Account</th>
                      <th className="pb-3 pr-4">Requested At</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {withdrawals.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4 font-bold text-slate-900">{w.userName}</td>
                        <td className="py-3 pr-4 font-mono font-black text-slate-900">${w.amountUSD.toFixed(2)} USD</td>
                        <td className="py-3 pr-4 text-slate-600">
                          <div>{w.paymentMethod}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{w.accountDetails}</div>
                        </td>
                        <td className="py-3 pr-4 text-slate-500">{new Date(w.requestedAt).toLocaleDateString()}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                            w.status === 'PAID'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : w.status === 'REJECTED'
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          {w.status === 'PENDING' && (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => processWithdrawal(w.id, 'APPROVED')}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold uppercase"
                              >
                                Approve Payout
                              </button>
                              <button
                                onClick={() => processWithdrawal(w.id, 'REJECTED')}
                                className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[10px] font-bold uppercase border border-rose-200"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: USER DIRECTORY */}
        {activeTab === 'users' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Registered Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">User</th>
                    <th className="pb-3 pr-4">Role</th>
                    <th className="pb-3 pr-4">Country</th>
                    <th className="pb-3 pr-4">Balance (USD)</th>
                    <th className="pb-3 pr-4">Completed Tasks</th>
                    <th className="pb-3 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="font-bold text-slate-900">{u.fullName}</div>
                        <div className="text-[10px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-600">{u.country}</td>
                      <td className="py-3 pr-4 font-mono font-bold text-indigo-600">
                        ${u.availableBalance.toFixed(2)}
                      </td>
                      <td className="py-3 pr-4 font-mono">{u.completedJobsCount}</td>
                      <td className="py-3 text-right font-mono font-bold text-amber-600">
                        {u.rating.toFixed(2)} ★
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGE SETTINGS */}
        {activeTab === 'challenge' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm max-w-xl">
            <h3 className="text-sm font-extrabold text-slate-900">Monthly Challenge Pool Configuration</h3>
            {challengeSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md">
                Challenge configuration updated successfully!
              </div>
            )}
            <form onSubmit={handleUpdateChallenge} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">1st Place Prize (USD)</label>
                <input
                  type="number"
                  value={firstPrize}
                  onChange={(e) => setFirstPrize(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-900 block mb-1">Total Prize Pool (USD)</label>
                <input
                  type="number"
                  value={totalPool}
                  onChange={(e) => setTotalPool(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm"
              >
                Save Challenge Parameters
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">System Audit Trail</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">Timestamp</th>
                    <th className="pb-3 pr-4">Action</th>
                    <th className="pb-3 pr-4">User</th>
                    <th className="pb-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-4 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="py-2.5 pr-4 text-indigo-600 font-bold">{log.action}</td>
                      <td className="py-2.5 pr-4 text-slate-800">{log.userName}</td>
                      <td className="py-2.5 text-right text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
