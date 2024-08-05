import React, { useState } from 'react';
import "./reviewFilter.scss";
import { useSelector } from 'react-redux';

const ReviewFilter = ({ applyFilters }) => {
  const data = useSelector(state => state.reviews.data);
  const [filters, setFilters] = useState({
    id: '',
    evaluationName: '',
    termName: '',
    startDate: ''
    //durum: '',
    //period: ''
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
            <input placeholder='Değerlendirmeleri filtrele' className='gridText' onChange={handleInputChange} value={filters.evaluationName} id="evaluationName" name="evaluationName" type="text" />
          </div>
          {/* <div className='singleReviewGrid'>
            <input placeholder='İlerleme' className='gridText' onChange={handleInputChange} value={filters.ilerleme} id="ilerleme" name="ilerleme" type="text" />
          </div> */}
          <div className='singleReviewGrid'>
            <select style={{color:'#8d8d8d'}} onChange={handleInputChange} name="termName" value={filters.termName}>
              <option value="">Tüm Dönemler</option>
              {data?.map(review => <option key={review.id} value={review.termName}>{review.termName}</option>)}
            </select>
          </div>
          <div className='singleReviewGrid'>
            <select style={{color:'#8d8d8d'}} onChange={handleInputChange} name="id" value={filters.id}>
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
