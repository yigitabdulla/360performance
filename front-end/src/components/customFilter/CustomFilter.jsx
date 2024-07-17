import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import "./customFilter.scss";

const CustomFilter = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    name: '',
    lastname: '',
    email: '',
    position: '',
    status: ''
  });

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  return (
    <div className="customFilter">
      <Grid className='gridContainer' container spacing={1} >
        <Grid className='singleGrid' item xs={2}>
          <TextField
            className='gridText'
            label="Ad"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid className='singleGrid' item xs={2}>
          <TextField
            className='gridText'
            label="Soyad"
            name="lastname"
            value={filters.lastname}
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid className='singleGrid' item xs={2}>
          <TextField
            className='gridText'
            label="E-posta"
            name="email"
            value={filters.email}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid> */}
        <Grid className='singleGrid' item xs={2}>
          <TextField
            className='gridText'
            label="Pozisyon"
            name="position"
            value={filters.position}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid className='singleGrid' item xs={2}>
          <FormControl className='gridText'>
            <InputLabel>Durum</InputLabel>
            <Select
              label="Durum"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <MenuItem value="true">Aktif</MenuItem>
              <MenuItem value="false">Pasif</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid className='singleGrid' item xs={2}>
          <button
            className='filterButton'
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
          >
            Filtreleri Uygula
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomFilter;
