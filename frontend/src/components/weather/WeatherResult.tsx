import { CurrentWeather, ForecastData, Units } from '@/types/weather';
import WeatherCard from '@/components/weather/WeatherCard';
import ForecastCard from '@/components/weather/ForecastCard';
import ErrorMessage from '@/components/weather/ErrorMessage';
import Spinner from '@/components/ui/Spinner';

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

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Spinner size="lg" />
      <p className="text-sm text-gray-400">{label}</p>
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
  const isLoading = weatherLoading || forecastLoading;
  const hasError = weatherError || forecastError;

  if (isLoading) {
    return (
      <LoadingState
        label={
          weatherLoading && forecastLoading
            ? 'Fetching weather and forecast...'
            : weatherLoading
            ? 'Fetching current weather...'
            : 'Fetching forecast...'
        }
      />
    );
  }

  if (hasError) {
    return (
      <ErrorMessage
        message={weatherError || forecastError || 'An unexpected error occurred.'}
        onRetry={onRetry}
      />
    );
  }

  if (!weather && !forecast) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Current weather */}
      {weather && <WeatherCard data={weather} units={units} />}

      {/* 5-day forecast */}
      {forecast && forecast.daily.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            5-Day Forecast — {forecast.city}, {forecast.country}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {forecast.daily.slice(0, 5).map((day) => (
              <ForecastCard key={day.date} data={day} units={units} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
