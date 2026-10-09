import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, X, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { showAdminAuthModal, setShowAdminAuthModal, loginAdmin } = useApp();
  const [email, setEmail] = useState('nirashachaudhari52@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!showAdminAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = loginAdmin(email, password);
    if (!success) {
      setError('Invalid credentials. Password is "admin123456" or tap Quick Author Login below.');
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('kiranpatil', 'admin123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Admin Authentication</h3>
              <p className="text-xs text-slate-400">Total Recall Control Panel</p>
            </div>
          </div>
          <button
            onClick={() => setShowAdminAuthModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Author / Admin Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="nirashachaudhari52@gmail.com"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g. admin123456)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
          >
            Sign In to Admin Panel
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center space-y-2">
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Author / Demo Admin Access</span>
          </button>
          <div className="text-[10px] text-slate-500">
            Default credentials: <code className="text-slate-400">admin123456</code>
          </div>
        </div>
      </div>
    </div>
  );
};
