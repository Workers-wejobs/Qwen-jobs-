import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Briefcase, CheckCircle2, DollarSign, Activity } from 'lucide-react';

export const PlatformStats: React.FC = () => {
  const { allUsers, jobs } = useApp();

  const totalFreelancers = allUsers.filter((u) => u.role === 'freelancer').length + 1240;
  const totalJobs = jobs.length + 86;
  const activeJobs = jobs.filter((j) => j.status === 'ACTIVE').length;
  const completedJobs = 4120;
  const totalRewardsPaid = 148500.00;

  const stats = [
    {
      icon: Users,
      value: totalFreelancers.toLocaleString(),
      label: 'Verified Freelancers',
      unit: 'Global Talent'
    },
    {
      icon: Briefcase,
      value: totalJobs.toString(),
      label: 'Total Jobs Listed',
      unit: '9 Categories'
    },
    {
      icon: Activity,
      value: activeJobs.toString(),
      label: 'Active Tasks Now',
      unit: 'Slots Open'
    },
    {
      icon: CheckCircle2,
      value: completedJobs.toLocaleString(),
      label: 'Completed Deliverables',
      unit: '99.4% Approval'
    },
    {
      icon: DollarSign,
      value: `$${(totalRewardsPaid / 1000).toFixed(1)}k+`,
      label: 'Rewards Distributed',
      unit: 'USD Escrow'
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-5 text-left space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{item.unit}</span>
                </div>
                <div>
                  <div className="font-mono text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
