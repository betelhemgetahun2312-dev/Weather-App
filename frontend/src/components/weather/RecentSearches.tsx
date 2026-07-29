'use client';

interface RecentSearchesProps {
  recents: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export default function RecentSearches({ recents, onSelect, onClear }: RecentSearchesProps) {
  if (recents.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
      <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Recent:</span>
      {recents.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-150 hover:border-blue-400/50 hover:bg-white/20 hover:text-white"
        >
          🕐 {city}
        </button>
      ))}
      <button
        onClick={onClear}
        aria-label="Clear recent searches"
        className="rounded-full px-2 py-1 text-xs text-white/30 transition hover:text-red-400"
      >
        ✕ clear
      </button>
    </div>
  );
}
