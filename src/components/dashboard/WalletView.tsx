import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Building,
  CreditCard,
  Send,
  History,
  CheckCircle2,
  Lock,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionType } from '../../types';

export const WalletView: React.FC = () => {
  const { currentUser, transactions, withdrawals, requestWithdrawal, updateUserProfile } = useApp();

  const [withdrawAmount, setWithdrawAmount] = useState<string>('100');
  const [withdrawMethod, setWithdrawMethod] = useState<'Bank Transfer' | 'PayPal' | 'Wise'>('Bank Transfer');
  const [accountDetails, setAccountDetails] = useState(
    currentUser?.paymentDetails?.accountNumberOrEmail || currentUser?.email || ''
  );
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Profile payment editing
  const [editPaymentOpen, setEditPaymentOpen] = useState(false);
  const [bankName, setBankName] = useState(currentUser?.paymentDetails?.bankName || 'Chase Manhattan Bank');
  const [accountNumber, setAccountNumber] = useState(currentUser?.paymentDetails?.accountNumberOrEmail || '');
  const [accountHolder, setAccountHolder] = useState(currentUser?.paymentDetails?.accountName || currentUser?.fullName || '');

  const availableBalance = currentUser?.availableBalance ?? 0;
  const pendingBalance = currentUser?.pendingBalance ?? 0;
  const totalEarned = currentUser?.totalEarned ?? 0;
  const totalWithdrawn = currentUser?.totalWithdrawn ?? 0;

  const userTransactions = transactions.filter(
    (t) => currentUser && t.userId === currentUser.id
  );

  const userWithdrawals = withdrawals.filter(
    (w) => currentUser && w.userId === currentUser.id
  );

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);
    setWithdrawSuccess(null);

    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setWithdrawError('Please enter a valid withdrawal amount.');
      return;
    }

    if (amountNum < 100) {
      setWithdrawError('Minimum withdrawal amount is $100.00 USD. Your requested amount of $' + amountNum.toFixed(2) + ' USD is below the minimum threshold.');
      return;
    }

    if (amountNum > availableBalance) {
      setWithdrawError(`Insufficient funds. Your available balance is $${availableBalance.toFixed(2)} USD.`);
      return;
    }

    if (!accountDetails.trim()) {
      setWithdrawError('Please specify your payout account details (IBAN, PayPal email, or Wise tag).');
      return;
    }

    setIsProcessing(true);
    const res = requestWithdrawal(amountNum, withdrawMethod, accountDetails);
    setIsProcessing(false);

    if (res.success) {
      setWithdrawSuccess(res.message);
      setWithdrawAmount('100');
    } else {
      setWithdrawError(res.message);
    }
  };

  const handleSavePaymentDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      paymentMethodVerified: true,
      paymentDetails: {
        type: 'bank',
        accountName: accountHolder,
        accountNumberOrEmail: accountNumber,
        bankName
      }
    });
    setEditPaymentOpen(false);
  };

  const getTxTypeBadge = (type: TransactionType) => {
    switch (type) {
      case 'Job Reward':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Bonus':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Challenge Reward':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Withdrawal':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider">Available Balance</span>
            <Wallet className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-black text-indigo-600">
            ${availableBalance.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-500">Available for instant payout</p>
        </div>

        {/* Pending Balance */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider">Pending Review</span>
            <ArrowDownLeft className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-black text-amber-600">
            ${pendingBalance.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-500">Locked in review escrow</p>
        </div>

        {/* Total Earned */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider">Total Earned</span>
            <DollarSign className="w-4 h-4 text-slate-700" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
            ${totalEarned.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-500">All-time task &amp; bonus revenue</p>
        </div>

        {/* Total Withdrawn */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider">Total Withdrawn</span>
            <ArrowUpRight className="w-4 h-4 text-sky-600" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
            ${totalWithdrawn.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-500">Disbursed to bank / rails</p>
        </div>

      </div>

      {/* Withdrawal Form Section & Payment Method Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Withdrawal Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
              <h3 className="text-base font-extrabold text-slate-900">Request Withdrawal</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Minimum threshold: <strong className="text-indigo-600 font-mono font-bold">$100.00 USD</strong>. Zero withdrawal fees.
              </p>
            </div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
              USD Escrow
            </span>
          </div>

          {withdrawError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{withdrawError}</span>
            </div>
          )}

          {withdrawSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{withdrawSuccess}</span>
            </div>
          )}

          <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs sm:text-sm">
            
            {/* Amount input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Amount to Withdraw (USD)
                </label>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(availableBalance.toString())}
                  className="text-xs text-indigo-600 hover:underline font-mono font-bold"
                >
                  Max (${availableBalance.toFixed(2)})
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="100"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-8 pr-16 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md font-mono text-sm text-slate-900 focus:outline-none"
                  placeholder="100.00"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-400">USD</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Payout Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Bank Transfer', 'PayPal', 'Wise'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setWithdrawMethod(method)}
                    className={`py-2.5 px-3 rounded-md border text-xs font-bold transition-all ${
                      withdrawMethod === method
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{method}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Details / Address input */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                {withdrawMethod === 'Bank Transfer'
                  ? 'Bank Account / IBAN / Routing Number'
                  : withdrawMethod === 'PayPal'
                  ? 'PayPal Email Address'
                  : 'Wise Email / Recipient ID'}
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={
                  withdrawMethod === 'Bank Transfer'
                    ? 'e.g. US893700000123456789'
                    : withdrawMethod === 'PayPal'
                    ? 'e.g. yourname@paypal.me'
                    : 'e.g. yourname@wise.com'
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing || availableBalance < 100}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {availableBalance < 100
                    ? 'Available Balance Below $100.00 Min Threshold'
                    : 'Submit Withdrawal Request'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Payment Verification Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Payout Method Status
              </h4>
              <span className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div><span className="text-slate-400">Account Holder:</span> <strong className="text-slate-900">{currentUser?.paymentDetails?.accountName || currentUser?.fullName}</strong></div>
              <div><span className="text-slate-400">Bank Rail:</span> {currentUser?.paymentDetails?.bankName || 'Chase Manhattan Bank'}</div>
              <div><span className="text-slate-400">Account Reference:</span> {currentUser?.paymentDetails?.accountNumberOrEmail || 'US8937****6789'}</div>
              <div><span className="text-slate-400">AML Verification:</span> <span className="text-emerald-600 font-bold">Passed</span></div>
            </div>

            <button
              onClick={() => setEditPaymentOpen(!editPaymentOpen)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 rounded-sm border border-slate-200 transition-colors"
            >
              {editPaymentOpen ? 'Close Payment Settings' : 'Update Payout Details'}
            </button>

            {editPaymentOpen && (
              <form onSubmit={handleSavePaymentDetails} className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Account Holder Name</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Account Number / IBAN</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-sm uppercase tracking-wider"
                >
                  Save Payout Method
                </button>
              </form>
            )}
          </div>

          {/* Active Withdrawal Requests */}
          {userWithdrawals.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Recent Withdrawal Requests
              </h4>
              <div className="space-y-2">
                {userWithdrawals.map((w) => (
                  <div key={w.id} className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 font-mono">${w.amountUSD.toFixed(2)} USD</div>
                      <div className="text-[10px] text-slate-500">{w.paymentMethod} &bull; {new Date(w.requestedAt).toLocaleDateString()}</div>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                      w.status === 'PAID'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : w.status === 'REJECTED'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Immutable Transaction History Ledger */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900">Immutable Transaction Ledger</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono font-semibold">{userTransactions.length} Total Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-4">Transaction ID</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Reference / Description</th>
                <th className="pb-3 pr-4 text-right">Amount (USD)</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                userTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4 font-mono text-slate-600 font-semibold">{tx.id}</td>
                    <td className="py-3 pr-4 text-slate-500">
                      {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getTxTypeBadge(tx.type)}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-800">
                      <div className="font-bold">{tx.description}</div>
                      <div className="text-[10px] font-mono text-slate-400">{tx.reference}</div>
                    </td>
                    <td className="py-3 pr-4 text-right font-mono font-extrabold text-sm">
                      <span className={tx.type === 'Withdrawal' ? 'text-sky-600' : 'text-slate-900'}>
                        {tx.type === 'Withdrawal' ? '-' : '+'}${tx.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
