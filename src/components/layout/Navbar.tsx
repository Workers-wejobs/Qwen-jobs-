import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Trophy,
  HelpCircle,
  Bell,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Wallet,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Plus
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate, openAuthModal }) => {
  const {
    currentUser,
    switchUserRole,
    logoutUser,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { label: 'Jobs', route: '/jobs', icon: Briefcase },
    { label: 'Categories', route: '/jobs?view=categories', icon: Layers },
    { label: 'Monthly Challenge', route: '/challenge', icon: Trophy, badge: '$1,700' },
    { label: 'About', route: '/about' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Help Center', route: '/help', icon: HelpCircle }
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const handleRoleChange = (role: UserRole) => {
    switchUserRole(role);
    setRoleSwitcherOpen(false);
    if (role === 'admin') navigate('/admin');
    else if (role === 'client') navigate('/client');
    else navigate('/dashboard');
  };

  const userNotifications = notifications.filter(
    (n) => currentUser && n.userId === currentUser.id
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Geometric Balance Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <div className="w-3.5 h-3.5 bg-white rotate-45"></div>
              </div>
              <div className="flex items-baseline gap-1 text-left">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  QwenJobs
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  currentRoute === link.route ||
                  (link.route === '/jobs' && currentRoute === '/jobs');
                return (
                  <button
                    key={link.label}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavClick(link.route)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Quick Post Job for Clients */}
            <button
              id="quick-post-job-btn"
              onClick={() => {
                if (!currentUser) openAuthModal('login');
                else navigate('/client?action=post');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Post a Job</span>
            </button>

            {/* If Logged In */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                
                {/* Role Switcher Pill */}
                <div className="relative">
                  <button
                    id="role-switcher-btn"
                    onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span className="capitalize">{currentUser.role} View</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {roleSwitcherOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Switch Workspace Mode
                      </div>
                      {(['freelancer', 'client', 'admin'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          id={`switch-role-${r}`}
                          onClick={() => handleRoleChange(r)}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                            currentUser.role === r ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                          }`}
                        >
                          <span className="capitalize">{r} Workspace</span>
                          {currentUser.role === r && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    id="notifications-btn"
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    className="relative p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 max-h-96 overflow-y-auto">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                        <span className="text-xs font-bold text-slate-900">Notifications</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {userNotifications.length} Total
                        </span>
                      </div>
                      {userNotifications.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {userNotifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationAsRead(n.id)}
                              className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                n.isRead
                                  ? 'bg-slate-50 border-slate-100 text-slate-600'
                                  : 'bg-indigo-50/70 border-indigo-100 text-slate-900 font-medium'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-[11px] text-slate-900">{n.title}</span>
                                <span className="text-[9px] text-slate-400">
                                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-slate-600">{n.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Profile Avatar & Dropdown */}
                <div className="relative">
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
                  >
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-6 h-6 rounded-md object-cover"
                    />
                    <span className="text-xs font-bold text-slate-800 hidden sm:inline-block max-w-[100px] truncate">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-2 flex items-center justify-between text-xs bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                          <span className="text-slate-500 font-medium">Balance</span>
                          <span className="font-mono font-bold text-indigo-600">
                            ${currentUser.availableBalance.toFixed(2)} USD
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (currentUser.role === 'client') navigate('/client');
                            else if (currentUser.role === 'admin') navigate('/admin');
                            else navigate('/dashboard');
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            navigate('/dashboard?tab=wallet');
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Wallet className="w-3.5 h-3.5 text-slate-400" />
                          <span>Wallet &amp; Payouts</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          id="logout-btn"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logoutUser();
                            navigate('/');
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* If Guest: Login / Register */
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Log In
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.route)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {!currentUser && (
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="flex-1 py-2 text-xs font-bold text-slate-800 bg-slate-100 rounded-lg text-center"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg text-center"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
