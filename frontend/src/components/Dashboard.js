import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import Logout from './Logout';
import ArticleFilter from './ArticleFilter';
import APIService from '../services/api';
import HistoryChart from './HistoryChart';
import SourceRatioChart from './SourceRatioChart';

function Dashboard({ setAuth }) {
  const [data, setData] = useState([]); // Combined articles and posts
  const [filteredData, setFilteredData] = useState([]); // Data filtered by date and source
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    source: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams(filters).toString();

        // Fetch articles
        const articlesPromise = APIService.getData(`/articles?${queryParams}`, token);

        // Fetch posts
        const postsPromise = APIService.getData(`/posts?${queryParams}`, token);

        const [articles, posts] = await Promise.all([articlesPromise, postsPromise]);

        // Add a type property to distinguish between articles and posts
        const articlesWithType = articles.map((item) => ({ ...item, type: 'article' }));
        const postsWithType = posts.map((item) => ({ ...item, type: 'post' }));

        // Combine and sort the data by dateFetched
        const combinedData = [...articlesWithType, ...postsWithType]
          .filter(item => new Date(item.dateFetched).getFullYear() !== 1970) // Ignore data with year 1970
          .sort((a, b) => new Date(b.dateFetched) - new Date(a.dateFetched));

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  useEffect(() => {
    // Apply date range and source filter
    let filtered = data;

    if (filters.startDate) {
      filtered = filtered.filter((item) => new Date(item.dateFetched) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter((item) => new Date(item.dateFetched) <= new Date(filters.endDate));
    }

    if (filters.source) {
      filtered = filtered.filter((item) =>
        filters.source === 'X' ? item.type === 'post' : item.type === 'article' && item.source === filters.source
      );
    }

    setFilteredData(filtered);
  }, [data, filters]);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            CryptoBoard Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
          <Logout setAuth={setAuth} />
        </Grid>
        <Grid item xs={12}>
          <ArticleFilter filters={filters} setFilters={setFilters} />
        </Grid>
        {/* Pass filtered data to subcomponents */}
        <Grid item xs={12} md={12}>
          <HistoryChart data={filteredData} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SourceRatioChart data={filteredData} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
