import React from 'react';
import { Bookmark, Clock, Star, Users, ArrowUpRight } from 'lucide-react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';

interface JobCardProps {
  job: Job;
  onViewJob: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewJob }) => {
  const { savedJobIds, toggleSaveJob } = useApp();
  const isSaved = savedJobIds.includes(job.id);

  const getDifficultyColor = (diff: Job['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'Advanced':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Expert':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div
      id={`job-card-${job.id}`}
      className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4 group relative"
    >
      <div>
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded">
              {job.category}
            </span>
            {job.subtype && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200 rounded hidden sm:inline-block">
                {job.subtype}
              </span>
            )}
            <span className={`px-2 py-0.5 text-[10px] font-semibold border rounded ${getDifficultyColor(job.difficulty)}`}>
              {job.difficulty}
            </span>
          </div>

          <button
            id={`bookmark-job-${job.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-1.5 rounded border transition-colors ${
              isSaved
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'
            }`}
            title={isSaved ? 'Remove from bookmarks' : 'Save job'}
            aria-label="Bookmark job"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h4
          onClick={() => onViewJob(job)}
          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {job.title}
        </h4>

        {/* Description Snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {job.description || job.objective}
        </p>
      </div>

      {/* Meta details & Reward bar */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-900">{job.clientRating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400">({job.clientName.split(' ')[0]})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-medium text-slate-700 font-mono">
              <strong className="text-slate-900">{job.remainingSlots}</strong> <span className="text-slate-400 font-sans">/ {job.totalSlots} slots</span>
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-base font-extrabold text-slate-900">
              ${job.rewardUSD.toFixed(2)}
            </span>
            <span className="text-[10px] font-sans font-bold text-indigo-600 ml-1">USD</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`view-job-btn-${job.id}`}
          onClick={() => onViewJob(job)}
          className="w-full py-2.5 px-3 bg-slate-900 hover:bg-indigo-600 text-xs font-bold text-white rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>View Job Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
