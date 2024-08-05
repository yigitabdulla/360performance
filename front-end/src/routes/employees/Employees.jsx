import React, { useContext, useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CustomToolbar from "../../components/toolbar/GridToolbar"
import CustomFilter from '../../components/customFilter/CustomFilter';
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees , updateEmployees } from '../../redux/slices/employeesSlice';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';


export default function Employees() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const { rows, columns, status, error } = useSelector((state) => state.employees);

  const [filteredRows, setFilteredRows] = useState(rows);

  /* console.log('DataDisplay:', { rows, columns }); */

  const handleRowClick = (params) => {
    console.log("row clicked")
    const employeeData = params.row;
    navigate(`/employees/${params.id}`, { state: { employee: employeeData } });
  };

  const applyFilters = (filters) => {
    const filteredData = rows.filter(row => {
      return (
        (filters.firstName ? row.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) : true) &&
        (filters.lastName ? row.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) : true) &&
        /* (filters.email ? row[2]?.toLowerCase().includes(filters.email.toLowerCase()) : true) && */
        (filters.position ? row.position.toLowerCase().includes(filters.position.toLowerCase()) : true) &&
        (filters.status ? row.status === filters.status : true)
      );
    });
    setFilteredRows(filteredData);
  };

  
  const token = cookies.access_token

  useEffect(() => {
    
    if (token) {
      dispatch(fetchEmployees(token));
    }
  }, [token]);

  useEffect(() => {
    if (rows.length > 0) {
      setFilteredRows(rows);
    }
  }, [rows]);

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
        </div>
        <CustomFilter applyFilters={applyFilters} />
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (<div style={{ height: 500, width: '80vw' }}>
          <DataGrid
            className='dataGrid'
            checkboxSelection
            rows={filteredRows}
            columns={columns.map((column) => ({
              ...column,
              width: '220',
            }))}
            components={{
              Toolbar: CustomToolbar,
            }}
            slots={{ toolbar: CustomToolbar }}
            onRowClick={handleRowClick}
            localeText={{
              toolbarDensity: 'Yoğunluk',
              toolbarDensityLabel: 'Yoğunluk',
              toolbarDensityCompact: 'Sıkışık',
              toolbarDensityStandard: 'Standart',
              toolbarDensityComfortable: 'Rahat',
              toolbarColumns: 'Sütunlar',
              toolbarFilters: 'Filtreler',
              toolbarExport: 'Dışa Aktar',
              columnMenuLabel: 'Sütunlar',
              columnMenuShowColumns: 'Sütunları Göster',
              columnMenuFilter: 'Filtrele',
              columnMenuHideColumn: 'Sütunu Gizle',
              columnMenuUnsort: 'Sıralamayı Kaldır',
              columnMenuSortAsc: 'Artan Sıralama',
              columnMenuSortDesc: 'Azalan Sıralama',
              columnMenuManageColumns: 'Kolonları yönet',
            }}
          />
        </div>)}
        
      </div>
    </div>
  )
}
