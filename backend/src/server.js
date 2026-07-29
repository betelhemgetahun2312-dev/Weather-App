require('dotenv').config();
const { PORT, validateEnv } = require('./config/env');
const logger = require('./utils/logger');

validateEnv();

const app = require('./app');

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info('Available endpoints:');
  logger.info(`  GET /api/health`);
  logger.info(`  GET /api/weather?city=London&units=metric`);
  logger.info(`  GET /api/forecast?city=London&units=metric`);
  logger.info(`  GET /api/location?city=London&limit=5`);
});
