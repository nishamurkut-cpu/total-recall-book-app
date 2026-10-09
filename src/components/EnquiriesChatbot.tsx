import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenAI } from '@google/genai';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  ExternalLink, 
  ShoppingBag, 
  BookOpen, 
  Package, 
  GraduationCap, 
  Copy, 
  Check, 
  RotateCcw, 
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Flame,
  ArrowRight
} from 'lucide-react';

interface ChatAction {
  label: string;
  actionType: 'tab' | 'whatsapp' | 'call' | 'copy';
  payload: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
}

interface QuickTopic {
  label: string;
  icon: string;
  question: string;
  category: string;
}

const QUICK_TOPICS: QuickTopic[] = [
  { label: 'Book Price & Offer', icon: '💰', question: 'What is the price of Total Recall and what discount is available?', category: 'price' },
  { label: 'Delivery Time', icon: '🚚', question: 'How long does delivery take and how are books shipped?', category: 'shipping' },
  { label: 'How to Pay via UPI', icon: '💳', question: 'What is the official UPI ID and how do I submit my payment?', category: 'payment' },
  { label: 'Track My Order', icon: '📦', question: 'How do I track my order status and Speed Post consignment?', category: 'tracking' },
  { label: 'Vol 1 vs Vol 2 Contents', icon: '📚', question: 'What subjects are covered in Volume 1 and Volume 2?', category: 'contents' },
  { label: 'NORCET & ESIC Syllabus', icon: '🎯', question: 'Is Total Recall suitable for AIIMS NORCET, ESIC, and RRB exams?', category: 'exams' },
  { label: 'Free Sample Chapters', icon: '📖', question: 'Can I read sample chapters and notes before ordering?', category: 'samples' },
  { label: 'Official Support Helpline', icon: '📞', question: 'How do I contact official support or reach author Kiran Sir directly?', category: 'support' },
];

