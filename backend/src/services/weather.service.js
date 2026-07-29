const axios = require('axios');
const { WEATHER_API_KEY, WEATHER_API_BASE_URL } = require('../config/env');
const ApiError = require('../utils/ApiError');

const client = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  params: { appid: WEATHER_API_KEY, units: 'metric' },
});

const getCurrentWeather = async (city) => {
  try {
    const { data } = await client.get('/weather', { params: { q: city } });
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
    };
  } catch (err) {
    if (err.response?.status === 404) throw ApiError.notFound(`City "${city}" not found`);
    throw ApiError.internal('Failed to fetch weather data');
  }
};

const getForecast = async (city) => {
  try {
    const { data } = await client.get('/forecast', { params: { q: city } });
    return data.list.map((item) => ({
      datetime: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
    }));
  } catch (err) {
    if (err.response?.status === 404) throw ApiError.notFound(`City "${city}" not found`);
    throw ApiError.internal('Failed to fetch forecast data');
  }
};

const getLocation = async (city) => {
  try {
    const { data } = await axios.get(
      'http://api.openweathermap.org/geo/1.0/direct',
      { params: { q: city, limit: 5, appid: WEATHER_API_KEY } }
    );
    if (!data.length) throw ApiError.notFound(`No location found for "${city}"`);
    return data.map((loc) => ({
      name: loc.name,
      country: loc.country,
      state: loc.state || null,
      lat: loc.lat,
      lon: loc.lon,
    }));
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw ApiError.internal('Failed to fetch location data');
  }
};

module.exports = { getCurrentWeather, getForecast, getLocation };
