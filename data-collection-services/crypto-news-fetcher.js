// crypto-news-fetcher.js

const finnhub = require('finnhub');
const { saveArticle } = require('./utils/database');
const config = require('config');

const fetchCryptoNews = async () => {
  try {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = config.get('finnhubApiKey');
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.marketNews('crypto', {}, (error, data) => {
      if (error) {
        console.error('Error fetching crypto news:', error);
      } else {
        data.forEach(async (article) => {
          await saveArticle({
            title: article.headline,
            url: article.url,
            source: article.source,
            dateFetched: new Date(article.datetime),
          });
        });
      }
    });
  } catch (error) {
    console.error('Error fetching cryptocurrency news:', error.message);
  }
};

module.exports = fetchCryptoNews;
