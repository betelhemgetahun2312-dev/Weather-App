const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const validate = require('../middleware/validate');

const cityValidation = query('city')
  .notEmpty().withMessage('city is required')
  .isString().withMessage('city must be a string')
  .trim()
  .isLength({ min: 2, max: 100 }).withMessage('city must be between 2 and 100 characters')
  .matches(/^[a-zA-Z\s\-'.]+$/).withMessage('city must contain only letters, spaces, hyphens, or apostrophes');

const limitValidation = query('limit')
  .optional()
  .isInt({ min: 1, max: 5 }).withMessage('limit must be an integer between 1 and 5')
  .toInt();

router.get('/', [cityValidation, limitValidation], validate, locationController.getLocation);

module.exports = router;
