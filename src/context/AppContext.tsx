import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Job,
  JobAssignment,
  Transaction,
  WithdrawalRequest,
  Challenge,
  ChallengeParticipant,
  ChallengeAppeal,
  FAQItem,
  SupportTicket,
  Sponsor,
  AppNotification,
  AuditLog,
  PortfolioItem,
  UserRole
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_CHALLENGE,
  INITIAL_PARTICIPANTS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_ASSIGNMENTS,
  INITIAL_PORTFOLIO,
  INITIAL_SPONSORS,
  INITIAL_TICKETS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_FAQS
} from '../data/initialData';

interface AppContextType {
  // Current user & auth
  currentUser: User | null;
  allUsers: User[];
  setCurrentUser: (user: User | null) => void;
  switchUserRole: (role: UserRole) => void;
  loginUser: (email: string, role?: UserRole) => boolean;
  registerUser: (userData: Partial<User>) => { success: boolean; message: string };
  logoutUser: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  
  // Jobs & Marketplace
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  takeJob: (jobId: string) => { success: boolean; message: string };
  createJob: (jobData: Omit<Job, 'id' | 'slug' | 'createdAt' | 'status' | 'clientJobsPosted' | 'remainingSlots'>) => { success: boolean; job: Job };
  updateJobStatus: (jobId: string, status: Job['status']) => void;
  
  // Assignments & Submissions
  assignments: JobAssignment[];
  saveSubmissionDraft: (assignmentId: string, text: string) => void;
  submitAssignment: (assignmentId: string, text: string, attachmentName?: string) => { success: boolean; message: string };
  reviewSubmission: (assignmentId: string, action: 'ACCEPT' | 'REVISION' | 'REJECT', feedback?: string, rating?: number) => { success: boolean; message: string };
  
  // Wallet, Ledger & Withdrawals
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  requestWithdrawal: (amountUSD: number, method: 'Bank Transfer' | 'PayPal' | 'Wise', accountDetails: string) => { success: boolean; message: string };
  processWithdrawal: (withdrawalId: string, action: 'APPROVE' | 'REJECT', rejectionReason?: string) => void;
  
