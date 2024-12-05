// SourceRatioChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SourceRatioChart({ data }) {
  // Define news and social media sources
  const socialMediaSources = ['X']; 
  // Count articles from news sources and social media
  let newsCount = 0;
  let socialMediaCount = 0;

  data.forEach((article) => {
  if(socialMediaSources.includes(article.source)) {
      socialMediaCount++;
    }
    else{
      newsCount++;
    }
  });

  const chartData = {
    labels: ['News Sources', 'Social Media'],
    datasets: [
      {
        label: 'Number of Articles/Posts',
        data: [newsCount, socialMediaCount],
        backgroundColor: ['green', 'purple'],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Source Ratio</Typography>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
}

export default SourceRatioChart;
