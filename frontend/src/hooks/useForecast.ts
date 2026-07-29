'use client';

import { useState, useCallback } from 'react';
import { ForecastData, Units } from '@/types/weather';
import { fetchForecast, fetchForecastByCoords } from '@/services/weather.service';

interface UseForecastState {
  data: ForecastData | null;
  loading: boolean;
  error: string | null;
}

export function useForecast() {
  const [state, setState] = useState<UseForecastState>({
    data: null,
    loading: false,
    error: null,
  });

  const getForecast = useCallback(async (city: string, units: Units = 'metric') => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchForecast(city, units);
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch forecast';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  const getForecastByCoords = useCallback(async (lat: number, lon: number, units: Units = 'metric') => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchForecastByCoords(lat, lon, units);
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch forecast';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  return { ...state, getForecast, getForecastByCoords };
}
