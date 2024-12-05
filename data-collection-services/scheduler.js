// scheduler.js

const schedule = require('node-schedule');
const fetchTopNews = require('./newsapi-crawler');
const fetchXPosts = require('./x-crawler');
const fetchCryptoNews = require('./crypto-news-fetcher');
const { connectDB } = require('./utils/database');

// const startScheduler = async () => {
//   try {
//     // Connect to MongoDB and wait for the connection to be established
//     await connectDB();
//     console.log('Database connection established.');

//     // Initial fetch of articles from Finnhub for the past year
//     console.log('Fetching initial cryptocurrency news for the past year...');
//     await fetchCryptoNews(true);

//     // Schedule tasks to run every hour for X posts
//     schedule.scheduleJob('0 * * * *', () => {
//       console.log('Fetching recent X posts...');
//       fetchXPosts();
//     });

//     // Schedule daily fetch for cryptocurrency news
//     schedule.scheduleJob('0 0 * * *', () => {
//       console.log('Fetching daily cryptocurrency news...');
//       fetchCryptoNews(false);
//     });

//     console.log('Data collection scheduler is running.');
//   } catch (error) {
//     console.error('Error starting scheduler:', error);
//     process.exit(1);
//   }
// };

// // Start the scheduler
// startScheduler();


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

    // Schedule tasks
    // schedule.scheduleJob('*/5 * * * *', () => {
    //   // Fetch prices every 5 minutes
    //   fetchCryptoPrices();
    // });

    console.log('Data collection scheduler is running.');
  } catch (error) {
    console.error('Error starting scheduler:', error);
    process.exit(1);
  }
};

// Start the scheduler
startScheduler();



