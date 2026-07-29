import Image from 'next/image';
import { DailyForecast, Units } from '@/types/weather';
import { formatTemperature, formatDay, formatShortDate, capitalizeWords } from '@/utils/formatters';

interface ForecastCardProps {
  data: DailyForecast;
  units?: Units;
}

export default function ForecastCard({ data, units = 'metric' }: ForecastCardProps) {
  const isToday = formatDay(data.date) === 'Today';

  return (
    <div
      className={`
        relative flex min-w-[140px] flex-col items-center gap-3 rounded-2xl p-4 text-center
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
        ${isToday
          ? 'border border-blue-400/40 bg-gradient-to-b from-blue-500/20 to-indigo-500/20 shadow-lg shadow-blue-500/10'
          : 'border border-white/10 bg-white/5 hover:bg-white/10'}
      `}
    >
      {/* Today badge */}
      {isToday && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Today
        </span>
      )}

      {/* Day name */}
      <p className={`text-sm font-bold ${isToday ? 'text-blue-300' : 'text-slate-300'}`}>
        {isToday ? 'Today' : formatDay(data.date)}
      </p>

      {/* Short date */}
      <p className="text-xs text-slate-500">{formatShortDate(data.date)}</p>

      {/* Weather icon */}
      <div className="relative">
        <Image
          src={data.iconUrl}
          alt={data.description}
          width={64}
          height={64}
          className="drop-shadow-[0_0_8px_rgba(147,197,253,0.4)]"
        />
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-xs font-medium capitalize leading-tight text-slate-400">
        {capitalizeWords(data.description)}
      </p>

      {/* Temp range */}
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm font-bold">
          <span className="text-blue-400">↓ {formatTemperature(data.tempMin, units)}</span>
          <span className="text-orange-400">↑ {formatTemperature(data.tempMax, units)}</span>
        </div>

        {/* Visual temp bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400" />
        </div>
      </div>
    </div>
  );
}
