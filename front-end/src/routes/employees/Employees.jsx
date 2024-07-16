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

  const columnsWithAvatarRender = columns.map((column) => {
    if (column.field === "6" && column.headerName === "AVATAR") {
        return {
            ...column,
            renderCell: (params) => (
                <img src={params.row["6"]} alt="Avatar" style={{ width: 35, height: 35, borderRadius: '50%', marginTop:'7px', marginLeft:'7px'}} />
            ),
        };
    }
    return column;
});


  return (
    <div className='employees'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="employeesContainer">
        <div className='title'>
          <div className="first">
            <h1>Çalışanlar</h1>
            <a className='addEmployee' href='/employees/add'>Çalışan Ekle</a>
          </div>
          <a className='addExcel' href="/employees/addExcel">Çalışanları İçe Aktar</a>
        </div>
        <div style={{ height: 400, width: '80vw' }}>
          <DataGrid
            className='dataGrid'
            checkboxSelection
            rows={rows}
            columns={columnsWithAvatarRender}
            slots={{ toolbar: GridToolbar }}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  )
}
