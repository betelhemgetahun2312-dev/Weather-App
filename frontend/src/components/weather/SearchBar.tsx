'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  loading = false,
  placeholder = 'Search city... e.g. London',
}: SearchBarProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name');
      return;
    }
    if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed)) {
      setError('City name can only contain letters, spaces, hyphens, or apostrophes');
      return;
    }
    setError('');
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            id="city-search"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (error) setError('');
            }}
            placeholder={placeholder}
            aria-label="City name"
            className={cn(
              'w-full rounded-xl border bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-400 shadow-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2',
              error
                ? 'border-red-400 focus:ring-red-400/30'
                : 'border-white/20 focus:border-blue-400 focus:ring-blue-400/30'
            )}
          />
        </div>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          size="md"
          className="shrink-0 rounded-xl px-6"
        >
          Search
        </Button>
      </div>
      {error && (
        <p className="text-left text-xs text-red-400">{error}</p>
      )}
    </form>
  );
}
