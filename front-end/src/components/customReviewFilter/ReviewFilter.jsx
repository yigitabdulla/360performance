import React, { useState } from 'react';
import "./reviewFilter.scss";

const ReviewFilter = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    ilerleme: '',
    ad: '',
    durum: '',
    period: ''
  });

  const handleInputChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    applyFilters(newFilters); // Apply filters automatically on change
  };

  return (
    <div className="customReviewFilter">
      <div className='gridReviewContainer'>
        <div className="inputReviewContainer">
          <div className='singleReviewGrid'>
            <input placeholder='Değerlendirmeleri filtrele' className='gridText' onChange={handleInputChange} value={filters.ad} id="ad" name="ad" type="text" />
          </div>
          {/* <div className='singleReviewGrid'>
            <input placeholder='İlerleme' className='gridText' onChange={handleInputChange} value={filters.ilerleme} id="ilerleme" name="ilerleme" type="text" />
          </div> */}
          <div className='singleReviewGrid'>
            <select style={{color:'#8d8d8d'}} onChange={handleInputChange} name="period" value={filters.period}>
              <option value="">Tüm Dönemler</option>
              <option value="true">1.dönem</option>
              <option value="false">2.dönem</option>
            </select>
          </div>
          <div className='singleReviewGrid'>
            <select style={{color:'#8d8d8d'}} onChange={handleInputChange} name="durum" value={filters.durum}>
              <option value="">Tüm Durumlar</option>
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilter;
