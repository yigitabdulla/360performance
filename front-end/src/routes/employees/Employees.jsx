import React, { useContext, useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { EmployeeContext } from '../../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';


export default function Employees() {
  const navigate = useNavigate();

  const { rows, columns } = useContext(EmployeeContext);

  /* console.log('DataDisplay:', { rows, columns }); */

  const handleRowClick = (params) => {
    console.log("row clicked")
    const employeeData = params.row;
    navigate(`/employees/${params.id}`, { state: { employee: employeeData } });
  };

  return (
    <div className='employees'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="employeesContainer">
        <div className='title'>
          <h1>Çalışanlar</h1>
          <div className="buttons">
            {/* <input id="fileInput" style={{ display: 'none' }} type="file" accept=".xlsx, .xls" onChange={handleFileUpload} /> */}
            {/* <button onClick={handleCustomButtonClick}>Çalışanları İçe Aktar</button> */}
            <a className='addExcel' href="/employees/addExcel">Çalışanları İçe Aktar</a>
            <a className='addEmployee' href='/employees/add'>Çalışan Ekle</a>
            
          </div>
        </div>
        <div style={{ height: 400, width: '80vw' }}>
          <DataGrid
            className='dataGrid'
            checkboxSelection
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  )
}