export const EnquiriesChatbot: React.FC = () => {
  const { 
    showChatbot, 
    setShowChatbot, 
    chatbotInitialQuery, 
    setActiveTab, 
    shopConfig 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotGreeting: ChatMessage = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `👋 **Namaste! Welcome to Total Recall Official Enquiries Support.**\n\nI am your instant assistant for questions about **Total Recall: One Stop Solution for All Nursing Competitive Exams** by **Kiran S. M. (Patil)**.\n\nHow can I help you today? You can choose a quick question below or type your inquiry.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: 'Order Set (₹1,499)', actionType: 'tab', payload: 'buy' },
      { label: 'WhatsApp Help: 9604929702', actionType: 'whatsapp', payload: '9604929702' },
      { label: 'Free Samples', actionType: 'tab', payload: 'samples' },
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotGreeting]);

  // Handle external triggers (e.g. user clicked "Ask about UPI" elsewhere)
  useEffect(() => {
    if (chatbotInitialQuery) {
      handleUserSubmit(chatbotInitialQuery);
    }
  }, [chatbotInitialQuery]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === 'tab') {
      setActiveTab(action.payload as any);
      setShowChatbot(false);
    } else if (action.actionType === 'whatsapp') {
      window.open(`https://wa.me/91${action.payload}?text=Hello%20Kiran%20Sir%2C%20I%20have%20an%20enquiry%20regarding%20Total%20Recall%20Nursing%20Book`, '_blank');
    } else if (action.actionType === 'call') {
      window.location.href = `tel:${action.payload}`;
    } else if (action.actionType === 'copy') {
      copyText(action.payload);
    }
  };

  /**
   * Rule-based Knowledge Base providing rich, immediate answers.
   */
  const getKnowledgeResponse = (userQuery: string): { reply: string; actions?: ChatAction[] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. Price, Discount, Cost, Buying
    if (q.includes('price') || q.includes('cost') || q.includes('mrp') || q.includes('discount') || q.includes('offer') || q.includes('buy') || q.includes('rate') || q.includes('how much')) {
      return {
        reply: `📘 **Total Recall (2026 Edition) Pricing & Offers:**\n\n- **Complete 2-Volume Set (Recommended):** **₹${shopConfig.setPrice}** (MRP ₹${shopConfig.setMrp} — **Save ₹${shopConfig.setMrp - shopConfig.setPrice} / 40% OFF**)\n- **Volume 1 (Medical-Surgical & Foundations):** **₹${shopConfig.vol1Price}** (MRP ₹${shopConfig.vol1Mrp})\n- **Volume 2 (OBG, Pediatrics, Psychiatry, CHN):** **₹${shopConfig.vol2Price}** (MRP ₹${shopConfig.vol2Mrp})\n\n🚚 **Shipping:** Free insured India Post Speed Post delivery included for the 2-Volume set.\n\nWould you like to order now?`,
        actions: [
          { label: 'Buy 2-Volume Set (₹1,499)', actionType: 'tab', payload: 'buy' },
          { label: 'WhatsApp Order Desk', actionType: 'whatsapp', payload: '9604929702' }
        ]
      };
    }

    // 2. COD / Cash on Delivery
    if (q.includes('cod') || q.includes('cash on delivery') || q.includes('pay on delivery')) {
      return {
        reply: `ℹ️ **Regarding Cash on Delivery (COD):**\n\nTo ensure **maximum direct discount from author** and eliminate hefty 3rd-party marketplace commissions, Total Recall is dispatched via direct author booking with **Prepaid UPI Payment** (PhonePe / GPay / Paytm).\n\n✅ 100% genuine guaranteed dispatch directly overseen by Kiran S. M. (Patil).\n✅ Speed Post tracking consignment number provided within 24-48 hours.\n✅ Full support hotline: **+91 9604929702**.`,
        actions: [
          { label: 'Pay via PhonePe / UPI', actionType: 'tab', payload: 'buy' },
          { label: 'Talk to Support on WhatsApp', actionType: 'whatsapp', payload: '9604929702' }
        ]
      };
    }

    // 3. Payment, UPI, QR code, UTR
    if (q.includes('upi') || q.includes('pay') || q.includes('phonepe') || q.includes('gpay') || q.includes('google pay') || q.includes('paytm') || q.includes('scanner') || q.includes('utr') || q.includes('qr')) {
      return {
        reply: `💳 **Official UPI Payment Details:**\n\n- **Official UPI ID:** \`${shopConfig.upiId}\`\n- **Verified Account Name:** **${shopConfig.accountName}**\n- **Helpline Phone:** **9604929702**\n\n**Simple 3-Step Payment Guide:**\n1. Open PhonePe, Google Pay, or Paytm.\n2. Scan the official QR code in the **Buy Book** tab, or transfer directly to \`${shopConfig.upiId}\`.\n3. Copy the **12-digit UTR / UPI Reference ID** from your payment receipt and enter your address in the Buy Tab to confirm your order!`,
        actions: [
          { label: `Copy UPI: ${shopConfig.upiId}`, actionType: 'copy', payload: shopConfig.upiId },
          { label: 'Open UPI Checkout & QR', actionType: 'tab', payload: 'buy' },
          { label: 'Confirm on WhatsApp', actionType: 'whatsapp', payload: '9604929702' }
        ]
      };
    }

    // 4. Delivery, Shipping, Courier, Dispatch, Duration
    if (q.includes('deliver') || q.includes('shipping') || q.includes('dispatch') || q.includes('how many days') || q.includes('speed post') || q.includes('courier') || q.includes('time') || q.includes('reach')) {
      return {
        reply: `🚚 **Dispatch & Delivery Timeline:**\n\n- **Dispatch Time:** Books are packed and dispatched within **24 to 48 hours** of order placement.\n- **Delivery Duration:** Usually takes **3 to 5 business days** depending on your location across India.\n- **Courier Partner:** Government India Post **Speed Post** & insured express couriers for complete rural and metro coverage.\n- **Tracking:** Real-time consignment tracking number is updated in the **Orders** tab and shared via WhatsApp.`,
        actions: [
          { label: 'Track My Order', actionType: 'tab', payload: 'orders' },
          { label: 'Ask Helpline: 9604929702', actionType: 'whatsapp', payload: '9604929702' }
        ]
      };
    }

    // 5. Tracking, Order Status
    if (q.includes('track') || q.includes('status') || q.includes('where is my order') || q.includes('receipt') || q.includes('consignment')) {
      return {
        reply: `📦 **How to Track Your Order:**\n\n1. Go to the **Orders** tab from the top navigation or bottom bar.\n2. Enter your **Order ID** (e.g. TR-84920) or your registered **10-digit mobile number**.\n3. You will see real-time status stages:\n   - 🕒 **Submitted** (UTR recorded)\n   - 🛡️ **Confirmed** (Payment verified)\n   - 🚚 **Dispatched** (Speed Post Consignment # attached)\n   - 🎁 **Delivered**\n\nYou can also contact Kiran Sir's dispatch desk at **9604929702**.`,
        actions: [
          { label: 'Go to Orders Tab', actionType: 'tab', payload: 'orders' },
          { label: 'WhatsApp Order Desk', actionType: 'whatsapp', payload: '9604929702' }
        ]
      };
    }

    // 6. Book contents, Volumes, Difference, Pages, Bullets
    if (q.includes('volume') || q.includes('vol 1') || q.includes('vol 2') || q.includes('page') || q.includes('bullet') || q.includes('subject') || q.includes('content') || q.includes('specification') || q.includes('syllabus')) {
      return {
        reply: `📚 **Total Recall Masterwork Blueprint:**\n\n- **Total Pages:** 2,400+ across two massive volumes\n- **Golden Bullets:** 15,000+ high-yield exam points\n- **Subject MCQs:** 600+ questions with clinical rationales\n\n📘 **Volume 1 Subjects:**\n• Medical-Surgical Nursing (Cardio, Respiratory, Renal, Neuro, GI, Endo, MSK)\n• Nursing Foundations & Clinical Procedures\n• Pharmacology & Drug Dosage Calculations\n• Human Anatomy & Physiology, Genetics & Biochemistry\n\n📗 **Volume 2 Subjects:**\n• Obstetrics & Gynaecology (Midwifery & Labor)\n• Pediatric Nursing & Child Health\n• Community Health Nursing & Immunization\n• Psychiatric & Mental Health Nursing\n• Nursing Research, Management & General Aptitude`,
        actions: [
          { label: 'Inspect Full Book Cover Wrap', actionType: 'tab', payload: 'home' },
          { label: 'Read Free Samples', actionType: 'tab', payload: 'samples' }
        ]
      };
    }

    // 7. Author, Kiran Patil, Teacher, Mentor
    if (q.includes('author') || q.includes('kiran') || q.includes('patil') || q.includes('sir') || q.includes('who wrote') || q.includes('mentor')) {
      return {
        reply: `👨‍⚕️ **About Author Kiran S. M. (Patil):**\n\n**Kiran S. M. (Patil)** is a premier nursing competitive exam educator and mentor who has trained thousands of nursing officers across premier institutes including AIIMS, PGIMER, ESIC, and Railway hospitals.\n\nTotal Recall is the culmination of 5+ years of extensive research, analyzing past question patterns from 2015 to 2026.\n\n📞 **Official Helpline:** +91 9604929702\n✉️ **Email:** nirashachaudhari52@gmail.com`,
        actions: [
          { label: 'Call Kiran Sir: 9604929702', actionType: 'call', payload: '9604929702' },
          { label: 'WhatsApp Support', actionType: 'whatsapp', payload: '9604929702' },
          { label: 'View About Tab', actionType: 'tab', payload: 'about' }
        ]
      };
    }

    // 8. Target Exams: NORCET, ESIC, RRB, CHO, DSSSB
    if (q.includes('norcet') || q.includes('aiims') || q.includes('esic') || q.includes('rrb') || q.includes('railway') || q.includes('cho') || q.includes('dsssb') || q.includes('exam')) {
      return {
        reply: `🎯 **Exams Targeted by Total Recall:**\n\n1. **AIIMS NORCET (8 & 9):** Preliminary Screening & Mains Stage-2 image-based clinical scenarios.\n2. **ESIC Nursing Officer Exam:** Standard national syllabus with negative marking guidance.\n3. **RRB Staff Nurse:** Railway Medical Services nursing posts.\n4. **DSSSB, UPPSC, Rajasthan CHO, MP Vyapam, Kerala PSC:** Complete state nursing officer recruitment.\n5. **PGIMER, JIPMER, NIMHANS, MNS (Military Nursing Service)**.\n\nEvery subject includes golden recall memory points designed to prevent negative marking!`,
        actions: [
          { label: 'Start 20 Subject Quizzes', actionType: 'tab', payload: 'subject-quizzes' },
          { label: 'Order Book Set (₹1,499)', actionType: 'tab', payload: 'buy' }
        ]
      };
    }

    // 9. Quizzes, Tests, Practice, Daily Quiz
    if (q.includes('quiz') || q.includes('test') || q.includes('mcq') || q.includes('practice') || q.includes('daily') || q.includes('progress')) {
      return {
        reply: `📝 **Practice Tests & Quizzes in Total Recall Companion:**\n\n- **20 Subject Tests:** Practice 600+ MCQs covering all 20 book subjects with in-depth explanations.\n- **Progress Tracker:** The user dashboard tracks your completion progress across all 20 subjects.\n- **Daily Rapid Challenge:** 5 fresh MCQs every day to maintain your revision streak.\n- **Sample Chapters Quiz:** End-of-chapter test for each of the 7 sample chapters.`,
        actions: [
          { label: 'Go to 20 Subject Quizzes', actionType: 'tab', payload: 'subject-quizzes' },
          { label: 'Take Today\'s Rapid Quiz', actionType: 'tab', payload: 'daily-quiz' }
        ]
      };
    }

    // 10. Samples, Chapters, Free Preview
    if (q.includes('sample') || q.includes('preview') || q.includes('free') || q.includes('chapter') || q.includes('read')) {
      return {
        reply: `📖 **7 Free Sample Chapters Available Now:**\n\nYou can read 31 watermarked pages directly in this app across high-yield topics:\n1. Digestive System (GI Physiology & Disorders)\n2. Mechanism of Normal Labour & Stages\n3. Vital Signs & Clinical Assessments\n4. Drug Calculations & Critical Care Drips\n5. Fluid & Electrolyte Imbalances\n6. Psychiatric Disorders & Defense Mechanisms\n7. General Reasoning & Aptitude\n\nEach sample includes interactive review MCQs!`,
        actions: [
          { label: 'Open Free Samples Tab', actionType: 'tab', payload: 'samples' },
          { label: 'Order Complete Set', actionType: 'tab', payload: 'buy' }
        ]
      };
    }

    // 11. Support, Phone, Contact, Number, Helpline, WhatsApp
    if (q.includes('support') || q.includes('contact') || q.includes('helpline') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('whatsapp') || q.includes('help')) {
      return {
        reply: `📞 **Official Support Contacts:**\n\n- **Official Support Helpline:** **+91 9604929702**\n- **WhatsApp Support:** **9604929702** (Active 9 AM to 8 PM IST)\n- **Author & Mentor:** Kiran S. M. (Patil)\n- **Official Support Email:** \`nirashachaudhari52@gmail.com\`\n- **Official UPI ID:** \`${shopConfig.upiId}\` (${shopConfig.accountName})\n\nFeel free to call or WhatsApp anytime with any questions regarding book order, dispatch, or preparation guidance!`,
        actions: [
          { label: 'WhatsApp Helpline: 9604929702', actionType: 'whatsapp', payload: '9604929702' },
          { label: 'Call: 9604929702', actionType: 'call', payload: '9604929702' }
        ]
      };
    }

    // Fallback response with helpful guide
    return {
      reply: `Thank you for your enquiry! 😊\n\nRegarding: "${userQuery}"\n\n**Quick Highlights:**\n- **Total Recall Book:** 2 Volumes, 2,400+ pages, 15,000+ points by Kiran S. M. (Patil).\n- **Special Price:** ₹${shopConfig.setPrice} (Complete Set) with Free India Post Speed Post shipping.\n- **Payment:** Via UPI (\`${shopConfig.upiId}\`).\n- **Official Support Helpline:** **+91 9604929702**.\n\nWould you like to speak directly with Author Kiran Sir on WhatsApp or explore sample chapters?`,
      actions: [
        { label: 'Chat on WhatsApp: 9604929702', actionType: 'whatsapp', payload: '9604929702' },
        { label: 'Order Book Set (₹1,499)', actionType: 'tab', payload: 'buy' },
        { label: 'Read 7 Free Samples', actionType: 'tab', payload: 'samples' }
      ]
    };
  };

  /**
   * Gemini API enhancement for open-ended queries if GEMINI_API_KEY is configured.
   */
  const callGeminiOrFallback = async (query: string): Promise<{ reply: string; actions?: ChatAction[] }> => {
    const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are the official Enquiries Chatbot for "Total Recall: One Stop Solution for All Nursing Competitive Exams" (2026 Edition) authored by Kiran S. M. (Patil).
Official details:
- 2 Volumes set, 2,400+ pages, 15,000+ golden memory bullets, 600+ subject MCQs with clinical rationales.
- Price: Complete 2-Volume set is on offer at ₹${shopConfig.setPrice} (MRP ₹${shopConfig.setMrp}). Single volume ₹${shopConfig.vol1Price}. Free Speed Post delivery across India.
- Payment: Direct UPI ID: ${shopConfig.upiId} (Account Name: ${shopConfig.accountName}). Enter 12-digit UTR in the app's Buy tab.
- Dispatch: India Post Speed Post within 24-48 hours; delivery takes 3-5 working days.
- Target Exams: AIIMS NORCET 8 & 9, ESIC Nursing Officer, RRB Staff Nurse, DSSSB, State CHO, UPPSC, etc.
- Support Helpline Phone & WhatsApp: +91 9604929702. Support email: nirashachaudhari52@gmail.com.
Tone: Warm, encouraging, concise, highly professional nursing educator tone. Use markdown bullet points. Never hallucinate other websites or links.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nStudent/Buyer Enquiry: ${query}`,
        });

        if (response.text) {
          return {
            reply: response.text,
            actions: [
              { label: 'Order Set (₹1,499)', actionType: 'tab', payload: 'buy' },
              { label: 'WhatsApp Helpline: 9604929702', actionType: 'whatsapp', payload: '9604929702' },
              { label: 'Free Samples', actionType: 'tab', payload: 'samples' }
            ]
          };
        }
      } catch (err) {
        console.warn('Gemini API call skipped, using built-in knowledge base:', err);
      }
    }

    // Always fallback smoothly to knowledge base
    return getKnowledgeResponse(query);
  };

  const handleUserSubmit = async (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text) return;

    setInputVal('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await callGeminiOrFallback(text);
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallback = getKnowledgeResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallback.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: fallback.actions
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialBotGreeting]);
  };

  return (
    <>
      {/* Floating Launcher Button (Always visible on bottom right) */}
      {!showChatbot && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group">
          {/* Quick Tooltip / Prompt Badge */}
          <div 
            onClick={() => setShowChatbot(true)}
            className="hidden md:flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl cursor-pointer hover:border-amber-400 hover:text-amber-200 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Have Questions? Ask Support</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full font-mono">
              9604929702
            </span>
          </div>

          {/* Circular Pulse Button */}
          <button
            onClick={() => setShowChatbot(true)}
            aria-label="Open Enquiries Chatbot"
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-amber-200"
          >
            {/* Ambient Pulse Ring */}
            <span className="absolute -inset-1 rounded-2xl bg-amber-400/30 animate-ping pointer-events-none" />
            
            <MessageSquare className="w-7 h-7 stroke-[2.2] fill-slate-950/20" />
            
            {/* Online indicator dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </button>
        </div>
      )}

      {/* Main Chat Window Modal / Sheet */}
      {showChatbot && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] z-50 flex flex-col bg-slate-950 sm:bg-slate-900 border-0 sm:border border-slate-800 sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 p-4 flex items-center justify-between text-left flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/30">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white leading-tight">Total Recall Enquiries</h3>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Official
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant Answers • Kiran Sir's Desk</span>
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <a
                href="tel:9604929702"
                title="Call Helpline: 9604929702"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-emerald-950 hover:text-emerald-400 text-slate-300 flex items-center justify-center transition"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowChatbot(false)}
                title="Close Chat"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-300 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Helpline Ribbon */}
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-300 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">Official Helpline:</span>
              <a href="tel:9604929702" className="text-white font-bold hover:text-emerald-400 transition">
                +91 9604929702
              </a>
            </div>
            <a
              href="https://wa.me/919604929702?text=Hello%20Kiran%20Sir%2C%20I%20have%20an%20enquiry%20regarding%20Total%20Recall%20Nursing%20Book"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
            >
              <span>WhatsApp Chat</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {/* Message content formatting */}
                  <div className="whitespace-pre-line space-y-1.5">
                    {msg.text.split('\n\n').map((para, idx) => (
                      <p key={idx}>
                        {para.split('**').map((chunk, cIdx) => 
                          cIdx % 2 === 1 ? (
                            <strong key={cIdx} className={msg.sender === 'user' ? 'font-black' : 'font-bold text-amber-300'}>
                              {chunk}
                            </strong>
                          ) : (
                            chunk
                          )
                        )}
                      </p>
                    ))}
                  </div>

                  <div className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-slate-900/70 text-right' : 'text-slate-500 text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {/* In-chat action chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleActionClick(act)}
                        className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 hover:border-amber-500/50 flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                      >
                        {act.actionType === 'tab' && <ArrowRight className="w-3 h-3 text-amber-400" />}
                        {act.actionType === 'whatsapp' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                        {act.actionType === 'call' && <Phone className="w-2.5 h-2.5 text-emerald-400" />}
                        {act.actionType === 'copy' && <Copy className="w-2.5 h-2.5 text-teal-400" />}
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-2xl rounded-bl-none max-w-[200px] border border-slate-800">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[11px] text-slate-400">Assistant is replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Question Pills (Horizontal scrolling) */}
          <div className="bg-slate-950 border-t border-slate-800/80 p-2.5 space-y-2 flex-shrink-0">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="font-semibold text-slate-300">Regular Enquiries & Topics:</span>
              <span className="text-[10px] text-slate-500">Tap to ask</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {QUICK_TOPICS.map((topic, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => handleUserSubmit(topic.question)}
                  className="flex-shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-500/40 flex items-center gap-1.5 transition active:scale-95"
                >
                  <span>{topic.icon}</span>
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSubmit();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about book, order, UPI, exams..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition flex items-center justify-center flex-shrink-0 active:scale-95 shadow-md shadow-amber-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
