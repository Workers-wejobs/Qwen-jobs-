import React from 'react';
import {
  FileCheck,
  Zap,
  DollarSign,
  ClipboardCheck,
  Layers,
  Lock,
  Workflow
} from 'lucide-react';

export const WhyQwenJobs: React.FC = () => {
  const pillars = [
    {
      icon: FileCheck,
      title: 'Clear Instructions',
      description: 'Every job specifies target audience, format, forbidden items, and exact word count expectations so you never have to guess.'
    },
    {
      icon: Zap,
      title: 'Flexible Work',
      description: 'Work when you choose. Choose fast micro-tasks that take 30 minutes or comprehensive research reports.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Rewards',
      description: 'Fixed USD payouts per task with no arbitrary deductions or bidding commissions taken from your approved work.'
    },
    {
      icon: ClipboardCheck,
      title: 'Structured Reviews',
      description: 'Standardized acceptance criteria protect freelancers from subjective rejections. Constructive revision notes ensure fair delivery.'
    },
    {
      icon: Layers,
      title: 'Multiple Categories',
      description: 'Explore writing, editing, translation, sentiment tagging, audio transcription, and content moderation under one roof.'
    },
    {
      icon: Lock,
      title: 'Secure Withdrawals',
      description: 'Transparent $100.00 USD minimum withdrawal threshold directly into your verified Bank Account, PayPal, or Wise.'
    },
    {
      icon: Workflow,
      title: 'Professional Workflow',
      description: 'Drafting workspace, atomic slot protection, revision management, and verifiable portfolio generation.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-8 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Platform Principles
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Freelancers Choose QwenJobs
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Built from first principles for fair, merit-based compensation and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.slice(0, 6).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* 7th pillar full-width callout */}
        <div className="mt-6 bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-md bg-white/10 text-indigo-400 flex items-center justify-center border border-white/20 flex-shrink-0">
            <Workflow className="w-6 h-6" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">{pillars[6].title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{pillars[6].description}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
