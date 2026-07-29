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
      role="switch"
      aria-checked={isCelsius}
      onClick={toggleUnits}
      aria-label={`Temperature unit: ${isCelsius ? 'Celsius' : 'Fahrenheit'}. Click to switch.`}
      className={cn(
        'flex items-center gap-0.5 rounded-xl border border-white/20 bg-white/10 p-1',
        'text-sm font-bold text-white backdrop-blur-sm',
        'transition-all duration-200 hover:bg-white/20',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className
      )}
    >
      {(['°C', '°F'] as const).map((label) => {
        const active = label === '°C' ? isCelsius : !isCelsius;
        return (
          <span
            key={label}
            className={cn(
              'rounded-lg px-2.5 py-1 transition-all duration-200 select-none',
              active ? 'bg-white text-blue-700 shadow' : 'text-white/50'
            )}
          >
            {label}
          </span>
        );
      })}
    </button>
  );
}
