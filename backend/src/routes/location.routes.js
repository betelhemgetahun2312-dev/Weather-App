const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const validate = require('../middleware/validate');

router.get(
  '/',
  [query('city').notEmpty().withMessage('city query param is required').trim()],
  validate,
  locationController.getLocation
);

module.exports = router;
