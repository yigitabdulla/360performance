import React, { useContext, useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid } from '@mui/x-data-grid';
import { EmployeeContext } from '../../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import CustomToolbar from "../../components/toolbar/GridToolbar"
import CustomFilter from '../../components/customFilter/CustomFilter';


export default function Employees() {
  const navigate = useNavigate();

  const { rows, columns } = useContext(EmployeeContext);
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
        (filters.name ? row[0]?.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
        (filters.lastname ? row[1]?.toLowerCase().includes(filters.lastname.toLowerCase()) : true) &&
        /* (filters.email ? row[2]?.toLowerCase().includes(filters.email.toLowerCase()) : true) && */
        (filters.position ? row[3]?.toLowerCase().includes(filters.position.toLowerCase()) : true) &&
        (filters.status ? row[4] === filters.status : true)
      );
    });
    setFilteredRows(filteredData);
  };

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
        <div style={{ height: 500, width: '80vw' }}>
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
        </div>
      </div>
    </div>
  )
}
