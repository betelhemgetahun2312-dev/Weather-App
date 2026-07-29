const logger = require('../utils/logger');

const env = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_API_BASE_URL:
    process.env.WEATHER_API_BASE_URL ||
    'https://api.openweathermap.org/data/2.5',
  WEATHER_GEO_URL:
    process.env.WEATHER_GEO_URL ||
    'http://api.openweathermap.org/geo/1.0',
  WEATHER_API_TIMEOUT: parseInt(process.env.WEATHER_API_TIMEOUT || '8000', 10),
};

const validateEnv = () => {
  const required = ['WEATHER_API_KEY'];
  const missing = required.filter((key) => !env[key]);

  if (missing.length) {
    logger.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  logger.info('Environment variables validated successfully');
};

module.exports = { ...env, validateEnv };
