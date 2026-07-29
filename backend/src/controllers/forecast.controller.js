const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getForecast = asyncWrapper(async (req, res) => {
  const { city } = req.query;
  const data = await weatherService.getForecast(city);
  res.json({ success: true, data });
});

module.exports = { getForecast };
