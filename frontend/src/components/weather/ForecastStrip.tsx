import { CalendarDays } from 'lucide-react';
import { ForecastData } from '@/types/weather';
import ForecastCard from '@/components/weather/ForecastCard';

interface ForecastStripProps {
  data: ForecastData;
}

export default function ForecastStrip({ data }: ForecastStripProps) {
  const days = data.daily.slice(0, 5);

  return (
    <section
      aria-label="5-day weather forecast"
      className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-blue-300/70" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-bold text-white sm:text-base">5-Day Forecast</h2>
            <p className="text-[11px] text-slate-400">{data.city}, {data.country}</p>
          </div>
        </div>
        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300">
          {days.length} days
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
        {days.map((day) => (
          <ForecastCard key={day.date} data={day} />
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-600 sm:hidden" aria-hidden="true">
        ← Swipe to see all days →
      </p>
    </section>
  );
}
