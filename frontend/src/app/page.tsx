'use client';

import { useState, useCallback } from 'react';
import { Units } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useForecast } from '@/hooks/useForecast';
import SearchBar from '@/components/weather/SearchBar';
import WeatherResult from '@/components/weather/WeatherResult';

export default function HomePage() {
  const [lastCity, setLastCity] = useState<string>('');
  const [units] = useState<Units>('metric');

  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
    getWeather,
  } = useWeather();

  const {
    data: forecast,
    loading: forecastLoading,
    error: forecastError,
    getForecast,
  } = useForecast();

  const handleSearch = useCallback(
    (city: string) => {
      setLastCity(city);
      getWeather(city, units);
      getForecast(city, units);
    },
    [getWeather, getForecast, units]
  );

  const handleRetry = useCallback(() => {
    if (lastCity) handleSearch(lastCity);
  }, [lastCity, handleSearch]);

  const isLoading = weatherLoading || forecastLoading;
  const hasResult = weather || forecast || weatherError || forecastError || isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero search bar */}
      <section className="px-4 pb-8 pt-14 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-5xl">🌤️</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Weather Dashboard
          </h1>
          <p className="mt-3 text-base text-slate-400">
            Real-time weather for any city in the world.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar
              onSearch={handleSearch}
              loading={isLoading}
              placeholder="Search city... e.g. London, Tokyo, New York"
            />
          </div>
        </div>
      </section>

      {/* Dashboard results */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
        {hasResult ? (
          <WeatherResult
            weather={weather}
            forecast={forecast}
            weatherLoading={weatherLoading}
            forecastLoading={forecastLoading}
            weatherError={weatherError}
            forecastError={forecastError}
            units={units}
            onRetry={handleRetry}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="mb-5 text-7xl">🌍</span>
            <p className="text-xl font-semibold text-slate-300">
              Search for a city to get started
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try London, Tokyo, New York, Sydney, or any city worldwide.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
