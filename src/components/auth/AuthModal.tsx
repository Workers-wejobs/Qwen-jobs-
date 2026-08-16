import React, { useState } from 'react';
import { X, Lock, Mail, User, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  navigate: (route: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  navigate
}) => {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('United States');
  const [role, setRole] = useState<UserRole>('freelancer');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      const res = login(email, password);
      if (res.success) {
        onClose();
        if (email.includes('admin')) {
          navigate('/admin');
        } else if (email.includes('acme')) {
          navigate('/client');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message);
      }
    } else {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const res = register(email, password, fullName, country, role);
      if (res.success) {
        onClose();
        navigate(role === 'client' ? '/client' : '/dashboard');
      } else {
        setError(res.message);
      }
    }
  };

  const handleQuickLogin = (roleType: 'freelancer' | 'client' | 'admin') => {
    if (roleType === 'freelancer') {
      login('freelancer@example.com', 'password123');
      onClose();
      navigate('/dashboard');
    } else if (roleType === 'client') {
      login('client@example.com', 'password123');
      onClose();
      navigate('/client');
    } else {
      login('admin@example.com', 'password123');
      onClose();
      navigate('/admin');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-lg w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 text-left relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {mode === 'login' ? 'Sign In to QwenJobs' : 'Create Free Account'}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === 'login'
                ? 'Enter credentials or select a one-click role below.'
                : 'Join the global marketplace for micro-tasks and USD rewards.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Role Switcher */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            One-Click Demo Accounts:
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('freelancer')}
              className="py-1.5 px-2 bg-white border border-slate-200 hover:border-indigo-500 rounded font-bold text-slate-800 text-[11px] transition-colors"
            >
              Freelancer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('client')}
              className="py-1.5 px-2 bg-white border border-slate-200 hover:border-indigo-500 rounded font-bold text-slate-800 text-[11px] transition-colors"
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 bg-white border border-slate-200 hover:border-indigo-500 rounded font-bold text-slate-800 text-[11px] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {mode === 'register' && (
            <>
              <div>
                <label className="font-bold text-slate-900 block mb-1">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-900 block mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-900 block mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900"
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client / Employer</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-bold text-slate-900 block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-900 block mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-md text-xs text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          {mode === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Register free
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign in here
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
