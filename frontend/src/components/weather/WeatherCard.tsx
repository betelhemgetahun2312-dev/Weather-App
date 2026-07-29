import Image from 'next/image';
import { CurrentWeather, Units } from '@/types/weather';
import {
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  formatPressure,
  formatVisibility,
  formatUnixTime,
  capitalizeWords,
} from '@/utils/formatters';
import LiveClock from '@/components/weather/LiveClock';
import StatCard from '@/components/weather/StatCard';

interface WeatherCardProps {
  data: CurrentWeather;
  units?: Units;
}

export default function WeatherCard({ data, units = 'metric' }: WeatherCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 shadow-2xl">

      {/* Top strip — city + clock */}
      <div className="flex flex-col gap-4 px-6 pt-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📍</span>
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                {data.city}
              </h2>
              <p className="text-sm font-medium text-blue-300">{data.country}</p>
            </div>
          </div>
        </div>

        <LiveClock
          className="text-right"
          dateClassName="text-sm font-medium text-blue-300"
          timeClassName="text-2xl font-bold tabular-nums text-white"
        />
      </div>

      {/* Divider */}
      <div className="mx-6 mt-4 h-px bg-white/10" />

      {/* Hero — temp + icon + status */}
      <div className="flex flex-col items-center gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-8xl font-black tracking-tighter text-white">
            {formatTemperature(data.temperature.current, units)}
          </p>
          <p className="mt-2 text-xl font-semibold capitalize text-blue-200">
            {capitalizeWords(data.weather.description)}
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm text-white/60">
            <span>Feels like {formatTemperature(data.temperature.feelsLike, units)}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>↑ {formatTemperature(data.temperature.max, units)}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>↓ {formatTemperature(data.temperature.min, units)}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image
            src={data.weather.iconUrl}
            alt={data.weather.description}
            width={120}
            height={120}
            className="drop-shadow-[0_0_20px_rgba(147,197,253,0.5)]"
          />
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
            {data.weather.main}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-6 sm:grid-cols-4">
        <StatCard
          icon="💧"
          label="Humidity"
          value={formatHumidity(data.humidity)}
          sub="Relative humidity"
        />
        <StatCard
          icon="🌬️"
          label="Wind Speed"
          value={formatWindSpeed(data.wind.speed, units)}
          sub={data.wind.direction !== null ? `${data.wind.direction}° direction` : undefined}
        />
        <StatCard
          icon="👁️"
          label="Visibility"
          value={formatVisibility(data.visibility)}
          sub="Clear line of sight"
        />
        <StatCard
          icon="🌡️"
          label="Pressure"
          value={formatPressure(data.pressure)}
          sub="Atmospheric"
        />
        <StatCard
          icon="🌅"
          label="Sunrise"
          value={formatUnixTime(data.sunrise, data.timezone)}
          sub="Local time"
        />
        <StatCard
          icon="🌇"
          label="Sunset"
          value={formatUnixTime(data.sunset, data.timezone)}
          sub="Local time"
        />
        <StatCard
          icon="🌡️"
          label="Min Temp"
          value={formatTemperature(data.temperature.min, units)}
          sub="Today's low"
        />
        <StatCard
          icon="🔥"
          label="Max Temp"
          value={formatTemperature(data.temperature.max, units)}
          sub="Today's high"
        />
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-6 py-3">
        <p className="text-center text-xs text-white/30">
          Last updated · {new Date(data.recordedAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
