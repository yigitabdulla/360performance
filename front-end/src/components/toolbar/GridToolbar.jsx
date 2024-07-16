import React from 'react';
import { GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import UploadIcon from '@mui/icons-material/Upload';
import "./gridToolbar.scss"

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <a className='importExcel' href="/employees/addExcel">
        <UploadIcon/>İÇE AKTAR
      </a>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
