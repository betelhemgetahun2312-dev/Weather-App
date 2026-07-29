const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
