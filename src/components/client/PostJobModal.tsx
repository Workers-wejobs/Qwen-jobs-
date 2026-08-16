import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, DollarSign, Clock, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobCategory, JobDifficulty } from '../../types';

interface PostJobModalProps {
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ onClose }) => {
  const { postJob, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('Writing');
  const [subtype, setSubtype] = useState('');
  const [difficulty, setDifficulty] = useState<JobDifficulty>('Intermediate');
  const [rewardUSD, setRewardUSD] = useState<number>(35);
  const [totalSlots, setTotalSlots] = useState<number>(5);
  const [estimatedTime, setEstimatedTime] = useState('2 hours');
  const [wordCountOrUnit, setWordCountOrUnit] = useState('800 words');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [expectedDeliverable, setExpectedDeliverable] = useState('');
  const [style, setStyle] = useState('Professional, informative, and concise.');
  const [tone, setTone] = useState('Authoritative and engaging.');
  const [language, setLanguage] = useState('English (US)');
  const [format, setFormat] = useState('Markdown or Google Docs');
  const [revisionPolicy, setRevisionPolicy] = useState('Up to 2 revision rounds within 48 hours of delivery.');

  // Array inputs
  const [instructions, setInstructions] = useState<string[]>([
    'Research the core topic thoroughly.',
    'Write a structured draft according to word count.',
    'Proofread for grammar and citation accuracy.'
  ]);
  const [instructionInput, setInstructionInput] = useState('');

  const [requirements, setRequirements] = useState<string[]>([
    'Native or bilingual fluency.',
    'Zero AI plagiarism or fabricated data.'
  ]);
  const [reqInput, setReqInput] = useState('');

  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([
    'Meets required word count (minimum 800 words).',
    'Follows specified style and formatting guidelines.'
  ]);
  const [acInput, setAcInput] = useState('');

  const [forbiddenItems, setForbiddenItems] = useState<string[]>([
    'Unedited ChatGPT / LLM generated text.',
    'Uncredited copy-pasted blocks.'
  ]);
  const [forbInput, setForbInput] = useState('');

  const handleAddInstruction = () => {
    if (instructionInput.trim()) {
      setInstructions([...instructions, instructionInput.trim()]);
      setInstructionInput('');
    }
  };

  const handleAddReq = () => {
    if (reqInput.trim()) {
      setRequirements([...requirements, reqInput.trim()]);
      setReqInput('');
    }
  };

  const handleAddAc = () => {
    if (acInput.trim()) {
      setAcceptanceCriteria([...acceptanceCriteria, acInput.trim()]);
      setAcInput('');
    }
  };

  const handleAddForb = () => {
    if (forbInput.trim()) {
      setForbiddenItems([...forbiddenItems, forbInput.trim()]);
      setForbInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !objective.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const totalBudget = rewardUSD * totalSlots;

    postJob({
      title,
      category,
      subtype: subtype || undefined,
      difficulty,
      rewardUSD: Number(rewardUSD),
      totalSlots: Number(totalSlots),
      estimatedTime,
      wordCountOrUnit,
      objective,
      description,
      targetAudience: targetAudience || 'General Audience',
      instructions,
      requirements,
      expectedDeliverable: expectedDeliverable || 'Written draft according to guidelines.',
      acceptanceCriteria,
      forbiddenItems,
      revisionPolicy,
      style,
      tone,
      language,
      format,
      tags: [category, difficulty, subtype].filter(Boolean) as string[],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <h2 className="text-xl font-extrabold text-slate-900">Post a New Job / Micro-Task</h2>
            <p className="text-xs text-slate-500">
              Define transparent acceptance rubrics and escrow budgets for global talent.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-left">
          
          {/* Basic Job Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
              1. Basic Job Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="font-bold text-slate-900 text-xs block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Write a 1,200-Word SEO Article on Cloud Architecture"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-900 text-xs block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                >
                  <option value="Writing">Writing</option>
                  <option value="Creative Writing">Creative Writing</option>
                  <option value="Editing">Editing</option>
                  <option value="Research">Research</option>
                  <option value="Language">Language</option>
                  <option value="Transcription">Transcription</option>
                  <option value="Data / Digital Micro-Jobs">Data / Digital Micro-Jobs</option>
                  <option value="Content Moderation">Content Moderation</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-900 text-xs block mb-1">Subtype / Focus Area</label>
                <input
                  type="text"
                  value={subtype}
                  onChange={(e) => setSubtype(e.target.value)}
                  placeholder="e.g. Technical SEO Writing"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-900 text-xs block mb-1">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-900 text-xs block mb-1">Estimated Turnaround</label>
                <input
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="e.g. 2 hours"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Budget & Slots */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
              2. Budget &amp; Escrow Allocation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-900 text-xs block mb-1">Reward Per Slot (USD) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slate-400">$</span>
                  <input
                    type="number"
                    min="5"
                    step="1"
                    required
                    value={rewardUSD}
                    onChange={(e) => setRewardUSD(Number(e.target.value))}
                    className="w-full pl-7 pr-3 p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 text-xs block mb-1">Total Available Slots *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={totalSlots}
                  onChange={(e) => setTotalSlots(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 font-mono"
                />
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-md p-3 flex flex-col justify-center">
                <div className="text-[10px] uppercase font-bold text-indigo-700">Total Escrow Budget</div>
                <div className="font-mono text-lg font-black text-indigo-600">
                  ${(rewardUSD * totalSlots).toFixed(2)} USD
                </div>
              </div>
            </div>
          </div>

          {/* Instructions & Guidelines */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5">
              3. Objective, Deliverable &amp; Criteria
            </h3>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-900 text-xs block mb-1">Project Objective *</label>
                <textarea
                  rows={2}
                  required
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Primary objective and scope of this assignment..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 text-xs block mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide background context, specific focus areas, and source materials..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-900 text-xs block mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Enterprise CTOs and DevOps engineers"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-900 text-xs block mb-1">Expected Deliverable</label>
                  <input
                    type="text"
                    value={expectedDeliverable}
                    onChange={(e) => setExpectedDeliverable(e.target.value)}
                    placeholder="e.g. 1,200 words in Markdown formatted text"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Criteria Lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Acceptance Criteria */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
              <label className="font-bold text-slate-900 text-xs uppercase block">Acceptance Criteria</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={acInput}
                  onChange={(e) => setAcInput(e.target.value)}
                  placeholder="Add acceptance rule..."
                  className="w-full p-2 bg-white border border-slate-200 rounded text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddAc}
                  className="px-3 bg-slate-900 text-white rounded text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {acceptanceCriteria.map((ac, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 bg-white p-2 rounded border border-slate-100">
                    <span>{ac}</span>
                    <button
                      type="button"
                      onClick={() => setAcceptanceCriteria(acceptanceCriteria.filter((_, idx) => idx !== i))}
                      className="text-rose-500 hover:text-rose-700 font-bold"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forbidden Items */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
              <label className="font-bold text-slate-900 text-xs uppercase block">Forbidden Items</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={forbInput}
                  onChange={(e) => setForbInput(e.target.value)}
                  placeholder="Add forbidden practice..."
                  className="w-full p-2 bg-white border border-slate-200 rounded text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddForb}
                  className="px-3 bg-slate-900 text-white rounded text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {forbiddenItems.map((forb, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 bg-white p-2 rounded border border-slate-100">
                    <span>{forb}</span>
                    <button
                      type="button"
                      onClick={() => setForbiddenItems(forbiddenItems.filter((_, idx) => idx !== i))}
                      className="text-rose-500 hover:text-rose-700 font-bold"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

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
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Publish Job to Marketplace</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
