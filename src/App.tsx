import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { SponsorMarquee } from './components/layout/SponsorMarquee';
import { Footer } from './components/layout/Footer';

// Home components
import { Hero } from './components/home/Hero';
import { Benefits } from './components/home/Benefits';
import { HowItWorks } from './components/home/HowItWorks';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedJobs } from './components/home/FeaturedJobs';
import { PlatformStats } from './components/home/PlatformStats';
import { WhyQwenJobs } from './components/home/WhyQwenJobs';
import { EarningsPreview } from './components/home/EarningsPreview';
import { Testimonials } from './components/home/Testimonials';
import { MonthlyChallengePreview } from './components/home/MonthlyChallengePreview';
import { FAQPreview } from './components/home/FAQPreview';
import { AboutPreview } from './components/home/AboutPreview';
import { FinalCTA } from './components/home/FinalCTA';

// Marketplace & Modals
import { JobsMarketplace } from './components/jobs/JobsMarketplace';
import { JobDetailModal } from './components/jobs/JobDetailModal';
import { Job, JobCategory } from './types';

// Dashboards
import { FreelancerDashboard } from './components/dashboard/FreelancerDashboard';
import { ClientDashboard } from './components/client/ClientDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MonthlyChallengePage } from './components/challenge/MonthlyChallengePage';
import { SupportTicketsView } from './components/support/SupportTicketsView';
import { AuthModal } from './components/auth/AuthModal';

// Static Pages
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

const AppContent: React.FC = () => {
  const { jobs } = useApp();
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Sync route with window.location
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    setCurrentRoute(window.location.pathname + window.location.search);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSelectCategory = (cat: JobCategory) => {
    setSelectedCategory(cat);
    navigate(`/jobs?category=${encodeURIComponent(cat)}`);
  };

  // Route matching
  const renderRoute = () => {
    const [path, search] = currentRoute.split('?');
    const params = new URLSearchParams(search);

    if (path === '/jobs') {
      const catParam = params.get('category') as JobCategory | null;
      return (
        <JobsMarketplace
          onViewJob={handleViewJob}
          initialCategory={catParam || selectedCategory}
        />
      );
    }

    if (path === '/dashboard') {
      const tabParam = params.get('tab') as any;
      return (
        <FreelancerDashboard
          navigate={navigate}
          onViewJob={handleViewJob}
          defaultTab={tabParam || 'active'}
        />
      );
    }

    if (path === '/client') {
      return <ClientDashboard navigate={navigate} onViewJob={handleViewJob} />;
    }

    if (path === '/admin') {
      return <AdminDashboard />;
    }

    if (path === '/challenge') {
      return <MonthlyChallengePage navigate={navigate} openAuthModal={handleOpenAuth} />;
    }

    if (path === '/faq') {
      return <FAQPage navigate={navigate} />;
    }

    if (path === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    if (path === '/terms') {
      return <TermsPage />;
    }

    if (path === '/privacy') {
      return <PrivacyPage />;
    }

    if (path === '/help') {
      return <SupportTicketsView />;
    }

    // Default Home view
    return (
      <main className="w-full">
        <Hero navigate={navigate} openAuthModal={handleOpenAuth} />
        <SponsorMarquee />
        <Benefits />
        <HowItWorks />
        <CategoryGrid onSelectCategory={handleSelectCategory} />
        <FeaturedJobs onViewJob={handleViewJob} navigate={navigate} />
        <PlatformStats />
        <WhyQwenJobs />
        <EarningsPreview navigate={navigate} />
        <MonthlyChallengePreview navigate={navigate} />
        <Testimonials />
        <FAQPreview navigate={navigate} />
        <AboutPreview navigate={navigate} />
        <FinalCTA navigate={navigate} openAuthModal={handleOpenAuth} />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        openAuthModal={handleOpenAuth}
      />

      <div className="flex-1 w-full">{renderRoute()}</div>

      <Footer navigate={navigate} />

      {/* Global Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          navigate={navigate}
          openAuthModal={handleOpenAuth}
        />
      )}

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        navigate={navigate}
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
