import React, { useState } from 'react';
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  TrendingUp,
  FileCheck,
  Eye,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, JobAssignment } from '../../types';
import { PostJobModal } from './PostJobModal';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';

interface ClientDashboardProps {
  navigate: (route: string) => void;
  onViewJob: (job: Job) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ navigate, onViewJob }) => {
  const { currentUser, jobs, assignments, deleteJob } = useApp();

  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedReviewAssignment, setSelectedReviewAssignment] = useState<JobAssignment | null>(null);
  const [activeTab, setActiveTab] = useState<'posted_jobs' | 'submissions'>('posted_jobs');

  // Filter jobs posted by current user (or default client view)
  const clientJobs = jobs.filter((j) => currentUser && (j.clientId === currentUser.id || currentUser.role === 'client'));

  // Assignments under client jobs
  const clientJobIds = clientJobs.map((j) => j.id);
  const clientAssignments = assignments.filter((a) => clientJobIds.includes(a.jobId));
  const pendingSubmissions = clientAssignments.filter((a) => a.status === 'SUBMITTED');

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Client Workspace &amp; Tasks
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded uppercase">
                Task Publisher
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage open task listings, monitor real-time slots, and review submitted deliverables.
            </p>
          </div>

          <button
            onClick={() => setIsPostJobOpen(true)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Post New Task</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Total Tasks Posted</div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900">
              {clientJobs.length}
            </div>
            <div className="text-[11px] text-slate-500">Active across 9 categories</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Deliverables in Review</div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-amber-600">
              {pendingSubmissions.length}
            </div>
            <div className="text-[11px] text-slate-500">Awaiting your approval</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-1 shadow-sm">
            <div className="text-[10px] font-bold uppercase text-slate-400">Active Escrow Budget</div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-indigo-600">
              ${clientJobs.reduce((acc, j) => acc + j.rewardUSD * j.remainingSlots, 0).toFixed(2)} USD
            </div>
            <div className="text-[11px] text-slate-500">Guaranteed to freelancers</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex items-center gap-2 shadow-sm">
          <button
            onClick={() => setActiveTab('posted_jobs')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'posted_jobs'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Listings ({clientJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'submissions'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Deliverables &amp; Submissions ({clientAssignments.length})</span>
          </button>
        </div>

        {/* TAB 1: POSTED JOBS */}
        {activeTab === 'posted_jobs' && (
          <div className="space-y-4">
            {clientJobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3 shadow-sm">
                <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Jobs Posted Yet</h3>
                <p className="text-xs text-slate-500">Create your first task listing to receive verified deliverables.</p>
                <button
                  onClick={() => setIsPostJobOpen(true)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase rounded-sm"
                >
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded">
                            {job.category}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                            {job.difficulty}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => onViewJob(job)}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{job.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Slots:</span> <strong className="text-slate-900 font-mono">{job.remainingSlots}/{job.totalSlots}</strong>
                      </div>
                      <div className="font-mono text-sm font-black text-indigo-600">
                        ${job.rewardUSD.toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Submitted Deliverables for Review</h3>
            {clientAssignments.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No submissions received yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3 pr-4">Freelancer</th>
                      <th className="pb-3 pr-4">Task</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Word Count</th>
                      <th className="pb-3 pr-4 text-right">Escrow</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clientAssignments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4 font-bold text-slate-900">{a.freelancerName}</td>
                        <td className="py-3 pr-4 text-slate-700 max-w-xs truncate">{a.jobTitle}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                            a.status === 'APPROVED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : a.status === 'REVISION_REQUESTED'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : a.status === 'SUBMITTED'
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-mono text-slate-500">
                          {a.submissionText.trim() ? a.submissionText.trim().split(/\s+/).length : 0} w
                        </td>
                        <td className="py-3 pr-4 text-right font-mono font-bold text-slate-900">
                          ${a.rewardUSD.toFixed(2)}
                        </td>
                        <td className="py-3 text-right">
                          {a.status === 'SUBMITTED' ? (
                            <button
                              onClick={() => setSelectedReviewAssignment(a)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-sm"
                            >
                              Review Deliverable
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedReviewAssignment(a)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-sm"
                            >
                              View Submission
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modals */}
      {isPostJobOpen && <PostJobModal onClose={() => setIsPostJobOpen(false)} />}
      {selectedReviewAssignment && (
        <ReviewSubmissionModal
          assignment={selectedReviewAssignment}
          onClose={() => setSelectedReviewAssignment(null)}
        />
      )}
    </div>
  );
};
