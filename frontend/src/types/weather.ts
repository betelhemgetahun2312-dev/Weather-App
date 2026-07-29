export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
