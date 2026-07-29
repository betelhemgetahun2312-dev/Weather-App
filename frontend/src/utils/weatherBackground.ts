export type WeatherTheme = 'sunny' | 'cloudy' | 'rain' | 'snow' | 'night' | 'default';

export interface BackgroundConfig {
  gradient: string;
  overlay: string;
  theme: WeatherTheme;
  label: string;
}

/**
 * Determines if it is currently night based on unix sunrise/sunset + timezone.
 */
export const isNightTime = (
  sunrise: number,
  sunset: number,
  timezone: number
): boolean => {
  const nowUtc = Math.floor(Date.now() / 1000);
  const localNow = nowUtc + timezone;
  const localSunrise = sunrise + timezone;
  const localSunset = sunset + timezone;
  return localNow < localSunrise || localNow > localSunset;
};

/**
 * Maps an OpenWeatherMap condition id + night flag to a WeatherTheme.
 * https://openweathermap.org/weather-conditions
 */
export const getWeatherTheme = (
  conditionId: number,
  night: boolean
): WeatherTheme => {
  if (night) return 'night';
  if (conditionId >= 200 && conditionId < 300) return 'rain';   // Thunderstorm
  if (conditionId >= 300 && conditionId < 600) return 'rain';   // Drizzle + Rain
  if (conditionId >= 600 && conditionId < 700) return 'snow';   // Snow
  if (conditionId >= 700 && conditionId < 800) return 'cloudy'; // Atmosphere (fog, mist…)
  if (conditionId === 800) return 'sunny';                       // Clear sky
  if (conditionId > 800) return 'cloudy';                        // Clouds
  return 'default';
};

/**
 * Returns Tailwind gradient + overlay classes for a given WeatherTheme.
 * All classes are complete strings so Tailwind can detect them statically.
 */
export const getBackgroundConfig = (theme: WeatherTheme): BackgroundConfig => {
  const configs: Record<WeatherTheme, BackgroundConfig> = {
    sunny: {
      theme: 'sunny',
      label: 'Sunny',
      gradient: 'from-amber-400 via-orange-400 to-yellow-300',
      overlay: 'bg-amber-900/20',
    },
    cloudy: {
      theme: 'cloudy',
      label: 'Cloudy',
      gradient: 'from-slate-500 via-gray-500 to-slate-400',
      overlay: 'bg-slate-900/30',
    },
    rain: {
      theme: 'rain',
      label: 'Rainy',
      gradient: 'from-slate-700 via-blue-800 to-slate-600',
      overlay: 'bg-blue-900/30',
    },
    snow: {
      theme: 'snow',
      label: 'Snowy',
      gradient: 'from-sky-200 via-blue-100 to-slate-200',
      overlay: 'bg-sky-900/10',
    },
    night: {
      theme: 'night',
      label: 'Night',
      gradient: 'from-slate-900 via-indigo-950 to-slate-900',
      overlay: 'bg-indigo-900/20',
    },
    default: {
      theme: 'default',
      label: 'Default',
      gradient: 'from-slate-900 via-blue-900 to-indigo-900',
      overlay: 'bg-slate-900/20',
    },
  };

  return configs[theme];
};
