import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Question } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Timer, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Flame,
  ArrowRight
} from 'lucide-react';

const DAILY_QUESTIONS: Question[] = [
  {
    id: 'dq-1',
    question: 'Which organelle produces the highest proportion of the cell’s ATP through oxidative phosphorylation?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    answer: 'B',
    explanation: 'Mitochondria are the "powerhouses of the cell", synthesizing ATP via the citric acid cycle and oxidative phosphorylation.'
  },
  {
    id: 'dq-2',
    question: 'What is the normal resting adult respiratory rate in healthy individuals?',
    options: ['8 to 10 breaths/min', '12 to 20 breaths/min', '22 to 28 breaths/min', '30 to 40 breaths/min'],
    answer: 'B',
    explanation: 'The standard adult respiratory rate is 12–20 breaths per minute. Bradypnea is < 12 bpm and Tachypnea is > 20 bpm.'
  },
  {
    id: 'dq-3',
    question: 'Which electrolyte disturbance is the primary cause of Tall Peaked T waves on a 12-lead ECG?',
    options: ['Hypokalemia', 'Hyperkalemia', 'Hypocalcemia', 'Hypercalcemia'],
    answer: 'B',
    explanation: 'Serum potassium > 5.5 mEq/L (Hyperkalemia) classically produces tall, peaked, tented T waves, followed by widened QRS complexes.'
  },
  {
    id: 'dq-4',
    question: 'In a pregnant woman with normal cycles, if LMP is April 12, what is the Expected Date of Delivery (EDD) by Naegele’s rule?',
    options: ['January 19 next year', 'January 12 next year', 'February 19 next year', 'December 19 same year'],
    answer: 'A',
    explanation: 'Naegele’s rule: LMP + 9 months + 7 days. April 12 + 7 days = April 19. April + 9 months = January (next year). Therefore, January 19.'
  },
  {
    id: 'dq-5',
    question: 'What is the priority nursing action when a patient on IV Potassium Chloride infusion complains of burning and erythema at the cannula site?',
    options: [
      'Apply heat pack and increase infusion speed',
      'Stop the IV infusion immediately to assess for extravasation/phlebitis',
      'Dilute with oral fluids',
      'Administer analgesics and leave the site alone'
    ],
    answer: 'B',
    explanation: 'Potassium is a vesicant. Peripheral phlebitis or extravasation warrants immediate cessation of the infusion and site repositioning.'
  }
];

export const DailyQuizTab: React.FC = () => {
  const { saveQuizScore, quizScores, setActiveTab } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions = DAILY_QUESTIONS;
  const currentQ = questions[currentIdx];
  const userChoice = selectedAnswers[currentIdx];

  const handleSelect = (letter: 'A' | 'B' | 'C' | 'D') => {
    if (showExplanation || isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: letter }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.answer) score++;
      });
      saveQuizScore('daily-today', score, questions.length);
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Calculate score for finished screen
  const correctCount = questions.filter((q, idx) => selectedAnswers[idx] === q.answer).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] uppercase font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Rapid Recall</span>
            </span>
            <span className="text-xs text-slate-400">5 Questions • 2026 Batch</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Today's Daily Challenge Quiz
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Keep your knowledge fresh with daily exam-standard MCQs.
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Today's Streak</div>
            <div className="text-base font-black text-amber-400">🔥 7 Days Active</div>
          </div>
        </div>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Progress: {Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Item #{currentIdx + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {(['A', 'B', 'C', 'D'] as const).map((letter, optIdx) => {
              const optionText = currentQ.options[optIdx];
              const isSelected = userChoice === letter;
              const isCorrect = currentQ.answer === letter;

              let btnStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';

              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={letter}
                  disabled={showExplanation}
                  onClick={() => handleSelect(letter)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 font-bold flex items-center justify-center text-xs flex-shrink-0 text-amber-300">
                      {letter}
                    </span>
                    <span>{optionText}</span>
                  </div>

                  {showExplanation && (
                    <div className="flex-shrink-0">
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

          {/* Explanation Box */}
          {showExplanation && (
            <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm animate-fade-in">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Total Recall Rationale:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Next Button */}
          {showExplanation && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Completed Results Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">Daily Quiz Completed!</h3>
            <p className="text-xs text-slate-400">
              Your results have been recorded in your local study progress.
            </p>
          </div>

          <div className="max-w-xs mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-4xl font-black text-emerald-400">{correctCount} / {questions.length}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Score: {scorePercent}% Accuracy
            </div>
            <div className="text-xs text-amber-300 font-medium pt-1">
              {scorePercent >= 80 ? '🌟 Outstanding NORCET standard!' : '📖 Review rationales and retry.'}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Today's Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab('subject-quizzes')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 transition"
            >
              <span>Practice 20 Subject Quizzes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
