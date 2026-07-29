import Link from 'next/link';
import { Cloud } from 'lucide-react';
import UnitToggle from '@/components/ui/UnitToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
          aria-label="WeatherDash home"
        >
          <Cloud size={22} className="text-blue-200" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight">WeatherDash</span>
        </Link>

        <UnitToggle />
      </nav>
    </header>
  );
}
