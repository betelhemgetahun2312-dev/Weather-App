'use client';

import { useState, useCallback, useEffect } from 'react';
import { useUnits } from '@/context/UnitsContext';
import { useWeather } from '@/hooks/useWeather';
import { useForecast } from '@/hooks/useForecast';
import { useGeolocation } from '@/hooks/useGeolocation';
import SearchBar from '@/components/weather/SearchBar';
import WeatherResult from '@/components/weather/WeatherResult';
import LocationButton from '@/components/weather/LocationButton';
import { getWeatherTheme, getBackgroundConfig, isNightTime } from '@/utils/weatherBackground';

const THEME_ICONS: Record<string, string> = {
  sunny: '☀️',
  cloudy: '☁️',
  rain: '🌧️',
  snow: '❄️',
  night: '🌙',
  default: '🌤️',
};

export default function HomePage() {
  const [lastCity, setLastCity] = useState('');
  const [lastCoords, setLastCoords] = useState<{ lat: number; lon: number } | null>(null);
  const { units } = useUnits();

  const { data: weather, loading: weatherLoading, error: weatherError, getWeather, getWeatherByCoords } = useWeather();
  const { data: forecast, loading: forecastLoading, error: forecastError, getForecast, getForecastByCoords } = useForecast();
  const { status: geoStatus, error: geoError, requestLocation, reset: resetGeo } = useGeolocation();

  // Search by city name
  const handleSearch = useCallback(
    (city: string) => {
      setLastCity(city);
      setLastCoords(null);
      resetGeo();
      getWeather(city, units);
      getForecast(city, units);
    },
    [getWeather, getForecast, units, resetGeo]
  );

  // Search by coordinates — reuses existing hooks, no duplication
  const handleLocationSearch = useCallback(() => {
    requestLocation((lat, lon) => {
      setLastCoords({ lat, lon });
      setLastCity('');
      getWeatherByCoords(lat, lon, units);
      getForecastByCoords(lat, lon, units);
    });
  }, [requestLocation, getWeatherByCoords, getForecastByCoords, units]);

  // Retry last search (city or coords)
  const handleRetry = useCallback(() => {
    if (lastCoords) {
      getWeatherByCoords(lastCoords.lat, lastCoords.lon, units);
      getForecastByCoords(lastCoords.lat, lastCoords.lon, units);
    } else if (lastCity) {
      getWeather(lastCity, units);
      getForecast(lastCity, units);
    }
  }, [lastCoords, lastCity, getWeather, getForecast, getWeatherByCoords, getForecastByCoords, units]);

  // Re-fetch with new units whenever the user toggles the unit
  useEffect(() => {
    if (lastCoords) {
      getWeatherByCoords(lastCoords.lat, lastCoords.lon, units);
      getForecastByCoords(lastCoords.lat, lastCoords.lon, units);
    } else if (lastCity) {
      getWeather(lastCity, units);
      getForecast(lastCity, units);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  const isLoading = weatherLoading || forecastLoading;
  const hasResult = weather || forecast || weatherError || forecastError || isLoading;

  // Dynamic background
  const night = weather ? isNightTime(weather.sunrise, weather.sunset, weather.timezone) : false;
  const conditionId = weather?.weather.conditionId ?? 0;
  const theme = weather ? getWeatherTheme(conditionId, night) : 'default';
  const bg = getBackgroundConfig(theme);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br transition-all duration-1000 ease-in-out ${bg.gradient}`}
      aria-label={`Weather background: ${bg.label}`}
    >
      <div className={`min-h-screen transition-all duration-1000 ${bg.overlay}`}>

        {/* Hero */}
        <section className="px-4 pb-8 pt-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 text-5xl" aria-hidden="true">
              {THEME_ICONS[theme] ?? '🌤️'}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">
              Weather Dashboard
            </h1>
            <p className="mt-3 text-base text-white/60">
              Real-time weather for any city in the world.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar
                onSearch={handleSearch}
                loading={isLoading}
                placeholder="Search city... e.g. London, Tokyo, New York"
              />
            </div>

            {/* Location button — separated from search, no code duplication */}
            <div className="mt-4 flex justify-center">
              <LocationButton
                status={geoStatus}
                error={geoError}
                onClick={handleLocationSearch}
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
              onRetry={handleRetry}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="mb-5 text-7xl" aria-hidden="true">🌍</span>
              <p className="text-xl font-semibold text-white/80">
                Search for a city or use your location
              </p>
              <p className="mt-2 text-sm text-white/40">
                Try London, Tokyo, New York, or click &quot;Use My Location&quot;.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
