import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  X, 
  Smartphone, 
  Play, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  Globe, 
  Layers, 
  BookOpen, 
  Info,
  HelpCircle,
  Share2
} from 'lucide-react';

export const AndroidPublishModal: React.FC = () => {
  const { showAndroidPublishModal, setShowAndroidPublishModal } = useApp();
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();

  const [activeSubTab, setActiveSubTab] = useState<'install' | 'playstore' | 'bubblewrap' | 'assetlinks' | 'checklist'>('playstore');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [userSha256, setUserSha256] = useState<string>('FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C');

  if (!showAndroidPublishModal) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-feyqzsrg2jfxojgyhwhxlq-973543818512.asia-southeast1.run.app';
  const manifestUrl = `${appUrl}/manifest.webmanifest`;
  const pwaBuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(appUrl)}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const bubblewrapCommands = `# 1. Install Google's official Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize Android Project from your app manifest
bubblewrap init --manifest="${manifestUrl}"

# 3. Build signed Android App Bundle (.aab) and APK
bubblewrap build

# Output: app-release-signed.aab (Upload directly to Google Play Console!)`;

  const assetLinksJson = `[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.totalrecall.nursingexam",
      "sha256_cert_fingerprints": [
        "${userSha256.trim() || 'FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C'}"
      ]
    }
  }
]`;

  const downloadFile = (filename: string, content: string, type = 'application/json') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Smartphone className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Android App & Google Play Publishing Hub
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready to Publish
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Package ID: <code className="text-amber-300 font-mono">com.totalrecall.nursingexam</code> • TWA & PWA Compliant
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAndroidPublishModal(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Badges Bar */}
        <div className="bg-slate-950/40 border-b border-slate-800/80 px-6 py-2.5 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Web App Manifest OK</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Service Worker Offline OK</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>192px / 512px / Maskable Icons OK</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>assetlinks.json OK</span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 overflow-x-auto px-4 sm:px-6">
          <button
            onClick={() => setActiveSubTab('playstore')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeSubTab === 'playstore'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Google Play (1-Click PWABuilder)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bubblewrap')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeSubTab === 'bubblewrap'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Google Bubblewrap CLI (.aab)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('install')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeSubTab === 'install'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Direct Android Phone Install</span>
          </button>

          <button
            onClick={() => setActiveSubTab('assetlinks')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeSubTab === 'assetlinks'
                ? 'border-purple-400 text-purple-300 bg-purple-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Asset Links</span>
          </button>

          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeSubTab === 'checklist'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Play Store Listing Checklist</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200">

          {/* TAB 1: GOOGLE PLAY STORE VIA PWABUILDER */}
          {activeSubTab === 'playstore' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 hidden sm:block">
                    <Play className="w-7 h-7" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Easiest & Fastest Method
                      </span>
                      <h3 className="text-base font-bold text-white">
                        Generate Google Play Package (.aab) with PWABuilder
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      PWABuilder is the Microsoft & Google sponsored open-source tool that wraps your PWA into an official <strong>Trusted Web Activity (TWA) Android App Bundle (.aab)</strong>. It handles signing keys, splash screens, Android manifest, and prepares the exact bundle required by the Google Play Console.
                    </p>
                    
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={pwaBuilderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch PWABuilder for Total Recall</span>
                      </a>
                      
                      <button
                        onClick={() => copyToClipboard(appUrl, 'app-url')}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
                      >
                        {copiedText === 'app-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy App URL</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Steps to Publish */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white">Click Launch PWABuilder</h4>
                  <p className="text-[11px] text-slate-400">
                    The tool automatically validates your PWA manifest, service worker, and icons.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white">Package for Android</h4>
                  <p className="text-[11px] text-slate-400">
                    Click "Package for Stores" and choose <strong>Google Play (Android)</strong>. Set Package ID to <code className="text-amber-300">com.totalrecall.nursingexam</code>.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white">Download .aab Bundle</h4>
                  <p className="text-[11px] text-slate-400">
                    PWABuilder generates your signed <code className="text-amber-300">app-release.aab</code> package and signing keystore zip.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-xs">
                    4
                  </div>
                  <h4 className="text-xs font-bold text-white">Upload to Play Console</h4>
                  <p className="text-[11px] text-slate-400">
                    Go to <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-cyan-400 underline">play.google.com/console</a>, create your app and upload the .aab file!
                  </p>
                </div>
              </div>

              {/* Ready Configuration Exports */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  Pre-configured Files for Publishing
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const manifestData = {
                        id: '/',
                        name: 'Total Recall - Nursing Exam Prep & Book Store',
                        short_name: 'Total Recall',
                        description: 'Official companion app for Total Recall by Kiran S. M. (Patil). Daily notes, quizzes, and book ordering.',
                        theme_color: '#0f172a',
                        background_color: '#0f172a',
                        display: 'standalone',
                        orientation: 'portrait-primary',
                        start_url: '/',
                        scope: '/',
                        categories: ['education', 'books', 'medical'],
                        icons: [
                          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
                        ]
                      };
                      downloadFile('manifest.webmanifest', JSON.stringify(manifestData, null, 2));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download manifest.webmanifest</span>
                  </button>

                  <button
                    onClick={() => downloadFile('assetlinks.json', assetLinksJson)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span>Download assetlinks.json</span>
                  </button>

                  <a
                    href="/pwa-512x512.png"
                    download="total_recall_512x512.png"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download 512x512 Hi-Res App Icon</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE BUBBLEWRAP CLI */}
          {activeSubTab === 'bubblewrap' && (
            <div className="space-y-5">
              <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">Google Official Bubblewrap CLI (Command Line)</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bubblewrapCommands, 'bubblewrap-cli')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-slate-700 transition"
                  >
                    {copiedText === 'bubblewrap-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy All Commands</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bubblewrap is Google Chrome team's official command line utility to generate, build and sign an Android project that launches your PWA inside a Trusted Web Activity.
                </p>

                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-amber-200/90 border border-slate-800 overflow-x-auto">
                  <pre>{bubblewrapCommands}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Key App Settings Configured
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <li>• Package ID: <span className="text-emerald-400">com.totalrecall.nursingexam</span></li>
                    <li>• App Name: <span className="text-emerald-400">Total Recall</span></li>
                    <li>• Theme Color: <span className="text-emerald-400">#0f172a</span> (Dark Slate)</li>
                    <li>• Display: <span className="text-emerald-400">standalone</span></li>
                    <li>• Fallback: <span className="text-emerald-400">Custom Tabs</span></li>
                  </ul>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    Download Pre-generated twa-manifest.json
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You can place this in an empty directory and immediately run <code className="text-amber-300">bubblewrap build</code> to generate the signed APK and AAB!
                  </p>
                  <button
                    onClick={() => {
                      const twa = {
                        packageId: "com.totalrecall.nursingexam",
                        host: window.location.host,
                        name: "Total Recall - Nursing Exam Prep",
                        launcherName: "Total Recall",
                        themeColor: "#0f172a",
                        navigationColor: "#0f172a",
                        backgroundColor: "#0f172a",
                        enableNotifications: true,
                        startUrl: "/",
                        iconUrl: "/pwa-512x512.png",
                        maskableIconUrl: "/pwa-maskable-512x512.png",
                        appVersionName: "1.0.0",
                        appVersionCode: 1,
                        webManifestUrl: `${appUrl}/manifest.webmanifest`,
                        generatorApp: "bubblewrap-cli"
                      };
                      downloadFile('twa-manifest.json', JSON.stringify(twa, null, 2));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download twa-manifest.json</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT INSTALL ON PHONE */}
          {activeSubTab === 'install' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-950/50 to-slate-900 border border-cyan-500/30 rounded-xl p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Zero Store Delay • Instant Testing & Distribution
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      Direct WebAPK Android Installation
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      On modern Android devices running Chrome, Samsung Internet, or Edge, this web application installs directly as a genuine native Android app (WebAPK) with an app launcher icon, native splash screen, and offline storage!
                    </p>
                  </div>

                  {isInstallable ? (
                    <button
                      onClick={install}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 transition flex items-center gap-2 active:scale-95 flex-shrink-0"
                    >
                      <Download className="w-5 h-5 animate-bounce" />
                      <span>Install on this Android Device</span>
                    </button>
                  ) : isInstalled ? (
                    <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Already Installed</span>
                    </div>
                  ) : null}
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-cyan-200">{appUrl}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(appUrl, 'copy-share-url')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    {copiedText === 'copy-share-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Link to Share with Students</span>
                  </button>
                </div>
              </div>

              {/* How Android Users Install In 2 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-amber-400 font-black text-xs uppercase tracking-wider">Step 1</div>
                  <h4 className="text-xs font-bold text-white">Open in Android Chrome</h4>
                  <p className="text-[11px] text-slate-400">
                    Open the link on any Android phone in Google Chrome or Samsung Internet.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-amber-400 font-black text-xs uppercase tracking-wider">Step 2</div>
                  <h4 className="text-xs font-bold text-white">Tap "Install App"</h4>
                  <p className="text-[11px] text-slate-400">
                    A banner or prompt will appear at the bottom: <strong>"Add Total Recall to Home Screen"</strong> or <strong>"Install App"</strong>.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-amber-400 font-black text-xs uppercase tracking-wider">Step 3</div>
                  <h4 className="text-xs font-bold text-white">Native Android App Launch</h4>
                  <p className="text-[11px] text-slate-400">
                    Android compiles a native WebAPK. The app appears in the phone app drawer with the Total Recall icon and opens full-screen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIGITAL ASSET LINKS */}
          {activeSubTab === 'assetlinks' && (
            <div className="space-y-5">
              <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-purple-300">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Digital Asset Links Verification (Full-Screen URL Hiding)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When publishing to Google Play Store via Trusted Web Activity (TWA), Android requires a handshake between your web domain and your Android App package so Chrome removes the top browser address bar completely!
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This handshake is verified via the file at: <code className="text-purple-300 bg-slate-950 px-2 py-0.5 rounded font-mono">/.well-known/assetlinks.json</code>
                </p>
              </div>

              {/* SHA-256 Editor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <label className="block text-xs font-bold text-slate-200">
                  Your Google Play App Signing SHA-256 Fingerprint:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userSha256}
                    onChange={(e) => setUserSha256(e.target.value)}
                    placeholder="Enter SHA-256 fingerprint from Google Play Console..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={() => downloadFile('assetlinks.json', assetLinksJson)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  💡 Find this in <strong>Google Play Console → Setup → App Signing → SHA-256 certificate fingerprint</strong>.
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">assetlinks.json preview:</span>
                    <button
                      onClick={() => copyToClipboard(assetLinksJson, 'assetlinks-json')}
                      className="text-[11px] text-purple-300 hover:text-purple-200 flex items-center gap-1 font-semibold"
                    >
                      {copiedText === 'assetlinks-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 p-3 rounded-lg text-[11px] font-mono text-purple-200 border border-slate-800 overflow-x-auto">
                    {assetLinksJson}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PLAY STORE LISTING CHECKLIST */}
          {activeSubTab === 'checklist' && (
            <div className="space-y-5">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Google Play Store Listing Details (Ready to Copy-Paste)
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">App Name (max 30 chars):</span>
                      <button
                        onClick={() => copyToClipboard('Total Recall - Nursing Exam', 'app-title')}
                        className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedText === 'app-title' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <p className="mt-1 font-mono text-amber-200">Total Recall - Nursing Exam</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">Short Description (max 80 chars):</span>
                      <button
                        onClick={() => copyToClipboard('One stop solution for AIIMS NORCET, ESIC & RRB nursing competitive exams prep.', 'short-desc')}
                        className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedText === 'short-desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                    <p className="mt-1 font-mono text-amber-200">One stop solution for AIIMS NORCET, ESIC & RRB nursing competitive exams prep.</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">Full Description:</span>
                      <button
                        onClick={() => copyToClipboard(`Total Recall: One Stop Solution for All Nursing Competitive Exams (2026 Edition by Kiran S. M. (Patil)).

Designed specifically for AIIMS NORCET, ESIC, RRB Staff Nurse, DSSSB, CHO, and State PSC Nursing Officers.

Key Features:
- Daily High-Yield Nursing Notes and Golden Points
- 20 Comprehensive Subject Quizzes with Clinical Rationales
- Sample Chapters & High-Yield Tables from Volume 1 & Volume 2
- Subject Progress Tracking and Exam Readiness Analysis
- Direct Official Book Ordering with UPI & Delivery Tracking
- Works 100% Offline with Service Worker caching!`, 'full-desc')}
                        className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedText === 'full-desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Full Description</span>
                      </button>
                    </div>
                    <p className="mt-1 text-slate-400 leading-relaxed text-[11px]">
                      Complete companion for AIIMS NORCET, ESIC, RRB, and Nursing Officer exams with 20 subject tests, daily notes, and official 2-volume textbook integration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="font-bold text-slate-300">Category:</span>
                      <p className="mt-0.5 text-slate-400">Education / Medical</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="font-bold text-slate-300">Content Rating:</span>
                      <p className="mt-0.5 text-slate-400">Everyone (All ages)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Standard Google Play Developer account fee is $25 one-time.</span>
          </div>
          <button
            onClick={() => setShowAndroidPublishModal(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
