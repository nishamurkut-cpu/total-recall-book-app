import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClinicalImage } from '../types';
import { Image as ImageIcon, ZoomIn, X, Trash2, Plus, Sparkles, Tag } from 'lucide-react';

export const ImagesTab: React.FC = () => {
  const { images, isAdmin, deleteImage, setActiveTab } = useApp();
  const [selectedImg, setSelectedImg] = useState<ClinicalImage | null>(null);

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">Clinical Mnemonics & Charts</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
              {images.length} Charts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Watermarked high-yield algorithms, anatomical charts, and memory mnemonics.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Image (Admin)</span>
          </button>
        )}
      </div>

      {/* Image Grid or Blank State */}
      {images.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8 stroke-1 text-slate-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">No Clinical Charts Uploaded Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Clinical charts, ECG strips, resuscitation algorithms, and high-yield mnemonics uploaded from the Admin panel will appear here.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
            >
              Upload Clinical Chart
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col justify-between group"
            >
              {/* Image Preview with Watermark */}
              <div 
                onClick={() => setSelectedImg(img)}
                className="relative aspect-[16/10] bg-slate-950 cursor-pointer overflow-hidden"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />

                {/* Automatic Copyright Watermark Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="rotate-[-20deg] text-center select-none opacity-25">
                    <div className="text-xs sm:text-sm font-black text-white tracking-widest uppercase">
                      TOTAL RECALL 2026 • KIRAN S.M. (PATIL)
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  {img.category}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition">
                    {img.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {img.description}
                  </p>
                </div>

                {/* Tags and Admin delete */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {img.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="Delete Image (Admin)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  {selectedImg.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">{selectedImg.title}</h3>
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[60vh] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={selectedImg.imageUrl}
                alt={selectedImg.title}
                className="max-h-full max-w-full object-contain"
              />
              {/* Burnt in watermark */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center rotate-[-15deg]">
                <span className="text-xs sm:text-sm font-black text-white/30 uppercase tracking-widest text-center px-4">
                  TOTAL RECALL 2026 • AUTHOR: KIRAN S.M. (PATIL) • WATERMARKED SAMPLE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {selectedImg.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
