'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'weatherdash_recent_searches';
const MAX_ITEMS = 5;

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function save(cities: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setRecents(load());
  }, []);

  const addRecent = useCallback((city: string) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setRecents((prev) => {
      const deduped = prev.filter((c) => c.toLowerCase() !== trimmed.toLowerCase());
      const next = [trimmed, ...deduped].slice(0, MAX_ITEMS);
      save(next);
      return next;
    });
  }, []);

  const clearRecents = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecents([]);
  }, []);

  return { recents, addRecent, clearRecents };
}
