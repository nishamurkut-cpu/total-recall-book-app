import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageCircle, 
  Printer, 
  ShoppingBag,
  Sparkles,
  MapPin
} from 'lucide-react';

const STATUS_ORDER: OrderStatus[] = ['Submitted', 'Confirmed', 'Dispatched', 'Delivered'];

export const MyOrdersTab: React.FC = () => {
  const { orders, setActiveTab } = useApp();
  const [lookupQuery, setLookupQuery] = useState('');
  const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => {
    if (!lookupQuery.trim()) return true;
    const q = lookupQuery.toLowerCase().trim();
    return o.id.toLowerCase().includes(q) || o.phone.includes(q) || o.utr.includes(q);
  });

  const handleCopyTracking = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedTrackingId(code);
      setTimeout(() => setCopiedTrackingId(null), 2000);
    }
  };

  const getStatusIndex = (st: OrderStatus): number => {
    return STATUS_ORDER.indexOf(st);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DISPATCH & TRACKING
            </span>
            <span className="text-xs text-slate-400">Real-Time Delivery Status</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            My Book Orders
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Check payment verification status, speed post tracking numbers, and delivery timeline.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-2">
            <span>Official Helpline:</span>
            <a href="tel:9604929702" className="underline hover:text-emerald-300">+91 9604929702</a>
            <span>•</span>
            <a href="https://wa.me/919604929702" target="_blank" rel="noreferrer" className="underline hover:text-emerald-300">WhatsApp Chat</a>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('buy')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>New Order</span>
        </button>
      </div>

      {/* Order Lookup Search */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order ID (e.g. TR-2026-9281) or 10-digit mobile number..."
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Orders Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                You haven't placed an order yet or no orders match your search query.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('buy')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
            >
              Order Total Recall Book
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const currentIdx = getStatusIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl transition"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-amber-400">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Placed: {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {order.itemDescription}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Amount Paid:</span>
                    <span className="text-base font-black text-emerald-400">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Status Stepper Timeline */}
                <div className="space-y-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Current Dispatch Status:
                  </div>

                  <div className="grid grid-cols-4 gap-2 relative">
                    {STATUS_ORDER.map((st, sIdx) => {
                      const isPastOrCurrent = sIdx <= currentIdx;
                      const isCurrent = sIdx === currentIdx;

                      return (
                        <div key={st} className="flex flex-col items-center text-center space-y-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                              : isPastOrCurrent
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {isPastOrCurrent ? <CheckCircle2 className="w-4 h-4" /> : sIdx + 1}
                          </div>
                          <span className={`text-[11px] font-bold ${
                            isCurrent ? 'text-amber-400' : isPastOrCurrent ? 'text-slate-200' : 'text-slate-500'
                          }`}>
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dispatch Tracking & Note (If Dispatched) */}
                {order.trackingNumber && (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold">
                        <Truck className="w-4 h-4" />
                        <span>Tracking Number ({order.courierPartner || 'India Post Speed Post'}):</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-white bg-slate-950 px-2.5 py-1 rounded border border-emerald-800">
                          {order.trackingNumber}
                        </span>
                        <button
                          onClick={() => handleCopyTracking(order.trackingNumber!)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Copy tracking code"
                        >
                          {copiedTrackingId === order.trackingNumber ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {order.adminNote && (
                      <p className="text-slate-300 text-[11px] pt-1">
                        Note: {order.adminNote}
                      </p>
                    )}

                    <div className="pt-1">
                      <a
                        href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Open India Post Online Tracking Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Order Details Footer */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Delivery to:</strong> {order.buyerName} ({order.phone}) • {order.address}, {order.city}, {order.state} - {order.pincode}
                    </div>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    UTR / UPI Reference: <span className="font-mono text-slate-200">{order.utr}</span> • Payee: <span className="text-slate-200">{order.payeeName}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={`https://wa.me/919604929702?text=Hi%20Kiran%20Sir%2C%20checking%20status%20for%20order%20${order.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Contact Dispatch on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
