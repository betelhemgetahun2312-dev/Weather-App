'use client';

import { useState, FormEvent, useId } from 'react';
import { Search } from 'lucide-react';
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
  placeholder = 'Search city… e.g. London',
}: SearchBarProps) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const errorId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name');
      return;
    }
    if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed)) {
      setError('Only letters, spaces, hyphens, or apostrophes allowed');
      return;
    }
    setError('');
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            aria-hidden="true"
          />
          <input
            id="city-search"
            type="search"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (error) setError('');
            }}
            placeholder={placeholder}
            aria-label="City name"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            autoComplete="off"
            className={cn(
              'w-full rounded-xl border bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white',
              'placeholder:text-white/35 backdrop-blur-sm',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2',
              error
                ? 'border-red-400/60 focus-visible:ring-red-400/40'
                : 'border-white/20 focus-visible:border-blue-400/60 focus-visible:ring-blue-400/30'
            )}
          />
        </div>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          size="md"
          className="shrink-0 rounded-xl px-5"
        >
          Search
        </Button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-left text-xs text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
