import React from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./reviews.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function Reviews() {

  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div className='reviews'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="reviewsContainer">
        <div className='title'>
          <h1>Değerlendirmeler</h1>
          <a href='/reviews/add'>Değerlendirme Oluştur</a>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid className='dataGrid' checkboxSelection {...data} slots={{ toolbar: GridToolbar }} />
        </div>
      </div>
    </div>
  )
}
