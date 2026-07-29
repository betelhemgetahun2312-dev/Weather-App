import Image from 'next/image';
import {
  MapPin, Droplets, Wind, Eye, Gauge,
  Sunrise, Sunset, ThermometerSnowflake, ThermometerSun,
} from 'lucide-react';
import { CurrentWeather } from '@/types/weather';
import {
  formatTemperature, formatWindSpeed, formatHumidity,
  formatPressure, formatVisibility, formatUnixTime, capitalizeWords,
} from '@/utils/formatters';
import { useUnits } from '@/context/UnitsContext';
import LiveClock from '@/components/weather/LiveClock';
import StatCard from '@/components/weather/StatCard';

interface WeatherCardProps {
  data: CurrentWeather;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { units } = useUnits();

  const stats = [
    { Icon: Droplets,          label: 'Humidity',    value: formatHumidity(data.humidity),                                          sub: 'Relative humidity' },
    { Icon: Wind,              label: 'Wind',         value: formatWindSpeed(data.wind.speed, units),                                sub: data.wind.direction !== null ? `${data.wind.direction}° direction` : undefined },
    { Icon: Eye,               label: 'Visibility',  value: formatVisibility(data.visibility),                                      sub: 'Line of sight' },
    { Icon: Gauge,             label: 'Pressure',    value: formatPressure(data.pressure),                                          sub: 'Atmospheric' },
    { Icon: Sunrise,           label: 'Sunrise',     value: formatUnixTime(data.sunrise, data.timezone),                            sub: 'Local time' },
    { Icon: Sunset,            label: 'Sunset',      value: formatUnixTime(data.sunset, data.timezone),                             sub: 'Local time' },
    { Icon: ThermometerSnowflake, label: 'Min Temp', value: formatTemperature(data.temperature.min, units),                        sub: "Today's low" },
    { Icon: ThermometerSun,    label: 'Max Temp',    value: formatTemperature(data.temperature.max, units),                        sub: "Today's high" },
  ];

  return (
    <article
      aria-label={`Current weather for ${data.city}`}
      className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900/80 to-indigo-900 shadow-2xl ring-1 ring-white/10"
    >
      {/* Header — city + clock */}
      <div className="flex flex-col gap-3 px-5 pt-5 sm:flex-row sm:items-start sm:justify-between sm:px-7 sm:pt-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
            <MapPin size={16} className="text-blue-300" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
              {data.city}
            </h2>
            <p className="text-xs font-medium text-blue-300/80">{data.country}</p>
          </div>
        </div>
        <LiveClock
          className="sm:text-right"
          dateClassName="text-xs font-medium text-blue-300/70"
          timeClassName="text-xl font-bold tabular-nums text-white sm:text-2xl"
        />
      </div>

      <div className="mx-5 mt-4 h-px bg-white/10 sm:mx-7" />

      {/* Hero — temperature + icon */}
      <div className="flex flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-8">
        <div className="flex flex-col items-center sm:items-start">
          <p
            className="text-7xl font-black tracking-tighter text-white sm:text-8xl"
            aria-label={`Temperature: ${formatTemperature(data.temperature.current, units)}`}
          >
            {formatTemperature(data.temperature.current, units)}
          </p>
          <p className="mt-2 text-base font-semibold capitalize text-blue-200 sm:text-lg">
            {capitalizeWords(data.weather.description)}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50 sm:text-sm">
            <span>Feels like {formatTemperature(data.temperature.feelsLike, units)}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
            <span>↑ {formatTemperature(data.temperature.max, units)}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
            <span>↓ {formatTemperature(data.temperature.min, units)}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Image
            src={data.weather.iconUrl}
            alt={data.weather.description}
            width={110}
            height={110}
            priority
            className="drop-shadow-[0_0_24px_rgba(147,197,253,0.5)]"
          />
          <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-blue-200">
            {data.weather.main}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 px-5 pb-5 sm:grid-cols-4 sm:px-7 sm:pb-7">
        {stats.map(({ Icon, label, value, sub }) => (
          <StatCard key={label} Icon={Icon} label={label} value={value} sub={sub} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-5 py-3 sm:px-7">
        <p className="text-center text-[11px] text-white/25">
          Last updated · {new Date(data.recordedAt).toLocaleTimeString()}
        </p>
      </div>
    </article>
  );
}
