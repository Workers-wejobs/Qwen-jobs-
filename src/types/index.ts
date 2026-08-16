export type UserRole = 'guest' | 'freelancer' | 'client' | 'moderator' | 'admin' | 'superadmin';

export interface User {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  phone?: string;
  address?: string;
  country: string;
  role: UserRole;
  avatarUrl: string;
  bio: string;
  skills: string[];
  languages: string[];
  experienceYears: number;
  completedJobsCount: number;
  successRate: number; // e.g. 98%
  rating: number; // e.g. 4.9
  reviewCount: number;
  availability: 'Available' | 'Busy' | 'Not Available';
  isEmailVerified: boolean;
  accountStatus: 'active' | 'suspended' | 'banned' | 'pending_verification';
  fraudRiskScore: number; // 0 - 100
  createdAt: string;
  // Wallet
  availableBalance: number; // USD
  pendingBalance: number; // USD
  totalEarned: number; // USD
  totalWithdrawn: number; // USD
  paymentMethodVerified: boolean;
  paymentDetails?: {
    type: 'bank' | 'paypal' | 'wise';
    accountName: string;
    accountNumberOrEmail: string;
    bankName?: string;
    swiftCode?: string;
  };
}

export type JobCategory =
  | 'Writing'
  | 'Creative Writing'
  | 'Editing'
  | 'Research'
  | 'Language'
  | 'Translation'
  | 'Transcription'
  | 'Data / Digital Micro-Jobs'
  | 'Content Moderation';

export type JobDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'FULL' | 'EXPIRED' | 'COMPLETED' | 'ARCHIVED';

export interface Job {
  id: string;
  slug: string;
  title: string;
  category: JobCategory;
  subtype: string;
  rewardUSD: number;
  estimatedTime: string;
  difficulty: JobDifficulty;
  clientRating: number;
  clientName: string;
  clientId: string;
  clientJobsPosted: number;
  totalSlots: number;
  remainingSlots: number;
  deadline: string;
  createdAt: string;
  status: JobStatus;
  isFeatured?: boolean;
  
  // Detailed specification fields
  objective: string;
  targetAudience: string;
  description: string;
  instructions: string[];
  expectedDeliverable: string;
  wordCountOrUnit: string;
  style: string;
  tone: string;
  language: string;
  format: string;
  requirements: string[];
  forbiddenItems: string[];
  acceptanceCriteria: string[];
  revisionPolicy: string;
}

export type AssignmentStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'REVISION_REQUESTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED';

export interface JobAssignment {
  id: string;
  jobId: string;
  jobTitle: string;
  category: JobCategory;
  freelancerId: string;
  freelancerName: string;
  rewardUSD: number;
  assignedAt: string;
  deadline: string;
  status: AssignmentStatus;
  submissionText?: string;
  submissionAttachmentName?: string;
  submissionAttachmentUrl?: string;
  submittedAt?: string;
  revisionCount: number;
  clientFeedback?: string;
  clientRating?: number;
  reviewedAt?: string;
}

export type TransactionType =
  | 'Job Reward'
  | 'Bonus'
  | 'Challenge Reward'
  | 'Withdrawal'
  | 'Refund'
  | 'Adjustment'
  | 'Fee';

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'REVERSED';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  date: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  reference: string;
  description: string;
}

export type WithdrawalStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PROCESSING'
  | 'PAID'
  | 'REJECTED'
  | 'CANCELLED';

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amountUSD: number;
  paymentMethod: 'Bank Transfer' | 'PayPal' | 'Wise';
  accountDetails: string;
  requestedAt: string;
  status: WithdrawalStatus;
  processedAt?: string;
  rejectionReason?: string;
  txHashOrRef?: string;
}

export interface PortfolioItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: JobCategory;
  skills: string[];
  thumbnailUrl: string;
  externalLink?: string;
  visibility: 'Public' | 'Private';
  createdAt: string;
}

export interface Challenge {
  id: string;
  name: string;
  month: string;
  year: number;
  tagline: string;
  totalPrizePoolUSD: number;
  firstPrizeUSD: number;
  secondPrizeUSD: number;
  thirdPrizeUSD: number;
  bestFreelancerPrizeUSD: number;
  risingStarPrizeUSD: number;
  consistencyPrizeUSD: number;
  maxCapacity: number;
  currentParticipantsCount: number;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'VERIFYING' | 'COMPLETED';
}

export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId: string;
  fullName: string;
  displayName: string;
  email: string;
  country: string;
  avatarUrl: string;
  points: number;
  completedQualifyingJobs: number;
  rank: number;
  isRisingStarEligible: boolean;
  status: 'PENDING' | 'VERIFIED' | 'COUNTED' | 'PENDING_REVIEW' | 'DISQUALIFIED';
  registeredAt: string;
}

export interface ChallengeAppeal {
  id: string;
  participantId: string;
  userId: string;
  userName: string;
  reason: string;
  details: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  adminNotes?: string;
  submittedAt: string;
}

export type FAQCategory =
  | 'Account'
  | 'Profile'
  | 'Jobs'
  | 'Submission'
  | 'Payment'
  | 'Withdrawal'
  | 'Security'
  | 'Rules'
  | 'Technical'
  | 'Clients'
  | 'Monthly Challenge';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  isPopular?: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  userVote?: 'helpful' | 'notHelpful';
  order: number;
}

export type TicketStatus = 'OPEN' | 'PROCESSING' | 'WAITING_USER' | 'RESOLVED' | 'CLOSED';

export type SupportCategory =
  | 'Payment & Payout'
  | 'Job Dispute'
  | 'Account Verification'
  | 'General Question'
  | string;

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: string;
  subject: string;
  description: string;
  attachmentName?: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'user' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  isEnabled: boolean;
  order: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'job' | 'submission' | 'payment' | 'withdrawal' | 'challenge' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  targetId?: string;
  details: string;
  ipAddress: string;
}
