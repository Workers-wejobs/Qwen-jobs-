import React from 'react';
import { UserPlus, Search, FileText, Send, DollarSign } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up for free, verify your email, and customize your skills profile in under 2 minutes.'
    },
    {
      num: '02',
      icon: Search,
      title: 'Find a Job',
      description: 'Explore the marketplace. Select an assignment with clear instructions and available slots.'
    },
    {
      num: '03',
      icon: FileText,
      title: 'Complete the Work',
      description: 'Follow the provided acceptance criteria, word count, and format guidelines precisely.'
    },
    {
      num: '04',
      icon: Send,
      title: 'Submit for Review',
      description: 'Dispatch your formatted text or deliverables through the secure encrypted submission portal.'
    },
    {
      num: '05',
      icon: DollarSign,
      title: 'Get Rewarded',
      description: 'Once accepted, reward funds credit instantly to your USD balance for withdrawal.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-8 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Seamless Workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How QwenJobs Works
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            A transparent five-step journey from application to verified payout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-600 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      STEP {s.num}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm">
                      <Icon className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
