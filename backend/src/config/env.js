module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_API_BASE_URL:
    process.env.WEATHER_API_BASE_URL ||
    'https://api.openweathermap.org/data/2.5',
};
