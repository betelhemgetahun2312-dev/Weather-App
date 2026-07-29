import { CurrentWeather, ForecastData, Units } from '@/types/weather';
import WeatherCard from '@/components/weather/WeatherCard';
import ForecastCard from '@/components/weather/ForecastCard';
import ErrorMessage from '@/components/weather/ErrorMessage';

interface WeatherResultProps {
  weather: CurrentWeather | null;
  forecast: ForecastData | null;
  weatherLoading: boolean;
  forecastLoading: boolean;
  weatherError: string | null;
  forecastError: string | null;
  units: Units;
  onRetry: () => void;
}

function SkeletonPulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200 ${className}`} />;
}

function WeatherSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonPulse className="h-8 w-40 bg-white/20" />
          <SkeletonPulse className="h-4 w-20 bg-white/10" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <SkeletonPulse className="h-4 w-36 bg-white/10" />
          <SkeletonPulse className="h-7 w-28 bg-white/20" />
        </div>
      </div>

      <div className="my-4 h-px bg-white/10" />

      {/* Hero */}
      <div className="flex items-center justify-between py-6">
        <div className="flex flex-col gap-3">
          <SkeletonPulse className="h-20 w-48 bg-white/20" />
          <SkeletonPulse className="h-5 w-32 bg-white/10" />
          <SkeletonPulse className="h-4 w-56 bg-white/10" />
        </div>
        <SkeletonPulse className="h-28 w-28 rounded-full bg-white/20" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-20 bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonPulse className="h-6 w-48" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonPulse key={i} className="h-36" />
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
  units,
  onRetry,
}: WeatherResultProps) {
  const hasError = weatherError || forecastError;

  if (hasError && !weatherLoading && !forecastLoading) {
    return (
      <ErrorMessage
        message={weatherError || forecastError || 'An unexpected error occurred.'}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {weatherLoading ? <WeatherSkeleton /> : weather && <WeatherCard data={weather} units={units} />}

      {forecastLoading ? (
        <ForecastSkeleton />
      ) : (
        forecast &&
        forecast.daily.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              5-Day Forecast —{' '}
              <span className="text-blue-600">
                {forecast.city}, {forecast.country}
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {forecast.daily.slice(0, 5).map((day) => (
                <ForecastCard key={day.date} data={day} units={units} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
