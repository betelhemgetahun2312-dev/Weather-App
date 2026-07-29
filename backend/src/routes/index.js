const express = require('express');
const router = express.Router();

router.use('/weather', require('./weather.routes'));
router.use('/forecast', require('./forecast.routes'));
router.use('/location', require('./location.routes'));

module.exports = router;
