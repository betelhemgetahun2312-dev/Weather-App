'use client';

import { useState, useCallback } from 'react';

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unsupported' | 'error';

export interface GeolocationState {
  status: GeolocationStatus;
  coords: { lat: number; lon: number } | null;
  error: string | null;
}

const GEO_ERRORS: Record<number, string> = {
  1: 'Location access was denied. Please allow location access in your browser settings.',
  2: 'Your location could not be determined. Please try again.',
  3: 'Location request timed out. Please try again.',
};

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coords: null,
    error: null,
  });

  const requestLocation = useCallback(
    (onSuccess: (lat: number, lon: number) => void) => {
      if (!navigator?.geolocation) {
        setState({
          status: 'unsupported',
          coords: null,
          error: 'Geolocation is not supported by your browser.',
        });
        return;
      }

      setState({ status: 'loading', coords: null, error: null });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setState({ status: 'success', coords: { lat, lon }, error: null });
          onSuccess(lat, lon);
        },
        (err) => {
          const message = GEO_ERRORS[err.code] ?? 'An unknown location error occurred.';
          setState({
            status: err.code === 1 ? 'denied' : 'error',
            coords: null,
            error: message,
          });
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
      );
    },
    []
  );

  const reset = useCallback(() => {
    setState({ status: 'idle', coords: null, error: null });
  }, []);

  return { ...state, requestLocation, reset };
}
