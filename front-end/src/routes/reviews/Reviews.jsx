import React, { useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./reviews.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { reviewData } from "../../lib/reviews"
import ReviewFilter from '../../components/customReviewFilter/ReviewFilter';
import CustomToolbar from '../../components/customReviewToolbar/CustomToolbar';
import ReviewsNavbar from '../../components/reviewsNavbar/ReviewsNavbar';
import { useSelector } from "react-redux"



export default function Reviews() {

  const [selectionModel, setSelectionModel] = useState([]);

  const step = useSelector(state => state.step.step);


  const columns = [
    {
      field: 'ilerleme',
      headerName: 'Durum',
      width: 150,
      renderCell: (params) => `%${params.value}`
    },
    { field: 'ad', headerName: 'Değerlendirme Adı', width: 250 },
    { field: 'tarih', headerName: 'Başlangıç-Bitiş Tarihi', width: 200 },
    { field: 'durum', headerName: '', width: 150 }
  ];
  const rows = reviewData

  const [filteredRows, setFilteredRows] = useState(rows);

  const applyFilters = (filters) => {
    const filteredData = rows.filter(row => {
      return (
        (filters.ilerleme ? row.ilerleme?.toLowerCase().includes(filters.ilerleme.toLowerCase()) : true) &&
        (filters.ad ? row.ad?.toLowerCase().includes(filters.ad.toLowerCase()) : true) &&
        (filters.durum ? row.durum.toString() === filters.durum : true)
      );
    });

    setFilteredRows(filteredData);
  };




  return (
    <div className='reviews'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="reviewsContainer">
        <div className="reviewNavbar"><ReviewsNavbar /></div>
        {step === null ?<> <div className='title'>
          <h1>Değerlendirmeler</h1>
          <a href='/reviews/add'>Değerlendirme Oluştur</a>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <ReviewFilter applyFilters={applyFilters} />
          <DataGrid
            className='dataGrid'
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={itm => setSelectionModel(itm)}
            slots={{ toolbar: selectionModel.length > 0 ? CustomToolbar : null }}
          />
        </div></> : <div></div>}

      </div>
    </div>
  )
}
