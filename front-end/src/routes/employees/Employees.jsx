import React from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function Employees() {

  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div className='employees'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="employeesContainer">
        <div className='title'>
          <h1>Çalışanlar</h1>
          <a href='/employees/add'>Çalışan Ekle</a>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid className='dataGrid' checkboxSelection {...data} slots={{ toolbar: GridToolbar }} />
        </div>
      </div>
    </div>
  )
}
