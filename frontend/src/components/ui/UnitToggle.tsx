'use client';

import { useUnits } from '@/context/UnitsContext';
import { cn } from '@/utils/cn';

interface UnitToggleProps {
  className?: string;
}

export default function UnitToggle({ className }: UnitToggleProps) {
  const { isCelsius, toggleUnits } = useUnits();

  return (
    <button
      onClick={toggleUnits}
      aria-label={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
      title={`Switch to ${isCelsius ? '°F' : '°C'}`}
      className={cn(
        'flex items-center gap-0.5 rounded-xl border border-white/20 bg-white/10 p-1 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20',
        className
      )}
    >
      <span
        className={cn(
          'rounded-lg px-2.5 py-1 transition-all duration-200',
          isCelsius ? 'bg-white text-blue-700 shadow' : 'text-white/50'
        )}
      >
        °C
      </span>
      <span
        className={cn(
          'rounded-lg px-2.5 py-1 transition-all duration-200',
          !isCelsius ? 'bg-white text-blue-700 shadow' : 'text-white/50'
        )}
      >
        °F
      </span>
    </button>
  );
}
