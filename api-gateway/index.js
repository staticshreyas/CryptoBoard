// index.js

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const proxy = require('express-http-proxy');
const config = require('config');

const authenticate = require('./middlewares/authenticate');

const app = express();

// **Connect to MongoDB**
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'CryptoBoard'
});

mongoose.connection.on('connected', () => {
  console.log('API Gateway connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error in API Gateway:', err);
});

// Trust the proxy (necessary for rate limiting behind Docker)
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/v1/data', authenticate, proxy(`http://data-processing:${config.get('dataProcessingServicePort')}`));
app.use('/api/v1/auth', require('./routes/auth'));

// Error Handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // Log the error for debugging
  res.status(500).send('Server Error');
});

// Start Server
const PORT = config.get('apiGatewayPort') || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
