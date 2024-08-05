import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import "./customFilter.scss";

const CustomFilter = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
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
            <input placeholder='Ad' className='gridText' onChange={handleInputChange} value={filters.firstName} id="firstName" name="firstName" type="text" />
          </div>
          <div className='singleGrid'>
            <input placeholder='Soyad' className='gridText' onChange={handleInputChange} value={filters.lastName} id="lastName" name="lastName" type="text" />
          </div>
          <div className='singleGrid'>
            <input placeholder='Pozisyon' className='gridText' onChange={handleInputChange} value={filters.position} id="position" name="position" type="text" />
          </div>
          <div className='singleGrid'>
            <select style={{color:'#8d8d8d'}}  onChange={handleInputChange} name="status">
              <option value="">Durum</option>
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </div>
        </div>
        <div>
          <button
            className='filterButton'
            onClick={handleApplyFilters}
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomFilter;
