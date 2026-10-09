import React from 'react';
import { useApp } from '../context/AppContext';
import { SubjectProgressTracker } from './SubjectProgressTracker';
import { 
  BookOpen, 
  ShoppingBag, 
  CheckCircle2, 
  Layers, 
  Award, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Flame, 
  GraduationCap,
  Star,
  Check,
  Smartphone,
  Play,
  Download
} from 'lucide-react';

export const HomeTab: React.FC = () => {
  const { 
    setActiveTab, 
    shopConfig, 
    setShowCoverModal, 
    setCoverModalVolume,
    dailyNotes,
    subjectQuizzes,
    setShowAndroidPublishModal
  } = useApp();

  const latestNote = dailyNotes[0];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE DEFINITIVE 2-VOLUME MASTERWORK FOR NURSING OFFICERS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              TOTAL RECALL
              <span className="block text-xl sm:text-2xl font-bold text-amber-400 mt-2">
                One Stop Solution for All Nursing Competitive Exams
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              By <strong className="text-white font-semibold">Kiran S. M. (Patil)</strong>. The most comprehensive, exam-tested 2-volume companion meticulously engineered for AIIMS NORCET, ESIC, RRB, DSSSB, and State Nursing Officer exams.
            </p>

            {/* Price Highlight Banner */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Complete 2-Volume Set Offer
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-emerald-400">₹{shopConfig.setPrice}</span>
                  <span className="text-sm line-through text-slate-500">₹{shopConfig.setMrp}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    SAVE ₹{shopConfig.setMrp - shopConfig.setPrice} (16% OFF)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Single Volume: ₹{shopConfig.vol1Price} each • Free Speed Post Shipping
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('buy')}
                  className="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Book Set</span>
                </button>
                <button
                  onClick={() => setActiveTab('samples')}
                  className="px-4 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>7 Free Samples</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>2,400+ Total Pages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>15,000+ Golden Bullets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>UPI Direct Fast Dispatch</span>
              </div>
            </div>
          </div>

          {/* Book Covers Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                Tap Either Cover to View Full Wrap
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 perspective-1000 w-full max-w-sm sm:max-w-md">
              {/* Volume 1 Cover Card */}
              <div 
                onClick={() => {
                  setCoverModalVolume(1);
                  setShowCoverModal(true);
                }}
                className="group cursor-pointer flex-1 aspect-[1/1.4] bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border-2 border-amber-500/60 rounded-xl p-3 sm:p-4 shadow-xl hover:shadow-amber-500/20 hover:scale-105 hover:-rotate-1 transition-all flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400" />
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold text-amber-400 mb-2">
                    <span>2026 EDITION</span>
                    <span className="bg-amber-500/20 px-1 rounded">VOL. 1</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    TOTAL RECALL
                  </h3>
                  <p className="text-[9px] text-amber-300 font-semibold uppercase mt-0.5">
                    Nursing Officer Exams
                  </p>
                  <p className="text-[8px] text-slate-300 mt-2 line-clamp-3">
                    Medical-Surgical • Foundations • Pharmacology • Anatomy
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[9px]">
                  <span className="text-slate-400">Kiran S. M. (Patil)</span>
                  <span className="text-emerald-400 font-bold">₹{shopConfig.vol1Price}</span>
                </div>
              </div>

              {/* Volume 2 Cover Card */}
              <div 
                onClick={() => {
                  setCoverModalVolume(2);
                  setShowCoverModal(true);
                }}
                className="group cursor-pointer flex-1 aspect-[1/1.4] bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border-2 border-amber-500/60 rounded-xl p-3 sm:p-4 shadow-xl hover:shadow-teal-500/20 hover:scale-105 hover:rotate-1 transition-all flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-teal-300 to-amber-400" />
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold text-amber-400 mb-2">
                    <span>2026 EDITION</span>
                    <span className="bg-teal-500/20 px-1 rounded text-teal-300">VOL. 2</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    TOTAL RECALL
                  </h3>
                  <p className="text-[9px] text-teal-300 font-semibold uppercase mt-0.5">
                    Nursing Officer Exams
                  </p>
                  <p className="text-[8px] text-slate-300 mt-2 line-clamp-3">
                    OBG Midwifery • Pediatrics • Psychiatry • CHN • Aptitude
                  </p>
                </div>
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[9px]">
                  <span className="text-slate-400">Kiran S. M. (Patil)</span>
                  <span className="text-emerald-400 font-bold">₹{shopConfig.vol2Price}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCoverModalVolume(1);
                setShowCoverModal(true);
              }}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group"
            >
              <span>Tap to inspect full book wrap jacket & back cover</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Android Mobile App & Google Play Banner */}
      <section className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Android App Ready • Google Play Store Publishing
              </h3>
              <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PWA + TWA
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Install Total Recall directly on your phone as a native WebAPK or package it into an Android App Bundle (.aab) for Google Play Store.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
          <button
            onClick={() => setShowAndroidPublishModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Publish / Install Android App</span>
          </button>
        </div>
      </section>

      {/* Progress Tracking Dashboard: 20 Subject Quizzes */}
      <SubjectProgressTracker />

      {/* Book Facts Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Book Facts at a Glance</h2>
          </div>
          <span className="text-xs text-slate-400">Standard Reference 2026</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-slate-700 transition">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black mb-2">
              2.4K
            </div>
            <div className="text-xl font-black text-white">2,400+ Pages</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Comprehensive 2-Volume masterwork covering 100% INC syllabus.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-slate-700 transition">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-black mb-2">
              20
            </div>
            <div className="text-xl font-black text-white">20 Subjects</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Core Nursing, Allied Medical Sciences, and Non-Nursing sections.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-slate-700 transition">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black mb-2">
              15K+
            </div>
            <div className="text-xl font-black text-white">15,000+ Bullets</div>
            <div className="text-xs text-slate-400 mt-0.5">
              High-yield Golden points curated from 10 years exam patterns.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-slate-700 transition">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black mb-2">
              600+
            </div>
            <div className="text-xl font-black text-white">600+ Questions</div>
            <div className="text-xs text-slate-400 mt-0.5">
              20 Subject tests × 30 questions with book answers and rationales.
            </div>
          </div>
        </div>
      </section>

      {/* What Each Volume Contains */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>What Each Volume Contains</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Volume 1 Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-extrabold px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Volume 1 • ₹{shopConfig.vol1Price}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Foundations & Med-Surg</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Basic Sciences, Fundamentals & Medical-Surgical Nursing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Designed to build bedrock theoretical mastery and rapid clinical reasoning for bedside care, pharmacology calculations, and critical system disorders.
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Anatomy & Physiology:</strong> All 12 organ systems with clinical high-yield notes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Fundamentals of Nursing:</strong> Vital signs, catheterisation, NG feeding, IV therapy, CPR.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Medical-Surgical Nursing:</strong> Cardiology, Respiratory, GI, Neuro, Renal, Oncology, Burns.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Pharmacology:</strong> Cardiac drugs, insulin protocols, antidotes, calculations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Microbiology & Biochemistry:</strong> BMW 2026, sterilization, culture media.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCoverModalVolume(1);
                  setShowCoverModal(true);
                }}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                Inspect Vol. 1 Cover
              </button>
              <button
                onClick={() => setActiveTab('samples')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
              >
                Sample Chapters 1–4
              </button>
            </div>
          </div>

          {/* Volume 2 Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-extrabold px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  Volume 2 • ₹{shopConfig.vol2Price}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Specialties & Aptitude</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                OBG, Pediatrics, Community, Psychiatry & Non-Nursing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Focuses on mother and child health, psychiatric care, public health policies, and the game-changing 20% non-nursing section tested in NORCET and ESIC.
              </p>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Obstetrics & Midwifery:</strong> Normal labour mechanism, PPH, preeclampsia, CTG.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Pediatric Nursing:</strong> Developmental milestones, congenital anomalies, APGAR, reflexes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Community Health Nursing:</strong> NIS 2026, PHC norms, epidemiology, national health programs.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Psychiatric Nursing:</strong> Schizophrenia, Lithium therapy, defense mechanisms, ECT.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Non-Nursing Aptitude:</strong> Ancient/Modern GK, Reasoning Analogy, English & Maths.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setCoverModalVolume(2);
                  setShowCoverModal(true);
                }}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
              >
                Inspect Vol. 2 Cover
              </button>
              <button
                onClick={() => setActiveTab('samples')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
              >
                Sample Chapters 5–7
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Exams Coverage */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-left space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Target Exams Mastered</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total Recall is mapped directly against the official blueprints and previous question papers of:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { name: 'AIIMS NORCET 8 & 9', desc: 'Stage 1 Prelims & Stage 2 Mains IBQs' },
            { name: 'ESIC Nursing Officer', desc: '748+ Posts Nationwide Pattern' },
            { name: 'RRB Staff Nurse', desc: 'Indian Railways Superintendent Post' },
            { name: 'DSSSB Nursing Officer', desc: 'Delhi Subordinate Services Board' },
            { name: 'CHO State Exams', desc: 'Community Health Officer NHM' },
            { name: 'PGIMER & GMCH', desc: 'Chandigarh Nursing Officer Exam' },
            { name: 'JIPMER Puducherry', desc: 'Institute of National Importance' },
            { name: 'Military Nursing (MNS)', desc: 'Armed Forces Medical Services' }
          ].map((exam, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition">
              <div className="text-xs font-bold text-white">{exam.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{exam.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Notes Highlight & Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        {/* Latest Note Card */}
        {latestNote && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>TODAY'S GOLDEN CLINICAL NOTE</span>
                </span>
                <span className="text-[11px] text-slate-500">{latestNote.readTime}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
                {latestNote.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {latestNote.content.replace(/#|==|\*|\-/g, '').substring(0, 220)}...
              </p>
            </div>
            <button
              onClick={() => setActiveTab('daily-notes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group"
            >
              <span>Read Full Note & NORCET Alerts</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Quick Quiz Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-900/40 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TEST YOUR RECALL</span>
            </div>
            <h3 className="text-lg font-extrabold text-white mb-2">
              600 Practice Questions Ready
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Test your knowledge across 20 distinct subjects. Detailed book explanations and rationales included with every question.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('daily-quiz')}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition text-center"
            >
              Take Daily Quiz
            </button>
            <button
              onClick={() => setActiveTab('subject-quizzes')}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition text-center"
            >
              20 Subjects
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-900/50 via-slate-900 to-teal-900/50 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Ace Your Next Nursing Officer Exam?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Order your physical printed copy of Total Recall today via fast UPI checkout with instant receipt and tracking.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('buy')}
            className="px-6 py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20 transition"
          >
            Order Both Volumes for ₹{shopConfig.setPrice}
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className="px-5 py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            View Sample Chapters Offline
          </button>
        </div>
      </section>
    </div>
  );
};
