import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SampleChapter, SamplePage, Question } from '../types';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Sparkles, 
  ShoppingBag,
  Layers,
  HelpCircle
} from 'lucide-react';

export const SamplesTab: React.FC = () => {
  const { sampleChapters, setActiveTab, shopConfig } = useApp();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(sampleChapters[0]?.id || 'ch-digestive');
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'pages' | 'quiz'>('pages');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [showRationales, setShowRationales] = useState<Record<string, boolean>>({});

  const currentChapter = sampleChapters.find(c => c.id === selectedChapterId) || sampleChapters[0];
  const currentPage: SamplePage | undefined = currentChapter?.pages[activePageIndex];

  const handleChapterChange = (id: string) => {
    setSelectedChapterId(id);
    setActivePageIndex(0);
    setActiveView('pages');
    setSelectedAnswers({});
    setShowRationales({});
  };

  const handleSelectQuizOption = (qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: opt }));
    setShowRationales(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              OFFLINE SAMPLE VIEWER
            </span>
            <span className="text-xs text-slate-400">7 Chapters • 31 Authentic Pages</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Total Recall Book Samples
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Sample chapters from Volumes 1 & 2 complete with watermarked pages and chapter-end review questions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('buy')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 transition"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Buy Full Book Set (₹{shopConfig.setPrice})</span>
        </button>
      </div>

      {/* Chapter Selection Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl overflow-x-auto scrollbar-none flex gap-2">
        {sampleChapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => handleChapterChange(ch.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 flex-shrink-0 ${
              selectedChapterId === ch.id
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-900/30 flex items-center justify-center text-[10px]">
              {idx + 1}
            </span>
            <span>{ch.title}</span>
          </button>
        ))}
      </div>

      {/* Chapter Subheader & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            {currentChapter.unit}
          </span>
          <h3 className="text-base sm:text-lg font-black text-white">{currentChapter.title}</h3>
          <p className="text-xs text-slate-400">{currentChapter.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('pages')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'pages'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sample Pages ({currentChapter.pages.length})</span>
          </button>
          <button
            onClick={() => setActiveView('quiz')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Chapter MCQs ({currentChapter.questions.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'pages' && currentPage ? (
        <div className="space-y-4">
          {/* Authentic Watermarked Page Container */}
          <div className="relative bg-slate-950 border-2 border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between font-serif select-none">
            {/* Background Diagonal Watermarks to prevent copying / unauthorized prints */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-[0.06] sm:opacity-[0.07] rotate-[-25deg] select-none text-center">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-widest leading-loose">
                TOTAL RECALL • KIRAN S.M. PATIL<br />
                OFFICIAL WATERMARKED SAMPLE COPY<br />
                UNAUTHORIZED SCREENSHOT PROHIBITED
              </div>
            </div>

            {/* Page Header */}
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between text-slate-400 font-sans text-xs">
              <span className="font-semibold text-amber-400 tracking-wider">
                {currentPage.header}
              </span>
              <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Book Page {currentPage.pageNumber} of 31
              </span>
            </div>

            {/* Page Body Content */}
            <div className="py-6 space-y-5 text-slate-200 font-serif relative z-20 text-sm sm:text-base leading-relaxed">
              <h4 className="text-lg sm:text-xl font-bold font-sans text-white border-l-4 border-amber-500 pl-3">
                {currentPage.title}
              </h4>

              {currentPage.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  {paragraph}
                </p>
              ))}

              {/* Table if present */}
              {currentPage.table && (
                <div className="my-4 font-sans text-xs overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90">
                  <div className="bg-slate-800/80 px-3 py-1.5 font-bold text-amber-300 text-[11px]">
                    {currentPage.table.caption}
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/40 border-b border-slate-700 text-slate-300">
                        {currentPage.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-2.5 font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {currentPage.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/30">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2.5 align-top">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Key Highlights Box */}
              {currentPage.keyPoints && (
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 space-y-2 font-sans text-xs my-4">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>⚡ TOTAL RECALL HIGH-YIELD MEMORY POINTS</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-200">
                    {currentPage.keyPoints.map((kp, kpIdx) => (
                      <li key={kpIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clinical Alert if present */}
              {currentPage.clinicalAlert && (
                <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 font-sans text-xs text-rose-200">
                  {currentPage.clinicalAlert}
                </div>
              )}
            </div>

            {/* Page Footer Navigation */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs font-sans text-slate-400">
              <span className="text-[11px]">
                Total Recall © Kiran S. M. (Patil) • All Rights Reserved
              </span>
              <span className="font-bold text-amber-400">
                Page {activePageIndex + 1} of {currentChapter.pages.length} in this Chapter
              </span>
            </div>
          </div>

          {/* Page Turn Controls */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <button
              disabled={activePageIndex === 0}
              onClick={() => setActivePageIndex(prev => prev - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Quick Page dots */}
            <div className="flex items-center gap-1">
              {currentChapter.pages.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setActivePageIndex(pIdx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    activePageIndex === pIdx
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {pIdx + 1}
                </button>
              ))}
            </div>

            {activePageIndex < currentChapter.pages.length - 1 ? (
              <button
                onClick={() => setActivePageIndex(prev => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveView('quiz')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
              >
                <span>Test Chapter MCQs</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Chapter Review Quiz View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
              PRACTICE QUESTIONS FROM THIS CHAPTER
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              {currentChapter.title} — Review MCQs
            </h4>
            <p className="text-xs text-slate-400">
              Select an option to immediately test your understanding and view the Total Recall rationale.
            </p>
          </div>

          <div className="space-y-6">
            {currentChapter.questions.map((q, qIdx) => {
              const userAns = selectedAnswers[q.id];
              const showRat = showRationales[q.id];

              return (
                <div key={q.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {qIdx + 1}. {q.question}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                      const optText = q.options[optIdx];
                      const isSelected = userAns === letter;
                      const isCorrect = q.answer === letter;

                      let btnStyle = 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300';

                      if (showRat) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-white font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                        } else {
                          btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={letter}
                          onClick={() => handleSelectQuizOption(q.id, letter)}
                          className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-slate-800 font-bold flex items-center justify-center text-[10px] text-amber-300">
                              {letter}
                            </span>
                            <span>{optText}</span>
                          </div>
                          {showRat && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showRat && (
                    <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl text-xs space-y-1">
                      <div className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Rationale:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-slate-800">
            <button
              onClick={() => setActiveView('pages')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              Back to Chapter Pages
            </button>
            <button
              onClick={() => setActiveTab('buy')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
            >
              Order Full Book (2,400+ Pages)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
