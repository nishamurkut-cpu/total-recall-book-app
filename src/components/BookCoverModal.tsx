import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Layers, Sparkles, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

export const BookCoverModal: React.FC = () => {
  const { 
    showCoverModal, 
    setShowCoverModal, 
    coverModalVolume, 
    setCoverModalVolume,
    setActiveTab,
    shopConfig 
  } = useApp();

  const [viewMode, setViewMode] = useState<'front' | 'full-wrap'>('front');

  if (!showCoverModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Official Book Jacket
              </span>
              <span className="text-xs text-slate-400">
                Volume {coverModalVolume} of 2
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              Total Recall Book Cover & Full Wrap Jacket
            </h2>
          </div>
          <button
            onClick={() => setShowCoverModal(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Switcher & View Switcher */}
        <div className="p-4 bg-slate-800/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCoverModalVolume(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                coverModalVolume === 1 
                  ? 'bg-amber-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Volume 1 (Foundations & Medical-Surgical)
            </button>
            <button
              onClick={() => setCoverModalVolume(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                coverModalVolume === 2 
                  ? 'bg-amber-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Volume 2 (OBG, Pediatrics, CHN & Aptitude)
            </button>
          </div>

          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode('front')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                viewMode === 'front' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Front Cover
            </button>
            <button
              onClick={() => setViewMode('full-wrap')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                viewMode === 'full-wrap' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Wrap (Back + Spine + Front)
            </button>
          </div>
        </div>

        {/* Cover Display Body */}
        <div className="p-4 sm:p-8 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center justify-center overflow-x-auto">
          {viewMode === 'front' ? (
            /* Front Cover Only */
            <div className="w-full max-w-sm sm:max-w-md aspect-[1/1.42] rounded-xl overflow-hidden shadow-2xl border-4 border-amber-500/40 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-6 flex flex-col justify-between relative select-none">
              {/* Metallic golden ribbon styling */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 blur-2xl rounded-full" />
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

              <div>
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-[11px] uppercase tracking-widest font-black text-amber-300">
                      2026 REVISED EXPANDED EDITION
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-400/40">
                    VOL. {coverModalVolume}
                  </span>
                </div>

                <div className="mt-6 text-center">
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans drop-shadow-md">
                    TOTAL RECALL
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-400 mt-1 uppercase">
                    One Stop Solution for All Nursing Competitive Exams
                  </p>
                  <div className="w-24 h-0.5 bg-amber-500 mx-auto my-3" />
                  <p className="text-[11px] text-slate-300 max-w-xs mx-auto leading-relaxed">
                    AIIMS NORCET • ESIC • RRB Staff Nurse • DSSSB • CHO • State PSC • PGIMER • JIPMER • MNS
                  </p>
                </div>
              </div>

              {/* Volume Content Highlights */}
              <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3.5 my-4">
                <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mb-1">
                  Volume {coverModalVolume} High-Yield Modules:
                </div>
                <div className="text-xs text-slate-200 font-medium space-y-1">
                  {coverModalVolume === 1 ? (
                    <>
                      <div>• Anatomy & Physiology • Fundamentals of Nursing</div>
                      <div>• Medical-Surgical Nursing (All Systems)</div>
                      <div>• Pharmacology & Clinical Dosage Calculations</div>
                      <div>• Microbiology & Biochemistry Essentials</div>
                    </>
                  ) : (
                    <>
                      <div>• Obstetrics & Midwifery • Child Health (Pediatrics)</div>
                      <div>• Community Health Nursing • Mental Health</div>
                      <div>• Nursing Research, Management & INC Guidelines</div>
                      <div>• General Knowledge, Reasoning, English & Maths</div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer Author & Publisher */}
              <div className="border-t border-amber-500/30 pt-3 flex items-end justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">AUTHOR & COMPILER:</div>
                  <div className="text-sm font-extrabold text-white tracking-wide">
                    KIRAN S. M. (PATIL)
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold">
                    Senior Nursing Educator & Specialist
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">MRP</div>
                  <div className="text-xs font-bold text-slate-200">
                    ₹{coverModalVolume === 1 ? shopConfig.vol1Price : shopConfig.vol2Price}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Full Wrap Jacket (Back Cover + Spine + Front Cover) */
            <div className="min-w-[700px] w-full max-w-4xl aspect-[2.4/1] rounded-xl overflow-hidden shadow-2xl border-4 border-amber-500/40 flex text-white font-sans text-xs select-none">
              {/* Back Cover */}
              <div className="w-[45%] bg-slate-950 p-5 flex flex-col justify-between border-r border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why Total Recall?</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-100 mb-2">
                    The Ultimate Companion for Every Nursing Officer Aspirant
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                    Created after years of meticulous clinical analysis and mapping past 10 years papers from AIIMS, ESIC, and Railway Recruitment Boards.
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>15,000+ Golden Bullets</strong> organized for instant memory recall.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Image-Based Questions (IBQs)</strong> with clinical procedural steps.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Strict Anti-Confusion Tables</strong> for quick differential diagnosis.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-slate-400">
                    <div>ISBN: 978-81-954829-1-2</div>
                    <div>BARCODE: 8901284729104</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-amber-400 font-bold">2-VOL SET: ₹{shopConfig.setPrice}</div>
                    <div className="text-[10px] text-slate-400">MRP ₹{shopConfig.setMrp}</div>
                  </div>
                </div>
              </div>

              {/* Spine */}
              <div className="w-[10%] bg-gradient-to-b from-amber-600 via-amber-500 to-amber-700 text-slate-950 font-black flex flex-col items-center justify-between py-6 px-1 border-r border-amber-700/50">
                <span className="text-[10px] uppercase font-bold tracking-widest rotate-90 my-2">VOL {coverModalVolume}</span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider rotate-90 whitespace-nowrap my-auto">
                  TOTAL RECALL • NURSING 2026
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest rotate-90 my-2">KIRAN PATIL</span>
              </div>

              {/* Front Cover Wrap Section */}
              <div className="w-[45%] bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                    VOL. {coverModalVolume} OF 2
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                    TOTAL RECALL
                  </h3>
                  <div className="text-[10px] font-semibold text-amber-300 uppercase">
                    All Nursing Competitive Exams
                  </div>
                  <div className="text-[10px] text-slate-300 mt-2">
                    Kiran S. M. (Patil)
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded border border-amber-500/20 text-[10px] text-slate-300">
                  Includes Chapter-Wise Rationales, IBQs, Flowcharts, and High-Yield NCLEX/NORCET Tips.
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
                  <span>Author: Kiran S. M. (Patil)</span>
                  <span className="text-amber-400 font-bold">₹{coverModalVolume === 1 ? shopConfig.vol1Price : shopConfig.vol2Price}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Full 2-Volume Set available for <strong className="text-emerald-400">₹{shopConfig.setPrice}</strong> with Free Fast Shipping.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowCoverModal(false);
                setActiveTab('samples');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              Read 7 Free Sample Chapters
            </button>
            <button
              onClick={() => {
                setShowCoverModal(false);
                setActiveTab('buy');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
            >
              Order This Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
