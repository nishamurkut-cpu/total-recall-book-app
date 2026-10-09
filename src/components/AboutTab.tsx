import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Award, 
  User, 
  Sparkles, 
  CheckCircle, 
  Lock, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  const { 
    shopConfig, 
    handleVersionTap, 
    versionTapCount, 
    setShowAdminAuthModal, 
    isAdmin, 
    setActiveTab,
    setShowChatbot 
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 text-left">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ABOUT THE MASTERWORK</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Total Recall: One Stop Solution for All Nursing Competitive Exams
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          {shopConfig.aboutText}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-lg font-black text-amber-400">2,400+</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Pages</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-lg font-black text-emerald-400">15,000+</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Memory Bullets</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-lg font-black text-sky-400">600+</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Subject MCQs</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-lg font-black text-teal-400">2 Vols</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Complete Set</div>
          </div>
        </div>
      </div>

      {/* Author Profile */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/30">
            KP
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Kiran S. M. (Patil)</h3>
            <p className="text-xs text-amber-400 font-semibold">Author, Nursing Educator & Chief Mentor</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Kiran S. M. (Patil) is a renowned clinical educator whose systematic memory mnemonics and concise revision strategies have empowered thousands of nursing aspirants across India to secure top ranks in AIIMS NORCET, ESIC, Railway Recruitment Boards, DSSSB, and premier central institutes. Total Recall represents five years of intensive compilation and past paper analysis.
        </p>

        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <a
            href="tel:9604929702"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Support Helpline: <strong>+91 9604929702</strong></span>
          </a>
          <a
            href="https://wa.me/919604929702?text=Hello%20Kiran%20Sir%2C%20I%20have%20a%20query%20regarding%20Total%20Recall%20Nursing%20Book"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WhatsApp Support: <strong>9604929702</strong></span>
          </a>
          <button
            onClick={() => setShowChatbot(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 hover:border-amber-400 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Ask Enquiries Chatbot</span>
          </button>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>nirashachaudhari52@gmail.com</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="font-mono text-purple-300">UPI: {shopConfig.upiId}</span>
          </div>
        </div>
      </div>

      {/* Target Exams Coverage */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Exams Targeted by Total Recall</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>AIIMS NORCET (8 & 9):</strong> Preliminary screening test & Mains Image-Based Clinical Scenarios.</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>ESIC Nursing Officer:</strong> National recruitment exam with negative marking guidance.</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>RRB Staff Nurse:</strong> Indian Railways Medical Service requirements.</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span><strong>State PSC & CHO Exams:</strong> UPPSC, Rajasthan CHO, MP Vyapam, Kerala PSC, HPSSC.</span>
          </div>
        </div>
      </div>

      {/* Android App & Google Play Section */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black border border-emerald-500/40">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003 0-.551.4482-.9996.9993-.9996.5516 0 .9997.4486.9997.9996 0 .5517-.4481 1.0003-.9997 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003 0-.551.4482-.9996.9993-.9996.5516 0 .9997.4486.9997.9996 0 .5517-.4481 1.0003-.9997 1.0003m11.4045-6.02l1.996-3.456c.105-.181.042-.414-.14-.518-.18-.104-.413-.042-.518.14l-2.022 3.502c-1.636-.749-3.469-1.168-5.419-1.168-1.95 0-3.783.419-5.419 1.168L4.3325 5.4874c-.105-.182-.338-.244-.518-.14-.182.104-.245.337-.14.518l1.996 3.456C2.391 11.238 0 15.178 0 19.68h24c0-4.502-2.391-8.442-5.7185-10.3586"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Android Mobile App & Google Play</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PWA & TWA Ready
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Install as a standalone native app on Android phones or package for the Google Play Store.
              </p>
            </div>
          </div>

          <button
            onClick={() => useApp().setShowAndroidPublishModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <span>Open Android Publishing Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Android Package ID:</span>
            <code className="text-amber-300 font-mono text-[11px]">com.totalrecall.nursingexam</code>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Offline Capability:</span>
            <span className="text-emerald-300 font-semibold text-[11px]">Service Worker Cached</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Store Packaging:</span>
            <span className="text-cyan-300 font-semibold text-[11px]">PWABuilder & Bubblewrap CLI</span>
          </div>
        </div>
      </div>

      {/* Secret Admin Unlock Footer */}
      <div className="pt-6 border-t border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
        {/* Version String with 7-tap gesture */}
        <div className="space-y-1">
          <button
            onClick={handleVersionTap}
            className="text-xs text-slate-400 hover:text-amber-400 font-mono tracking-wider transition active:scale-95 px-3 py-1.5 rounded-lg hover:bg-slate-800/80"
          >
            Total Recall Companion • Version 2.0 (Build 2026.04)
          </button>
          {versionTapCount > 0 && versionTapCount < 7 && (
            <div className="text-[10px] text-amber-400 animate-pulse">
              Tap {7 - versionTapCount} more times to open Admin Login...
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-500 max-w-md">
          © 2026 Kiran S. M. (Patil). All rights reserved. Sample pages and diagrams are watermarked for anti-piracy protection.
        </p>

        {/* Discrete Admin Link button */}
        <div className="pt-2">
          {isAdmin ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-amber-500/20 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal Active</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAdminAuthModal(true)}
              className="text-[10px] text-slate-600 hover:text-slate-400 flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Author / Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
