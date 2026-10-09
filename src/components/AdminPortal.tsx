import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, Question } from '../types';
import { RenderMarkdown } from './DailyNotesTab';
import { PhonePeScannerCard } from './PhonePeScannerCard';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Package, 
  FileText, 
  CheckSquare, 
  Video, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Check, 
  Plus, 
  Trash2, 
  Search, 
  Truck, 
  MessageCircle, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    logoutAdmin, 
    shopConfig, 
    updateShopConfig, 
    orders, 
    updateOrderStatus, 
    addDailyNote, 
    addVideo, 
    addImage, 
    tabs, 
    updateTabs,
    subjectQuizzes,
    addQuestionsToSubject
  } = useApp();

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<
    'orders' | 'shop' | 'add-note' | 'add-quiz' | 'add-video' | 'add-image' | 'tabs-config'
  >('orders');

  // Shop settings form state
  const [upiId, setUpiId] = useState(shopConfig.upiId);
  const [accountName, setAccountName] = useState(shopConfig.accountName);
  const [setPrice, setSetPrice] = useState(shopConfig.setPrice);
  const [setMrp, setSetMrp] = useState(shopConfig.setMrp);
  const [vol1Price, setVol1Price] = useState(shopConfig.vol1Price);
  const [vol1Mrp, setVol1Mrp] = useState(shopConfig.vol1Mrp);
  const [vol2Price, setVol2Price] = useState(shopConfig.vol2Price);
  const [vol2Mrp, setVol2Mrp] = useState(shopConfig.vol2Mrp);
  const [deliveryFee, setDeliveryFee] = useState(shopConfig.deliveryFee);
  const [isOpen, setIsOpen] = useState(shopConfig.isOpen);
  const [noticeBanner, setNoticeBanner] = useState(shopConfig.noticeBanner);
  const [aboutText, setAboutText] = useState(shopConfig.aboutText);
  const [shopSaveSuccess, setShopSaveSuccess] = useState(false);

  // Orders filters
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [tempTracking, setTempTracking] = useState('');
  const [tempCourier, setTempCourier] = useState('India Post Speed Post');
  const [tempNote, setTempNote] = useState('');

  // Add Note Form
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('Medical-Surgical Nursing');
  const [noteReadTime, setNoteReadTime] = useState('3 min read');
  const [noteIsGolden, setNoteIsGolden] = useState(true);
  const [noteTags, setNoteTags] = useState('NORCET-2026, High-Yield');
  const [noteContent, setNoteContent] = useState(`# Heading

## Key Clinical Facts
- Point one
- Point two with **bold emphasis**

==CRITICAL HIGH YIELD ALERT: Remember this formula for exam!==`);
  const [noteSuccess, setNoteSuccess] = useState(false);

  // Add Quiz Raw Text Form
  const [rawQuizText, setRawQuizText] = useState(`1. Which organelle produces most of the cell's ATP?
A) Nucleus
B) Mitochondria
C) Ribosome
D) Golgi body
Answer: B
Explanation: Oxidative phosphorylation takes place in the mitochondria.

2. Normal adult respiratory rate per minute is
A) 8–10
B) 12–20
C) 22–28
D) 30–40
Answer: B
Explanation: Normal physiological adult respiratory rate is 12 to 20 breaths per minute.`);
  const [targetSubjectId, setTargetSubjectId] = useState<string>(subjectQuizzes[0]?.id || 'subj-gi');
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [quizParseError, setQuizParseError] = useState<string | null>(null);
  const [quizSuccess, setQuizSuccess] = useState(false);

  // Add Video
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('18:30');
  const [videoSubject, setVideoSubject] = useState('Obstetrics & Gynaecology');
  const [videoInstructor, setVideoInstructor] = useState('Kiran S. M. (Patil)');
  const [videoSummary, setVideoSummary] = useState('');
  const [videoSuccess, setVideoSuccess] = useState(false);

  // Add Image
  const [imgTitle, setImgTitle] = useState('');
  const [imgCategory, setImgCategory] = useState('Cardiology');
  const [imgUrl, setImgUrl] = useState('');
  const [imgDesc, setImgDesc] = useState('');
  const [imgTags, setImgTags] = useState('ECG, HighYield');
  const [imgSuccess, setImgSuccess] = useState(false);

  // Save Shop Settings
  const handleSaveShop = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopConfig({
      upiId,
      accountName,
      setPrice,
      setMrp,
      vol1Price,
      vol1Mrp,
      vol2Price,
      vol2Mrp,
      deliveryFee,
      isOpen,
      noticeBanner,
      aboutText
    });
    setShopSaveSuccess(true);
    setTimeout(() => setShopSaveSuccess(false), 2500);
  };

  // Submit Note
  const handlePublishNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    addDailyNote({
      title: noteTitle,
      subject: noteSubject,
      readTime: noteReadTime,
      isGolden: noteIsGolden,
      tags: noteTags.split(',').map(t => t.trim()).filter(Boolean),
      content: noteContent
    });

    setNoteSuccess(true);
    setNoteTitle('');
    setTimeout(() => setNoteSuccess(false), 2500);
  };

  // Parse Raw Quiz Text (Format matching launch guide)
  const handleCheckQuestions = () => {
    setQuizParseError(null);
    try {
      const blocks = rawQuizText.split(/\n\s*\n/).filter(b => b.trim().length > 0);
      const results: Question[] = [];

      for (let i = 0; i < blocks.length; i++) {
        const lines = blocks[i].split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length < 5) continue;

        // Line 1: Question
        let questionText = lines[0].replace(/^\d+[\.\)]\s*/, '').trim();

        // Find options
        let optA = '', optB = '', optC = '', optD = '';
        let answer: 'A' | 'B' | 'C' | 'D' = 'A';
        let explanation = '';

        for (const line of lines.slice(1)) {
          if (/^[aA][\.\)]\s*/.test(line)) optA = line.replace(/^[aA][\.\)]\s*/, '');
          else if (/^[bB][\.\)]\s*/.test(line)) optB = line.replace(/^[bB][\.\)]\s*/, '');
          else if (/^[cC][\.\)]\s*/.test(line)) optC = line.replace(/^[cC][\.\)]\s*/, '');
          else if (/^[dD][\.\)]\s*/.test(line)) optD = line.replace(/^[dD][\.\)]\s*/, '');
          else if (/^Answer:\s*/i.test(line)) {
            const letter = line.replace(/^Answer:\s*/i, '').trim().toUpperCase();
            if (['A', 'B', 'C', 'D'].includes(letter)) answer = letter as any;
          } else if (/^Explanation:\s*/i.test(line)) {
            explanation = line.replace(/^Explanation:\s*/i, '').trim();
          }
        }

        if (optA && optB && optC && optD) {
          results.push({
            id: `q-parsed-${Date.now()}-${i}`,
            question: questionText,
            options: [optA, optB, optC, optD],
            answer,
            explanation: explanation || 'Refer to Total Recall textbook chapter for full clinical rationale.',
            subjectId: targetSubjectId
          });
        }
      }

      if (results.length === 0) {
        setQuizParseError('Could not find questions matching the standard format. Check numbering and option letters A) B) C) D).');
        setParsedQuestions([]);
      } else {
        setParsedQuestions(results);
      }
    } catch (err) {
      setQuizParseError('Error parsing quiz text. Please check format.');
    }
  };

  const handlePublishQuestions = () => {
    if (parsedQuestions.length === 0) return;
    addQuestionsToSubject(targetSubjectId, parsedQuestions);
    setQuizSuccess(true);
    setParsedQuestions([]);
    setTimeout(() => setQuizSuccess(false), 2500);
  };

  // Add Video Handler
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;

    // Extract youtube ID
    let ytId = videoUrl.trim();
    if (videoUrl.includes('v=')) {
      ytId = videoUrl.split('v=')[1].split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      ytId = videoUrl.split('youtu.be/')[1].split('?')[0];
    }

    addVideo({
      title: videoTitle,
      youtubeId: ytId,
      duration: videoDuration,
      subject: videoSubject,
      instructor: videoInstructor,
      summary: videoSummary || 'Clinical review masterclass from Total Recall author series.'
    });

    setVideoSuccess(true);
    setVideoTitle('');
    setVideoUrl('');
    setVideoSummary('');
    setTimeout(() => setVideoSuccess(false), 2500);
  };

  // Add Image Handler
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgTitle.trim() || !imgUrl.trim()) return;

    addImage({
      title: imgTitle,
      category: imgCategory,
      imageUrl: imgUrl,
      description: imgDesc || 'Clinical flowchart and high-yield diagram from Total Recall.',
      tags: imgTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setImgSuccess(true);
    setImgTitle('');
    setImgUrl('');
    setImgDesc('');
    setTimeout(() => setImgSuccess(false), 2500);
  };

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.utr.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'all' ? true : o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AUTHOR CONTROL DESK
              </span>
              <span className="text-xs text-slate-400">Authenticated: nirashachaudhari52@gmail.com</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Admin & Book Dispatch Portal
            </h2>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex gap-1.5 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'orders', label: `Orders (${orders.length})`, icon: <Package className="w-3.5 h-3.5" /> },
          { id: 'shop', label: 'Shop & Payment Settings', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
          { id: 'add-note', label: "Add Today's Note", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'add-quiz', label: "Add Today's Quiz", icon: <CheckSquare className="w-3.5 h-3.5" /> },
          { id: 'add-video', label: 'Add Video', icon: <Video className="w-3.5 h-3.5" /> },
          { id: 'add-image', label: 'Upload Images', icon: <ImageIcon className="w-3.5 h-3.5" /> },
          { id: 'tabs-config', label: 'Tabs & Buttons', icon: <Settings className="w-3.5 h-3.5" /> }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveAdminSubTab(sub.id as any)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
              activeAdminSubTab === sub.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {sub.icon}
            <span>{sub.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: ORDERS MANAGEMENT */}
      {activeAdminSubTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders by UTR, buyer name, or phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {(['all', 'Submitted', 'Confirmed', 'Dispatched', 'Delivered'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-medium ${
                    orderStatusFilter === st
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                No orders match your filter criteria.
              </div>
            ) : (
              filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-sm">{order.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {order.buyerName} ({order.phone})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400">Amount Paid:</span>
                        <div className="text-sm font-black text-emerald-400">₹{order.totalAmount}</div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                          order.status === 'Dispatched'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : order.status === 'Confirmed'
                            ? 'bg-sky-950 text-sky-300 border-sky-600'
                            : order.status === 'Delivered'
                            ? 'bg-teal-950 text-teal-300 border-teal-600'
                            : 'bg-amber-950 text-amber-300 border-amber-600'
                        }`}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400"><strong>Items:</strong> {order.itemDescription}</div>
                      <div className="text-slate-400">
                        <strong>Delivery Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}
                        {order.landmark && ` (Near ${order.landmark})`}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400">
                        <strong>Bank UTR Ref:</strong> <span className="font-mono text-white font-bold">{order.utr}</span>
                      </div>
                      <div className="text-slate-400">
                        <strong>Payee ID:</strong> {order.upiIdUsed}
                      </div>
                      {order.trackingNumber && (
                        <div className="text-emerald-400">
                          <strong>Speed Post Tracking:</strong> <span className="font-mono">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dispatch Tools & Courier Modal */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingOrderId(editingOrderId === order.id ? null : order.id);
                          setTempTracking(order.trackingNumber || '');
                          setTempCourier(order.courierPartner || 'India Post Speed Post');
                          setTempNote(order.adminNote || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold"
                      >
                        {order.trackingNumber ? 'Edit Tracking Code' : 'Add Speed Post Tracking'}
                      </button>

                      <a
                        href={`https://wa.me/91${order.phone}?text=Hello%20${encodeURIComponent(order.buyerName)}%2C%20your%20Total%20Recall%20order%20(${order.id})%20status%20is%20${order.status}.${order.trackingNumber ? `%20Tracking%20Code:%20${order.trackingNumber}` : ''}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-semibold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Buyer</span>
                      </a>
                    </div>
                  </div>

                  {/* Inline Tracking Form */}
                  {editingOrderId === order.id && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-3 text-xs animate-fade-in">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Truck className="w-4 h-4" />
                        <span>Update Dispatch Consignment Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Consignment / Tracking Number (AWB)</label>
                          <input
                            type="text"
                            placeholder="e.g. ED839182391IN"
                            value={tempTracking}
                            onChange={(e) => setTempTracking(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-mono text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Courier Partner</label>
                          <input
                            type="text"
                            placeholder="India Post Speed Post / Delhivery"
                            value={tempCourier}
                            onChange={(e) => setTempCourier(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Note for Buyer (e.g. dispatched today, delivery in 2 days)</label>
                        <input
                          type="text"
                          placeholder="Dispatched via Speed Post on 07-Oct. Track at indiapost.gov.in"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingOrderId(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            updateOrderStatus(order.id, 'Dispatched', tempTracking, tempCourier, tempNote);
                            setEditingOrderId(null);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow"
                        >
                          Save & Mark Dispatched
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SHOP & PAYMENT SETTINGS */}
      {activeAdminSubTab === 'shop' && (
        <form onSubmit={handleSaveShop} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Shop & UPI Payment Configurations</h3>
              <p className="text-xs text-slate-400">
                Update payment receiver details, edition prices, delivery fees and notice banner.
              </p>
            </div>
            {shopSaveSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                ✓ Changes Published!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Official UPI ID (VPA) *</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="8766492530-3@ybl"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Exact Bank Account Holder Name *</label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="KIRAN SURESH MURKUT"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">2-Volume Set Selling Price (₹)</label>
              <input
                type="number"
                value={setPrice}
                onChange={(e) => setSetPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">2-Volume Set MRP (₹)</label>
              <input
                type="number"
                value={setMrp}
                onChange={(e) => setSetMrp(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Volume 1 Selling Price (₹)</label>
              <input
                type="number"
                value={vol1Price}
                onChange={(e) => setVol1Price(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Volume 2 Selling Price (₹)</label>
              <input
                type="number"
                value={vol2Price}
                onChange={(e) => setVol2Price(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Top Notice / Announcement Banner</label>
              <input
                type="text"
                value={noticeBanner}
                onChange={(e) => setNoticeBanner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">About Text</label>
              <textarea
                rows={3}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          {/* Active Scanner Standee Preview */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
              Live PhonePe Scanner Standee Preview (Seen by Buyers):
            </span>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-center">
              <PhonePeScannerCard
                upiId={upiId}
                accountName={accountName}
                showActions={false}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
            >
              Publish Shop Changes
            </button>
          </div>
        </form>
      )}

      {/* SUB-TAB 3: ADD TODAY'S NOTE */}
      {activeAdminSubTab === 'add-note' && (
        <form onSubmit={handlePublishNote} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Create & Publish Today's Daily Note</h3>
              <p className="text-xs text-slate-400">
                Supports markdown: # Heading, ## Small heading, - bullet, **bold**, ==highlight==
              </p>
            </div>
            {noteSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                ✓ Published to Daily Notes!
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Note Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Glasgow Coma Scale (GCS): Rapid Assessment & E4V5M6"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Subject</label>
                <input
                  type="text"
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Estimated Read Time</label>
                <input
                  type="text"
                  value={noteReadTime}
                  onChange={(e) => setNoteReadTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Markdown Body (Use ==highlight== for golden points)
              </label>
              <textarea
                required
                rows={8}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-white text-xs leading-relaxed"
              />
            </div>

            {/* Live Preview */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Live Markdown Preview:
              </span>
              <RenderMarkdown content={noteContent} />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
            >
              Publish Note to Users
            </button>
          </div>
        </form>
      )}

      {/* SUB-TAB 4: ADD TODAY'S QUIZ */}
      {activeAdminSubTab === 'add-quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Import / Add Quiz Questions</h3>
              <p className="text-xs text-slate-400">
                Paste questions in the format from Word or WhatsApp (1. Question, A) ... Answer: B Explanation: ...)
              </p>
            </div>
            {quizSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                ✓ Added to Question Bank!
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Target Subject Bank</label>
              <select
                value={targetSubjectId}
                onChange={(e) => setTargetSubjectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              >
                {subjectQuizzes.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Paste Raw Question Text *</label>
              <textarea
                rows={10}
                value={rawQuizText}
                onChange={(e) => setRawQuizText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-white text-xs leading-relaxed"
              />
            </div>

            {quizParseError && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
                {quizParseError}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCheckQuestions}
                className="px-5 py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Check Questions ({parsedQuestions.length} parsed)
              </button>

              {parsedQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={handlePublishQuestions}
                  className="px-6 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
                >
                  Publish {parsedQuestions.length} Questions
                </button>
              )}
            </div>

            {/* Parsed Preview */}
            {parsedQuestions.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Ready to Publish ({parsedQuestions.length} Valid Questions):
                </span>
                {parsedQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-white">{qIdx + 1}. {q.question}</div>
                    <div className="text-slate-400">A) {q.options[0]} | B) {q.options[1]} | C) {q.options[2]} | D) {q.options[3]}</div>
                    <div className="text-amber-400">Correct Answer: {q.answer}</div>
                    <div className="text-slate-500 text-[11px]">{q.explanation}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: ADD VIDEO */}
      {activeAdminSubTab === 'add-video' && (
        <form onSubmit={handleAddVideo} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Add Unlisted YouTube Video Lecture</h3>
              <p className="text-xs text-slate-400">
                Paste an unlisted or public YouTube lecture URL.
              </p>
            </div>
            {videoSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                ✓ Video Added!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Video Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mechanism of Labour: 9 Cardinal Movements 3D Animation"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">YouTube Link or Video ID *</label>
              <input
                type="text"
                required
                placeholder="https://youtu.be/xxx or video ID"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Duration</label>
              <input
                type="text"
                value={videoDuration}
                onChange={(e) => setVideoDuration(e.target.value)}
                placeholder="18:30"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Subject</label>
              <input
                type="text"
                value={videoSubject}
                onChange={(e) => setVideoSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Instructor</label>
              <input
                type="text"
                value={videoInstructor}
                onChange={(e) => setVideoInstructor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Summary / Lecture Notes</label>
              <textarea
                rows={2}
                value={videoSummary}
                onChange={(e) => setVideoSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
            >
              Add Video to App
            </button>
          </div>
        </form>
      )}

      {/* SUB-TAB 6: ADD CLINICAL IMAGE */}
      {activeAdminSubTab === 'add-image' && (
        <form onSubmit={handleAddImage} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Upload / Add Clinical Chart</h3>
              <p className="text-xs text-slate-400">
                A copyright watermark is applied automatically across the preview.
              </p>
            </div>
            {imgSuccess && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                ✓ Image Published!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Chart Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Wallace Rule of Nines Burn Chart"
                value={imgTitle}
                onChange={(e) => setImgTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Category</label>
              <input
                type="text"
                value={imgCategory}
                onChange={(e) => setImgCategory(e.target.value)}
                placeholder="Medical-Surgical / Cardiology"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Image URL *</label>
              <input
                type="url"
                required
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Clinical Description / Notes</label>
              <textarea
                rows={2}
                value={imgDesc}
                onChange={(e) => setImgDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition"
            >
              Publish Clinical Image
            </button>
          </div>
        </form>
      )}

      {/* SUB-TAB 7: TABS CONFIGURATION */}
      {activeAdminSubTab === 'tabs-config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">Tabs, Buttons & Navigation Customizer</h3>
            <p className="text-xs text-slate-400">
              Rename tab labels or toggle tab visibility in the user navigation bar.
            </p>
          </div>

          <div className="space-y-3">
            {tabs.map((tab, idx) => (
              <div
                key={tab.id}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <input
                      type="text"
                      value={tab.label}
                      onChange={(e) => {
                        const updated = tabs.map(t => t.id === tab.id ? { ...t, label: e.target.value } : t);
                        updateTabs(updated);
                      }}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-bold"
                    />
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {tab.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = tabs.map(t => t.id === tab.id ? { ...t, enabled: !t.enabled } : t);
                      updateTabs(updated);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      tab.enabled
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tab.enabled ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
