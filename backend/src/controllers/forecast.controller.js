const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getForecast = asyncWrapper(async (req, res) => {
  const { city, lat, lon, units = 'metric' } = req.query;
  const data = city
    ? await weatherService.getForecast(city, units)
    : await weatherService.getForecastByCoords(parseFloat(lat), parseFloat(lon), units);
  res.json({ success: true, data });
});

module.exports = { getForecast };
