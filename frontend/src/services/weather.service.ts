import apiClient from '@/lib/apiClient';
import {
  ApiResponse,
  CurrentWeather,
  ForecastData,
  LocationResult,
  Units,
} from '@/types/weather';

export const fetchCurrentWeather = async (
  city: string,
  units: Units = 'metric'
): Promise<CurrentWeather> => {
  const { data } = await apiClient.get<ApiResponse<CurrentWeather>>('/weather', {
    params: { city, units },
  });
  return data.data;
};

export const fetchForecast = async (
  city: string,
  units: Units = 'metric'
): Promise<ForecastData> => {
  const { data } = await apiClient.get<ApiResponse<ForecastData>>('/forecast', {
    params: { city, units },
  });
  return data.data;
};

export const fetchLocation = async (
  city: string,
  limit = 5
): Promise<LocationResult[]> => {
  const { data } = await apiClient.get<ApiResponse<LocationResult[]>>('/location', {
    params: { city, limit },
  });
  return data.data;
};
