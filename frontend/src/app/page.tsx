'use client';

import { useState, useCallback } from 'react';
import { Units } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useForecast } from '@/hooks/useForecast';
import SearchBar from '@/components/weather/SearchBar';
import WeatherResult from '@/components/weather/WeatherResult';
import {
  getWeatherTheme,
  getBackgroundConfig,
  isNightTime,
} from '@/utils/weatherBackground';

export default function HomePage() {
  const [lastCity, setLastCity] = useState('');
  const [units] = useState<Units>('metric');

  const { data: weather, loading: weatherLoading, error: weatherError, getWeather } = useWeather();
  const { data: forecast, loading: forecastLoading, error: forecastError, getForecast } = useForecast();

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

  // Derive dynamic background
  const night = weather ? isNightTime(weather.sunrise, weather.sunset, weather.timezone) : false;
  const conditionId = weather ? weather.weather.conditionId : 0;
  const theme = weather ? getWeatherTheme(conditionId, night) : 'default';
  const bg = getBackgroundConfig(theme);

  return (
    // Outer wrapper — full animated gradient background
    <div
      className={`
        min-h-screen bg-gradient-to-br transition-all duration-1000 ease-in-out
        ${bg.gradient}
      `}
      aria-label={`Weather background: ${bg.label}`}
    >
      {/* Subtle overlay for contrast */}
      <div className={`min-h-screen ${bg.overlay} transition-all duration-1000`}>

        {/* Hero search */}
        <section className="px-4 pb-8 pt-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 text-5xl" aria-hidden="true">
              {theme === 'sunny' && '☀️'}
              {theme === 'cloudy' && '☁️'}
              {theme === 'rain' && '🌧️'}
              {theme === 'snow' && '❄️'}
              {theme === 'night' && '🌙'}
              {(theme === 'default') && '🌤️'}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">
              Weather Dashboard
            </h1>
            <p className="mt-3 text-base text-white/60">
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

        {/* Results */}
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
              <span className="mb-5 text-7xl" aria-hidden="true">🌍</span>
              <p className="text-xl font-semibold text-white/80">
                Search for a city to get started
              </p>
              <p className="mt-2 text-sm text-white/40">
                Try London, Tokyo, New York, Sydney, or any city worldwide.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
