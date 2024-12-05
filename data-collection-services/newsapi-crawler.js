// newsapi-crawler.js

const axios = require('axios');
const { saveArticle } = require('./utils/database');
const config = require('config');

const fetchTopNews = async () => {
  try {
    const query = encodeURIComponent("cryptocurrency OR bitcoin OR ethereum");

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: "cryptocurrency OR bitcoin OR ethereum",
        sources: 'CNN,nbc-news,bbc-news,bloomberg,business-insider,cbc-news,cbs-news,crypto-coins-news',
        apiKey: config.get('newsApiKey'),
      },
    });

    const articles = response.data.articles;

    for (const article of articles) {
      

      await saveArticle({
        title: article.title,
        url: article.url,
        source: article.source.name,
        dateFetched: new Date(article.publishedAt),
      });
    }

    console.log('Top news articles fetched and saved.');
  } catch (error) {
    console.error('Error fetching top news articles:', error.message);
  }
};

module.exports = fetchTopNews;
