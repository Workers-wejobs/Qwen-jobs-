import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobCard } from '../jobs/JobCard';
import { Job } from '../../types';

interface FeaturedJobsProps {
  onViewJob: (job: Job) => void;
  navigate: (route: string) => void;
}

export const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ onViewJob, navigate }) => {
  const { jobs } = useApp();
  const featured = jobs.filter((j) => j.isFeatured || j.status === 'ACTIVE').slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-4"></div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Opportunities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Jobs &amp; Micro-Tasks
            </h3>
          </div>
          <button
            id="view-all-jobs-header-btn"
            onClick={() => navigate('/jobs')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Explore All {jobs.length} Active Tasks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} onViewJob={onViewJob} />
          ))}
        </div>

      </div>
    </section>
  );
};
