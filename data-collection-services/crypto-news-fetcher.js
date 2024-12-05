// crypto-news-fetcher.js

const finnhub = require('finnhub');
const { saveArticle } = require('./utils/database');
const config = require('config');

const fetchCryptoNews = async () => {
  try {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = config.get('finnhubApiKey');
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.generalNews('crypto', {}, (error, data) => {
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
          console.log(`Saved article: ${article.headline}`);
        });
      }
    });
  } catch (error) {
    console.error('Error fetching cryptocurrency news:', error.message);
  }
};

module.exports = fetchCryptoNews;


// const finnhub = require('finnhub');
// const { saveArticle } = require('./utils/database');
// const config = require('config');

//   try {
//     const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//     api_key.apiKey = config.get('finnhubApiKey');
//     const finnhubClient = new finnhub.DefaultApi();

//     finnhubClient.generalNews('crypto', {}, async (error, data) => {
//       if (error) {
//         console.error('Error fetching crypto news:', error);
//       } else {
//         const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

//         const articlesToSave = data.filter((article) => {
//           const articleDate = new Date(article.datetime);
//           return isInitial ? articleDate >= oneYearAgo : true;
//         });

//         for (const article of articlesToSave) {
//           await saveArticle({
//             title: article.headline,
//             url: article.url,
//             source: article.source,
//             dateFetched: new Date(article.datetime),
//           });
//           console.log(`Saved article: ${article.headline}`);
//         }

//         console.log(
//           `Successfully fetched and saved ${articlesToSave.length} articles ${
//             isInitial ? 'for the past year' : 'recently'
//           }.`
//         );
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching cryptocurrency news:', error.message);
//   }
// };

// module.exports = fetchCryptoNews;

// const finnhub = require('finnhub');
// const { saveArticle } = require('./utils/database');
// const config = require('config');

// const fetchCryptoNews = async (isInitial = false) => {
//   try {
//     // Configure Finnhub API key
//     const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//     api_key.apiKey = config.get('finnhubApiKey');
//     const finnhubClient = new finnhub.DefaultApi();

//     // Wrap the callback in a Promise
//     const getNews = () => {
//       return new Promise((resolve, reject) => {
//         finnhubClient.generalNews('crypto', {}, (error, data) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(data);
//           }
//         });
//       });
//     };

//     // Fetch the news
//     const data = await getNews();
//     const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

//     const articlesToSave = data.filter((article) => {
//       const articleDate = new Date(article.datetime);
//       return isInitial ? articleDate >= oneYearAgo : true;
//     });

//     for (const article of articlesToSave) {
//       await saveArticle({
//         title: article.headline,
//         url: article.url,
//         source: article.source,
//         dateFetched: new Date(article.datetime),
//       });
//       console.log(`Saved article: ${article.headline}`);
//     }

//     console.log(
//       `Successfully fetched and saved ${articlesToSave.length} articles ${
//         isInitial ? 'for the past year' : 'recently'
//       }.`
//     );
//   } catch (error) {
//     console.error('Error fetching cryptocurrency news:', error.message);
//   }
// };

// module.exports = fetchCryptoNews;



