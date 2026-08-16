import {
  User,
  Job,
  Challenge,
  ChallengeParticipant,
  FAQItem,
  Sponsor,
  Transaction,
  WithdrawalRequest,
  JobAssignment,
  SupportTicket,
  AuditLog,
  AppNotification,
  PortfolioItem
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_freelancer_1',
    fullName: 'Alexandre Morgan',
    displayName: 'Alex Morgan',
    email: 'alex.morgan@qwenjobs.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 4B',
    country: 'United States',
    role: 'freelancer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Professional bilingual content writer, research specialist, and transcriptionist with 5+ years of verified freelance track record.',
    skills: ['SEO Writing', 'Proofreading', 'English Translation', 'Data Classification', 'Content Moderation', 'Technical Research'],
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
    experienceYears: 5,
    completedJobsCount: 48,
    successRate: 99,
    rating: 4.96,
    reviewCount: 46,
    availability: 'Available',
    isEmailVerified: true,
    accountStatus: 'active',
    fraudRiskScore: 4,
    createdAt: '2026-01-15T10:00:00Z',
    availableBalance: 245.50,
    pendingBalance: 65.00,
    totalEarned: 1840.00,
    totalWithdrawn: 1594.50,
    paymentMethodVerified: true,
    paymentDetails: {
      type: 'bank',
      accountName: 'Alexandre Morgan',
      accountNumberOrEmail: 'US893700000123456789',
      bankName: 'Chase Manhattan Bank',
      swiftCode: 'CHASUS33'
    }
  },
  {
    id: 'user_client_1',
    fullName: 'David Sterling (Vanguard Media)',
    displayName: 'David S. | Vanguard Media',
    email: 'client@vanguardmedia.io',
    phone: '+1 (555) 987-6543',
    address: '500 5th Avenue, New York, NY',
    country: 'United States',
    role: 'client',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Publisher and digital marketing director at Vanguard Media. Commissioning regular research summaries and copywriting.',
    skills: ['Project Management', 'Content Strategy'],
    languages: ['English'],
    experienceYears: 10,
    completedJobsCount: 124,
    successRate: 100,
    rating: 4.98,
    reviewCount: 110,
    availability: 'Available',
    isEmailVerified: true,
    accountStatus: 'active',
    fraudRiskScore: 0,
    createdAt: '2025-11-10T08:00:00Z',
    availableBalance: 1250.00,
    pendingBalance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    paymentMethodVerified: true
  },
  {
    id: 'user_admin_1',
    fullName: 'Elena Rostova',
    displayName: 'Elena (QwenJobs Security & Ops)',
    email: 'admin@qwenjobs.com',
    country: 'Canada',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Platform Operations, Trust & Security Lead at QwenJobs.',
    skills: ['Security Auditing', 'Quality Assurance', 'Anti-Fraud Moderation'],
    languages: ['English', 'German'],
    experienceYears: 8,
    completedJobsCount: 0,
    successRate: 100,
    rating: 5.0,
    reviewCount: 0,
    availability: 'Available',
    isEmailVerified: true,
    accountStatus: 'active',
    fraudRiskScore: 0,
    createdAt: '2025-08-01T00:00:00Z',
    availableBalance: 0,
    pendingBalance: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    paymentMethodVerified: true
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job_1',
    slug: 'seo-article-sustainable-fintech-trends-2026',
    title: 'In-Depth SEO Article: Sustainable FinTech Trends for 2026',
    category: 'Writing',
    subtype: 'SEO Writing',
    rewardUSD: 45.00,
    estimatedTime: '2 - 3 hours',
    difficulty: 'Intermediate',
    clientRating: 4.95,
    clientName: 'David S. | Vanguard Media',
    clientId: 'user_client_1',
    clientJobsPosted: 42,
    totalSlots: 5,
    remainingSlots: 2,
    deadline: '2026-08-28T23:59:59Z',
    createdAt: '2026-08-14T09:00:00Z',
    status: 'ACTIVE',
    isFeatured: true,
    objective: 'Produce a high-ranking, 1,200-word informative article exploring green fintech architectures, carbon footprint APIs, and ESG compliance.',
    targetAudience: 'Fintech executives, sustainability officers, and software engineers.',
    description: 'We require a rigorously researched blog post highlighting how global financial platforms are automating carbon tracking via open banking APIs.',
    instructions: [
      'Structure into 4 main headers: Introduction, The Rise of ESG APIs, Real-World Implementations, Future Outlook 2026-2030.',
      'Incorporate provided focus keywords naturally without keyword stuffing.',
      'Include at least 3 authoritative citations from industry whitepapers or verified financial reports.',
      'Original content only: Zero AI-generated hallucinated statistics. Must pass plagiarism detection.'
    ],
    expectedDeliverable: 'Markdown formatted article or clean Google Doc text with clear H2/H3 tags and source links.',
    wordCountOrUnit: '1,200 - 1,400 words',
    style: 'Modern analytical editorial',
    tone: 'Professional, forward-looking, objective',
    language: 'English (US)',
    format: 'Markdown (.md) or formatted text',
    requirements: ['High English proficiency', 'Understanding of basic FinTech terminology', 'Flawless grammar'],
    forbiddenItems: ['Plagiarized content', 'Uncited statistical claims', 'Spammy promotional mentions'],
    acceptanceCriteria: ['Originality score >= 95%', 'Adherence to word count target', 'Clear structure with source URLs'],
    revisionPolicy: '1 minor revision included for styling adjustments if requested within 48h.'
  },
  {
    id: 'job_2',
    slug: 'ai-training-sentiment-intent-tagging',
    title: 'Customer Intent & Sentiment Annotation: Multi-Turn Dialogue Dataset',
    category: 'Data / Digital Micro-Jobs',
    subtype: 'Sentiment Classification',
    rewardUSD: 25.00,
    estimatedTime: '1 - 1.5 hours',
    difficulty: 'Beginner',
    clientRating: 5.0,
    clientName: 'Nova Intelligence Labs',
    clientId: 'user_client_1',
    clientJobsPosted: 88,
    totalSlots: 20,
    remainingSlots: 7,
    deadline: '2026-08-30T18:00:00Z',
    createdAt: '2026-08-15T12:00:00Z',
    status: 'ACTIVE',
    isFeatured: true,
    objective: 'Annotate 150 real user-support transcript snippets for sentiment polarity (Positive, Neutral, Negative, Frustrated) and intent tags.',
    targetAudience: 'Conversational AI benchmark evaluation.',
    description: 'Accurate human verification for support chatbot training samples.',
    instructions: [
      'Review each sample in the dataset.',
      'Assign the exact sentiment enum and primary user intent from the predefined taxomony.',
      'Flag any ambiguous or toxic speech snippets.'
    ],
    expectedDeliverable: 'Completed JSON or CSV annotation sheet matching the provided sample format.',
    wordCountOrUnit: '150 dialogue turns',
    style: 'Standardized Data Labeling',
    tone: 'Objective & accurate',
    language: 'English',
    format: 'CSV / JSON / Form Entry',
    requirements: ['Attention to subtle conversational nuance', 'High accuracy'],
    forbiddenItems: ['Guessing without reading context', 'Batch automated tagging'],
    acceptanceCriteria: ['Consensus accuracy >= 96% against gold validation test set'],
    revisionPolicy: 'Resubmission required if validation sample error rate exceeds 5%.'
  },
  {
    id: 'job_3',
    slug: 'technical-whitepaper-proofreading-editing',
    title: 'Grammar, Clarity & Flow Copyediting: Cloud Infrastructure Whitepaper',
    category: 'Editing',
    subtype: 'Copy Editing',
    rewardUSD: 38.00,
    estimatedTime: '2 hours',
    difficulty: 'Intermediate',
    clientRating: 4.88,
    clientName: 'CloudScale Systems',
    clientId: 'user_client_1',
    clientJobsPosted: 19,
    totalSlots: 4,
    remainingSlots: 1,
    deadline: '2026-08-25T12:00:00Z',
    createdAt: '2026-08-15T14:30:00Z',
    status: 'ACTIVE',
    isFeatured: true,
    objective: 'Proofread and refine a 3,500-word engineering overview on edge computing and distributed database architectures.',
    targetAudience: 'DevOps architects and enterprise software buyers.',
    description: 'Ensure flawless US English technical prose, eliminate passive voice over-usage, and ensure terminology consistency.',
    instructions: [
      'Correct punctuation, typography, hyphens, and Oxford commas.',
      'Maintain existing code block snippets unchanged.',
      'Provide tracked edits or clear before/after notes.'
    ],
    expectedDeliverable: 'Clean edited manuscript with highlighted changes summary.',
    wordCountOrUnit: '3,500 words',
    style: 'IEEE / Chicago Manual of Style for Technology',
    tone: 'Authoritative, concise, polished',
    language: 'English (US)',
    format: 'DOCX / Markdown with track-changes',
    requirements: ['Prior experience editing software or technical docs', 'Native-level fluency'],
    forbiddenItems: ['Changing technical meaning of architecture descriptions'],
    acceptanceCriteria: ['Zero spelling or punctuation errors remaining', 'Improved readability score'],
    revisionPolicy: '1 round of feedback verification.'
  },
  {
    id: 'job_4',
    slug: 'scifi-speculative-short-story-solar-punk',
    title: 'Solarpunk Speculative Fiction Short Story: "The Glass Canopy"',
    category: 'Creative Writing',
    subtype: 'Short Story',
    rewardUSD: 60.00,
    estimatedTime: '3 - 4 hours',
    difficulty: 'Advanced',
    clientRating: 4.97,
    clientName: 'Horizon Anthology Press',
    clientId: 'user_client_1',
    clientJobsPosted: 15,
    totalSlots: 3,
    remainingSlots: 2,
    deadline: '2026-09-02T23:59:59Z',
    createdAt: '2026-08-16T08:00:00Z',
    status: 'ACTIVE',
    isFeatured: true,
    objective: 'Write an evocative 2,500-word solarpunk short story set in a high-tech regenerative oceanic city.',
    targetAudience: 'Literary science fiction readers and anthology subscribers.',
    description: 'Focus on rich sensory worldbuilding, human emotional depth, and realistic ecological engineering themes.',
    instructions: [
      'Protagonist is a marine bio-engineer troubleshooting a bioluminescent water grid.',
      'Strong dialogue and satisfying narrative arc.',
      'Original prose with creative imagery.'
    ],
    expectedDeliverable: 'Full story manuscript (2,200 - 2,800 words).',
    wordCountOrUnit: '2,500 words',
    style: 'Literary speculative fiction',
    tone: 'Optimistic, poetic, immersive',
    language: 'English',
    format: 'PDF / DOCX / Plain text',
    requirements: ['Demonstrated fiction writing craftsmanship', 'Pacing control'],
    forbiddenItems: ['Cliche dystopian tropes', 'Unfinished cliffhangers'],
    acceptanceCriteria: ['Compelling narrative arc', 'Polished prose with zero plot holes'],
    revisionPolicy: '1 narrative feedback revision.'
  },
  {
    id: 'job_5',
    slug: 'podcast-audio-transcription-biotech-interview',
    title: 'Verbatim Audio Transcription: Biotech Pioneers Episode (42 Mins)',
    category: 'Transcription',
    subtype: 'Podcast Transcription',
    rewardUSD: 32.00,
    estimatedTime: '1.5 - 2 hours',
    difficulty: 'Beginner',
    clientRating: 4.92,
    clientName: 'BioWave Media Group',
    clientId: 'user_client_1',
    clientJobsPosted: 64,
    totalSlots: 6,
    remainingSlots: 3,
    deadline: '2026-08-26T20:00:00Z',
    createdAt: '2026-08-14T11:20:00Z',
    status: 'ACTIVE',
    isFeatured: false,
    objective: 'Transcribe a 42-minute high-quality audio interview between two geneticists with accurate speaker labeling and timestamps every 2 minutes.',
    targetAudience: 'Podcast listeners seeking show notes and transcripts.',
    description: 'Clean verbatim transcript (remove stutters and filler words like "um", "ah", while preserving exact vocabulary).',
    instructions: [
      'Include Speaker 1 (Host) and Speaker 2 (Dr. Vance) labels.',
      'Correctly spell technical terms (CRISPR, mRNA, lipid nanoparticles).',
      'Provide timestamps at each topic change or every 120 seconds.'
    ],
    expectedDeliverable: 'Formatted text file with speaker tags and timestamps.',
    wordCountOrUnit: '42 audio minutes (~5,500 words)',
    style: 'Clean Verbatim',
    tone: 'Accurate and structured',
    language: 'English',
    format: 'TXT / SRT / DOCX',
    requirements: ['Good listening comprehension', 'Precision with medical terminology'],
    forbiddenItems: ['Inaudible sections skipped without timestamp tag [inaudible 00:14:22]'],
    acceptanceCriteria: ['Timestamp accuracy within +/- 2s', '99%+ transcription fidelity'],
    revisionPolicy: 'Immediate acceptance upon audio spot-check pass.'
  },
  {
    id: 'job_6',
    slug: 'spanish-english-legal-terms-localization',
    title: 'Localization & Quality Assurance: SaaS Terms of Service (ES to EN)',
    category: 'Language',
    subtype: 'Bilingual Proofreading',
    rewardUSD: 50.00,
    estimatedTime: '2.5 hours',
    difficulty: 'Advanced',
    clientRating: 5.0,
    clientName: 'Lexis Digital Compliance',
    clientId: 'user_client_1',
    clientJobsPosted: 31,
    totalSlots: 3,
    remainingSlots: 1,
    deadline: '2026-08-29T18:00:00Z',
    createdAt: '2026-08-15T07:15:00Z',
    status: 'ACTIVE',
    isFeatured: false,
    objective: 'Review and verify the Spanish-to-English translation of a 2,000-word SaaS privacy policy and terms agreement.',
    targetAudience: 'Global enterprise customers and compliance auditors.',
    description: 'Ensure strict legal accuracy while maintaining natural phrasing in international commercial contracts.',
    instructions: [
      'Verify terminology against GDPR and CCPA standard glossary.',
      'Highlight any ambiguous liability or indemnity clauses.',
      'Check consistency across all 18 numbered sections.'
    ],
    expectedDeliverable: 'Side-by-side bilingual comparison review document.',
    wordCountOrUnit: '2,000 words',
    style: 'International Commercial Legal',
    tone: 'Precise, unambiguous, formal',
    language: 'Spanish -> English',
    format: 'DOCX / XLSX',
    requirements: ['Native Spanish and English proficiency', 'Legal translation experience'],
    forbiddenItems: ['Machine translation artifacts', 'Dropped conditional clauses'],
    acceptanceCriteria: ['100% clause mapping fidelity', 'Accurate legal terminology'],
    revisionPolicy: '1 clarification revision.'
  },
  {
    id: 'job_7',
    slug: 'e-commerce-policy-content-moderation-review',
    title: 'E-Commerce Marketplace Product Review & Policy Moderation (200 Items)',
    category: 'Content Moderation',
    subtype: 'Policy-based Text Review',
    rewardUSD: 20.00,
    estimatedTime: '1 hour',
    difficulty: 'Beginner',
    clientRating: 4.9,
    clientName: 'GlobalRetail Operations',
    clientId: 'user_client_1',
    clientJobsPosted: 150,
    totalSlots: 25,
    remainingSlots: 14,
    deadline: '2026-08-27T23:59:59Z',
    createdAt: '2026-08-16T04:00:00Z',
    status: 'ACTIVE',
    isFeatured: false,
    objective: 'Classify 200 customer submitted reviews for prohibited content (hate speech, fake reviews, competitor sabotage, personal info).',
    targetAudience: 'Platform integrity team.',
    description: 'Follow the 5-point community guideline scorecard to accept, reject, or escalate flagged reviews.',
    instructions: [
      'Read review snippet.',
      'Check against the 4 forbidden violation types.',
      'Assign reason codes to rejected items.'
    ],
    expectedDeliverable: 'Completed review checklist sheet with flagged IDs.',
    wordCountOrUnit: '200 review entries',
    style: 'Moderation Checklist',
    tone: 'Neutral and objective',
    language: 'English',
    format: 'Interactive Data Matrix',
    requirements: ['High attention to detail', 'Speed with accuracy'],
    forbiddenItems: ['Inconsistent flagging between identical violations'],
    acceptanceCriteria: ['Accuracy >= 98% on audit sample'],
    revisionPolicy: 'Audit recheck if accuracy fails.'
  },
  {
    id: 'job_8',
    slug: 'competitive-market-research-battery-tech',
    title: 'Market Research Summary: Next-Gen Solid State Battery Startups',
    category: 'Research',
    subtype: 'Market Research',
    rewardUSD: 55.00,
    estimatedTime: '3 hours',
    difficulty: 'Intermediate',
    clientRating: 4.96,
    clientName: 'CleanTech Ventures',
    clientId: 'user_client_1',
    clientJobsPosted: 27,
    totalSlots: 3,
    remainingSlots: 2,
    deadline: '2026-09-01T15:00:00Z',
    createdAt: '2026-08-15T16:00:00Z',
    status: 'ACTIVE',
    isFeatured: true,
    objective: 'Compile an executive research brief on 8 leading solid-state battery startups in North America and Europe.',
    targetAudience: 'Venture capital investment committee.',
    description: 'Gather founding year, funding raised, patent focus, pilot factory timelines, and key OEM automotive partnerships.',
    instructions: [
      'Include a summary comparison table (Startup, Headquarters, Total Funding, Cathode Chemistry, Target Production Year).',
      'Provide verified links to SEC filings, press releases, or patent numbers.',
      'Write a 500-word synthesis of current commercialization bottlenecks.'
    ],
    expectedDeliverable: 'Structured PDF or Markdown report with clean data tables.',
    wordCountOrUnit: '1,500 words + data table',
    style: 'Executive Intelligence Brief',
    tone: 'Fact-based, concise, data-driven',
    language: 'English',
    format: 'Markdown / PDF',
    requirements: ['Strong online research capability', 'Familiarity with cleantech sources'],
    forbiddenItems: ['Unverified blog rumors', 'Outdated funding figures older than 2024'],
    acceptanceCriteria: ['All 8 startups fully populated with verified citations'],
    revisionPolicy: '1 round of data point verification if discrepancies found.'
  }
];

