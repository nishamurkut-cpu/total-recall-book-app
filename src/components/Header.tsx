import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ShoppingBag, ShieldCheck, Sparkles, AlertCircle, Phone, MessageSquare, Play, Smartphone } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { 
    setActiveTab, 
    shopConfig, 
    isAdmin, 
    setShowCoverModal, 
    setCoverModalVolume,
    handleVersionTap,
    setShowChatbot,
    setShowAndroidPublishModal
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      {/* Top Announcement Bar */}
      {shopConfig.noticeBanner && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between text-center overflow-hidden">
          <div className="mx-auto flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 animate-pulse text-amber-300" />
            <span className="truncate">{shopConfig.noticeBanner}</span>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Book Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter">TR</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                  TOTAL RECALL
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2026 Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                One Stop Solution for All Nursing Competitive Exams • Kiran S. M. (Patil)
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Install Android App / PWA Button */}
            <PWAInstallButton />

            {/* Android / Google Play Publishing Hub */}
            <button
              onClick={() => setShowAndroidPublishModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/40 transition shadow-sm"
              title="Publish as Android App on Google Play Store (TWA / APK / AAB)"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Android App Hub</span>
            </button>

            {/* Enquiry Chatbot Trigger */}
            <button
              onClick={() => setShowChatbot(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition shadow-sm"
              title="Open Enquiries Chatbot"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Enquiries</span>
            </button>

            {/* Official Support Helpline */}
            <a
              href="tel:9604929702"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition"
              title="Official Support Helpline: +91 9604929702"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Support: 9604929702</span>
            </a>

            {/* View Covers Button */}
            <button
              onClick={() => {
                setCoverModalVolume(1);
                setShowCoverModal(true);
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition"
              title="View Front and Full Wrap Book Covers"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Covers</span>
            </button>

            {/* Admin Badge if logged in */}
            {isAdmin ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow-sm shadow-amber-500/30"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={handleVersionTap}
                className="text-[11px] text-slate-500 hover:text-slate-400 px-1 py-0.5 hidden lg:block"
                title="Tap 7 times on version in About to access Admin"
              >
                v2.0
              </button>
            )}

            {/* Buy the Book Button */}
            <button
              onClick={() => setActiveTab('buy')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-md shadow-emerald-500/20 active:scale-95 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Book <span className="text-emerald-100 font-semibold hidden sm:inline">(₹{shopConfig.setPrice})</span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
