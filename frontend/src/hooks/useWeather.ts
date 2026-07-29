'use client';

import { useState } from 'react';
import { WeatherData } from '@/types/weather';

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: implement fetch logic using apiClient

  return { data, loading, error };
}
