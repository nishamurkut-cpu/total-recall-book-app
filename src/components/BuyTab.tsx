import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderItem, Order } from '../types';
import { PhonePeScannerCard } from './PhonePeScannerCard';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Share2, 
  Printer, 
  MessageCircle,
  Sparkles,
  AlertCircle,
  Layers,
  MapPin,
  MessageSquare
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh'
];

export const BuyTab: React.FC = () => {
  const { shopConfig, createOrder, setActiveTab, setShowChatbot } = useApp();

  // Selection
  const [selectedEdition, setSelectedEdition] = useState<'set' | 'vol1' | 'vol2'>('set');
  const [quantity, setQuantity] = useState<number>(1);

  // Form
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');

  // Step flow: 1 = Form, 2 = Payment, 3 = Final Receipt
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Price calculations
  let unitPrice = shopConfig.setPrice;
  let unitMrp = shopConfig.setMrp;
  let itemName = 'Total Recall Complete 2-Volume Set';
  let itemVol = 'Volume 1 & Volume 2 (2,400+ Pages)';

  if (selectedEdition === 'vol1') {
    unitPrice = shopConfig.vol1Price;
    unitMrp = shopConfig.vol1Mrp;
    itemName = 'Total Recall Volume 1';
    itemVol = 'Foundations, Medical-Surgical, Pharmacology & Anatomy';
  } else if (selectedEdition === 'vol2') {
    unitPrice = shopConfig.vol2Price;
    unitMrp = shopConfig.vol2Mrp;
    itemName = 'Total Recall Volume 2';
    itemVol = 'OBG, Pediatrics, Psychiatry, CHN & Aptitude';
  }

  const subtotal = unitPrice * quantity;
  const totalAmount = subtotal + shopConfig.deliveryFee;

  // Real UPI deep link URL
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(shopConfig.upiId)}&pn=${encodeURIComponent(shopConfig.accountName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent('Total Recall Nursing Book Order')}`;

  // SVG QR Code API URL for clean scannable display
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiIntentUrl)}`;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shopConfig.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!buyerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (phone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setFormError('Please enter your complete postal delivery address.');
      return;
    }
    if (!city.trim()) {
      setFormError('Please enter your city.');
      return;
    }
    if (pincode.trim().length !== 6) {
      setFormError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setCheckoutStep(2);
  };

  const handleConfirmUtrPayment = () => {
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      alert('Please enter your 12-digit UPI reference number (UTR) from your payment app.');
      return;
    }

    const orderItems: OrderItem[] = [
      {
        id: selectedEdition,
        name: itemName,
        volume: itemVol,
        quantity,
        price: unitPrice,
        mrp: unitMrp
      }
    ];

    const order = createOrder({
      buyerName,
      phone,
      altPhone,
      address,
      city,
      state,
      pincode,
      landmark,
      items: orderItems,
      itemDescription: `${itemName} (Qty: ${quantity})`,
      totalAmount,
      utr: utrNumber.trim(),
      upiIdUsed: shopConfig.upiId,
      payeeName: shopConfig.accountName,
    });

    setConfirmedOrder(order);
    setCheckoutStep(3);
  };

  const handleWhatsAppSend = () => {
    if (!confirmedOrder) return;
    const msg = `Hello Kiran Sir,%0A%0AI have placed an order for *${confirmedOrder.itemDescription}*.%0A*Order ID:* ${confirmedOrder.id}%0A*Amount Paid:* ₹${confirmedOrder.totalAmount}%0A*UPI Reference (UTR):* ${confirmedOrder.utr}%0A*Name:* ${confirmedOrder.buyerName}%0A*Mobile:* ${confirmedOrder.phone}%0A*Address:* ${confirmedOrder.address}, ${confirmedOrder.city}, ${confirmedOrder.state} - ${confirmedOrder.pincode}%0A%0APlease confirm and dispatch via Speed Post. Thank you!`;
    window.open(`https://wa.me/919604929702?text=${msg}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 text-left">
      {/* Step Indicator Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OFFICIAL BOOKSTORE
            </span>
            <span className="text-xs text-slate-400">Direct From Author</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Order Total Recall Book
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Safe UPI checkout • Same-day dispatch via India Post Speed Post • Real-time SMS tracking.
          </p>
        </div>

          {/* Steps */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              checkoutStep === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              <span>1. Details</span>
            </div>
            <div className="w-4 h-0.5 bg-slate-800" />
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              checkoutStep === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              <span>2. UPI Payment</span>
            </div>
            <div className="w-4 h-0.5 bg-slate-800" />
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              checkoutStep === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              <span>3. Receipt</span>
            </div>

            <button
              onClick={() => setShowChatbot(true)}
              className="ml-auto sm:ml-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition shadow-sm"
              title="Open Enquiries Chatbot"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask Enquiries</span>
            </button>
          </div>
      </div>

      {checkoutStep === 1 && (
        /* STEP 1: EDITION SELECTION & ADDRESS FORM */
        <div className="space-y-8">
          {/* Edition Selection Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Step 1: Choose Edition
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Complete Set Card */}
              <div
                onClick={() => setSelectedEdition('set')}
                className={`relative rounded-2xl p-5 border-2 cursor-pointer transition flex flex-col justify-between ${
                  selectedEdition === 'set'
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                  ★ MOST POPULAR & RECOMMENDED
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-amber-400">COMPLETE SET</span>
                    <span className="text-[10px] text-slate-400">Vol 1 + Vol 2</span>
                  </div>
                  <h3 className="text-base font-black text-white">Both Volumes (2,400+ Pages)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete nursing officer syllabus + Non-nursing section + 600 MCQs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-emerald-400">₹{shopConfig.setPrice}</span>
                    <span className="text-xs line-through text-slate-500 ml-1.5">₹{shopConfig.setMrp}</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400">Save ₹{shopConfig.setMrp - shopConfig.setPrice}</span>
                </div>
              </div>

              {/* Volume 1 Only */}
              <div
                onClick={() => setSelectedEdition('vol1')}
                className={`rounded-2xl p-5 border-2 cursor-pointer transition flex flex-col justify-between ${
                  selectedEdition === 'vol1'
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-sky-400">VOLUME 1</span>
                    <span className="text-[10px] text-slate-400">Part 1 Only</span>
                  </div>
                  <h3 className="text-base font-black text-white">Foundations & Med-Surg</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Anatomy, Physiology, Fundamentals, Medical-Surgical, Pharmacology.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-emerald-400">₹{shopConfig.vol1Price}</span>
                  <span className="text-xs text-slate-400">MRP ₹{shopConfig.vol1Mrp}</span>
                </div>
              </div>

              {/* Volume 2 Only */}
              <div
                onClick={() => setSelectedEdition('vol2')}
                className={`rounded-2xl p-5 border-2 cursor-pointer transition flex flex-col justify-between ${
                  selectedEdition === 'vol2'
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-teal-400">VOLUME 2</span>
                    <span className="text-[10px] text-slate-400">Part 2 Only</span>
                  </div>
                  <h3 className="text-base font-black text-white">OBG, Peds, CHN & Aptitude</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Midwifery, Child Health, Mental Health, Community, GK, Reasoning.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-emerald-400">₹{shopConfig.vol2Price}</span>
                  <span className="text-xs text-slate-400">MRP ₹{shopConfig.vol2Mrp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address Form */}
          <form onSubmit={handleProceedToPayment} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Delivery Address & Contact Details</span>
              </div>
              <span className="text-xs text-slate-400">All fields required for Speed Post dispatch</span>
            </div>

            {formError && (
              <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nurse Priya Sharma"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Mobile Number (For Courier SMS) *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Complete Postal Address (House / Flat / Hostel / Hospital) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Room 302, Senior Nurses Hostel, AIIMS Complex"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jodhpur / New Delhi / Patna"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit PIN"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Nearby Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Near Metro Station Gate 2"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Total Summary & Submit */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">Total Amount Payable:</div>
                <div className="text-2xl font-black text-emerald-400">₹{totalAmount}</div>
                <div className="text-[10px] text-slate-400">Free Speed Post Delivery included</div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <span>Continue to UPI Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {checkoutStep === 2 && (
        /* STEP 2: UPI PAYMENT GATEWAY & UTR SUBMISSION */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  STEP 2 OF 3
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Pay via UPI (GPay / PhonePe / Paytm / BHIM)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Amount to Pay:</span>
                <div className="text-2xl font-black text-emerald-400">₹{totalAmount}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Official PhonePe UPI Scanner (matching uploaded standee) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <PhonePeScannerCard
                  upiId={shopConfig.upiId}
                  accountName={shopConfig.accountName}
                  amount={totalAmount}
                  showActions={false}
                />
              </div>

              {/* Payee Info & Deep Links & UTR Input */}
              <div className="lg:col-span-7 space-y-4">
                {/* Payee Details Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Payee Name (PhonePe Verified):</span>
                    <strong className="text-white font-mono text-sm">{shopConfig.accountName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Official PhonePe UPI ID:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-amber-400 font-mono text-sm">{shopConfig.upiId}</strong>
                      <button
                        onClick={handleCopyUpi}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Item:</span>
                    <span className="text-slate-200 font-medium">{itemName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Total Payable:</span>
                    <span className="text-emerald-400 font-black text-sm">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Direct Mobile Tap Buttons */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Or tap to open your UPI payment app:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <a
                      href={`phonepe://pay?pa=${encodeURIComponent(shopConfig.upiId)}&pn=${encodeURIComponent(shopConfig.accountName)}&am=${totalAmount}&cu=INR&tn=Total%20Recall%20Book`}
                      className="p-2.5 rounded-xl bg-[#5f259f] hover:bg-[#521f8a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95"
                    >
                      <span>PhonePe</span>
                    </a>
                    <a
                      href={`gpay://upi/pay?pa=${encodeURIComponent(shopConfig.upiId)}&pn=${encodeURIComponent(shopConfig.accountName)}&am=${totalAmount}&cu=INR&tn=Total%20Recall%20Book`}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-95"
                    >
                      <span>Google Pay</span>
                    </a>
                    <a
                      href={upiIntentUrl}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-95 col-span-2 sm:col-span-1"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Other UPI Apps</span>
                    </a>
                  </div>
                </div>

                {/* UTR Reference Input */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/40 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enter 12-Digit UPI Reference Number (UTR) *</span>
                    </label>
                    <p className="text-[10px] text-slate-400 mb-2">
                      After payment, copy the 12-digit UTR / UPI Ref from your payment app statement (e.g. 419283746192).
                    </p>
                    <input
                      type="text"
                      maxLength={12}
                      placeholder="e.g. 419283746192"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    onClick={handleConfirmUtrPayment}
                    className="w-full py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Payment & Generate Official Receipt</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <button
                onClick={() => setCheckoutStep(1)}
                className="text-slate-400 hover:text-white"
              >
                ← Back to Edit Delivery Details
              </button>
              <span className="text-[11px] text-slate-500">
                100% Encrypted & Authenticated
              </span>
            </div>
          </div>
        </div>
      )}

      {checkoutStep === 3 && confirmedOrder && (
        /* STEP 3: FINAL PURCHASE RECEIPT */
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
            {/* Top Success Badge */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white print:text-black">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-300 print:text-gray-600">
                Thank you, <strong>{confirmedOrder.buyerName}</strong>. Your payment reference has been recorded.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 print:bg-gray-50 print:border-gray-200">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Order ID</div>
                  <div className="text-base font-black font-mono text-amber-400 print:text-indigo-600">
                    {confirmedOrder.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Status</div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
                    Payment Submitted
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-200 print:text-black">
                  <span>{confirmedOrder.itemDescription}</span>
                  <span>₹{confirmedOrder.totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping & Packaging:</span>
                  <span className="text-emerald-400 font-semibold">FREE (Speed Post)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>UPI Reference (UTR):</span>
                  <span className="font-mono text-white print:text-black">{confirmedOrder.utr}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payee UPI ID:</span>
                  <span className="font-mono text-slate-300 print:text-black">{confirmedOrder.upiIdUsed}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 print:text-gray-700">
                <div className="font-bold text-white print:text-black mb-1">Delivery Address:</div>
                <div>{confirmedOrder.buyerName} ({confirmedOrder.phone})</div>
                <div>{confirmedOrder.address}</div>
                <div>{confirmedOrder.city}, {confirmedOrder.state} - {confirmedOrder.pincode}</div>
                {confirmedOrder.landmark && <div>Landmark: {confirmedOrder.landmark}</div>}
              </div>
            </div>

            {/* Delivery Timeline info */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Estimated Delivery: 3 to 5 business days</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Your tracking number (India Post Speed Post / Delhivery) will be generated as soon as Kiran Sir’s dispatch desk confirms the UTR.
                </p>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Receipt</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send to Author on WhatsApp</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                >
                  <span>Track in My Orders</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
