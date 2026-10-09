import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Smartphone, Download, CheckCircle2, Share, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const { setShowAndroidPublishModal } = useApp();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  // If already installed and running standalone
  if (isInstalled) {
    return (
      <button
        onClick={() => setShowAndroidPublishModal(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition"
        title="App Installed • Open Android & Google Play Publishing Hub"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Installed</span>
        <span className="sm:hidden">App</span>
      </button>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledNotice(true);
        setTimeout(() => setInstalledNotice(false), 5000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Open the Android publishing and install guidance modal
      setShowAndroidPublishModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-sm shadow-emerald-500/20 active:scale-95 transition"
        title="Install Android App directly or Publish to Google Play"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span className="hidden sm:inline">{isAndroid ? 'Install Android App' : 'Get Android App'}</span>
        <span className="sm:hidden">Install App</span>
      </button>

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                Install on iPhone / iPad
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <Share className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>1. Tap the <strong>Share</strong> icon in the Safari bottom toolbar.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <PlusSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>2. Scroll down and tap <strong>Add to Home Screen</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>3. Tap <strong>Add</strong> at top right to place Total Recall on your home screen.</span>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 text-xs font-semibold border border-slate-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Installed Toast */}
      {installedNotice && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Total Recall installed on your device!</span>
        </div>
      )}
    </>
  );
};
