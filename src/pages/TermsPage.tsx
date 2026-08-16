import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-6">
          <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Legal Agreement</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">Last modified: February 2026</p>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed divide-y divide-slate-100">
            
            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By creating an account or accessing QwenJobs, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">2. Freelancer Obligations &amp; Deliverables</h2>
              <p>
                Freelancers must execute assignments in full compliance with the listed acceptance criteria, word count ranges, and formatting requirements. Submissions containing plagiarized material, unauthorized copyrighted content, or raw unedited AI boilerplate in violation of task guidelines will be rejected and may result in account termination.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">3. Escrow &amp; Payout Terms</h2>
              <p>
                All rewards are calculated in US Dollars (USD). Client deposits are held in automated escrow upon job publication. Upon deliverable approval, funds credit to the freelancer's available balance.
              </p>
              <p>
                <strong>Minimum Withdrawal:</strong> The minimum withdrawal threshold is <strong>$100.00 USD</strong>. Withdrawals are disbursed to verified Bank Transfer (IBAN/Wire), PayPal, or Wise accounts.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">4. Revisions &amp; Dispute Resolution</h2>
              <p>
                Clients may request up to two (2) revision rounds per assignment, provided feedback adheres strictly to the original job specifications. Disputed assignments can be escalated to platform arbitration via Support Tickets.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">5. Monthly Challenge Rules</h2>
              <p>
                Points in the Monthly Challenge are awarded solely for approved, verified tasks. Any attempt to artificially manipulate ratings or generate fraudulent jobs results in instant disqualification and forfeiture of prize allocations.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
