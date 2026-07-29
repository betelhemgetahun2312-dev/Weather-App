const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getLocation = asyncWrapper(async (req, res) => {
  const { city, limit = 5 } = req.query;
  const data = await weatherService.getLocation(city, Number(limit));
  res.json({ success: true, data });
});

module.exports = { getLocation };
