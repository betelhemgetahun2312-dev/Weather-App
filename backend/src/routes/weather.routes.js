const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');
const validate = require('../middleware/validate');

const cityValidation = query('city')
  .optional()
  .isString().withMessage('city must be a string')
  .trim()
  .isLength({ min: 2, max: 100 }).withMessage('city must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s\-'.]+$/).withMessage('city must contain only letters, spaces, hyphens, or apostrophes');

const latValidation = query('lat')
  .optional()
  .isFloat({ min: -90, max: 90 }).withMessage('lat must be a number between -90 and 90');

const lonValidation = query('lon')
  .optional()
  .isFloat({ min: -180, max: 180 }).withMessage('lon must be a number between -180 and 180');

const unitsValidation = query('units')
  .optional()
  .isIn(['metric', 'imperial', 'standard'])
  .withMessage('units must be metric, imperial, or standard');

const cityOrCoordsRequired = (req, res, next) => {
  const { city, lat, lon } = req.query;
  if (!city && (lat === undefined || lon === undefined)) {
    return res.status(400).json({
      success: false,
      errors: [{ msg: 'Provide either city or both lat and lon' }],
    });
  }
  next();
};

router.get('/', [cityValidation, latValidation, lonValidation, unitsValidation], validate, cityOrCoordsRequired, weatherController.getWeather);

module.exports = router;
