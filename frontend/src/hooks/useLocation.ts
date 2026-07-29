'use client';

import { useState, useCallback } from 'react';
import { LocationResult } from '@/types/weather';
import { fetchLocation } from '@/services/weather.service';

interface UseLocationState {
  data: LocationResult[];
  loading: boolean;
  error: string | null;
}

export function useLocation() {
  const [state, setState] = useState<UseLocationState>({
    data: [],
    loading: false,
    error: null,
  });

  const getLocation = useCallback(async (city: string, limit = 5) => {
    setState({ data: [], loading: true, error: null });
    try {
      const data = await fetchLocation(city, limit);
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch location';
      setState({ data: [], loading: false, error: message });
    }
  }, []);

  return { ...state, getLocation };
}
