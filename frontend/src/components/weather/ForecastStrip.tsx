import { ForecastData, Units } from '@/types/weather';
import ForecastCard from '@/components/weather/ForecastCard';

interface ForecastStripProps {
  data: ForecastData;
  units?: Units;
}

export default function ForecastStrip({ data, units = 'metric' }: ForecastStripProps) {
  const days = data.daily.slice(0, 5);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">5-Day Forecast</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            {data.city}, {data.country}
          </p>
        </div>
        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
          {days.length} days
        </span>
      </div>

      {/* Mobile: horizontal scroll — Desktop: 5-col grid */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
        {days.map((day) => (
          <ForecastCard key={day.date} data={day} units={units} />
        ))}
      </div>

      {/* Mobile scroll hint */}
      <p className="mt-3 text-center text-xs text-slate-600 sm:hidden">
        ← Scroll to see all days →
      </p>
    </section>
  );
}
