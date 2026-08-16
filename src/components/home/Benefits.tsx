import React from 'react';
import {
  Clock,
  CheckCircle,
  DollarSign,
  ShieldCheck,
  Grid,
  Globe
} from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Flexible Jobs',
      description: 'Choose assignments that match your schedule. Work on short micro-tasks or deep research deliverables at your own pace.'
    },
    {
      icon: CheckCircle,
      title: 'Simple Tasks',
      description: 'Clear, unambiguous instructions and acceptance criteria make project delivery straightforward and predictable.'
    },
    {
      icon: DollarSign,
      title: 'USD Rewards',
      description: 'All earnings and challenge prize pools are calculated and paid out in verified US Dollars with no hidden exchange markups.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Withdrawals',
      description: 'Request withdrawals directly to Bank Transfer, PayPal, or Wise starting at a transparent $100.00 USD threshold.'
    },
    {
      icon: Grid,
      title: 'Multiple Categories',
      description: 'From SEO writing and creative fiction to language localization, audio transcription, and data labeling.'
    },
    {
      icon: Globe,
      title: 'Work From Anywhere',
      description: 'Access the marketplace on desktop, tablet, or smartphone wherever you have an internet connection.'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-8 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Core Benefits
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Modern Freelance Independence
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-lg p-6 transition-all duration-200 hover:shadow-md space-y-3"
              >
                <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{b.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
