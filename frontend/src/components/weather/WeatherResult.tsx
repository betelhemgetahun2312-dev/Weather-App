import { CurrentWeather, ForecastData } from '@/types/weather';
import WeatherCard from '@/components/weather/WeatherCard';
import ForecastStrip from '@/components/weather/ForecastStrip';
import ErrorMessage from '@/components/weather/ErrorMessage';
import Skeleton from '@/components/ui/Skeleton';
import Spinner from '@/components/ui/Spinner';

interface WeatherResultProps {
  weather: CurrentWeather | null;
  forecast: ForecastData | null;
  weatherLoading: boolean;
  forecastLoading: boolean;
  weatherError: string | null;
  forecastError: string | null;
  onRetry: () => void;
}

function WeatherSkeleton() {
  return (
    <div
      aria-label="Loading weather data"
      className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-6 shadow-2xl"
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-7 w-28" />
        </div>
      </div>
      <div className="my-4 h-px bg-white/10" />
      <div className="flex items-center justify-between py-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-48" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-28 w-28 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div
      aria-label="Loading forecast data"
      className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-44 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function WeatherResult({
  weather,
  forecast,
  weatherLoading,
  forecastLoading,
  weatherError,
  forecastError,
  onRetry,
}: WeatherResultProps) {
  const isLoading = weatherLoading || forecastLoading;
  const hasError = weatherError || forecastError;

  if (hasError && !isLoading) {
    return (
      <ErrorMessage
        message={weatherError || forecastError || 'An unexpected error occurred.'}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div
      aria-busy={isLoading}
      aria-live="polite"
      className="flex flex-col gap-6"
    >
      {/* Screen-reader-only loading announcement */}
      {isLoading && (
        <p className="sr-only" role="status">
          Loading weather information, please wait.
        </p>
      )}

      {/* Inline loading indicator shown above results while refreshing */}
      {isLoading && (weather || forecast) && (
        <div className="flex items-center justify-center gap-2 text-xs text-white/40" aria-hidden="true">
          <Spinner size="sm" />
          <span>Updating…</span>
        </div>
      )}

      {weatherLoading ? <WeatherSkeleton /> : weather && <WeatherCard data={weather} />}

      {forecastLoading
        ? <ForecastSkeleton />
        : forecast && forecast.daily.length > 0 && <ForecastStrip data={forecast} />}
    </div>
  );
}
