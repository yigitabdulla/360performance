import React, { useContext, useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./employees.scss"
import { DataGrid } from '@mui/x-data-grid';
import { EmployeeContext } from '../../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import GridToolbar from "../../components/toolbar/GridToolbar"


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
    if (column.field === "6" && column.headerName === "Avatar") {
      return {
        ...column,
        renderCell: (params) => (
          <img src={params.row["6"]} alt="Avatar" style={{ width: 35, height: 35, borderRadius: '50%', marginTop: '7px', marginLeft: '7px' }} />
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
        </div>
        <div style={{ height: 400, width: '80vw' }}>
          <DataGrid
            className='dataGrid'
            checkboxSelection
            rows={rows}
            columns={columnsWithAvatarRender}
            components={{
              Toolbar: GridToolbar,
            }}
            slots={{ toolbar: GridToolbar }}
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
              filterPanelOperator: 'Operatör',
              filterPanelColumns: 'Sütunlar',
              filterPanelInputLabel: 'Değer',
              filterPanelInputPlaceholder: 'Filtre değeri girin',
              filterOperatorContains: 'İçeren',
              filterOperatorEquals: 'Eşit',
              filterOperatorStartsWith: 'İle Başlayan',
              filterOperatorEndsWith: 'İle Biten',
              filterOperatorIsEmpty: 'Boş Olan',
              filterOperatorIsNotEmpty: 'Boş Olmayan',
              filterOperatorIsAnyOf: 'Herhangi Biri',
            }}
          />
        </div>
      </div>
    </div>
  )
}
