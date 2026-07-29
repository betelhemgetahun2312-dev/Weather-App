const { CLIENT_URL } = require('./env');

const corsOptions = {
  origin: CLIENT_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
