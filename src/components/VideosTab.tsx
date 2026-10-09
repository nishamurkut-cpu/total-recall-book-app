import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoItem } from '../types';
import { Video, Play, Clock, User, Trash2, ExternalLink, Sparkles, Plus } from 'lucide-react';

export const VideosTab: React.FC = () => {
  const { videos, isAdmin, deleteVideo, setActiveTab } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">Video Masterclasses</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
              {videos.length} Lectures
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Unlisted clinical video explanations and Total Recall book orientations.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Video (Admin)</span>
          </button>
        )}
      </div>

      {/* Video Modal or Player */}
      {selectedVideo && (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {selectedVideo.subject}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">{selectedVideo.title}</h3>
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition"
            >
              Close Video
            </button>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Instructor: {selectedVideo.instructor}</span>
            </div>
            <p className="text-slate-400 leading-relaxed pt-1">
              {selectedVideo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Video Grid or Blank State */}
      {videos.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Video className="w-8 h-8 stroke-1 text-slate-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">No Videos Published Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Video masterclasses, crash courses, and unlisted YouTube lectures published from the Admin panel will appear here.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
            >
              Add Video Lecture
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition flex flex-col justify-between group"
            >
              {/* Thumbnail */}
              <div 
                onClick={() => setSelectedVideo(vid)}
                className="relative aspect-video bg-slate-950 cursor-pointer overflow-hidden"
              >
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {vid.subject}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-amber-300 transition">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {vid.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">By {vid.instructor}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedVideo(vid)}
                      className="font-bold text-amber-400 hover:text-amber-300"
                    >
                      Watch Now
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => deleteVideo(vid.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete Video (Admin)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
