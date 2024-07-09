import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    propertyType: '',
    priceRange: '',
    location: '',
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchClick = () => {
    onSearch(searchQuery, filter);
  };

  return (
    <Grid container spacing={2} alignItems="center" justify="center" className="search-filter-container">
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Search Properties"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          fullWidth
          select
          label="Property Type"
          name="propertyType"
          variant="outlined"
          value={filter.propertyType}
          onChange={handleFilterChange}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="condo">Condo</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          fullWidth
          select
          label="Price Range"
          name="priceRange"
          variant="outlined"
          value={filter.priceRange}
          onChange={handleFilterChange}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="0-1000">$0 - $1000</MenuItem>
          <MenuItem value="1000-2000">$1000 - $2000</MenuItem>
          <MenuItem value="2000+">$2000+</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          fullWidth
          select
          label="Location"
          name="location"
          variant="outlined"
          value={filter.location}
          onChange={handleFilterChange}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="new-york">New York</MenuItem>
          <MenuItem value="los-angeles">Los Angeles</MenuItem>
          <MenuItem value="chicago">Chicago</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchFilter;
