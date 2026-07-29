const asyncWrapper = require('../utils/asyncWrapper');
const weatherService = require('../services/weather.service');

const getLocation = asyncWrapper(async (req, res) => {
  const { city } = req.query;
  const data = await weatherService.getLocation(city);
  res.json({ success: true, data });
});

module.exports = { getLocation };
