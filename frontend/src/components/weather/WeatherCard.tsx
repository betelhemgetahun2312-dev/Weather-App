import Image from 'next/image';
import { CurrentWeather, Units } from '@/types/weather';
import { formatTemperature, formatWindSpeed, formatHumidity, formatVisibility, formatUnixTime, capitalizeWords } from '@/utils/formatters';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface WeatherCardProps {
  data: CurrentWeather;
  units?: Units;
}

export default function WeatherCard({ data, units = 'metric' }: WeatherCardProps) {
  return (
    <Card className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            {data.city}, <span className="text-white/80">{data.country}</span>
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {new Date(data.recordedAt).toLocaleString()}
          </p>
        </div>
        <Badge variant="blue" className="bg-white/20 text-white">
          {units === 'imperial' ? '°F' : units === 'standard' ? 'K' : '°C'}
        </Badge>
      </div>

      {/* Main temp + icon */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-7xl font-extrabold tracking-tight">
            {formatTemperature(data.temperature.current, units)}
          </p>
          <p className="mt-2 text-lg capitalize text-white/80">
            {capitalizeWords(data.weather.description)}
          </p>
          <p className="text-sm text-white/60">
            Feels like {formatTemperature(data.temperature.feelsLike, units)}
          </p>
        </div>
        <Image
          src={data.weather.iconUrl}
          alt={data.weather.description}
          width={96}
          height={96}
          className="drop-shadow-lg"
        />
      </div>

      {/* Min / Max */}
      <div className="mt-4 flex gap-4 text-sm text-white/70">
        <span>↑ {formatTemperature(data.temperature.max, units)}</span>
        <span>↓ {formatTemperature(data.temperature.min, units)}</span>
      </div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Humidity', value: formatHumidity(data.humidity) },
          { label: 'Wind', value: formatWindSpeed(data.wind.speed, units) },
          { label: 'Visibility', value: formatVisibility(data.visibility) },
          {
            label: 'Sunrise',
            value: formatUnixTime(data.sunrise, data.timezone),
          },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
            <p className="text-xs text-white/60">{label}</p>
            <p className="mt-1 font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
