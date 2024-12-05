// shared-models/CryptoPrice.js

const mongoose = require('mongoose');

const CryptoPriceSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  date: Date,
});

module.exports = mongoose.model('CryptoPrice', CryptoPriceSchema);
