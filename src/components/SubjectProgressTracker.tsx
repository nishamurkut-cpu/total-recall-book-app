import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Play,
  TrendingUp,
  Target
} from 'lucide-react';

export const SubjectProgressTracker: React.FC = () => {
  const { 
    subjectQuizzes, 
    quizScores, 
    setActiveTab, 
    setSelectedSubjectIdForQuiz 
  } = useApp();

  const [filterView, setFilterView] = useState<'all' | 'completed' | 'pending'>('all');

  const totalSubjects = subjectQuizzes.length; // 20
  const completedSubjects = subjectQuizzes.filter(s => quizScores[s.id] !== undefined);
  const completedCount = completedSubjects.length;
  const remainingCount = totalSubjects - completedCount;
  const percentComplete = Math.round((completedCount / totalSubjects) * 100);

  // Calculate overall performance stats
  let totalScoreSum = 0;
  let totalQuestionsSum = 0;
  completedSubjects.forEach(s => {
    const res = quizScores[s.id];
    if (res) {
      totalScoreSum += res.score;
      totalQuestionsSum += res.total;
    }
  });

  const averageAccuracy = totalQuestionsSum > 0 
    ? Math.round((totalScoreSum / totalQuestionsSum) * 100) 
    : 0;

  const handleStartOrReviewSubject = (subjectId: string) => {
    setSelectedSubjectIdForQuiz(subjectId);
    setActiveTab('subject-quizzes');
  };

  const filteredList = subjectQuizzes.filter(s => {
    const isDone = quizScores[s.id] !== undefined;
    if (filterView === 'completed') return isDone;
    if (filterView === 'pending') return !isDone;
    return true;
  });

  // Find next pending subject to recommend
  const nextPendingSubject = subjectQuizzes.find(s => quizScores[s.id] === undefined);

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Progress Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] uppercase font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>SYLLABUS MASTERY DASHBOARD</span>
            </span>
            <span className="text-xs text-slate-400">All 20 Subjects</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>Subject Quizzes Progress</span>
            <span className="text-amber-400 font-mono text-lg sm:text-xl">
              ({completedCount} / {totalSubjects} Completed)
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Track your preparation across all 20 subject question banks from Total Recall.
          </p>
        </div>

        {/* Next recommended action button */}
        {nextPendingSubject ? (
          <button
            onClick={() => handleStartOrReviewSubject(nextPendingSubject.id)}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Next: {nextPendingSubject.title.substring(0, 18)}...</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>All 20 Subjects Mastered!</span>
          </div>
        )}
      </div>

      {/* Progress Bar with Milestone Markers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-300">
            Overall Completion Rate: <strong className="text-amber-400">{percentComplete}%</strong>
          </span>
          <span className="text-slate-400">
            {completedCount} of {totalSubjects} Subjects Finished
          </span>
        </div>

        <div className="w-full h-3.5 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${Math.max(percentComplete, 2)}%` }}
          />
        </div>

        {/* Milestone labels */}
        <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-1">
          <span>0 (Start)</span>
          <span>5 (25%)</span>
          <span>10 (Halfway)</span>
          <span>15 (75%)</span>
          <span className="text-emerald-400 font-bold">20 (NORCET Ready)</span>
        </div>
      </div>

      {/* 4 High-Impact KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {completedCount} <span className="text-xs text-slate-500 font-normal">/ {totalSubjects}</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
            {percentComplete}% of curriculum
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Pending</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {remainingCount} <span className="text-xs text-slate-500 font-normal">subjects</span>
          </div>
          <div className="text-[10px] text-amber-300 font-medium mt-0.5">
            {remainingCount === 0 ? 'Curriculum Complete' : 'To be attempted'}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Avg Accuracy</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {averageAccuracy}%
          </div>
          <div className="text-[10px] text-sky-300 font-medium mt-0.5">
            {averageAccuracy >= 75 ? 'Strong Retention' : completedCount === 0 ? 'No attempts yet' : 'Room to Improve'}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Questions Solved</span>
            <Award className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {totalScoreSum} <span className="text-xs text-slate-500 font-normal">/ {totalQuestionsSum}</span>
          </div>
          <div className="text-[10px] text-teal-300 font-medium mt-0.5">
            Correct answers
          </div>
        </div>
      </div>

      {/* Interactive 20 Subjects Matrix with Filter Tabs */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-4">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Subject-by-Subject Status Matrix</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterView('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                filterView === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setFilterView('completed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                filterView === 'completed' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setFilterView('pending')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                filterView === 'pending' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({remainingCount})
            </button>
          </div>
        </div>

        {/* 20 Subjects Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredList.map((subj, idx) => {
            const scoreData = quizScores[subj.id];
            const isCompleted = scoreData !== undefined;
            const originalIndex = subjectQuizzes.findIndex(s => s.id === subj.id) + 1;

            return (
              <div
                key={subj.id}
                onClick={() => handleStartOrReviewSubject(subj.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between group ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-950/70 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono text-slate-500">#{originalIndex}</span>
                    {isCompleted ? (
                      <span className="font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                        ✓ {scoreData.score}/{scoreData.total}
                      </span>
                    ) : (
                      <span className="text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                    {subj.title}
                  </h4>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-900 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">{subj.questionCount} Qs</span>
                  <span className={`font-semibold flex items-center gap-0.5 ${
                    isCompleted ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {isCompleted ? 'Review' : 'Start'}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
