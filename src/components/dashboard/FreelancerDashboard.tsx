import React, { useState } from 'react';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Wallet,
  User,
  Sparkles,
  ArrowRight,
  Send,
  RotateCcw,
  XCircle,
  FileText,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobAssignment, Job } from '../../types';
import { SubmissionModal } from './SubmissionModal';
import { WalletView } from './WalletView';
import { ProfileView } from './ProfileView';
import { JobCard } from '../jobs/JobCard';

interface FreelancerDashboardProps {
  navigate: (route: string) => void;
  onViewJob: (job: Job) => void;
  defaultTab?: 'active' | 'in_review' | 'revision' | 'completed' | 'saved' | 'wallet' | 'profile';
}

export const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({
  navigate,
  onViewJob,
  defaultTab = 'active'
}) => {
  const {
    currentUser,
    assignments,
    jobs,
    savedJobIds,
    cancelAssignment
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'active' | 'in_review' | 'revision' | 'completed' | 'saved' | 'wallet' | 'profile'
  >(defaultTab);

  const [selectedSubmissionAssignment, setSelectedSubmissionAssignment] = useState<JobAssignment | null>(null);

  if (!currentUser) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-lg p-8 max-w-md mx-auto shadow-sm space-y-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to Freelancer Hub</h2>
          <p className="text-xs text-slate-500">
            Please log in or register your freelancer account to access your assignments, wallet, and submissions.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Filter assignments for currentUser
  const myAssignments = assignments.filter((a) => a.freelancerId === currentUser.id);

  const activeAssignments = myAssignments.filter((a) => a.status === 'IN_PROGRESS');
  const inReviewAssignments = myAssignments.filter((a) => a.status === 'SUBMITTED');
  const revisionAssignments = myAssignments.filter((a) => a.status === 'REVISION_REQUESTED');
  const completedAssignments = myAssignments.filter((a) => a.status === 'APPROVED');
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Header Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-sm"
            />
            <div className="space-y-1">
              <div className="w-8 h-1 bg-indigo-600 mb-1"></div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser.fullName}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded uppercase">
                  Freelancer Hub
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentUser.email} &bull; {currentUser.country} &bull; Rating: <strong className="text-slate-900">{currentUser.rating.toFixed(2)} ★</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 text-right">
              <div className="text-[10px] font-bold uppercase text-slate-400">Available USD</div>
              <div className="font-mono text-lg font-black text-indigo-600">
                ${currentUser.availableBalance.toFixed(2)}
              </div>
            </div>
            <button
              onClick={() => navigate('/jobs')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex items-center gap-1.5 overflow-x-auto shadow-sm">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Tasks ({activeAssignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'revision'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Revisions ({revisionAssignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('in_review')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'in_review'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review ({inReviewAssignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed ({completedAssignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Jobs ({savedJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'wallet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Wallet &amp; Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Portfolio</span>
          </button>
        </div>

        {/* Tab Content Display */}

        {/* TAB 1: ACTIVE TASKS */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeAssignments.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No active assignments in progress</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse the marketplace to discover open slots and reserve tasks to start earning USD rewards.
                </p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
                >
                  Find Open Jobs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                          {assignment.category}
                        </span>
                        <span className="text-xs font-mono font-black text-indigo-600">
                          ${assignment.rewardUSD.toFixed(2)} USD
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {assignment.jobTitle}
                      </h4>

                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => cancelAssignment(assignment.id)}
                        className="px-3 py-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded transition-colors"
                      >
                        Cancel Task
                      </button>

                      <button
                        onClick={() => setSelectedSubmissionAssignment(assignment)}
                        className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Deliverable</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REVISIONS */}
        {activeTab === 'revision' && (
          <div className="space-y-4">
            {revisionAssignments.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Zero Pending Revisions</h3>
                <p className="text-xs text-slate-500">All submitted assignments have satisfied client criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {revisionAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white border border-amber-300 rounded-lg p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                          Action Required &bull; Revision Round {assignment.revisionCount}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">{assignment.jobTitle}</h4>
                      </div>
                      <span className="font-mono text-base font-black text-indigo-600">
                        ${assignment.rewardUSD.toFixed(2)} USD
                      </span>
                    </div>

                    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-md text-xs space-y-1">
                      <div className="font-bold text-amber-900 uppercase text-[10px]">Client Feedback:</div>
                      <p className="text-slate-800 leading-relaxed">{assignment.clientFeedback}</p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedSubmissionAssignment(assignment)}
                        className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Resubmit Deliverable</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IN REVIEW */}
        {activeTab === 'in_review' && (
          <div className="space-y-4">
            {inReviewAssignments.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-xs text-slate-500 shadow-sm">
                No deliverables currently awaiting client approval.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inReviewAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 rounded">
                        Submitted for Review
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-900">
                        ${assignment.rewardUSD.toFixed(2)} USD
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{assignment.jobTitle}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{assignment.submissionText}</p>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span>Submitted on {assignment.submittedAt ? new Date(assignment.submittedAt).toLocaleDateString() : 'Today'}</span>
                      <span className="text-indigo-600 font-semibold">In Escrow</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COMPLETED */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedAssignments.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-xs text-slate-500 shadow-sm">
                No completed deliverables yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Approved &bull; Paid
                      </span>
                      <span className="font-mono text-sm font-black text-emerald-600">
                        +${assignment.rewardUSD.toFixed(2)} USD
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{assignment.jobTitle}</h4>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span>Completed on {assignment.reviewedAt ? new Date(assignment.reviewedAt).toLocaleDateString() : 'Recently'}</span>
                      <span className="font-semibold text-slate-700 font-mono">Credited to Balance</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SAVED JOBS */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedJobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3 shadow-sm">
                <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No Saved Jobs</h3>
                <p className="text-xs text-slate-500">
                  Bookmark jobs in the marketplace to review specifications or apply later.
                </p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  Explore Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onViewJob={onViewJob} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: WALLET */}
        {activeTab === 'wallet' && <WalletView />}

        {/* TAB 7: PROFILE */}
        {activeTab === 'profile' && <ProfileView />}

      </div>

      {/* Submission Modal Trigger */}
      {selectedSubmissionAssignment && (
        <SubmissionModal
          assignment={selectedSubmissionAssignment}
          onClose={() => setSelectedSubmissionAssignment(null)}
        />
      )}
    </div>
  );
};
