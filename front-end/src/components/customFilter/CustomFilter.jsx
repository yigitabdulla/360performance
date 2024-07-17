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
      <div className='gridContainer'>
        <div className="inputContainer">
          <div className='singleGrid'>
            <input placeholder='Ad' className='gridText' onChange={handleInputChange} value={filters.name} id="name" name="name" type="text" />
          </div>
          <div className='singleGrid'>
            <input placeholder='Soyad' className='gridText' onChange={handleInputChange} value={filters.lastname} id="lastname" name="lastname" type="text" />
          </div>
          <div className='singleGrid'>
            <input placeholder='Pozisyon' className='gridText' onChange={handleInputChange} value={filters.position} id="position" name="position" type="text" />
          </div>
          <div className='singleGrid'>
            <select onChange={handleInputChange} name="status">
              <option value="">Durum</option>
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </div>
        </div>
        <button
          className='filterButton'
          onClick={handleApplyFilters}
        >
          Filtreleri Uygula
        </button>
      </div>
    </div>
  );
};

export default CustomFilter;
