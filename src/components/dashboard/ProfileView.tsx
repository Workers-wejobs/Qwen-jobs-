import React, { useState } from 'react';
import {
  User as UserIcon,
  Star,
  Globe,
  Briefcase,
  CheckCircle2,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PortfolioItem } from '../../types';

export const ProfileView: React.FC = () => {
  const { currentUser, updateUserProfile, addPortfolioItem, deletePortfolioItem } = useApp();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser?.bio || '');
  const [skillInput, setSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(currentUser?.skills || []);

  // Portfolio modal
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const [portTitle, setPortTitle] = useState('');
  const [portDesc, setPortDesc] = useState('');
  const [portCategory, setPortCategory] = useState('Writing');
  const [portLink, setPortLink] = useState('');
  const [portSkills, setPortSkills] = useState('');

  if (!currentUser) return null;

  const handleSaveBio = () => {
    updateUserProfile({ bio: bioText, skills: skillsList });
    setIsEditingBio(false);
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skillsList.includes(skillInput.trim())) {
        setSkillsList([...skillsList, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim()) return;

    addPortfolioItem({
      title: portTitle,
      description: portDesc,
      category: portCategory,
      liveUrl: portLink || undefined,
      skills: portSkills.split(',').map((s) => s.trim()).filter(Boolean),
      isPublic: true
    });

    setPortTitle('');
    setPortDesc('');
    setPortLink('');
    setPortSkills('');
    setIsAddPortfolioOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-20 h-20 rounded-lg object-cover border-2 border-slate-200 shadow-sm"
            />
            <div className="space-y-1">
              <div className="w-6 h-1 bg-indigo-600 mb-1"></div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser.fullName}
                </h2>
                {currentUser.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Freelancer
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.country}
                </span>
                <span>&bull;</span>
                <span className="font-mono text-slate-700 font-semibold">{currentUser.completedJobsCount} tasks completed</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {currentUser.rating.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isEditingBio ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio & Skills Editor */}
        {isEditingBio ? (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-1">
                Professional Bio
              </label>
              <textarea
                rows={4}
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-1">
                Add Skills (Press Enter)
              </label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type skill name and press Enter..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skillsList.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      className="text-slate-400 hover:text-rose-600 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveBio}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {currentUser.bio || 'No bio provided yet.'}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {(currentUser.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Showcase Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <h3 className="text-base font-extrabold text-slate-900">Verified Work Portfolio</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlight your best articles, research whitepapers, and translation samples to clients.
            </p>
          </div>

          <button
            onClick={() => setIsAddPortfolioOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Add Work Item</span>
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentUser.portfolio || []).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded">
                    {item.category}
                  </span>
                  <button
                    onClick={() => deletePortfolioItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete portfolio item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-semibold">
                      {s}
                    </span>
                  ))}
                </div>

                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Portfolio Modal */}
      {isAddPortfolioOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsAddPortfolioOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-lg w-full max-w-lg p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">Add Portfolio Project</h3>
              <button
                onClick={() => setIsAddPortfolioOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreatePortfolio} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  placeholder="e.g. Fintech Market Analysis 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Category</label>
                <select
                  value={portCategory}
                  onChange={(e) => setPortCategory(e.target.value)}
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

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Description / Summary</label>
                <textarea
                  rows={3}
                  value={portDesc}
                  onChange={(e) => setPortDesc(e.target.value)}
                  placeholder="Brief summary of methodology, deliverables, and client satisfaction."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={portSkills}
                  onChange={(e) => setPortSkills(e.target.value)}
                  placeholder="e.g. SEO, Financial Modeling, Markdown"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">External Link (Optional)</label>
                <input
                  type="url"
                  value={portLink}
                  onChange={(e) => setPortLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPortfolioOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] rounded-sm"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
