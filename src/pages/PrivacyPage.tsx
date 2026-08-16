import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-6">
          <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Data Protection</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last modified: February 2026</p>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed divide-y divide-slate-100">
            
            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                We collect your legal name, email address, country of residence, portfolio submissions, and payout details (such as IBAN or payment rail email) necessary for verifying identity and executing rewards.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to authenticate your account, disburse escrow payments, calculate Monthly Challenge leaderboards, and prevent fraudulent duplicate registrations.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">3. Payment Security &amp; AML</h2>
              <p>
                We do not store complete bank passwords or credit card CVVs. Payout credentials are encrypted with AES-256 standard encryption and transmitted over secure TLS rails to our global disbursement partners.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-base font-bold text-slate-900">4. Your Rights</h2>
              <p>
                You may review, update, or export your account information or request account deletion at any time by contacting our support team or updating your profile dashboard.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
