export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Temperature {
  current: number;
  feelsLike: number;
  min: number;
  max: number;
}

export interface WeatherCondition {
  description: string;
  main: string;
  icon: string;
  iconUrl: string;
}

export interface Wind {
  speed: number;
  direction: number | null;
}

export interface CurrentWeather {
  city: string;
  country: string;
  coordinates: Coordinates;
  temperature: Temperature;
  weather: WeatherCondition;
  wind: Wind;
  humidity: number;
  pressure: number;
  visibility: number | null;
  sunrise: number;
  sunset: number;
  timezone: number;
  recordedAt: string;
}

export interface ForecastItem {
  datetime: string;
  timestamp: number;
  temperature: Temperature;
  weather: WeatherCondition;
  wind: Wind;
  humidity: number;
  pressure: number;
  precipitation: number;
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  iconUrl: string;
  entries: ForecastItem[];
}

export interface ForecastData {
  city: string;
  country: string;
  timezone: number;
  daily: DailyForecast[];
}

export interface LocationResult {
  name: string;
  country: string;
  state: string | null;
  coordinates: Coordinates;
  localNames: Record<string, string> | null;
}

export type Units = 'metric' | 'imperial' | 'standard';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    status: number;
    message: string;
  };
}
