import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyNote } from '../types';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Calendar, 
  Clock, 
  Tag, 
  Flame, 
  Plus, 
  Trash2, 
  Check, 
  Share2,
  Sparkles
} from 'lucide-react';

// Custom Markdown Renderer for Total Recall Daily Notes
export const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  const parseInline = (text: string): React.ReactNode[] => {
    // Split by highlight ==...== first, then bold **...**
    const parts: React.ReactNode[] = [];
    const highlightRegex = /(==.*?==)/g;
    const tokens = text.split(highlightRegex);

    tokens.forEach((token, idx) => {
      if (token.startsWith('==') && token.endsWith('==')) {
        const inner = token.slice(2, -2);
        parts.push(
          <mark 
            key={`mark-${idx}`} 
            className="bg-amber-400/20 text-amber-200 border-b border-amber-400/50 px-1 py-0.5 rounded font-semibold"
          >
            {renderBold(inner, `mark-bold-${idx}`)}
          </mark>
        );
      } else {
        parts.push(renderBold(token, `bold-${idx}`));
      }
    });

    return parts;
  };

  const renderBold = (text: string, keyPrefix: string): React.ReactNode => {
    const boldParts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={keyPrefix}>
        {boldParts.map((sub, sIdx) => {
          if (sub.startsWith('**') && sub.endsWith('**')) {
            return (
              <strong key={`${keyPrefix}-${sIdx}`} className="text-white font-bold">
                {sub.slice(2, -2)}
              </strong>
            );
          }
          return sub;
        })}
      </span>
    );
  };

  return (
    <div className="space-y-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-lg sm:text-xl font-black text-white pt-2 pb-1 border-b border-slate-800">
              {trimmed.substring(2)}
            </h2>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-sm sm:text-base font-bold text-amber-400 pt-2 pb-0.5">
              {trimmed.substring(3)}
            </h3>
          );
        }

        if (trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span>{parseInline(trimmed.substring(2))}</span>
            </div>
          );
        }

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          // Quick render for simple markdown tables
          return (
            <div key={idx} className="bg-slate-950/60 p-2 rounded border border-slate-800 font-mono text-xs overflow-x-auto my-1">
              {trimmed}
            </div>
          );
        }

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        return <p key={idx}>{parseInline(line)}</p>;
      })}
    </div>
  );
};

export const DailyNotesTab: React.FC = () => {
  const { dailyNotes, bookmarks, toggleBookmark, isAdmin, deleteDailyNote, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(dailyNotes.flatMap(n => n.tags || [])));

  const filteredNotes = dailyNotes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleShare = (note: DailyNote) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`*Total Recall 2026 Daily Note*\n\n${note.title}\n\n${note.content}`);
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* Title & Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">Daily High-Yield Notes</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
              {dailyNotes.length} Notes Available
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Handcrafted clinical pearls, rapid memory recall points, and NORCET-tested concepts.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Daily Note</span>
          </button>
        )}
      </div>

      {/* Search and Tag Filters */}
      <div className="space-y-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by disease, drug, formula or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedTag === null
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Topics
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                selectedTag === tag
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
            No daily notes found matching your search.
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isBookmarked = bookmarks.includes(note.id);

            return (
              <article
                key={note.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4 hover:border-slate-700 transition relative overflow-hidden"
              >
                {note.isGolden && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {note.isGolden && (
                        <span className="flex items-center gap-1 text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>Golden Point</span>
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        {note.subject}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{note.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{note.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white pt-1">
                      {note.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleShare(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Copy note text to clipboard"
                    >
                      {copiedId === note.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleBookmark(note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => deleteDailyNote(note.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950 transition"
                        title="Delete Note (Admin)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Markdown Body */}
                <div className="pt-1">
                  <RenderMarkdown content={note.content} />
                </div>

                {/* Tags Footer */}
                {note.tags && note.tags.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] text-slate-500 font-medium mr-1">Tags:</span>
                    {note.tags.map(t => (
                      <span
                        key={t}
                        onClick={() => setSelectedTag(t)}
                        className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 hover:text-amber-300 border border-slate-800 cursor-pointer transition"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
