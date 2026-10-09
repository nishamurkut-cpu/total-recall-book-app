import React from 'react';
import { useApp } from '../context/AppContext';
import { TabId } from '../types';
import { 
  Home, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  BookMarked, 
  Video, 
  Image as ImageIcon, 
  ShoppingBag, 
  Package, 
  Info, 
  ShieldCheck 
} from 'lucide-react';

const TAB_ICONS: Record<TabId, React.ReactNode> = {
  'home': <Home className="w-4 h-4" />,
  'daily-notes': <FileText className="w-4 h-4" />,
  'daily-quiz': <CheckSquare className="w-4 h-4" />,
  'subject-quizzes': <GraduationCap className="w-4 h-4" />,
  'samples': <BookMarked className="w-4 h-4" />,
  'videos': <Video className="w-4 h-4" />,
  'images': <ImageIcon className="w-4 h-4" />,
  'buy': <ShoppingBag className="w-4 h-4" />,
  'orders': <Package className="w-4 h-4" />,
  'about': <Info className="w-4 h-4" />,
  'admin': <ShieldCheck className="w-4 h-4 text-amber-400" />
};

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, tabs, isAdmin, orders } = useApp();

  // Filter enabled tabs from config; add admin tab if logged in
  const visibleTabs = tabs
    .filter(t => t.enabled)
    .sort((a, b) => a.order - b.order);

  // If user is admin, append admin tab if not already present
  const displayTabs = [...visibleTabs];
  if (isAdmin && !displayTabs.some(t => t.id === 'admin')) {
    displayTabs.push({ id: 'admin', label: 'Admin', enabled: true, order: 99 });
  }

  return (
    <div className="bg-slate-900 border-b border-slate-800 sticky top-[57px] sm:top-[65px] z-30">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {displayTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <span>{TAB_ICONS[tab.id]}</span>
                <span>{tab.label}</span>
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {orders.length}
                  </span>
                )}
                {tab.id === 'samples' && (
                  <span className={`text-[9px] uppercase px-1 rounded font-bold ml-0.5 ${
                    isActive ? 'bg-slate-900 text-amber-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    Free
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
