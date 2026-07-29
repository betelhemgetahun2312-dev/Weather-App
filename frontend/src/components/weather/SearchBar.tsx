'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <Input
          id="city-search"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (error) setError('');
          }}
          placeholder={placeholder}
          error={error}
          leftIcon={<span className="text-base">🔍</span>}
          aria-label="City name"
        />
      </div>
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        size="md"
        className="sm:mt-0"
      >
        Search
      </Button>
    </form>
  );
}