export const INITIAL_CHALLENGE: Challenge = {
  id: 'challenge_august_2026',
  name: 'QwenJobs Monthly Challenge',
  month: 'August',
  year: 2026,
  tagline: 'Work. Compete. Earn More.',
  totalPrizePoolUSD: 1700,
  firstPrizeUSD: 1000,
  secondPrizeUSD: 300,
  thirdPrizeUSD: 150,
  bestFreelancerPrizeUSD: 100,
  risingStarPrizeUSD: 75,
  consistencyPrizeUSD: 75,
  maxCapacity: 500,
  currentParticipantsCount: 342,
  startDate: '2026-08-01T00:00:00Z',
  endDate: '2026-08-31T23:59:59Z',
  status: 'ACTIVE'
};

export const INITIAL_PARTICIPANTS: ChallengeParticipant[] = [
  {
    id: 'cp_1',
    challengeId: 'challenge_august_2026',
    userId: 'user_freelancer_1',
    fullName: 'Alexandre Morgan',
    displayName: 'Alex Morgan',
    email: 'alex.morgan@qwenjobs.com',
    country: 'United States',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    points: 485,
    completedQualifyingJobs: 24,
    rank: 1,
    isRisingStarEligible: false,
    status: 'VERIFIED',
    registeredAt: '2026-08-01T08:12:00Z'
  },
  {
    id: 'cp_2',
    challengeId: 'challenge_august_2026',
    userId: 'user_freelancer_2',
    fullName: 'Li Wei Chen',
    displayName: 'Li Wei C.',
    email: 'liwei.chen@example.com',
    country: 'Singapore',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    points: 440,
    completedQualifyingJobs: 22,
    rank: 2,
    isRisingStarEligible: false,
    status: 'VERIFIED',
    registeredAt: '2026-08-01T10:30:00Z'
  },
  {
    id: 'cp_3',
    challengeId: 'challenge_august_2026',
    userId: 'user_freelancer_3',
    fullName: 'Maria Santos',
    displayName: 'Maria S. (Content Pro)',
    email: 'maria.santos@example.com',
    country: 'Philippines',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    points: 395,
    completedQualifyingJobs: 19,
    rank: 3,
    isRisingStarEligible: true,
    status: 'VERIFIED',
    registeredAt: '2026-08-02T04:15:00Z'
  },
  {
    id: 'cp_4',
    challengeId: 'challenge_august_2026',
    userId: 'user_freelancer_4',
    fullName: 'Tariq Al-Mansoor',
    displayName: 'Tariq M.',
    email: 'tariq.m@example.com',
    country: 'United Arab Emirates',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    points: 360,
    completedQualifyingJobs: 18,
    rank: 4,
    isRisingStarEligible: true,
    status: 'VERIFIED',
    registeredAt: '2026-08-02T14:50:00Z'
  },
  {
    id: 'cp_5',
    challengeId: 'challenge_august_2026',
    userId: 'user_freelancer_5',
    fullName: 'Hannah Schmidt',
    displayName: 'Hannah S.',
    email: 'hannah.s@example.de',
    country: 'Germany',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    points: 325,
    completedQualifyingJobs: 15,
    rank: 5,
    isRisingStarEligible: false,
    status: 'VERIFIED',
    registeredAt: '2026-08-03T09:00:00Z'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_10842',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    date: '2026-08-15T18:30:00Z',
    type: 'Job Reward',
    amount: 45.00,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'JOB-FINTECH-842',
    description: 'Reward payout for: In-Depth SEO Article on Green FinTech'
  },
  {
    id: 'tx_10841',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    date: '2026-08-14T11:00:00Z',
    type: 'Bonus',
    amount: 15.00,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'BONUS-FAST-DELIV',
    description: 'Early delivery & 5-star performance bonus'
  },
  {
    id: 'tx_10839',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    date: '2026-08-10T14:20:00Z',
    type: 'Withdrawal',
    amount: 250.00,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'WD-CHASE-99124',
    description: 'Bank transfer payout to Chase (****6789)'
  },
  {
    id: 'tx_10830',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    date: '2026-08-05T09:10:00Z',
    type: 'Job Reward',
    amount: 60.00,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'JOB-CREATIVE-912',
    description: 'Short story manuscript acceptance: The Bioluminescent Sky'
  }
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wd_req_101',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    amountUSD: 250.00,
    paymentMethod: 'Bank Transfer',
    accountDetails: 'Chase Manhattan Bank (****6789)',
    requestedAt: '2026-08-10T10:00:00Z',
    status: 'PAID',
    processedAt: '2026-08-10T14:20:00Z',
    txHashOrRef: 'ACH-88910492-QWEN'
  },
  {
    id: 'wd_req_102',
    userId: 'user_freelancer_2',
    userName: 'Li Wei Chen',
    amountUSD: 180.00,
    paymentMethod: 'Wise',
    accountDetails: 'liwei.wise@chen.sg',
    requestedAt: '2026-08-15T09:40:00Z',
    status: 'UNDER_REVIEW'
  }
];

