import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Smartphone } from 'lucide-react';

interface PhonePeScannerCardProps {
  upiId?: string;
  accountName?: string;
  amount?: number;
  showActions?: boolean;
}

export const PhonePeScannerCard: React.FC<PhonePeScannerCardProps> = ({
  upiId = '8766492530-3@ybl',
  accountName = 'KIRAN SURESH MURKUT',
  amount,
  showActions = true,
}) => {
  const [copied, setCopied] = useState(false);

  const qrData = amount 
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(accountName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Total Recall Nursing Book')}`
    : `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(accountName)}&cu=INR`;

  // QR code API for high-resolution scannable code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrData)}&margin=1`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Official PhonePe Standee Card matching user uploaded image */}
      <div 
        id="phonepe-official-standee"
        className="w-full max-w-[340px] sm:max-w-[360px] bg-black text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800 flex flex-col items-center justify-between text-center select-none relative overflow-hidden transition-all hover:border-purple-500/40"
      >
        {/* Subtle purple ambient lighting */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#5f259f]/20 to-transparent pointer-events-none" />

        {/* Top PhonePe Brand Header */}
        <div className="space-y-3 pt-2 z-10 w-full">
          {/* Logo + Brand Name */}
          <div className="flex items-center justify-center gap-2.5">
            {/* PhonePe 'पे' Circular Icon */}
            <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center shadow-lg shadow-[#5f259f]/30 flex-shrink-0">
              <span className="text-white font-extrabold text-2xl leading-none font-serif select-none" style={{ transform: 'translateY(-1px)' }}>
                पे
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-sans">
              PhonePe
            </span>
          </div>

          {/* Subtitles matching the uploaded graphic */}
          <div className="space-y-1">
            <div className="text-xs sm:text-sm font-extrabold text-[#9353d3] tracking-widest uppercase">
              ACCEPTED HERE
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-100">
              Scan & Pay Using PhonePe App
            </div>
          </div>
        </div>

        {/* Center QR Code with 'पे' Icon Center-piece */}
        <div className="my-5 p-2 bg-white rounded-2xl shadow-2xl relative flex items-center justify-center z-10">
          <img
            src={qrCodeUrl}
            alt="PhonePe UPI QR Scanner - Kiran Suresh Murkut"
            className="w-56 h-56 sm:w-60 sm:h-60 object-contain rounded-xl"
            loading="eager"
          />

          {/* Center PhonePe 'पे' Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#5f259f] flex items-center justify-center">
                <span className="text-white font-black text-xl leading-none font-serif">
                  पे
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payee Name exactly from uploaded standee */}
        <div className="space-y-1 z-10 w-full">
          <div className="text-sm sm:text-base font-black tracking-wider uppercase text-white font-sans">
            {accountName}
          </div>
          <div className="text-xs font-mono text-purple-300 font-semibold">
            {upiId}
          </div>
        </div>

        {/* Bottom PhonePe Legal Notice */}
        <div className="mt-5 pt-3 border-t border-white/10 w-full z-10 text-[10px] text-slate-400 leading-snug">
          © 2026, All rights reserved, PhonePe Ltd (Formerly known as &lsquo;PhonePe Private Ltd&rsquo;)
        </div>
      </div>

      {/* Action helpers */}
      {showActions && (
        <div className="w-full max-w-[360px] mt-4 space-y-2">
          {/* Copy UPI ID */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs">
            <div className="truncate mr-2">
              <span className="text-slate-400 text-[10px] block">UPI ID:</span>
              <span className="font-mono font-bold text-amber-400 truncate">{upiId}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 flex-shrink-0 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy UPI</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Pay Links for Mobile */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(accountName)}&cu=INR${amount ? `&am=${amount}` : ''}`}
              className="py-2.5 px-3 rounded-xl bg-[#5f259f] hover:bg-[#521f8a] text-white font-bold flex items-center justify-center gap-1.5 shadow transition active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Open PhonePe</span>
            </a>
            <a
              href={qrData}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition active:scale-95"
            >
              <span>Any UPI App</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
