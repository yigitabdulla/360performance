import React from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { employeeData } from '../../lib/dummyData'

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function Employees() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 150 },
    { field: 'lastname', headerName: 'Lastname', width: 110 },
    { field: 'email', headerName: 'Email', width: 110 },
    { field: 'position', headerName: 'Position', width: 150 },
  ]



  return (
    <div className='employees'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="employeesContainer">
        <div className='title'>
          <h1>Çalışanlar</h1>
          <button onClick={() => console.log}></button>
          <a href='/employees/add'>Çalışan Ekle</a>
        </div>
        <div style={{ height: 400, width: '80vw' }}>
          <DataGrid
            className='dataGrid'
            checkboxSelection
            rows={employeeData}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  )
}
