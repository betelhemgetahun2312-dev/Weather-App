import Image from 'next/image';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { DailyForecast } from '@/types/weather';
import { formatTemperature, formatDay, formatShortDate, capitalizeWords } from '@/utils/formatters';
import { useUnits } from '@/context/UnitsContext';
import { cn } from '@/utils/cn';

interface ForecastCardProps {
  data: DailyForecast;
}

export default function ForecastCard({ data }: ForecastCardProps) {
  const { units } = useUnits();
  const isToday = formatDay(data.date) === 'Today';

  return (
    <article
      aria-label={`Forecast for ${isToday ? 'today' : formatDay(data.date)}`}
      className={cn(
        'relative flex min-w-[130px] flex-col items-center gap-2.5 rounded-2xl p-4 text-center',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-400/50',
        isToday
          ? 'border border-blue-400/40 bg-gradient-to-b from-blue-500/20 to-indigo-500/20 shadow-lg shadow-blue-500/10'
          : 'border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
      )}
    >
      {isToday && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Today
        </span>
      )}

      <p className={cn('text-sm font-bold', isToday ? 'text-blue-300' : 'text-slate-300')}>
        {isToday ? 'Today' : formatDay(data.date)}
      </p>
      <p className="text-[11px] text-slate-500">{formatShortDate(data.date)}</p>

      <Image
        src={data.iconUrl}
        alt={data.description}
        width={56}
        height={56}
        className="drop-shadow-[0_0_8px_rgba(147,197,253,0.4)]"
      />

      <p className="line-clamp-2 text-[11px] font-medium capitalize leading-tight text-slate-400">
        {capitalizeWords(data.description)}
      </p>

      <div className="flex w-full items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-0.5 text-blue-400">
          <TrendingDown size={11} aria-hidden="true" />
          {formatTemperature(data.tempMin, units)}
        </span>
        <span className="flex items-center gap-0.5 text-orange-400">
          <TrendingUp size={11} aria-hidden="true" />
          {formatTemperature(data.tempMax, units)}
        </span>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400" />
      </div>
    </article>
  );
}