  // Portfolio
  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'userId'>) => void;
  deletePortfolioItem: (id: string) => void;
  
  // Monthly Challenge
  challenge: Challenge;
  participants: ChallengeParticipant[];
  appeals: ChallengeAppeal[];
  registerForChallenge: (fullName: string, displayName: string, email: string, country: string) => { success: boolean; message: string };
  submitChallengeAppeal: (reason: string, details: string) => { success: boolean; message: string };
  updateParticipantStatus: (participantId: string, status: ChallengeParticipant['status'], adminNotes?: string) => void;
  adjustParticipantPoints: (participantId: string, pointDelta: number, reason: string) => void;
  
  // FAQs
  faqs: FAQItem[];
  voteFAQ: (faqId: string, voteType: 'helpful' | 'notHelpful') => void;
  addFAQ: (faq: Omit<FAQItem, 'id' | 'helpfulCount' | 'notHelpfulCount' | 'order'>) => void;
  deleteFAQ: (faqId: string) => void;
  
  // Support Tickets
  tickets: SupportTicket[];
  createSupportTicket: (category: string, subject: string, description: string, attachmentName?: string) => { success: boolean; ticket: SupportTicket };
  replySupportTicket: (ticketId: string, text: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  
  // Sponsors
  sponsors: Sponsor[];
  updateSponsor: (sponsorId: string, data: Partial<Sponsor>) => void;
  
  // Notifications & Audit Logs
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  auditLogs: AuditLog[];
  
  // Toast Alerts
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state with fallback to initial data
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('qwenjobs_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('qwenjobs_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // default to Freelancer (Alex Morgan)
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('qwenjobs_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('qwenjobs_saved_jobs');
    return saved ? JSON.parse(saved) : ['job_1', 'job_4'];
  });

  const [assignments, setAssignments] = useState<JobAssignment[]>(() => {
    const saved = localStorage.getItem('qwenjobs_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('qwenjobs_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('qwenjobs_withdrawals');
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('qwenjobs_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [challenge, setChallenge] = useState<Challenge>(() => {
    const saved = localStorage.getItem('qwenjobs_challenge');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGE;
  });

  const [participants, setParticipants] = useState<ChallengeParticipant[]>(() => {
    const saved = localStorage.getItem('qwenjobs_participants');
    return saved ? JSON.parse(saved) : INITIAL_PARTICIPANTS;
  });

  const [appeals, setAppeals] = useState<ChallengeAppeal[]>(() => {
    const saved = localStorage.getItem('qwenjobs_appeals');
    return saved ? JSON.parse(saved) : [];
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('qwenjobs_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('qwenjobs_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [sponsors, setSponsors] = useState<Sponsor[]>(() => {
    const saved = localStorage.getItem('qwenjobs_sponsors');
    return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('qwenjobs_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('qwenjobs_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('qwenjobs_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_challenge', JSON.stringify(challenge));
  }, [challenge]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_appeals', JSON.stringify(appeals));
  }, [appeals]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_sponsors', JSON.stringify(sponsors));
  }, [sponsors]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('qwenjobs_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  const logAction = (action: string, details: string, targetId?: string) => {
    const newLog: AuditLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      action,
      actorId: currentUser?.id || 'guest',
      actorName: currentUser?.displayName || 'Anonymous Guest',
      actorRole: currentUser?.role || 'guest',
      targetId,
      details,
      ipAddress: '192.0.2.' + Math.floor(Math.random() * 200 + 10)
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Switch between pre-configured personas for easy testing
  const switchUserRole = (role: UserRole) => {
    const match = allUsers.find((u) => u.role === role);
    if (match) {
      setCurrentUser(match);
      showToast(`Switched active profile to ${match.displayName} (${role.toUpperCase()})`, 'info');
      logAction('USER_ROLE_SWITCHED', `Switched session to persona: ${match.displayName} (${role})`);
    } else {
      showToast(`No persona found for role ${role}`, 'error');
    }
  };

  const loginUser = (email: string, role: UserRole = 'freelancer') => {
    const match = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (match) {
      setCurrentUser(match);
      showToast(`Welcome back, ${match.displayName}!`, 'success');
      logAction('AUTH_LOGIN', `User ${match.email} logged in successfully.`);
      return true;
    }
    // If not found, switch to first of role
    const fallback = allUsers.find((u) => u.role === role) || allUsers[0];
    setCurrentUser(fallback);
    showToast(`Logged in as ${fallback.displayName}`, 'success');
    logAction('AUTH_LOGIN_FALLBACK', `Logged in as ${fallback.email}`);
    return true;
  };

  const registerUser = (userData: Partial<User>) => {
    if (!userData.email || !userData.fullName) {
      return { success: false, message: 'Email and Full Name are required.' };
    }
    const existing = allUsers.find((u) => u.email.toLowerCase() === userData.email?.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      fullName: userData.fullName,
      displayName: userData.displayName || userData.fullName.split(' ')[0],
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      country: userData.country || 'United States',
      role: (userData.role as UserRole) || 'freelancer',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      bio: userData.bio || 'New freelance talent ready for micro-tasks and writing projects.',
      skills: userData.skills || ['Writing', 'Research'],
      languages: userData.languages || ['English'],
      experienceYears: 1,
      completedJobsCount: 0,
      successRate: 100,
      rating: 5.0,
      reviewCount: 0,
      availability: 'Available',
      isEmailVerified: true,
      accountStatus: 'active',
      fraudRiskScore: 0,
      createdAt: new Date().toISOString(),
      availableBalance: 0,
      pendingBalance: 0,
      totalEarned: 0,
      totalWithdrawn: 0,
      paymentMethodVerified: false
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    logAction('AUTH_REGISTER', `New user registered: ${newUser.email} as ${newUser.role}`);
    showToast('Registration successful! Welcome to QwenJobs.', 'success');
    return { success: true, message: 'Account registered successfully.' };
  };

  const logoutUser = () => {
    logAction('AUTH_LOGOUT', `User ${currentUser?.email} logged out.`);
    setCurrentUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    logAction('PROFILE_UPDATED', `User profile updated for ${currentUser.email}`);
    showToast('Profile updated successfully.', 'success');
  };

  // Toggle Saved Job
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      showToast(exists ? 'Removed from saved jobs' : 'Job saved to your bookmarks', 'info');
      return updated;
    });
  };

  // Take Job (Atomic concurrency check)
  const takeJob = (jobId: string) => {
    if (!currentUser) {
      showToast('Please login to apply for this job.', 'error');
      return { success: false, message: 'Authentication required.' };
    }

    if (currentUser.accountStatus !== 'active') {
      return { success: false, message: 'Your account is currently under review or restricted.' };
    }

    const job = jobs.find((j) => j.id === jobId);
    if (!job) {
      return { success: false, message: 'Job not found.' };
    }

    if (job.status !== 'ACTIVE' || job.remainingSlots <= 0) {
      return { success: false, message: 'No remaining slots available for this job.' };
    }

    // Check if user already took this job
    const alreadyTaken = assignments.some(
      (a) => a.jobId === jobId && a.freelancerId === currentUser.id && a.status !== 'CANCELLED' && a.status !== 'REJECTED'
    );
    if (alreadyTaken) {
      return { success: false, message: 'You have already taken an active assignment on this job.' };
    }

    // Atomic slot reduction
    const updatedJobs = jobs.map((j) => {
      if (j.id === jobId) {
        const remaining = j.remainingSlots - 1;
        return {
          ...j,
          remainingSlots: remaining,
          status: remaining === 0 ? ('FULL' as const) : j.status
        };
      }
      return j;
    });
    setJobs(updatedJobs);

    // Create assignment
    const newAssignment: JobAssignment = {
      id: 'asg_' + Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      category: job.category,
      freelancerId: currentUser.id,
      freelancerName: currentUser.displayName,
      rewardUSD: job.rewardUSD,
      assignedAt: new Date().toISOString(),
      deadline: job.deadline,
      status: 'IN_PROGRESS',
      revisionCount: 0
    };
    setAssignments((prev) => [newAssignment, ...prev]);

    // Send notification
    const newNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      userId: currentUser.id,
      type: 'job',
      title: 'Job Assigned: ' + job.title,
      message: `You have successfully taken this task. Reward: $${job.rewardUSD.toFixed(2)} USD. Deadline: ${new Date(job.deadline).toLocaleDateString()}.`,
      timestamp: new Date().toISOString(),
      isRead: false,
      link: '/dashboard'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    logAction('JOB_TAKEN', `Freelancer ${currentUser.displayName} claimed slot on "${job.title}". Slots remaining: ${job.remainingSlots - 1}`, job.id);
    showToast(`Job successfully claimed! Reward: $${job.rewardUSD.toFixed(2)} USD`, 'success');
    return { success: true, message: 'Job assigned successfully.' };
  };

  // Create Job (Client)
  const createJob = (jobData: Omit<Job, 'id' | 'slug' | 'createdAt' | 'status' | 'clientJobsPosted' | 'remainingSlots'>) => {
    const slug = jobData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newJob: Job = {
      ...jobData,
      id: 'job_' + Date.now(),
      slug: `${slug}-${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      clientJobsPosted: (currentUser?.completedJobsCount || 10) + 1,
      remainingSlots: jobData.totalSlots,
      clientId: currentUser?.id || 'user_client_1',
      clientName: currentUser?.displayName || 'Client'
    };

    setJobs((prev) => [newJob, ...prev]);
    logAction('JOB_CREATED', `Client created job: "${newJob.title}" with ${newJob.totalSlots} slots at $${newJob.rewardUSD} USD`, newJob.id);
    showToast('Job published successfully to the marketplace!', 'success');
    return { success: true, job: newJob };
  };

  const updateJobStatus = (jobId: string, status: Job['status']) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    logAction('JOB_STATUS_UPDATED', `Job ${jobId} status changed to ${status}`, jobId);
    showToast(`Job status updated to ${status}`, 'info');
  };

  // Save Submission Draft
  const saveSubmissionDraft = (assignmentId: string, text: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, submissionText: text } : a))
    );
    showToast('Draft deliverable saved.', 'info');
  };

  // Submit Assignment Work
  const submitAssignment = (assignmentId: string, text: string, attachmentName?: string) => {
    if (!text.trim() && !attachmentName) {
      return { success: false, message: 'Please provide either submission text or an attached file.' };
    }

    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          return {
            ...a,
            submissionText: text,
            submissionAttachmentName: attachmentName || a.submissionAttachmentName,
            status: 'SUBMITTED',
            submittedAt: new Date().toISOString()
          };
        }
        return a;
      })
    );

    logAction('SUBMISSION_SENT', `Assignment ${assignmentId} submitted for review by ${currentUser?.displayName}`, assignmentId);
    showToast('Work submitted successfully! The client will review your deliverable.', 'success');
    return { success: true, message: 'Submitted successfully.' };
  };

  // Review Submission (Client / Admin Action)
  const reviewSubmission = (assignmentId: string, action: 'ACCEPT' | 'REVISION' | 'REJECT', feedback?: string, rating: number = 5.0) => {
    const asg = assignments.find((a) => a.id === assignmentId);
    if (!asg) {
      return { success: false, message: 'Assignment not found.' };
    }

    if (action === 'ACCEPT') {
      // 1. Update assignment
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                status: 'ACCEPTED',
                clientFeedback: feedback || 'Excellent deliverable meeting all criteria.',
                clientRating: rating,
                reviewedAt: new Date().toISOString()
              }
            : a
        )
      );

      // 2. Disburse reward to freelancer balance & add immutable transaction
      setAllUsers((prev) =>
        prev.map((u) => {
          if (u.id === asg.freelancerId) {
            return {
              ...u,
              availableBalance: Number((u.availableBalance + asg.rewardUSD).toFixed(2)),
              totalEarned: Number((u.totalEarned + asg.rewardUSD).toFixed(2)),
              completedJobsCount: u.completedJobsCount + 1,
              rating: Number(((u.rating * u.reviewCount + rating) / (u.reviewCount + 1)).toFixed(2)),
              reviewCount: u.reviewCount + 1
            };
          }
          return u;
        })
      );

      // If current user is the freelancer, update current user state too
      if (currentUser?.id === asg.freelancerId) {
        setCurrentUser((prev) =>
          prev
            ? {
                ...prev,
                availableBalance: Number((prev.availableBalance + asg.rewardUSD).toFixed(2)),
                totalEarned: Number((prev.totalEarned + asg.rewardUSD).toFixed(2)),
                completedJobsCount: prev.completedJobsCount + 1
              }
            : null
        );
      }

      // 3. Create Transaction
      const newTx: Transaction = {
        id: 'tx_' + Date.now(),
        userId: asg.freelancerId,
        userName: asg.freelancerName,
        date: new Date().toISOString(),
        type: 'Job Reward',
        amount: asg.rewardUSD,
        currency: 'USD',
        status: 'COMPLETED',
        reference: `REWARD-${asg.jobId.slice(0, 8).toUpperCase()}`,
        description: `Reward for completed task: ${asg.jobTitle}`
      };
      setTransactions((prev) => [newTx, ...prev]);

      // 4. Update challenge points if user is in monthly challenge
      const pointsEarned = asg.rewardUSD >= 50 ? 50 : asg.rewardUSD >= 30 ? 30 : asg.rewardUSD >= 20 ? 20 : 10;
      const bonusRating = rating === 5.0 ? 5 : 0;
      const totalPoints = pointsEarned + bonusRating;

      setParticipants((prev) =>
        prev.map((p) => {
          if (p.userId === asg.freelancerId) {
            return {
              ...p,
              points: p.points + totalPoints,
              completedQualifyingJobs: p.completedQualifyingJobs + 1
            };
          }
          return p;
        })
      );

      // 5. Notify Freelancer
      const notif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: asg.freelancerId,
        type: 'payment',
        title: `Deliverable Accepted! +$${asg.rewardUSD.toFixed(2)} USD`,
        message: `Your work for "${asg.jobTitle}" was approved with a ${rating}★ rating. Funds credited to your available balance.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        link: '/dashboard'
      };
      setNotifications((prev) => [notif, ...prev]);

      logAction('SUBMISSION_ACCEPTED', `Submission for ${asg.jobTitle} accepted. $${asg.rewardUSD} USD disbursed to ${asg.freelancerName}`, assignmentId);
      showToast(`Submission accepted! $${asg.rewardUSD.toFixed(2)} USD disbursed.`, 'success');
      return { success: true, message: 'Submission accepted and rewarded.' };
    } else if (action === 'REVISION') {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                status: 'REVISION_REQUESTED',
                revisionCount: a.revisionCount + 1,
                clientFeedback: feedback || 'Please review the formatting and source citations.'
              }
            : a
        )
      );

      const notif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: asg.freelancerId,
        type: 'submission',
        title: 'Revision Requested on ' + asg.jobTitle,
        message: feedback || 'Client requested adjustments. Please see review notes.',
        timestamp: new Date().toISOString(),
        isRead: false,
        link: '/dashboard'
      };
      setNotifications((prev) => [notif, ...prev]);

      logAction('SUBMISSION_REVISION', `Revision requested on assignment ${assignmentId}: ${feedback}`, assignmentId);
      showToast('Revision request sent to the freelancer.', 'info');
      return { success: true, message: 'Revision requested.' };
    } else {
      // REJECT
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                status: 'REJECTED',
                clientFeedback: feedback || 'Submission failed acceptance criteria.'
              }
            : a
        )
      );

      const notif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: asg.freelancerId,
        type: 'submission',
        title: 'Submission Rejected: ' + asg.jobTitle,
        message: feedback || 'The submission did not meet the mandatory criteria.',
        timestamp: new Date().toISOString(),
        isRead: false,
        link: '/dashboard'
      };
      setNotifications((prev) => [notif, ...prev]);

      logAction('SUBMISSION_REJECTED', `Submission ${assignmentId} rejected with reason: ${feedback}`, assignmentId);
      showToast('Submission rejected with explanation.', 'error');
      return { success: true, message: 'Submission rejected.' };
    }
  };

  // Request Withdrawal (Strict $100 USD Minimum enforcement)
  const requestWithdrawal = (amountUSD: number, method: 'Bank Transfer' | 'PayPal' | 'Wise', accountDetails: string) => {
    if (!currentUser) {
      return { success: false, message: 'Please login to request a withdrawal.' };
    }

    if (amountUSD < 100) {
      return {
        success: false,
        message: 'Minimum withdrawal amount is $100.00 USD. Your requested amount of $' + amountUSD.toFixed(2) + ' is below the minimum.'
      };
    }

    if (amountUSD > currentUser.availableBalance) {
      return {
        success: false,
        message: `Insufficient available balance. You have $${currentUser.availableBalance.toFixed(2)} USD available.`
      };
    }

    if (!accountDetails.trim()) {
      return { success: false, message: 'Please provide valid payout account details.' };
    }

    // Deduct from available balance & add to pending withdrawn
    const updatedBalance = Number((currentUser.availableBalance - amountUSD).toFixed(2));
    const updatedUser = {
      ...currentUser,
      availableBalance: updatedBalance
    };
    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

    const newReq: WithdrawalRequest = {
      id: 'wd_req_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.displayName,
      amountUSD,
      paymentMethod: method,
      accountDetails,
      requestedAt: new Date().toISOString(),
      status: 'PENDING'
    };
    setWithdrawals((prev) => [newReq, ...prev]);

    const tx: Transaction = {
      id: 'tx_' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.displayName,
      date: new Date().toISOString(),
      type: 'Withdrawal',
      amount: amountUSD,
      currency: 'USD',
      status: 'PENDING',
      reference: `WD-${newReq.id.slice(-6).toUpperCase()}`,
      description: `Withdrawal request via ${method} (${accountDetails})`
    };
    setTransactions((prev) => [tx, ...prev]);

    logAction('WITHDRAWAL_REQUESTED', `User ${currentUser.email} requested $${amountUSD.toFixed(2)} USD withdrawal via ${method}`, newReq.id);
    showToast(`Withdrawal of $${amountUSD.toFixed(2)} USD submitted for processing.`, 'success');
    return { success: true, message: 'Withdrawal requested successfully.' };
  };

  // Process Withdrawal (Admin)
  const processWithdrawal = (withdrawalId: string, action: 'APPROVE' | 'REJECT', rejectionReason?: string) => {
    const wd = withdrawals.find((w) => w.id === withdrawalId);
    if (!wd) return;

    if (action === 'APPROVE') {
      setWithdrawals((prev) =>
        prev.map((w) =>
          w.id === withdrawalId
            ? {
                ...w,
                status: 'PAID',
                processedAt: new Date().toISOString(),
                txHashOrRef: 'PAYOUT-' + Math.random().toString(36).substr(2, 9).toUpperCase()
              }
            : w
        )
      );

      // Update totalWithdrawn on user
      setAllUsers((prev) =>
        prev.map((u) => {
          if (u.id === wd.userId) {
            return {
              ...u,
              totalWithdrawn: Number((u.totalWithdrawn + wd.amountUSD).toFixed(2))
            };
          }
          return u;
        })
      );

      // Update transaction status
      setTransactions((prev) =>
        prev.map((t) =>
          t.reference.includes(wd.id.slice(-6).toUpperCase()) ? { ...t, status: 'COMPLETED' } : t
        )
      );

      const notif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: wd.userId,
        type: 'withdrawal',
        title: `Withdrawal Paid: $${wd.amountUSD.toFixed(2)} USD`,
        message: `Your withdrawal request via ${wd.paymentMethod} has been approved and paid out.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        link: '/dashboard'
      };
      setNotifications((prev) => [notif, ...prev]);

      logAction('WITHDRAWAL_APPROVED', `Admin approved withdrawal of $${wd.amountUSD.toFixed(2)} USD for ${wd.userName}`, withdrawalId);
      showToast(`Withdrawal of $${wd.amountUSD.toFixed(2)} USD marked as PAID.`, 'success');
    } else {
      // Refund back to user's balance
      setWithdrawals((prev) =>
        prev.map((w) =>
          w.id === withdrawalId
            ? {
                ...w,
                status: 'REJECTED',
                rejectionReason: rejectionReason || 'Verification check failed.'
              }
            : w
        )
      );

      setAllUsers((prev) =>
        prev.map((u) => {
          if (u.id === wd.userId) {
            return {
              ...u,
              availableBalance: Number((u.availableBalance + wd.amountUSD).toFixed(2))
            };
          }
          return u;
        })
      );

      if (currentUser?.id === wd.userId) {
        setCurrentUser((prev) =>
          prev ? { ...prev, availableBalance: Number((prev.availableBalance + wd.amountUSD).toFixed(2)) } : null
        );
      }

      const notif: AppNotification = {
        id: 'notif_' + Date.now(),
        userId: wd.userId,
        type: 'withdrawal',
        title: `Withdrawal Rejected: $${wd.amountUSD.toFixed(2)} USD`,
        message: `Your withdrawal was declined: ${rejectionReason || 'Details mismatch'}. Funds returned to balance.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        link: '/dashboard'
      };
      setNotifications((prev) => [notif, ...prev]);

      logAction('WITHDRAWAL_REJECTED', `Withdrawal ${withdrawalId} rejected. Reason: ${rejectionReason}`, withdrawalId);
      showToast('Withdrawal rejected and funds refunded to user.', 'info');
    }
  };

  // Add Portfolio Item
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'userId'>) => {
    if (!currentUser) return;
    const newItem: PortfolioItem = {
      ...item,
      id: 'port_' + Date.now(),
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    setPortfolioItems((prev) => [newItem, ...prev]);
    logAction('PORTFOLIO_ITEM_ADDED', `User added portfolio item: "${newItem.title}"`);
    showToast('Portfolio item added successfully.', 'success');
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
    showToast('Portfolio item deleted.', 'info');
  };

  // Register for Monthly Challenge (Unique check & capacity)
  const registerForChallenge = (fullName: string, displayName: string, email: string, country: string) => {
    if (!currentUser) {
      return { success: false, message: 'Please sign in to register for the Monthly Challenge.' };
    }

    if (challenge.currentParticipantsCount >= challenge.maxCapacity) {
      return { success: false, message: 'The Monthly Challenge has reached full participant capacity (500/500).' };
    }

    // UNIQUE user constraint
    const alreadyRegistered = participants.some((p) => p.userId === currentUser.id);
    if (alreadyRegistered) {
      return { success: false, message: 'You are already registered in the August 2026 Monthly Challenge!' };
    }

    const newParticipant: ChallengeParticipant = {
      id: 'cp_' + Date.now(),
      challengeId: challenge.id,
      userId: currentUser.id,
      fullName: fullName || currentUser.fullName,
      displayName: displayName || currentUser.displayName,
      email: email || currentUser.email,
      country: country || currentUser.country,
      avatarUrl: currentUser.avatarUrl,
      points: 10, // 10 welcome bonus points
      completedQualifyingJobs: 0,
      rank: participants.length + 1,
      isRisingStarEligible: true,
      status: 'VERIFIED',
      registeredAt: new Date().toISOString()
    };

    setParticipants((prev) => [...prev, newParticipant]);
    setChallenge((prev) => ({
      ...prev,
      currentParticipantsCount: prev.currentParticipantsCount + 1
    }));

    const notif: AppNotification = {
      id: 'notif_' + Date.now(),
      userId: currentUser.id,
      type: 'challenge',
      title: 'Registered: QwenJobs Monthly Challenge',
      message: 'You have entered the $1,700 USD prize challenge! Start completing tasks to climb the leaderboard.',
      timestamp: new Date().toISOString(),
      isRead: false,
      link: '/challenge'
    };
    setNotifications((prev) => [notif, ...prev]);

    logAction('CHALLENGE_REGISTRATION', `User ${currentUser.email} entered Monthly Challenge`, challenge.id);
    showToast('Successfully registered for the QwenJobs Monthly Challenge! (+10 starting points)', 'success');
    return { success: true, message: 'Registered successfully!' };
  };

  const submitChallengeAppeal = (reason: string, details: string) => {
    if (!currentUser) return { success: false, message: 'Login required' };
    const participant = participants.find((p) => p.userId === currentUser.id);
    if (!participant) return { success: false, message: 'Participant record not found' };

    const newAppeal: ChallengeAppeal = {
      id: 'app_' + Date.now(),
      participantId: participant.id,
      userId: currentUser.id,
      userName: currentUser.displayName,
      reason,
      details,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };
    setAppeals((prev) => [newAppeal, ...prev]);
    logAction('CHALLENGE_APPEAL_SUBMITTED', `Appeal submitted by ${currentUser.displayName}: ${reason}`);
    showToast('Appeal submitted. Admin will review within 48 hours.', 'info');
    return { success: true, message: 'Appeal filed successfully.' };
  };

  const updateParticipantStatus = (participantId: string, status: ChallengeParticipant['status'], adminNotes?: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, status } : p))
    );
    logAction('CHALLENGE_PARTICIPANT_STATUS', `Participant ${participantId} status set to ${status}. Notes: ${adminNotes || 'None'}`);
    showToast(`Participant status updated to ${status}`, 'info');
  };

  const adjustParticipantPoints = (participantId: string, pointDelta: number, reason: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, points: Math.max(0, p.points + pointDelta) } : p))
    );
    logAction('CHALLENGE_POINTS_ADJUSTED', `Adjusted points for ${participantId} by ${pointDelta > 0 ? '+' : ''}${pointDelta}. Reason: ${reason}`);
    showToast(`Points adjusted: ${pointDelta > 0 ? '+' : ''}${pointDelta}`, 'info');
  };

  // FAQ voting
  const voteFAQ = (faqId: string, voteType: 'helpful' | 'notHelpful') => {
    setFaqs((prev) =>
      prev.map((f) => {
        if (f.id === faqId) {
          if (f.userVote === voteType) return f; // already voted
          const wasHelpful = f.userVote === 'helpful';
          const wasNotHelpful = f.userVote === 'notHelpful';

          return {
            ...f,
            helpfulCount: voteType === 'helpful' ? f.helpfulCount + 1 : wasHelpful ? f.helpfulCount - 1 : f.helpfulCount,
            notHelpfulCount: voteType === 'notHelpful' ? f.notHelpfulCount + 1 : wasNotHelpful ? f.notHelpfulCount - 1 : f.notHelpfulCount,
            userVote: voteType
          };
        }
        return f;
      })
    );
    showToast('Thank you for your feedback!', 'info');
  };

  const addFAQ = (faq: Omit<FAQItem, 'id' | 'helpfulCount' | 'notHelpfulCount' | 'order'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: 'faq_' + Date.now(),
      helpfulCount: 0,
      notHelpfulCount: 0,
      order: faqs.length + 1
    };
    setFaqs((prev) => [newFaq, ...prev]);
    logAction('FAQ_CREATED', `New FAQ added: "${newFaq.question}"`);
    showToast('New FAQ published.', 'success');
  };

  const deleteFAQ = (faqId: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== faqId));
    showToast('FAQ deleted.', 'info');
  };

  // Support Tickets
  const createSupportTicket = (category: string, subject: string, description: string, attachmentName?: string) => {
    const newTicket: SupportTicket = {
      id: 'tkt_' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser?.id || 'guest',
      userName: currentUser?.displayName || 'Guest User',
      userEmail: currentUser?.email || 'guest@example.com',
      category,
      subject,
      description,
      attachmentName,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_' + Date.now(),
          sender: 'user',
          senderName: currentUser?.displayName || 'Guest',
          text: description,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    logAction('SUPPORT_TICKET_CREATED', `New ticket #${newTicket.id}: ${subject}`, newTicket.id);
    showToast(`Support Ticket #${newTicket.id} created. Our team will respond shortly.`, 'success');
    return { success: true, ticket: newTicket };
  };

  const replySupportTicket = (ticketId: string, text: string) => {
    if (!text.trim()) return;
    const isSupport = currentUser?.role === 'admin' || currentUser?.role === 'moderator';

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newMsg = {
            id: 'msg_' + Date.now(),
            sender: isSupport ? ('support' as const) : ('user' as const),
            senderName: currentUser?.displayName || 'User',
            text,
            timestamp: new Date().toISOString()
          };
          return {
            ...t,
            updatedAt: new Date().toISOString(),
            status: isSupport ? ('WAITING_USER' as const) : ('PROCESSING' as const),
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
    showToast('Reply sent.', 'success');
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t)));
    showToast(`Ticket status updated to ${status}`, 'info');
  };

  // Sponsors
  const updateSponsor = (sponsorId: string, data: Partial<Sponsor>) => {
    setSponsors((prev) => prev.map((s) => (s.id === sponsorId ? { ...s, ...data } : s)));
    showToast('Sponsor configuration updated.', 'success');
  };

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead && (currentUser ? n.userId === currentUser.id : true)).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        switchUserRole,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        jobs,
        savedJobIds,
        toggleSaveJob,
        takeJob,
        createJob,
        updateJobStatus,
        assignments,
        saveSubmissionDraft,
        submitAssignment,
        reviewSubmission,
        transactions,
        withdrawals,
        requestWithdrawal,
        processWithdrawal,
        portfolioItems,
        addPortfolioItem,
        deletePortfolioItem,
        challenge,
        participants,
        appeals,
        registerForChallenge,
        submitChallengeAppeal,
        updateParticipantStatus,
        adjustParticipantPoints,
        faqs,
        voteFAQ,
        addFAQ,
        deleteFAQ,
        tickets,
        createSupportTicket,
        replySupportTicket,
        updateTicketStatus,
        sponsors,
        updateSponsor,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        auditLogs,
        toastMessage,
        showToast,
        clearToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
