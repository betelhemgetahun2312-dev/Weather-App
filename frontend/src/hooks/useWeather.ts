'use client';

import { useState, useCallback } from 'react';
import { CurrentWeather, Units } from '@/types/weather';
import { fetchCurrentWeather, fetchWeatherByCoords } from '@/services/weather.service';

interface UseWeatherState {
  data: CurrentWeather | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const getWeather = useCallback(async (city: string, units: Units = 'metric') => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchCurrentWeather(city, units);
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  const getWeatherByCoords = useCallback(async (lat: number, lon: number, units: Units = 'metric') => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchWeatherByCoords(lat, lon, units);
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather';
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  return { ...state, getWeather, getWeatherByCoords };
}
