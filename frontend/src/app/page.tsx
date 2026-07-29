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
  const hasResult = weather || forecast || weatherError || forecastError;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-6xl">🌤️</div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Weather Dashboard
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Real-time weather data for any city in the world.
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <SearchBar
              onSearch={handleSearch}
              loading={isLoading}
              placeholder="Search city... e.g. London, Tokyo, New York"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
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
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <span className="mb-4 text-6xl">🌍</span>
            <p className="text-lg font-medium">Search for a city to get started</p>
            <p className="mt-2 text-sm">
              Try searching for London, Tokyo, New York, or any city worldwide.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
