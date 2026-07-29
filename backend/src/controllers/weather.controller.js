const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getWeather = asyncWrapper(async (req, res) => {
  const { city, lat, lon, units = 'metric' } = req.query;
  const data = city
    ? await weatherService.getCurrentWeather(city, units)
    : await weatherService.getCurrentWeatherByCoords(parseFloat(lat), parseFloat(lon), units);
  res.json({ success: true, data });
});

module.exports = { getWeather };
