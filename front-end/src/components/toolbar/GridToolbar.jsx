import React from 'react';
import { GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import "./gridToolbar.scss"

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton />
      <GridToolbarDensitySelector /> */}
      <a className='importExcel' href="/employees/addExcel">
        <SaveAltIcon style={{ transform: 'rotate(180deg)', fontSize: '20px', marginRight: '7px'}}/>İÇE AKTAR
      </a>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
