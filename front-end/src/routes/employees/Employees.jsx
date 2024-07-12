import React, { useContext, useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { employeeData } from '../../lib/dummyData'
import * as XLSX from 'xlsx';
import { EmployeeContext } from '../../context/EmployeeContext';


export default function Employees() {

  const { rows, columns } = useContext(EmployeeContext);

  console.log('DataDisplay:', { rows, columns });

  /* const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstname', headerName: 'Name', width: 150 },
    { field: 'lastname', headerName: 'Lastname', width: 110 },
    { field: 'email', headerName: 'Email', width: 110 },
    { field: 'position', headerName: 'Position', width: 150 },
  ] */

  /* const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const [header, ...dataRows] = jsonData;
      const cols = header.map((col, index) => ({ field: index.toString(), headerName: col, width: 150 }));
      const rowData = dataRows.map((row, index) => {
        const rowObj = {};
        row.forEach((cell, cellIndex) => {
          rowObj[cellIndex.toString()] = cell;
        });
        return { id: index, ...rowObj };
      });

      console.log(cols[0].headerName)

      const transformedColumns = cols.map((col) => ({
        ...col,
        headerName: col.headerName.toUpperCase(),
      }));

      setColumns(transformedColumns);
      setRows(rowData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCustomButtonClick = () => {
    document.getElementById('fileInput').click();
  }; */



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
          />
        </div>
      </div>
    </div>
  )
}
