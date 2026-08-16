import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  Check,
  RotateCcw,
  ArrowUpDown,
  Filter,
  Grid,
  Sparkles
} from 'lucide-react';
import { Job, JobCategory, JobDifficulty } from '../../types';
import { useApp } from '../../context/AppContext';
import { JobCard } from './JobCard';

interface JobsMarketplaceProps {
  onViewJob: (job: Job) => void;
  initialCategory?: JobCategory;
}

export const JobsMarketplace: React.FC<JobsMarketplaceProps> = ({
  onViewJob,
  initialCategory
}) => {
  const { jobs, savedJobIds } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [minReward, setMinReward] = useState<number>(0);
  const [onlySaved, setOnlySaved] = useState(false);
  const [onlyAvailableSlots, setOnlyAvailableSlots] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'highest_reward' | 'most_slots'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories: string[] = [
    'ALL',
    'Writing',
    'Creative Writing',
    'Editing',
    'Research',
    'Language',
    'Transcription',
    'Data / Digital Micro-Jobs',
    'Content Moderation'
  ];

  const difficulties: string[] = ['ALL', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Filter & Sort jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        const matchesSubtype = job.subtype?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubtype) return false;
      }

      // Category
      if (selectedCategory !== 'ALL' && job.category !== selectedCategory) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'ALL' && job.difficulty !== selectedDifficulty) {
        return false;
      }

      // Min Reward
      if (job.rewardUSD < minReward) {
        return false;
      }

      // Only Saved
      if (onlySaved && !savedJobIds.includes(job.id)) {
        return false;
      }

      // Only Available Slots
      if (onlyAvailableSlots && job.remainingSlots <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'highest_reward') {
        return b.rewardUSD - a.rewardUSD;
      } else if (sortBy === 'most_slots') {
        return b.remainingSlots - a.remainingSlots;
      }
      return 0;
    });
  }, [jobs, searchQuery, selectedCategory, selectedDifficulty, minReward, onlySaved, onlyAvailableSlots, sortBy, savedJobIds]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setMinReward(0);
    setOnlySaved(false);
    setOnlyAvailableSlots(false);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-3"></div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Tasks &amp; Micro-Jobs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Freelance Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse {jobs.length} verified listings. Apply atomically with guaranteed escrow payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3.5 py-2 rounded-md text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                onlySaved
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-indigo-600' : ''}`} />
              <span>Saved Jobs ({savedJobIds.length})</span>
            </button>

            <button
              onClick={handleResetFilters}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 rounded-md border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search jobs by keyword, subtype, topic..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Difficulty Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="ALL">All Difficulties</option>
                {difficulties.filter((d) => d !== 'ALL').map((d) => (
                  <option key={d} value={d}>
                    Difficulty: {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="newest">Sort: Newest Listed</option>
                <option value="highest_reward">Sort: Highest Reward ($ USD)</option>
                <option value="most_slots">Sort: Most Remaining Slots</option>
              </select>
            </div>

          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-bold text-xs ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Min reward & Slots availability */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyAvailableSlots}
                  onChange={(e) => setOnlyAvailableSlots(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Only Open Slots</span>
              </label>

              <div className="flex items-center gap-2">
                <span>Min. Reward: <strong className="text-indigo-600 font-mono font-bold">${minReward}</strong></span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minReward}
                  onChange={(e) => setMinReward(Number(e.target.value))}
                  className="accent-indigo-600 cursor-pointer w-24 sm:w-32"
                />
              </div>
            </div>

            <div className="text-slate-400 font-semibold">
              Showing <strong className="text-slate-900 font-mono">{filteredJobs.length}</strong> matching opportunities
            </div>
          </div>
        </div>

        {/* Jobs Grid / Results */}
        {paginatedJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, clearing specific category filters, or reducing the minimum reward threshold.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} onViewJob={onViewJob} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-sm text-xs font-semibold text-slate-700"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-sm text-xs font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-slate-900 text-white font-black'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-sm text-xs font-semibold text-slate-700"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
