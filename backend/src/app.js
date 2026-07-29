const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes/index');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));
app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
