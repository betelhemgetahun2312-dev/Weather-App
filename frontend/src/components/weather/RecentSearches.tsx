'use client';

import { Clock, X } from 'lucide-react';

interface RecentSearchesProps {
  recents: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export default function RecentSearches({ recents, onSelect, onClear }: RecentSearchesProps) {
  if (recents.length === 0) return null;

  return (
    <nav aria-label="Recent searches" className="mt-3 flex flex-wrap items-center justify-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
        Recent
      </span>

      {recents.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          aria-label={`Search again for ${city}`}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm transition-all duration-150 hover:border-blue-400/40 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
        >
          <Clock size={11} aria-hidden="true" className="text-white/40" />
          {city}
        </button>
      ))}

      <button
        onClick={onClear}
        aria-label="Clear all recent searches"
        className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-white/25 transition hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
      >
        <X size={11} aria-hidden="true" />
        clear
      </button>
    </nav>
  );
}
