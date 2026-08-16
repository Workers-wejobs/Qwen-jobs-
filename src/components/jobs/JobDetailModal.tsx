import React, { useState } from 'react';
import {
  X,
  Clock,
  DollarSign,
  Users,
  Star,
  Bookmark,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  navigate: (route: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  navigate,
  openAuthModal
}) => {
  const { currentUser, savedJobIds, toggleSaveJob, takeJob, assignments } = useApp();
  const [copied, setCopied] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  if (!job) return null;

  const isSaved = savedJobIds.includes(job.id);
  const alreadyAssigned = assignments.some(
    (a) =>
      a.jobId === job.id &&
      currentUser &&
      a.freelancerId === currentUser.id &&
      a.status !== 'CANCELLED' &&
      a.status !== 'REJECTED'
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/jobs/${job.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTakeJob = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setIsApplying(true);
    const res = takeJob(job.id);
    setIsApplying(false);
    if (res.success) {
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 600);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id={`job-detail-modal-${job.id}`}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
          <div className="space-y-2">
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                {job.category}
              </span>
              {job.subtype && (
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded">
                  {job.subtype}
                </span>
              )}
              <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 rounded">
                Difficulty: {job.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {job.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span>Posted by <strong className="text-slate-800">{job.clientName}</strong></span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-bold text-slate-900">{job.clientRating.toFixed(1)}</span>
                <span className="text-slate-400">({job.clientJobsPosted} tasks posted)</span>
              </div>
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-8 text-left text-xs sm:text-sm">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Reward</div>
              <div className="font-mono text-xl sm:text-2xl font-black text-indigo-600">
                ${job.rewardUSD.toFixed(2)} <span className="text-xs text-slate-400 font-sans font-bold">USD</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Time</div>
              <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{job.estimatedTime}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Slots Remaining</div>
              <div className="font-mono text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>{job.remainingSlots} / {job.totalSlots}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Deliverable Scope</div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate mt-1">
                {job.wordCountOrUnit || 'Standard Specification'}
              </div>
            </div>
          </div>

          {/* Section: Objective & Target Audience */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
              Project Objective &amp; Audience
            </h3>
            <p className="text-slate-700 leading-relaxed">{job.objective}</p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600">
              <strong className="text-slate-900">Target Audience:</strong> {job.targetAudience}
            </div>
          </div>

          {/* Section: Description & Context */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
              Detailed Description
            </h3>
            <p className="text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Section: Step-by-Step Instructions */}
          {job.instructions && job.instructions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
                Execution Instructions
              </h3>
              <ul className="space-y-2">
                {job.instructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <span className="font-mono text-indigo-600 font-bold">{idx + 1}.</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deliverable Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Style &amp; Format Specs
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div><span className="text-slate-400 font-medium">Expected Deliverable:</span> <strong className="text-slate-900">{job.expectedDeliverable}</strong></div>
                <div><span className="text-slate-400 font-medium">Style Guideline:</span> {job.style}</div>
                <div><span className="text-slate-400 font-medium">Tone:</span> {job.tone}</div>
                <div><span className="text-slate-400 font-medium">Language:</span> {job.language}</div>
                <div><span className="text-slate-400 font-medium">File Format:</span> {job.format}</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Mandatory Requirements
              </h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Acceptance Criteria & Forbidden Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
              <h4 className="font-bold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acceptance Criteria</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {job.acceptanceCriteria.map((ac, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">&bull;</span>
                    <span>{ac}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg space-y-2">
              <h4 className="font-bold text-xs text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Forbidden Items</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {job.forbiddenItems.map((forb, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">&bull;</span>
                    <span>{forb}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Revision Policy */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span><strong>Revision Policy:</strong> {job.revisionPolicy}</span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`px-3 py-2 rounded-sm border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Job'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-sm border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => {
                setReportSuccess(true);
                setTimeout(() => setReportSuccess(false), 3000);
              }}
              className="px-3 py-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-sm border border-slate-200 text-xs transition-colors ml-auto sm:ml-0"
              title="Report inappropriate job listing"
            >
              {reportSuccess ? 'Reported' : 'Report'}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-200 transition-colors w-full sm:w-auto"
            >
              Close
            </button>

            {alreadyAssigned ? (
              <button
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <span>Go to Active Assignment</span>
              </button>
            ) : job.remainingSlots <= 0 ? (
              <button
                disabled
                className="px-6 py-2.5 bg-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider rounded-sm cursor-not-allowed border border-slate-200 w-full sm:w-auto"
              >
                Job Full (0 Slots)
              </button>
            ) : (
              <button
                id="modal-take-job-btn"
                onClick={handleTakeJob}
                disabled={isApplying}
                className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Take Job &bull; Earn ${job.rewardUSD.toFixed(2)} USD</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