export const INITIAL_ASSIGNMENTS: JobAssignment[] = [
  {
    id: 'asg_1',
    jobId: 'job_1',
    jobTitle: 'In-Depth SEO Article: Sustainable FinTech Trends for 2026',
    category: 'Writing',
    freelancerId: 'user_freelancer_1',
    freelancerName: 'Alex Morgan',
    rewardUSD: 45.00,
    assignedAt: '2026-08-14T10:00:00Z',
    deadline: '2026-08-28T23:59:59Z',
    status: 'SUBMITTED',
    submissionText: `# Sustainable FinTech in 2026: The Integration of Real-Time Carbon Accounting APIs

## Introduction
The rapid acceleration of ESG disclosure mandates across European and North American regulatory bodies has shifted sustainability from a corporate social responsibility talking point into a mission-critical engineering requirement...

### Key Architecture Components
1. **Open Banking Integration Layer**: Secure read-only transaction feeds.
2. **Standardized Carbon Taxonomy Engine**: Instant categorization based on GHG Protocol standards.
3. **Automated Offset Routing**: Micro-contributions tied to verified carbon removal registries.`,
    submissionAttachmentName: 'sustainable-fintech-article-final.md',
    submittedAt: '2026-08-15T17:45:00Z',
    revisionCount: 0
  },
  {
    id: 'asg_2',
    jobId: 'job_2',
    jobTitle: 'Customer Intent & Sentiment Annotation: Multi-Turn Dialogue Dataset',
    category: 'Data / Digital Micro-Jobs',
    freelancerId: 'user_freelancer_1',
    freelancerName: 'Alex Morgan',
    rewardUSD: 25.00,
    assignedAt: '2026-08-15T13:00:00Z',
    deadline: '2026-08-30T18:00:00Z',
    status: 'IN_PROGRESS',
    revisionCount: 0
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port_1',
    userId: 'user_freelancer_1',
    title: 'Enterprise AI Architecture Guide: Scalable Embeddings',
    description: 'A 2,400-word comprehensive technical teardown of vector search, quantization techniques, and hybrid indexing strategies for enterprise knowledge bases.',
    category: 'Writing',
    skills: ['Technical Writing', 'AI/ML Concepts', 'Information Architecture'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80',
    externalLink: 'https://example.com/portfolio/ai-guide',
    visibility: 'Public',
    createdAt: '2026-02-10T12:00:00Z'
  },
  {
    id: 'port_2',
    userId: 'user_freelancer_1',
    title: 'Cross-Border SaaS Localization: Spanish (LATAM) Translation',
    description: 'Complete UI string and documentation localization for an international accounting platform, spanning 14,000 words with 100% glossary alignment.',
    category: 'Language',
    skills: ['Translation', 'Localization', 'Quality Assurance'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    externalLink: 'https://example.com/portfolio/saas-loc',
    visibility: 'Public',
    createdAt: '2026-03-18T15:30:00Z'
  }
];

export const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: 'spons_1',
    name: 'Rocket Tech Network',
    logoUrl: 'https://assets.rocket.new/rocket/c-logo-new.webp',
    websiteUrl: 'https://assets.rocket.new',
    description: 'Global infrastructure and media acceleration network.',
    isEnabled: true,
    order: 1
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_4401',
    userId: 'user_freelancer_1',
    userName: 'Alex Morgan',
    userEmail: 'alex.morgan@qwenjobs.com',
    category: 'Withdrawal',
    subject: 'Verification status for secondary Wise payout method',
    description: 'Hello, I submitted my Wise account details for verification yesterday and would like to confirm if any additional tax forms are required.',
    status: 'OPEN',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-15T11:30:00Z',
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        senderName: 'Alex Morgan',
        text: 'Hello, I submitted my Wise account details for verification yesterday and would like to confirm if any additional tax forms are required.',
        timestamp: '2026-08-15T09:00:00Z'
      },
      {
        id: 'msg_2',
        sender: 'support',
        senderName: 'Elena (QwenJobs Support)',
        text: 'Hi Alex, thank you for contacting us. Your Wise email verification is currently under standard automated compliance check. No extra documents are needed at this stage unless requested by our AML system.',
        timestamp: '2026-08-15T11:30:00Z'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: '2026-08-16T08:30:00Z',
    action: 'JOB_ASSIGNMENT_CREATED',
    actorId: 'user_freelancer_1',
    actorName: 'Alex Morgan',
    actorRole: 'freelancer',
    targetId: 'job_2',
    details: 'User took assignment on job_2 (Sentiment Annotation). Remaining slots decremented atomically.',
    ipAddress: '192.0.2.45'
  },
  {
    id: 'log_2',
    timestamp: '2026-08-15T17:45:00Z',
    action: 'SUBMISSION_FILED',
    actorId: 'user_freelancer_1',
    actorName: 'Alex Morgan',
    actorRole: 'freelancer',
    targetId: 'asg_1',
    details: 'Work submitted for assignment asg_1. Status moved to SUBMITTED.',
    ipAddress: '192.0.2.45'
  },
  {
    id: 'log_3',
    timestamp: '2026-08-10T14:20:00Z',
    action: 'WITHDRAWAL_PAID',
    actorId: 'user_admin_1',
    actorName: 'Elena Rostova',
    actorRole: 'admin',
    targetId: 'wd_req_101',
    details: 'Withdrawal of $250.00 to Alex Morgan approved and marked PAID via Chase ACH.',
    ipAddress: '198.51.100.12'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'user_freelancer_1',
    type: 'payment',
    title: 'Payment Received: $45.00 USD',
    message: 'Your submission for "In-Depth SEO Article on Green FinTech" was accepted and credited to your balance.',
    timestamp: '2026-08-15T18:30:00Z',
    isRead: false,
    link: '/dashboard'
  },
  {
    id: 'notif_2',
    userId: 'user_freelancer_1',
    type: 'challenge',
    title: 'Rank Update: #1 on Monthly Leaderboard!',
    message: 'You have reached 485 points in the August QwenJobs Monthly Challenge. First prize is $1,000 USD!',
    timestamp: '2026-08-15T14:00:00Z',
    isRead: false,
    link: '/challenge'
  },
  {
    id: 'notif_3',
    userId: 'user_freelancer_1',
    type: 'job',
    title: 'New Jobs in Writing & Research',
    message: '4 new jobs matching your preferred skills were posted in the marketplace today.',
    timestamp: '2026-08-16T07:00:00Z',
    isRead: true,
    link: '/jobs'
  }
];

