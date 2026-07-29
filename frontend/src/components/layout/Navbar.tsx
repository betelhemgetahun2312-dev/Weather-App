'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/forecast', label: 'Forecast' },
  { href: '/map', label: 'Map' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="text-2xl">🌤️</span>
          <span className="text-lg font-bold tracking-tight">WeatherDash</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                  pathname === href
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 rounded-lg p-2 text-white transition hover:bg-white/10 sm:hidden"
        >
          <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', menuOpen && 'translate-y-2 rotate-45')} />
          <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('block h-0.5 w-5 bg-white transition-all duration-300', menuOpen && '-translate-y-2 -rotate-45')} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="flex flex-col border-t border-white/10 px-4 pb-4 sm:hidden">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  pathname === href
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
