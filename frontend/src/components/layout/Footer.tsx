import { Cloud, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/30 sm:flex-row sm:px-6">
        <div className="flex items-center gap-1.5">
          <Cloud size={14} className="text-blue-400" aria-hidden="true" />
          <span className="font-semibold text-white/50">WeatherDash</span>
        </div>

        <p>
          Powered by{' '}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            OpenWeatherMap
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </p>

        <p>© {new Date().getFullYear()} WeatherDash</p>
      </div>
    </footer>
  );
}
