import Image from 'next/image';
import { DailyForecast, Units } from '@/types/weather';
import { formatTemperature, formatDay, capitalizeWords } from '@/utils/formatters';
import Card from '@/components/ui/Card';

interface ForecastCardProps {
  data: DailyForecast;
  units?: Units;
}

export default function ForecastCard({ data, units = 'metric' }: ForecastCardProps) {
  return (
    <Card hover className="flex flex-col items-center gap-2 p-4 text-center">
      <p className="text-sm font-semibold text-gray-700">{formatDay(data.date)}</p>
      <p className="text-xs text-gray-400">{data.date}</p>

      <Image
        src={data.iconUrl}
        alt={data.description}
        width={48}
        height={48}
      />

      <p className="text-xs capitalize text-gray-500">
        {capitalizeWords(data.description)}
      </p>

      <div className="flex gap-2 text-sm font-medium">
        <span className="text-blue-600">↓ {formatTemperature(data.tempMin, units)}</span>
        <span className="text-orange-500">↑ {formatTemperature(data.tempMax, units)}</span>
      </div>
    </Card>
  );
}
