const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getForecast = asyncWrapper(async (req, res) => {
  const { city, units = 'metric' } = req.query;
  const data = await weatherService.getForecast(city, units);
  res.json({ success: true, data });
});

module.exports = { getForecast };