// Comprehensive 50+ High-Quality FAQs Categorized
export const INITIAL_FAQS: FAQItem[] = [
  // 1. Account
  {
    id: 'faq_acc_1',
    category: 'Account',
    question: 'How do I create a free freelancer account on QwenJobs?',
    answer: 'Click the "Start Earning" or "Sign Up" button on the top right. Fill out your full name, email address, password, phone, address, and pass the verification CAPTCHA. Once you verify your email address, you can immediately begin browsing and applying for tasks.',
    isPopular: true,
    helpfulCount: 312,
    notHelpfulCount: 4,
    order: 1
  },
  {
    id: 'faq_acc_2',
    category: 'Account',
    question: 'Are there any registration or monthly subscription fees?',
    answer: 'No. Joining QwenJobs as a freelancer is 100% free. We never charge signup fees, monthly membership costs, or application bid fees.',
    isPopular: true,
    helpfulCount: 289,
    notHelpfulCount: 2,
    order: 2
  },
  {
    id: 'faq_acc_3',
    category: 'Account',
    question: 'Can I have multiple freelancer accounts on QwenJobs?',
    answer: 'No. To maintain fair competition, platform integrity, and prevent fraud in monthly challenges, each individual is permitted exactly one verified QwenJobs account. Multiple accounts will trigger automated fraud detection and risk suspension.',
    helpfulCount: 194,
    notHelpfulCount: 7,
    order: 3
  },
  {
    id: 'faq_acc_4',
    category: 'Account',
    question: 'How do I reset my password if I forget it?',
    answer: 'Click "Login", select "Forgot Password?", and enter your registered email. A secure, time-limited password reset link will be sent to your inbox.',
    helpfulCount: 140,
    notHelpfulCount: 1,
    order: 4
  },
  {
    id: 'faq_acc_5',
    category: 'Account',
    question: 'What should I do if my account is flagged for verification?',
    answer: 'If your account is flagged for routine quality verification, navigate to your Settings/Profile or contact our Help Center. Our security team reviews identity verifications within 24 to 48 business hours.',
    helpfulCount: 112,
    notHelpfulCount: 3,
    order: 5
  },

  // 2. Profile
  {
    id: 'faq_prof_1',
    category: 'Profile',
    question: 'How do I customize my freelancer profile and portfolio?',
    answer: 'Go to your Profile tab from the user menu. You can upload an avatar, write an impactful professional bio, select your skills and fluent languages, set your availability status, and add verified portfolio items with thumbnails and live project links.',
    isPopular: true,
    helpfulCount: 245,
    notHelpfulCount: 3,
    order: 6
  },
  {
    id: 'faq_prof_2',
    category: 'Profile',
    question: 'How is my freelancer rating calculated?',
    answer: 'Your overall rating is the weighted arithmetic average of all 1-to-5 star ratings left by clients following accepted job submissions. Maintaining high-quality deliverables and punctual deadlines ensures your rating stays above 4.8.',
    helpfulCount: 210,
    notHelpfulCount: 2,
    order: 7
  },
  {
    id: 'faq_prof_3',
    category: 'Profile',
    question: 'Can I set my portfolio items to private?',
    answer: 'Yes. Each portfolio entry has an independent visibility switch (Public or Private). Private items are visible only to you for personal drafting.',
    helpfulCount: 95,
    notHelpfulCount: 1,
    order: 8
  },
  {
    id: 'faq_prof_4',
    category: 'Profile',
    question: 'What file types are accepted for profile avatars?',
    answer: 'We support JPG, PNG, and WebP images up to 5MB. All uploaded avatars are validated for proper MIME types and securely processed.',
    helpfulCount: 88,
    notHelpfulCount: 0,
    order: 9
  },

  // 3. Jobs
  {
    id: 'faq_jobs_1',
    category: 'Jobs',
    question: 'How do job assignments and remaining slots work?',
    answer: 'Each job posted by a client specifies a total capacity and remaining available slots. When you click "Take Job", the system atomically verifies your eligibility and reserves a slot specifically for you.',
    isPopular: true,
    helpfulCount: 330,
    notHelpfulCount: 5,
    order: 10
  },
  {
    id: 'faq_jobs_2',
    category: 'Jobs',
    question: 'How many active jobs can I take simultaneously?',
    answer: 'To guarantee deliverable quality, standard freelancers may hold up to 3 active jobs concurrently. Once a submission is reviewed and accepted, new slots unlock automatically.',
    helpfulCount: 198,
    notHelpfulCount: 4,
    order: 11
  },
  {
    id: 'faq_jobs_3',
    category: 'Jobs',
    question: 'What happens if I cannot complete a job before the deadline?',
    answer: 'If you anticipate missing a deadline, you can cancel the assignment from your dashboard or request a deadline extension from the task owner. Assignments that expire without submission are returned to the public marketplace.',
    helpfulCount: 176,
    notHelpfulCount: 3,
    order: 12
  },
  {
    id: 'faq_jobs_4',
    category: 'Jobs',
    question: 'How do I bookmark or save jobs for later review?',
    answer: 'Click the Bookmark icon on any job card or in the job detail page. You can access all saved opportunities under the "Saved Jobs" filter in your Marketplace or Dashboard.',
    helpfulCount: 142,
    notHelpfulCount: 1,
    order: 13
  },
  {
    id: 'faq_jobs_5',
    category: 'Jobs',
    question: 'What categories of jobs are available on QwenJobs?',
    answer: 'We feature Writing, Creative Writing, Editing, Research, Language, Translation, Transcription, Data/Digital Micro-Jobs, and Content Moderation.',
    helpfulCount: 220,
    notHelpfulCount: 2,
    order: 14
  },

  // 4. Submission
  {
    id: 'faq_sub_1',
    category: 'Submission',
    question: 'How do I submit my completed deliverable?',
    answer: 'Navigate to your Dashboard, locate the active assignment, and click "Submit Work". You can write or paste formatted text, attach verified deliverable files (PDF, DOCX, TXT, CSV, Markdown, ZIP), and submit it directly to the client.',
    isPopular: true,
    helpfulCount: 360,
    notHelpfulCount: 6,
    order: 15
  },
  {
    id: 'faq_sub_2',
    category: 'Submission',
    question: 'Can I save a draft of my submission before submitting?',
    answer: 'Yes! You can use the "Save Draft" button at any time. Your draft content is safely stored so you can refine it before final dispatch.',
    helpfulCount: 280,
    notHelpfulCount: 2,
    order: 16
  },
  {
    id: 'faq_sub_3',
    category: 'Submission',
    question: 'What happens when a client requests a revision?',
    answer: 'If a revision is requested, the task status changes to "Revision Requested" with detailed client notes. You can review the instructions, update your deliverable, and resubmit.',
    helpfulCount: 215,
    notHelpfulCount: 3,
    order: 17
  },
  {
    id: 'faq_sub_4',
    category: 'Submission',
    question: 'How long does a client have to review my submission?',
    answer: 'Clients typically review submissions within 48 to 72 hours. If a client does not take action within the auto-approval window (5 business days), the submission is automatically accepted and the reward disbursed.',
    helpfulCount: 295,
    notHelpfulCount: 4,
    order: 18
  },
  {
    id: 'faq_sub_5',
    category: 'Submission',
    question: 'Can I resubmit if my work is accidentally rejected?',
    answer: 'If a rejection was issued in error or due to a misunderstanding, you can open a dispute ticket through the Help Center with your submission proof.',
    helpfulCount: 155,
    notHelpfulCount: 2,
    order: 19
  },

  // 5. Payment
  {
    id: 'faq_pay_1',
    category: 'Payment',
    question: 'In what currency are rewards calculated and paid?',
    answer: 'All rewards, bonuses, challenge prizes, and balances on QwenJobs are denominated in US Dollars (USD).',
    isPopular: true,
    helpfulCount: 410,
    notHelpfulCount: 5,
    order: 20
  },
  {
    id: 'faq_pay_2',
    category: 'Payment',
    question: 'When is my earnings balance credited to my wallet?',
    answer: 'When a client accepts your submission, the reward amount moves immediately from your pending balance into your Available Balance.',
    helpfulCount: 320,
    notHelpfulCount: 2,
    order: 21
  },
  {
    id: 'faq_pay_3',
    category: 'Payment',
    question: 'Where can I see my transaction history?',
    answer: 'Visit the Wallet section in your Dashboard to inspect your complete, immutable ledger with exact transaction IDs, dates, references, and breakdown categories.',
    helpfulCount: 180,
    notHelpfulCount: 1,
    order: 22
  },
  {
    id: 'faq_pay_4',
    category: 'Payment',
    question: 'Are there any hidden fees deducted from my completed job rewards?',
    answer: 'No. The reward amount listed on the job card is the exact amount credited to your balance upon deliverable approval.',
    helpfulCount: 290,
    notHelpfulCount: 3,
    order: 23
  },

  // 6. Withdrawal
  {
    id: 'faq_wd_1',
    category: 'Withdrawal',
    question: 'What is the minimum withdrawal threshold on QwenJobs?',
    answer: 'The minimum withdrawal amount is strictly $100.00 USD. If your available balance is below $100.00 USD, withdrawal requests cannot be submitted until the minimum is reached.',
    isPopular: true,
    helpfulCount: 490,
    notHelpfulCount: 8,
    order: 24
  },
  {
    id: 'faq_wd_2',
    category: 'Withdrawal',
    question: 'Which payment methods are supported for withdrawals?',
    answer: 'We support Direct Bank Transfer (ACH / SEPA / SWIFT), PayPal, and Wise. You can configure your payout credentials in your Wallet.',
    isPopular: true,
    helpfulCount: 375,
    notHelpfulCount: 4,
    order: 25
  },
  {
    id: 'faq_wd_3',
    category: 'Withdrawal',
    question: 'How long does withdrawal processing take?',
    answer: 'Withdrawal requests undergo automated verification and are processed within 1 to 3 business days depending on your selected payment rail (e.g. PayPal ~24h, SWIFT 2-3 days).',
    helpfulCount: 260,
    notHelpfulCount: 5,
    order: 26
  },
  {
    id: 'faq_wd_4',
    category: 'Withdrawal',
    question: 'Why was my withdrawal rejected or placed under review?',
    answer: 'Common reasons include unverified payout account details, mismatched recipient names, or an active security audit. You will receive a notification with the explicit reason.',
    helpfulCount: 175,
    notHelpfulCount: 6,
    order: 27
  },
  {
    id: 'faq_wd_5',
    category: 'Withdrawal',
    question: 'Are withdrawal fees charged by QwenJobs?',
    answer: 'QwenJobs does not charge withdrawal fees on standard bank transfers or Wise payouts. Standard intermediary conversion fees by recipient banks may apply depending on local currency.',
    helpfulCount: 195,
    notHelpfulCount: 3,
    order: 28
  },

  // 7. Security
  {
    id: 'faq_sec_1',
    category: 'Security',
    question: 'How does QwenJobs protect user data and financial privacy?',
    answer: 'We enforce HTTPS end-to-end, Argon2id password hashing, server-side authorization checks, prepared SQL transactions, and private encrypted document storage. Payment credentials are never exposed publicly.',
    helpfulCount: 230,
    notHelpfulCount: 2,
    order: 29
  },
  {
    id: 'faq_sec_2',
    category: 'Security',
    question: 'How does QwenJobs detect and prevent fraud?',
    answer: 'Our multi-layered Anti-Fraud engine evaluates risk scores (0-100), detecting duplicate submissions, account sharing, plagiarism, and collusion. Suspicious actions are isolated for human audit.',
    helpfulCount: 190,
    notHelpfulCount: 1,
    order: 30
  },
  {
    id: 'faq_sec_3',
    category: 'Security',
    question: 'Is two-factor authentication (2FA) available?',
    answer: 'Yes, 2FA can be activated under Security Settings to safeguard account logins and withdrawal confirmations.',
    helpfulCount: 145,
    notHelpfulCount: 0,
    order: 31
  },

  // 8. Rules
  {
    id: 'faq_rule_1',
    category: 'Rules',
    question: 'What are the rules regarding plagiarism and AI generation?',
    answer: 'All submitted deliverables must adhere strictly to the client job guidelines. Uncredited copy-pasting, fabricated citations, or deceptive AI outputs without client consent violate platform policy and will result in task rejection and point penalties.',
    isPopular: true,
    helpfulCount: 340,
    notHelpfulCount: 4,
    order: 32
  },
  {
    id: 'faq_rule_2',
    category: 'Rules',
    question: 'Can I communicate with clients outside of QwenJobs?',
    answer: 'To protect payment safety and maintain audit records for disputes, all task discussions, submissions, and feedback must remain within QwenJobs.',
    helpfulCount: 215,
    notHelpfulCount: 3,
    order: 33
  },
  {
    id: 'faq_rule_3',
    category: 'Rules',
    question: 'What constitutes an unfair rejection by a client?',
    answer: 'If a client rejects work that meets 100% of the documented acceptance criteria without a valid justification, freelancers can escalate the assignment for moderator review.',
    helpfulCount: 200,
    notHelpfulCount: 2,
    order: 34
  },

  // 9. Technical
  {
    id: 'faq_tech_1',
    category: 'Technical',
    question: 'Can I use QwenJobs on mobile devices or tablets?',
    answer: 'Yes! QwenJobs is fully responsive and optimized for smartphones (320px to 414px), tablets, laptops, and 4K displays. A dedicated bottom navigation is available on mobile.',
    helpfulCount: 185,
    notHelpfulCount: 1,
    order: 35
  },
  {
    id: 'faq_tech_2',
    category: 'Technical',
    question: 'What web browsers are recommended?',
    answer: 'QwenJobs works on all modern standards-compliant web browsers including Chrome, Edge, Safari, Firefox, and Opera.',
    helpfulCount: 110,
    notHelpfulCount: 0,
    order: 36
  },
  {
    id: 'faq_tech_3',
    category: 'Technical',
    question: 'What should I do if a file upload fails?',
    answer: 'Ensure your file size is under 25MB and in an approved format (.pdf, .docx, .txt, .csv, .md, .zip). Check your network connection and retry.',
    helpfulCount: 130,
    notHelpfulCount: 2,
    order: 37
  },

  // 10. Clients
  {
    id: 'faq_cli_1',
    category: 'Clients',
    question: 'How do clients post jobs and micro-tasks?',
    answer: 'Clients can navigate to the Client Dashboard and click "Create New Job" to launch our 7-step wizard: Basic info, Requirements, Deliverables, Payment & Capacity, Deadline, Review, and Publish.',
    helpfulCount: 260,
    notHelpfulCount: 3,
    order: 38
  },
  {
    id: 'faq_cli_2',
    category: 'Clients',
    question: 'How is payment escrowed when a job is posted?',
    answer: 'When a job is published, the reward amount multiplied by total slots is reserved to guarantee that freelancers are paid promptly upon deliverable approval.',
    helpfulCount: 240,
    notHelpfulCount: 1,
    order: 39
  },
  {
    id: 'faq_cli_3',
    category: 'Clients',
    question: 'Can clients request revisions from freelancers?',
    answer: 'Yes. Clients can review submissions and choose "Request Revision" while supplying constructive feedback. The freelancer will be notified immediately.',
    helpfulCount: 195,
    notHelpfulCount: 2,
    order: 40
  },

  // 11. Monthly Challenge
  {
    id: 'faq_chal_1',
    category: 'Monthly Challenge',
    question: 'What is the QwenJobs Monthly Challenge?',
    answer: 'The QwenJobs Monthly Challenge is a monthly competition where registered freelancers earn leaderboard points by completing verified tasks. Total prize pool is $1,700 USD with a $1,000 USD 1st Place reward!',
    isPopular: true,
    helpfulCount: 520,
    notHelpfulCount: 6,
    order: 41
  },
  {
    id: 'faq_chal_2',
    category: 'Monthly Challenge',
    question: 'How do I earn points in the Monthly Challenge?',
    answer: 'Points are awarded for accepted work: Microtask (+5), Small (+10), Medium (+20), Medium-High (+30), Large (+50). Bonuses are awarded for 5★ ratings (+5), zero revisions (+5), and early delivery (+3). Penalties apply for late (-3) or rejected work (-5).',
    isPopular: true,
    helpfulCount: 460,
    notHelpfulCount: 4,
    order: 42
  },
  {
    id: 'faq_chal_3',
    category: 'Monthly Challenge',
    question: 'Who is eligible for the Rising Star award ($75)?',
    answer: 'The Rising Star award is reserved for top-performing freelancers with accounts <= 90 days old who have completed at least 5 qualifying jobs with a rating >= 4.5 and no active fraud flags.',
    helpfulCount: 290,
    notHelpfulCount: 3,
    order: 43
  },
  {
    id: 'faq_chal_4',
    category: 'Monthly Challenge',
    question: 'Is bank information required during Challenge registration?',
    answer: 'No! Registration requires only your Name, Display Name, Email, and Country. Payout credentials are required only when withdrawing winnings.',
    helpfulCount: 310,
    notHelpfulCount: 2,
    order: 44
  },
  {
    id: 'faq_chal_5',
    category: 'Monthly Challenge',
    question: 'What is the difference between Provisional and Final Rankings?',
    answer: 'During the active competition month, the leaderboard displays Provisional Rankings. When the challenge concludes, our security team conducts final fraud and quality verification before establishing the Final Verified Rankings.',
    helpfulCount: 280,
    notHelpfulCount: 3,
    order: 45
  },
  {
    id: 'faq_chal_6',
    category: 'Monthly Challenge',
    question: 'Can I appeal a challenge point deduction or disqualification?',
    answer: 'Yes! Freelancers can submit an appeal through the Challenge Appeal modal. Our compliance administration reviews the audit log and evidence within 48 hours.',
    helpfulCount: 190,
    notHelpfulCount: 2,
    order: 46
  },
  {
    id: 'faq_chal_7',
    category: 'Monthly Challenge',
    question: 'How many participants can join each monthly challenge?',
    answer: 'Each month has a configurable capacity limit (default 500 participants). Slots are allocated on a first-come, first-served basis upon registration.',
    helpfulCount: 210,
    notHelpfulCount: 1,
    order: 47
  },
  {
    id: 'faq_chal_8',
    category: 'Monthly Challenge',
    question: 'When are monthly challenge cash prizes disbursed?',
    answer: 'Prize money is credited directly to the winners available wallet balance within 5 business days after final verification closes on the 1st of the following month.',
    helpfulCount: 305,
    notHelpfulCount: 2,
    order: 48
  },
  {
    id: 'faq_chal_9',
    category: 'Monthly Challenge',
    question: 'What happens if there is a tie on the leaderboard?',
    answer: 'In the event of equal point totals, the ranking is decided first by the highest average client rating, followed by the earliest completion timestamp.',
    helpfulCount: 165,
    notHelpfulCount: 1,
    order: 49
  },
  {
    id: 'faq_chal_10',
    category: 'Monthly Challenge',
    question: 'What prizes make up the $1,700 total prize pool?',
    answer: '1st Place: $1,000 | 2nd Place: $300 | 3rd Place: $150 | Best Freelancer: $100 | Rising Star: $75 | Consistency Award: $75.',
    isPopular: true,
    helpfulCount: 440,
    notHelpfulCount: 3,
    order: 50
  }
];
