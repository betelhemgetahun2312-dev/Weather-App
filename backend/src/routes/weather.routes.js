const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');
const validate = require('../middleware/validate');

const cityValidation = query('city')
  .notEmpty().withMessage('city is required')
  .isString().withMessage('city must be a string')
  .trim()
  .isLength({ min: 2, max: 100 }).withMessage('city must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s\-'.]+$/).withMessage('city must contain only letters, spaces, hyphens, or apostrophes');

const unitsValidation = query('units')
  .optional()
  .isIn(['metric', 'imperial', 'standard'])
  .withMessage('units must be metric, imperial, or standard');

router.get('/', [cityValidation, unitsValidation], validate, weatherController.getWeather);

module.exports = router;
