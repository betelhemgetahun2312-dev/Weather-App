const axios = require('axios');
const { WEATHER_API_KEY, WEATHER_API_BASE_URL, WEATHER_API_TIMEOUT } = require('./env');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

const weatherClient = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  timeout: WEATHER_API_TIMEOUT,
  params: {
    appid: WEATHER_API_KEY,
    units: 'metric',
  },
});

weatherClient.interceptors.request.use((config) => {
  logger.info(`[OpenWeather] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

weatherClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      throw ApiError.timeout('OpenWeather API request timed out');
    }

    if (!error.response) {
      throw ApiError.serviceUnavailable('Unable to reach OpenWeather API');
    }

    return Promise.reject(error);
  }
);

module.exports = weatherClient;
