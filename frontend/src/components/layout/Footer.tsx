export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌤️</span>
          <span className="font-medium text-gray-700">WeatherDash</span>
        </div>

        <p>
          Powered by{' '}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            OpenWeatherMap
          </a>
        </p>

        <p>© {new Date().getFullYear()} WeatherDash. All rights reserved.</p>
      </div>
    </footer>
  );
}
