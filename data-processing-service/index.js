// index.js

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const authenticate = require('./middlewares/authenticate');

const app = express();

// Connect to MongoDB
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'CryptoBoard'
});

// Middlewares
app.use(express.json());

// Routes
app.use('/articles', authenticate, require('./routes/articles'));
app.use('/posts', authenticate, require('./routes/posts'));
app.use('/metrics', authenticate, require('./routes/metrics'));

// Start Server
const PORT = config.get('dataProcessingServicePort') || 5001;
app.listen(PORT, () => {
  console.log(`Data Processing Service running on port ${PORT}`);
});
