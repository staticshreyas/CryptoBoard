// scheduler.js

const schedule = require('node-schedule');
const fetchTopNews = require('./newsapi-crawler');
const fetchXPosts = require('./x-crawler');
const fetchCryptoNews = require('./crypto-news-fetcher');
const { connectDB } = require('./utils/database');

const startScheduler = async () => {
  try {
    // Connect to MongoDB and wait for the connection to be established
    await connectDB();

    console.log('Database connection established.');

    // Initial fetch
    fetchTopNews();
    fetchXPosts();
    fetchCryptoNews();

    // Schedule tasks to run every hour
    schedule.scheduleJob('0 * * * *', () => {
      fetchTopNews();
      fetchXPosts();
      fetchCryptoNews();
    });

    console.log('Data collection scheduler is running.');
  } catch (error) {
    console.error('Error starting scheduler:', error);
    process.exit(1);
  }
};

// Start the scheduler
startScheduler();



