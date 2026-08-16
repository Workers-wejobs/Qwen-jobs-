import React from 'react';
import {
  ShieldCheck,
  Globe,
  DollarSign,
  Heart,
  Lock,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600">
      {/* Top trust metric strip */}
      <div className="border-b border-slate-200 bg-slate-50/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">USD Escrow Protected</div>
                <div className="text-[11px] text-slate-500">Guaranteed payment on approval</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Verified Payout Rails</div>
                <div className="text-[11px] text-slate-500">Bank, PayPal, Wise ($100 min)</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Global Talent Network</div>
                <div className="text-[11px] text-slate-500">140+ countries supported</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Atomic Reservation</div>
                <div className="text-[11px] text-slate-500">Zero bid-wars, instant slot lock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-3 h-3 bg-white rotate-45"></div>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                QwenJobs
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The premier global marketplace for verified micro-jobs, creative writing, translation, research synthesis, and data tagging. Built on structural precision and clear deliverables.
            </p>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All systems operational &bull; Payments active</span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/jobs')} className="hover:text-indigo-600 transition-colors">
                  All Open Tasks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/jobs?category=Writing')} className="hover:text-indigo-600 transition-colors">
                  Writing &amp; Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/jobs?category=Translation')} className="hover:text-indigo-600 transition-colors">
                  Language &amp; Translation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/jobs?category=Data')} className="hover:text-indigo-600 transition-colors">
                  Data &amp; Micro-Jobs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/challenge')} className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                  <span>Monthly Challenge</span>
                  <span className="font-mono text-[10px] bg-indigo-100 text-indigo-700 px-1 rounded">$1,700</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Freelancers & Clients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/dashboard')} className="hover:text-indigo-600 transition-colors">
                  Freelancer Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/client')} className="hover:text-indigo-600 transition-colors">
                  Client Workspace
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard?tab=wallet')} className="hover:text-indigo-600 transition-colors">
                  Wallet &amp; Payout Rules
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-indigo-600 transition-colors">
                  About QwenJobs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-indigo-600 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Legal &amp; Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-indigo-600 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-indigo-600 transition-colors">
                  Help Center &amp; Support
                </button>
              </li>
              <li>
                <span className="text-slate-400 block pt-1">
                  Min. Withdrawal: <strong className="text-slate-700 font-mono">$100.00 USD</strong>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Geometric Balance Bottom Sub-Bar */}
      <div className="border-t border-slate-200 bg-slate-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} QWENJOBS GLOBAL MARKETPLACE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>TOKYO</span>
            <span>LONDON</span>
            <span>SAN FRANCISCO</span>
            <span>SINGAPORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
