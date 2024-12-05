// import React from 'react';
// import { TextField, MenuItem, Grid, Typography } from '@mui/material';

// function ArticleFilter({ filters, setFilters }) {
//   const handleStartDateChange = (e) => {
//     const newStartDate = e.target.value;
//     if (filters.endDate && newStartDate > filters.endDate) {
//       alert('Start date cannot be after the end date.');
//     } else {
//       setFilters({ ...filters, startDate: newStartDate });
//     }
//   };

//   const handleEndDateChange = (e) => {
//     const newEndDate = e.target.value;
//     if (filters.startDate && newEndDate < filters.startDate) {
//       alert('End date cannot be before the start date.');
//     } else {
//       setFilters({ ...filters, endDate: newEndDate });
//     }
//   };

//   return (
//     <Grid container spacing={3}>
//       {/* Start Date */}
//       <Grid item xs={12} sm={4}>
//         <Typography variant="body2" gutterBottom>
//           Select Start Date
//         </Typography>
//         <TextField
//           label="Start Date"
//           type="date"
//           value={filters.startDate || ''}
//           onChange={handleStartDateChange}
//           InputLabelProps={{ shrink: true }}
//           inputProps={{ max: filters.endDate || undefined }} // Ensure start date doesn't exceed end date
//           fullWidth
//         />
//       </Grid>

//       {/* End Date */}
//       <Grid item xs={12} sm={4}>
//         <Typography variant="body2" gutterBottom>
//           Select End Date
//         </Typography>
//         <TextField
//           label="End Date"
//           type="date"
//           value={filters.endDate || ''}
//           onChange={handleEndDateChange}
//           InputLabelProps={{ shrink: true }}
//           inputProps={{ min: filters.startDate || undefined }} // Ensure end date doesn't precede start date
//           fullWidth
//         />
//       </Grid>

//       {/* Source Dropdown */}
//       <Grid item xs={12} sm={4}>
//         <Typography variant="body2" gutterBottom>
//           Select Source
//         </Typography>
//         <TextField
//           label="Source"
//           select
//           value={filters.source || ''}
//           onChange={(e) => setFilters({ ...filters, source: e.target.value })}
//           fullWidth
//           displayEmpty
//           SelectProps={{
//             displayEmpty: true,
//           }}
//         >
//           <MenuItem value="">
//             <em>All Sources</em>
//           </MenuItem>
//           <MenuItem value="CNN">CNN</MenuItem>
//           <MenuItem value="NBC News">NBC News</MenuItem>
//           <MenuItem value="X">X</MenuItem>
//           {/* Add additional sources here */}
//         </TextField>
//       </Grid>
//     </Grid>
//   );
// }

// export default ArticleFilter;

import React from 'react';
import { TextField, MenuItem, Grid, Typography } from '@mui/material';

function ArticleFilter({ filters, setFilters }) {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (filters.endDate && newStartDate > filters.endDate) {
      alert('Start date cannot be after the end date.');
    } else {
      setFilters({ ...filters, startDate: newStartDate });
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (filters.startDate && newEndDate < filters.startDate) {
      alert('End date cannot be before the start date.');
    } else {
      setFilters({ ...filters, endDate: newEndDate });
    }
  };

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    setFilters({
      ...filters,
      source: selectedSource,
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Start Date */}
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" gutterBottom>
          Select Start Date
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          value={filters.startDate || ''}
          onChange={handleStartDateChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: filters.endDate || undefined }} // Ensure start date doesn't exceed end date
          fullWidth
        />
      </Grid>

      {/* End Date */}
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" gutterBottom>
          Select End Date
        </Typography>
        <TextField
          label="End Date"
          type="date"
          value={filters.endDate || ''}
          onChange={handleEndDateChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: filters.startDate || undefined }} // Ensure end date doesn't precede start date
          fullWidth
        />
      </Grid>

      {/* Source Dropdown */}
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" gutterBottom>
          Select Source
        </Typography>
        <TextField
          label="Source"
          select
          value={filters.source || ''}
          onChange={handleSourceChange}
          fullWidth
          displayEmpty
          SelectProps={{
            displayEmpty: true,
          }}
        >
          <MenuItem value="">
            <em>All Sources</em>
          </MenuItem>
          <MenuItem value="CNN">CNN</MenuItem>
          <MenuItem value="NBC News">NBC News</MenuItem>
          <MenuItem value="X">X</MenuItem>
          {/* Add additional sources here */}
        </TextField>
      </Grid>
    </Grid>
  );
}

export default ArticleFilter;
