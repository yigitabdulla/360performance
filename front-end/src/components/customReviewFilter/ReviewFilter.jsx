import React, { useState } from 'react';
import "./reviewFilter.scss";

const ReviewFilter = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    ilerleme: '',
    ad: '',
    tarih: '',
    durum: '',
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
            <input placeholder='Değerlendirme Adı' className='gridText' onChange={handleInputChange} value={filters.ad} id="ad" name="ad" type="text" />
          </div>
          <div className='singleGrid'>
            <input placeholder='İlerleme' className='gridText' onChange={handleInputChange} value={filters.ilerleme} id="ilerleme" name="ilerleme" type="text" />
          </div>
          <div className='singleGrid'>
            <select style={{color:'#8d8d8d'}}  onChange={handleInputChange} name="durum">
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

export default ReviewFilter;
