import { Units } from '@/types/weather';

export const formatTemperature = (temp: number, units: Units = 'metric'): string => {
  const symbol = units === 'imperial' ? '°F' : units === 'standard' ? 'K' : '°C';
  return `${Math.round(temp)}${symbol}`;
};

export const formatWindSpeed = (speed: number, units: Units = 'metric'): string => {
  const unit = units === 'imperial' ? 'mph' : 'm/s';
  return `${speed} ${unit}`;
};

export const formatHumidity = (humidity: number): string => `${humidity}%`;
export const formatPressure = (pressure: number): string => `${pressure} hPa`;

export const formatVisibility = (visibility: number | null): string => {
  if (visibility === null) return 'N/A';
  return `${(visibility / 1000).toFixed(1)} km`;
};

export const formatUnixTime = (unix: number, timezone: number): string => {
  const date = new Date((unix + timezone) * 1000);
  return date.toUTCString().slice(17, 22);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatLiveDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const formatLiveTime = (date: Date): string =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

export const capitalizeWords = (str: string): string =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());
