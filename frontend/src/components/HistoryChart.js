import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

// Helper function to escape special characters in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HistoryChart({ data }) {
  // Define synonyms for cryptocurrencies
  const cryptoSynonyms = {
    Bitcoin: ['Bitcoin', 'BTC'],
    Dodgecoin: ['Dodge', 'Dodgecoin', 'DOGE'],
  };

  // Get a unified list of all dates
  const allDates = Array.from(
    new Set(
      data.map((article) =>
        new Date(article.dateFetched).toISOString().split('T')[0]
      )
    )
  ).sort();

  // Prepare data for multiple cryptocurrencies
  const datasets = Object.keys(cryptoSynonyms).map((cryptoName) => {
    // Get the synonyms for the current cryptocurrency
    const synonyms = cryptoSynonyms[cryptoName];

    // Filter articles that mention any synonym of the cryptocurrency
    const cryptoArticles = data.filter((article) =>
      synonyms.some((synonym) => {
        const escapedSynonym = escapeRegExp(synonym);
        const regex = new RegExp(`\\b${escapedSynonym}\\b`, 'i'); // 'i' flag makes it case insensitive
        return (
          regex.test(article.title || '') ||
          regex.test(article.description || '') ||
          regex.test(article.content || '')
        );
      })
    );

    // Group articles by date
    const articlesByDate = cryptoArticles.reduce((acc, article) => {
      const date = new Date(article.dateFetched).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Fill in missing dates with zeroes
    const mentionsCounts = allDates.map((date) => articlesByDate[date] || 0);

    return {
      label: `Articles/Posts Mentioning ${cryptoName} (${synonyms.join(', ')})`,
      data: mentionsCounts,
      fill: false,
      borderColor: getRandomColor(), // Use a random color for each cryptocurrency
    };
  });

  // Prepare chart data
  const chartData = {
    labels: allDates,
    datasets,
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Cryptocurrency Mention Trends</Typography>
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Mentions',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

// Helper function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default HistoryChart;
