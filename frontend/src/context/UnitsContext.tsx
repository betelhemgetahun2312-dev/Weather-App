'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Units } from '@/types/weather';

const STORAGE_KEY = 'weatherdash_units';

interface UnitsContextValue {
  units: Units;
  setUnits: (units: Units) => void;
  toggleUnits: () => void;
  isCelsius: boolean;
}

const UnitsContext = createContext<UnitsContextValue | null>(null);

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnitsState] = useState<Units>('metric');

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Units | null;
    if (stored === 'metric' || stored === 'imperial') {
      setUnitsState(stored);
    }
  }, []);

  const setUnits = useCallback((next: Units) => {
    setUnitsState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleUnits = useCallback(() => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  }, [units, setUnits]);

  return (
    <UnitsContext.Provider value={{ units, setUnits, toggleUnits, isCelsius: units === 'metric' }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits(): UnitsContextValue {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error('useUnits must be used inside UnitsProvider');
  return ctx;
}
