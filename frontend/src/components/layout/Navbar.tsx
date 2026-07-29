'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cloud, Menu, X, Home, BarChart2, Map } from 'lucide-react';
import { cn } from '@/utils/cn';
import UnitToggle from '@/components/ui/UnitToggle';

const navLinks = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/forecast', label: 'Forecast', Icon: BarChart2 },
  { href: '/map', label: 'Map', Icon: Map },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 sm:flex">
          <ul className="flex items-center gap-1" role="list">
            {navLinks.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                    pathname === href
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-5 w-px bg-white/20" aria-hidden="true" />
          <UnitToggle />
        </div>

        {/* Mobile: unit toggle + hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <UnitToggle />
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {menuOpen
              ? <X size={20} aria-hidden="true" />
              : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          'overflow-hidden border-t border-white/10 transition-all duration-300 sm:hidden',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="flex flex-col px-4 pb-4 pt-2 gap-1" role="list">
          {navLinks.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                  pathname === href
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
