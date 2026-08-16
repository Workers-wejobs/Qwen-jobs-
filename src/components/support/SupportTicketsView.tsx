import React, { useState } from 'react';
import { HelpCircle, Plus, Send, MessageSquare, CheckCircle2, Clock, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SupportCategory } from '../../types';

export const SupportTicketsView: React.FC = () => {
  const { currentUser, tickets, createSupportTicket, replySupportTicket } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportCategory>('Payment & Payout');
  const [description, setDescription] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const myTickets = (tickets || []).filter(
    (t) => currentUser && (t.userId === currentUser.id || currentUser.role === 'admin')
  );

  const activeTicket = (tickets || []).find((t) => t.id === activeTicketId);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    createSupportTicket(category, subject, description);
    setSubject('');
    setDescription('');
    setIsCreateOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicketId) return;

    replySupportTicket(activeTicketId, replyText);
    setReplyText('');
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Help Center &amp; Support Tickets
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit inquiries regarding payments, task guidelines, client reviews, or account verification.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Open New Ticket</span>
          </button>
        </div>

        {/* Tickets and Active Conversation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Ticket List */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
              Your Support Tickets ({myTickets.length})
            </h3>

            {myTickets.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No active tickets found.
              </div>
            ) : (
              <div className="space-y-2">
                {myTickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      activeTicketId === t.id
                        ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                        {t.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                        t.status === 'RESOLVED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{t.subject}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Ticket Conversation */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-sm min-h-[400px]">
            {activeTicket ? (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">{activeTicket.category}</span>
                      <h3 className="text-base font-extrabold text-slate-900">{activeTicket.subject}</h3>
                    </div>
                    <span className="text-xs text-slate-400">{new Date(activeTicket.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Initial message */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 space-y-1">
                    <div className="font-bold text-slate-900">{activeTicket.userName} wrote:</div>
                    <p className="leading-relaxed">{activeTicket.description}</p>
                  </div>

                  {/* Replies thread */}
                  <div className="space-y-3">
                    {(activeTicket.messages || []).map((m) => (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-lg text-xs space-y-1 ${
                          m.sender === 'support'
                            ? 'bg-indigo-50 border border-indigo-200 ml-4'
                            : 'bg-slate-50 border border-slate-200 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>
                            {m.senderName}{' '}
                            {m.sender === 'support' && (
                              <span className="text-indigo-600 font-normal">(Support Staff)</span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {new Date(m.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your response..."
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8 text-slate-400 text-xs">
                Select a ticket from the left panel to inspect updates or compose a message.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Create Ticket Modal */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-lg w-full max-w-lg p-6 shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">Create Support Inquiry</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Withdrawal payment status inquiry"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                >
                  <option value="Payment & Payout">Payment &amp; Payout</option>
                  <option value="Job Dispute">Job Dispute</option>
                  <option value="Account Verification">Account Verification</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue with relevant task IDs or payment references..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold uppercase text-[10px] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] rounded-sm"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
