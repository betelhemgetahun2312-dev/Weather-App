interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
}

export default function WeatherCard({
  city,
  temperature,
  description,
}: WeatherCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-2xl font-semibold">{city}</h2>
      <p className="mt-2 text-5xl font-bold">{temperature}°C</p>
      <p className="mt-1 capitalize text-gray-500">{description}</p>
    </div>
  );
}
