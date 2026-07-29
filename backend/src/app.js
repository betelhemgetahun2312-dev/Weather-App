const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const weatherRoutes = require('./routes/weather.routes');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/weather', weatherRoutes);

module.exports = app;
