import React, { useState } from 'react';
import { X, CheckCircle2, RotateCcw, AlertTriangle, Star, FileText } from 'lucide-react';
import { JobAssignment } from '../../types';
import { useApp } from '../../context/AppContext';

interface ReviewSubmissionModalProps {
  assignment: JobAssignment | null;
  onClose: () => void;
}

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  assignment,
  onClose
}) => {
  const { reviewSubmission } = useApp();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [activeAction, setActiveAction] = useState<'approve' | 'revise' | 'reject'>('approve');

  if (!assignment) return null;

  const wordCount = assignment.submissionText.trim()
    ? assignment.submissionText.trim().split(/\s+/).length
    : 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    let decision: 'APPROVED' | 'REVISION_REQUESTED' | 'REJECTED' = 'APPROVED';
    if (activeAction === 'revise') decision = 'REVISION_REQUESTED';
    if (activeAction === 'reject') decision = 'REJECTED';

    reviewSubmission(assignment.id, decision, feedback, rating);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-lg w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                Review Deliverable
              </span>
              <span className="font-mono text-xs text-slate-900 font-bold">
                Escrow: ${assignment.rewardUSD.toFixed(2)} USD
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {assignment.jobTitle}
            </h2>
            <div className="text-xs text-slate-500 mt-1">
              Submitted by <strong className="text-slate-800">{assignment.freelancerName}</strong> &bull; {wordCount} words
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverable Review Content */}
        <form onSubmit={handleSubmitReview} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-left">
          
          {/* Deliverable Body Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Submitted Deliverable
              </label>
              <span className="font-mono text-xs text-slate-500 font-semibold">{wordCount} words</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-h-60 overflow-y-auto font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {assignment.submissionText || 'No text submitted.'}
            </div>
            {assignment.submissionAttachmentName && (
              <div className="text-xs text-indigo-600 font-semibold flex items-center gap-1 mt-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Attachment: {assignment.submissionAttachmentName}</span>
              </div>
            )}
          </div>

          {/* Action Selector */}
          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Review Decision
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActiveAction('approve')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeAction === 'approve'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Approve &amp; Pay</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Release ${assignment.rewardUSD.toFixed(2)} USD from escrow.</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('revise')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeAction === 'revise'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Request Revision</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Ask for formatting or scope adjustments.</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('reject')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  activeAction === 'reject'
                    ? 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Reject Task</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Violation of forbidden guidelines.</div>
              </button>
            </div>
          </div>

          {/* Feedback Notes */}
          <div className="space-y-1.5">
            <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Feedback &amp; Revision Notes
            </label>
            <textarea
              rows={3}
              required={activeAction !== 'approve'}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                activeAction === 'approve'
                  ? 'Optional praise or comments for the freelancer...'
                  : 'Please specify the exact reasons for revision and what needs to be changed...'
              }
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-none"
            />
          </div>

          {/* Rating if Approving */}
          {activeAction === 'approve' && (
            <div className="space-y-1.5">
              <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Freelancer Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="font-bold text-xs text-slate-700 ml-2">{rating} Stars</span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-6 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-all ${
                activeAction === 'approve'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : activeAction === 'revise'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {activeAction === 'approve'
                ? 'Approve & Release Payment'
                : activeAction === 'revise'
                ? 'Send Revision Request'
                : 'Confirm Task Rejection'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
