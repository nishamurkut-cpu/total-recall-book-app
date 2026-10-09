/**
 * Total Recall — Nursing Competitive Exams Companion & Book Store
 * Author: Kiran S. M. (Patil), 2026 Edition
 */
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { BookCoverModal } from './components/BookCoverModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { HomeTab } from './components/HomeTab';
import { DailyNotesTab } from './components/DailyNotesTab';
import { DailyQuizTab } from './components/DailyQuizTab';
import { SubjectQuizzesTab } from './components/SubjectQuizzesTab';
import { SamplesTab } from './components/SamplesTab';
import { VideosTab } from './components/VideosTab';
import { ImagesTab } from './components/ImagesTab';
import { BuyTab } from './components/BuyTab';
import { MyOrdersTab } from './components/MyOrdersTab';
import { AboutTab } from './components/AboutTab';
import { AdminPortal } from './components/AdminPortal';
import { EnquiriesChatbot } from './components/EnquiriesChatbot';
import { AndroidPublishModal } from './components/AndroidPublishModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  Home, 
  FileText, 
  BookMarked, 
  ShoppingBag, 
  Package, 
  GraduationCap,
  Smartphone
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, orders, setShowAndroidPublishModal } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header & Sticky Navigation */}
      <Header />
      <Navigation />

      {/* Main Tab Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pb-12">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'daily-notes' && <DailyNotesTab />}
        {activeTab === 'daily-quiz' && <DailyQuizTab />}
        {activeTab === 'subject-quizzes' && <SubjectQuizzesTab />}
        {activeTab === 'samples' && <SamplesTab />}
        {activeTab === 'videos' && <VideosTab />}
        {activeTab === 'images' && <ImagesTab />}
        {activeTab === 'buy' && <BuyTab />}
        {activeTab === 'orders' && <MyOrdersTab />}
        {activeTab === 'about' && <AboutTab />}
        {activeTab === 'admin' && <AdminPortal />}
      </main>

      {/* Modals & Floating Assistants */}
      <BookCoverModal />
      <AdminAuthModal />
      <AndroidPublishModal />
      <EnquiriesChatbot />
      <OfflineIndicator />

      {/* Bottom Sticky Mobile Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('daily-notes')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition ${
            activeTab === 'daily-notes' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('subject-quizzes')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition ${
            activeTab === 'subject-quizzes' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Quizzes</span>
        </button>

        <button
          onClick={() => setActiveTab('samples')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition ${
            activeTab === 'samples' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Samples</span>
        </button>

        <button
          onClick={() => setActiveTab('buy')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition ${
            activeTab === 'buy' ? 'text-emerald-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>Buy Book</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition relative ${
            activeTab === 'orders' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders</span>
          {orders.length > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>
      </nav>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            Total Recall: One Stop Solution for All Nursing Competitive Exams
          </p>
          <p>
            Authored & Compiled by Kiran S. M. (Patil), 2026. Designed for AIIMS NORCET, ESIC & RRB Staff Nurse Aspirants.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setShowAndroidPublishModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-amber-500/40 transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Android App & Google Play Publishing Hub</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
