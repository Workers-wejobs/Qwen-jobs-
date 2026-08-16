import React from 'react';

export const SponsorMarquee: React.FC = () => {
  const sponsors = [
    {
      name: 'Google Cloud',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg'
    },
    {
      name: 'Amazon Web Services',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
    },
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
    },
    {
      name: 'Wise',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Wise_logo_2023.svg'
    },
    {
      name: 'PayPal',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
    },
    {
      name: 'Anthropic',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg'
    }
  ];

  return (
    <div className="w-full bg-slate-50 border-b border-slate-200 py-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Trusted by enterprise clients &amp; payout partners worldwide
        </span>
        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
          VERIFIED RAILS
        </span>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {[...sponsors, ...sponsors, ...sponsors].map((s, idx) => (
            <div key={idx} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <img
                src={s.logo}
                alt={s.name}
                className="h-5 w-auto max-w-[100px] object-contain grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
