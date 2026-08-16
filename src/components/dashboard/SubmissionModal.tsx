import React, { useState } from 'react';
import { X, Send, Save, Paperclip, AlertCircle, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { JobAssignment } from '../../types';
import { useApp } from '../../context/AppContext';

interface SubmissionModalProps {
  assignment: JobAssignment | null;
  onClose: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ assignment, onClose }) => {
  const { saveSubmissionDraft, submitAssignment } = useApp();
  const [submissionText, setSubmissionText] = useState(assignment?.submissionText || '');
  const [attachmentName, setAttachmentName] = useState(assignment?.submissionAttachmentName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assignment) return null;

  const wordCount = submissionText.trim() ? submissionText.trim().split(/\s+/).length : 0;
  const isRevision = assignment.status === 'REVISION_REQUESTED';

  const handleSaveDraft = () => {
    saveSubmissionDraft(assignment.id, submissionText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = submitAssignment(assignment.id, submissionText, attachmentName);
    setIsSubmitting(false);
    if (res.success) {
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        alert('File size exceeds 25MB maximum limit.');
        return;
      }
      setAttachmentName(file.name);
    }
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
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                {assignment.category}
              </span>
              <span className="text-xs font-mono text-indigo-600 font-black">
                Reward: ${assignment.rewardUSD.toFixed(2)} USD
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {isRevision ? 'Resubmit Work: ' : 'Submit Deliverable: '} {assignment.jobTitle}
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* If Revision Requested Banner */}
          {isRevision && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-800 text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Client Revision Request Notes (Round {assignment.revisionCount})</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed">
                {assignment.clientFeedback || 'Please review guidelines and adjust formatting.'}
              </p>
            </div>
          )}

          {/* Submission Text Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Deliverable Content / Text Response
              </label>
              <span className="font-mono text-xs text-slate-500 font-semibold">
                Word Count: <strong className="text-indigo-600">{wordCount}</strong> words
              </span>
            </div>
            <textarea
              rows={10}
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Paste your completed article, research synthesis, translated text, transcription, or markdown formatted deliverable here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors font-mono leading-relaxed resize-y"
            />
          </div>

          {/* Attachment Upload Field */}
          <div className="space-y-2">
            <label className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Attach File (Optional &bull; PDF, DOCX, TXT, CSV, MD, ZIP up to 25MB)
            </label>
            <div className="border border-dashed border-slate-300 hover:border-indigo-500 rounded-lg p-5 text-center bg-slate-50 transition-colors relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                accept=".pdf,.docx,.txt,.csv,.md,.zip,.json"
              />
              <div className="flex flex-col items-center gap-2">
                <Paperclip className="w-5 h-5 text-indigo-600" />
                {attachmentName ? (
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <FileCheck className="w-4 h-4" />
                    <span>Attached: {attachmentName}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAttachmentName('');
                      }}
                      className="text-rose-600 hover:text-rose-700 text-xs ml-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs text-slate-800 font-bold">
                      Drag &amp; drop deliverable file here, or browse
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Supports .pdf, .docx, .txt, .csv, .md, .zip
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Guidelines Compliance Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              By submitting, you certify that this work is 100% original, complies with client guidelines, and is free of uncredited plagiarism.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-sm border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Draft</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isRevision ? 'Dispatch Resubmission' : 'Submit for Client Review'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
