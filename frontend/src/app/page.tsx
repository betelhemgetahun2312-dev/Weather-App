import SearchBar from '@/components/weather/SearchBar';
import Card from '@/components/ui/Card';

const features = [
  { icon: '🌡️', title: 'Current Weather', desc: 'Real-time temperature, humidity, wind, and more.' },
  { icon: '📅', title: '5-Day Forecast', desc: 'Plan ahead with a detailed 5-day weather outlook.' },
  { icon: '📍', title: 'Location Search', desc: 'Search any city worldwide with smart suggestions.' },
  { icon: '🌬️', title: 'Wind & Pressure', desc: 'Detailed wind speed, direction, and pressure data.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-6xl">🌤️</div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Weather Dashboard
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Real-time weather data for any city in the world.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-xl">
            <SearchBar onSearch={(city) => console.log('Search:', city)} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, desc }) => (
            <Card key={title} hover className="text-center">
              <div className="mb-3 text-4xl">{icon}</div>
              <h3 className="mb-1 font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800">Ready to check the weather?</h2>
          <p className="mt-3 text-gray-500">
            Search for any city above to get started with live weather data.
          </p>
        </div>
      </section>
    </div>
  );
}
