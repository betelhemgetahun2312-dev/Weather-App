const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const forecastController = require('../controllers/forecast.controller');
const validate = require('../middleware/validate');

router.get(
  '/',
  [query('city').notEmpty().withMessage('city query param is required').trim()],
  validate,
  forecastController.getForecast
);

module.exports = router;
