const axios = require('axios');
const weatherClient = require('../config/axiosClient');
const { WEATHER_API_KEY, WEATHER_GEO_URL, WEATHER_API_TIMEOUT } = require('../config/env');
const { mapCurrentWeather, mapForecast, mapLocation } = require('../utils/mappers');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

/**
 * Normalizes Axios errors from OpenWeatherMap into ApiError instances.
 */
const handleApiError = (err, context) => {
  if (err instanceof ApiError) throw err;

  if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
    throw ApiError.timeout(`${context}: request timed out`);
  }

  if (!err.response) {
    throw ApiError.serviceUnavailable(`${context}: service unreachable`);
  }

  const status = err.response.status;
  const message = err.response.data?.message || 'Unknown error';

  if (status === 401) throw ApiError.internal('Invalid API key. Check WEATHER_API_KEY in .env');
  if (status === 404) throw ApiError.notFound(`${context}: city not found`);
  if (status === 429) throw ApiError.serviceUnavailable(`${context}: API rate limit exceeded`);
  if (status >= 500) throw ApiError.serviceUnavailable(`${context}: upstream server error — ${message}`);

  throw ApiError.internal(`${context}: unexpected error (${status})`);
};

/**
 * Fetches current weather for a given city.
 * @param {string} city
 * @param {string} units - metric | imperial | standard
 */
const getCurrentWeather = async (city, units = 'metric') => {
  logger.info(`Fetching current weather for "${city}" [units: ${units}]`);
  try {
    const { data } = await weatherClient.get('/weather', {
      params: { q: city, units },
    });
    return mapCurrentWeather(data);
  } catch (err) {
    handleApiError(err, `getCurrentWeather("${city}")`);
  }
};

/**
 * Fetches 5-day / 3-hour forecast for a given city.
 * @param {string} city
 * @param {string} units - metric | imperial | standard
 */
const getForecast = async (city, units = 'metric') => {
  logger.info(`Fetching 5-day forecast for "${city}" [units: ${units}]`);
  try {
    const { data } = await weatherClient.get('/forecast', {
      params: { q: city, units },
    });
    return mapForecast(data);
  } catch (err) {
    handleApiError(err, `getForecast("${city}")`);
  }
};

/**
 * Fetches location suggestions using the Geocoding API.
 * @param {string} city
 * @param {number} limit - max results (1–5)
 */
const getLocation = async (city, limit = 5) => {
  logger.info(`Fetching location data for "${city}" [limit: ${limit}]`);
  try {
    const { data } = await axios.get(`${WEATHER_GEO_URL}/direct`, {
      timeout: WEATHER_API_TIMEOUT,
      params: {
        q: city,
        limit,
        appid: WEATHER_API_KEY,
      },
    });

    if (!data || data.length === 0) {
      throw ApiError.notFound(`No locations found for "${city}"`);
    }

    return data.map(mapLocation);
  } catch (err) {
    handleApiError(err, `getLocation("${city}")`);
  }
};

/**
 * Fetches current weather by coordinates.
 * @param {number} lat
 * @param {number} lon
 * @param {string} units
 */
const getCurrentWeatherByCoords = async (lat, lon, units = 'metric') => {
  logger.info(`Fetching current weather for coords [${lat}, ${lon}] [units: ${units}]`);
  try {
    const { data } = await weatherClient.get('/weather', {
      params: { lat, lon, units },
    });
    return mapCurrentWeather(data);
  } catch (err) {
    handleApiError(err, `getCurrentWeatherByCoords(${lat}, ${lon})`);
  }
};

/**
 * Fetches 5-day forecast by coordinates.
 * @param {number} lat
 * @param {number} lon
 * @param {string} units
 */
const getForecastByCoords = async (lat, lon, units = 'metric') => {
  logger.info(`Fetching forecast for coords [${lat}, ${lon}] [units: ${units}]`);
  try {
    const { data } = await weatherClient.get('/forecast', {
      params: { lat, lon, units },
    });
    return mapForecast(data);
  } catch (err) {
    handleApiError(err, `getForecastByCoords(${lat}, ${lon})`);
  }
};

module.exports = { getCurrentWeather, getForecast, getLocation, getCurrentWeatherByCoords, getForecastByCoords };
