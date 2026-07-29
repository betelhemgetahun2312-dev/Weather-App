import Image from 'next/image';
import { DailyForecast, Units } from '@/types/weather';
import { formatTemperature, formatDay, capitalizeWords } from '@/utils/formatters';

interface ForecastCardProps {
  data: DailyForecast;
  units?: Units;
}

export default function ForecastCard({ data, units = 'metric' }: ForecastCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-indigo-50 p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-bold text-slate-700">{formatDay(data.date)}</p>
      <p className="text-xs text-slate-400">{data.date}</p>

      <Image
        src={data.iconUrl}
        alt={data.description}
        width={52}
        height={52}
        className="drop-shadow-sm"
      />

      <p className="text-xs font-medium capitalize text-slate-500">
        {capitalizeWords(data.description)}
      </p>

      <div className="mt-1 flex w-full justify-between px-1 text-sm font-semibold">
        <span className="text-blue-500">↓ {formatTemperature(data.tempMin, units)}</span>
        <span className="text-orange-500">↑ {formatTemperature(data.tempMax, units)}</span>
      </div>
    </div>
  );
}
