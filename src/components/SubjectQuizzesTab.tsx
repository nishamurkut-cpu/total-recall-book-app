import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectQuiz, Question } from '../types';
import { 
  GraduationCap, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Sparkles, 
  ArrowLeft,
  Flame,
  Check,
  AlertTriangle,
  Target,
  CheckCircle2
} from 'lucide-react';

export const SubjectQuizzesTab: React.FC = () => {
  const { 
    subjectQuizzes, 
    quizScores, 
    saveQuizScore, 
    selectedSubjectIdForQuiz, 
    setSelectedSubjectIdForQuiz 
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectQuiz | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'core-nursing' | 'allied-sciences' | 'non-nursing'>('all');
  
  // Test runner state
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedRationales, setRevealedRationales] = useState<Record<number, boolean>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);

  // Auto-launch subject quiz if triggered from progress dashboard
  useEffect(() => {
    if (selectedSubjectIdForQuiz) {
      const match = subjectQuizzes.find(s => s.id === selectedSubjectIdForQuiz);
      if (match) {
        setSelectedSubject(match);
        setQuizMode('practice');
        setCurrentIdx(0);
        setSelectedAnswers({});
        setRevealedRationales({});
        setIsExamSubmitted(false);
      }
      setSelectedSubjectIdForQuiz(null);
    }
  }, [selectedSubjectIdForQuiz, subjectQuizzes, setSelectedSubjectIdForQuiz]);

  const totalSubjects = subjectQuizzes.length;
  const completedSubjects = subjectQuizzes.filter(s => quizScores[s.id] !== undefined);
  const completedCount = completedSubjects.length;
  const progressPercent = Math.round((completedCount / totalSubjects) * 100);

  const filteredSubjects = subjectQuizzes.filter(subj => {
    const matchesSearch = subj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.highYieldTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory === 'all' ? true : subj.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleStartSubject = (subj: SubjectQuiz, mode: 'practice' | 'exam') => {
    setSelectedSubject(subj);
    setQuizMode(mode);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setRevealedRationales({});
    setIsExamSubmitted(false);
  };

  const handleSelectOption = (idx: number, letter: 'A' | 'B' | 'C' | 'D') => {
    if (isExamSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [idx]: letter }));
    if (quizMode === 'practice') {
      setRevealedRationales(prev => ({ ...prev, [idx]: true }));
    }
  };

  const handleFinishExam = () => {
    if (!selectedSubject) return;
    const questions = selectedSubject.questions;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) correct++;
    });
    saveQuizScore(selectedSubject.id, correct, questions.length);
    setIsExamSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* If No Subject Selected: Show 20 Subjects Grid */}
      {!selectedSubject ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">20 Subject Question Banks</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                  600 Questions Total
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Extracted directly from Total Recall Volumes 1 & 2 question banks with official book rationales.
              </p>
            </div>
          </div>

          {/* Progress Tracker Card in Quiz Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                  Your Preparation Progress:
                </span>
                <span className="text-xs font-black text-amber-400 font-mono">
                  {completedCount} / {totalSubjects} Subjects Completed ({progressPercent}%)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {totalSubjects - completedCount === 0 ? '🎉 Complete mastery!' : `${totalSubjects - completedCount} subjects remaining`}
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
              />
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subject by name (e.g., OBG, Pharmacology, Surgery, Reasoning)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
              {[
                { id: 'all', label: 'All 20 Subjects' },
                { id: 'core-nursing', label: 'Core Nursing (12)' },
                { id: 'allied-sciences', label: 'Allied Sciences (5)' },
                { id: 'non-nursing', label: 'General Aptitude (3)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map((subj, index) => {
              const prevScore = quizScores[subj.id];
              const isDone = prevScore !== undefined;

              return (
                <div
                  key={subj.id}
                  className={`border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition group ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Subject #{index + 1}
                      </span>
                      {isDone ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed ({prevScore.score}/{prevScore.total})</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-400">
                          {subj.questionCount} Questions
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                      {subj.title}
                    </h3>

                    {/* High Yield Topics */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {subj.highYieldTopics.slice(0, 3).map((topic, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    {prevScore && (
                      <div className="flex items-center justify-between text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                        <span>Best Score:</span>
                        <strong>{prevScore.score} / {prevScore.total} ({Math.round((prevScore.score / prevScore.total) * 100)}%)</strong>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartSubject(subj, 'practice')}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                      >
                        {isDone ? 'Review' : 'Study Mode'}
                      </button>
                      <button
                        onClick={() => handleStartSubject(subj, 'exam')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold shadow-sm transition ${
                          isDone
                            ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        }`}
                      >
                        {isDone ? 'Retake Test' : 'Mock Test'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Test Runner Screen */
        <div className="space-y-6">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <button
              onClick={() => setSelectedSubject(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Subjects</span>
            </button>

            <div className="text-center">
              <h3 className="text-sm font-bold text-white">{selectedSubject.title}</h3>
              <span className="text-[11px] text-amber-400 uppercase font-semibold">
                {quizMode === 'practice' ? 'Study Mode (Immediate Rationales)' : 'Timed Exam Mode (NORCET Format)'}
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              Q {currentIdx + 1} / {selectedSubject.questions.length}
            </span>
          </div>

          {!isExamSubmitted ? (
            /* Active Question Display */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Question */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">
                  Question #{currentIdx + 1}
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {selectedSubject.questions[currentIdx]?.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
                  const currentQ = selectedSubject.questions[currentIdx];
                  const optText = currentQ?.options[optIdx];
                  const isSelected = selectedAnswers[currentIdx] === letter;
                  const isCorrect = currentQ?.answer === letter;
                  const showRationale = quizMode === 'practice' && revealedRationales[currentIdx];

                  let optClass = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';

                  if (showRationale) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold';
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => handleSelectOption(currentIdx, letter)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 text-amber-300">
                          {letter}
                        </span>
                        <span>{optText}</span>
                      </div>

                      {showRationale && (
                        <div>
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Practice Mode Rationale */}
              {quizMode === 'practice' && revealedRationales[currentIdx] && (
                <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Total Recall Book Explanation:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedSubject.questions[currentIdx]?.explanation}
                  </p>
                </div>
              )}

              {/* Pagination controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 transition"
                >
                  Previous
                </button>

                {currentIdx < selectedSubject.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
                  >
                    Submit Test & See Score
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{selectedSubject.title} Test Score</h3>
                <p className="text-xs text-slate-400 mt-1">Review your performance based on Total Recall key answers.</p>
              </div>

              <div className="max-w-xs mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-4xl font-black text-emerald-400">
                  {selectedSubject.questions.filter((q, idx) => selectedAnswers[idx] === q.answer).length} / {selectedSubject.questions.length}
                </div>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Correct Attempts
                </div>
              </div>

              {/* Review All Questions with Rationales */}
              <div className="space-y-4 text-left max-w-2xl mx-auto pt-4">
                <h4 className="text-sm font-extrabold text-white">Full Review & Explanations:</h4>
                {selectedSubject.questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.answer;

                  return (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-white">Q{idx + 1}. {q.question}</span>
                        {isCorrect ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex-shrink-0">
                            Correct
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800 flex-shrink-0">
                            Wrong (You chose {userAns || 'None'})
                          </span>
                        )}
                      </div>
                      <div className="text-emerald-400 font-semibold">
                        Correct Answer: {q.answer}) {q.options[q.answer.charCodeAt(0) - 65]}
                      </div>
                      <p className="text-slate-400 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-850">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  Return to Subjects List
                </button>
                <button
                  onClick={() => handleStartSubject(selectedSubject, quizMode)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                >
                  Retake This Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
