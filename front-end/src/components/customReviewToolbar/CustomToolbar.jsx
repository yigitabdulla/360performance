import React, { useState } from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import "./customToolbar.scss"
import 'react-toastify/dist/ReactToastify.css';
import EditReview from '../editReview/EditReview';
import DeleteReview from '../deleteReview/DeleteReview';


const CustomToolbar = ({selectedRows}) => {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditOpen = () => {
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleDeleteOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <GridToolbarContainer className='gridContainer'>
      <a className='item' onClick={handleEditOpen}>
        Düzenle
      </a>
      <a className='item' href="/reviews/weights">
        Ağırlıklar
      </a>
      <a className='item' href="/reviews/start">
        Başlat
      </a>
      <a className='item' href="/reviews/email">
        E-posta
      </a>
      <a className='item' href="/reviews/cancel">
        İptal et
      </a>
      <a className='item' onClick={handleDeleteOpen}>
        Sil
      </a>
      <a className='item' href="/reviews/finish">
        Bitir
      </a>
      <EditReview openEditModal={openEditModal} handleEditClose={handleEditClose} selectedRows={selectedRows}/>
      <DeleteReview openDeleteModal={openDeleteModal} handleDeleteOpen={handleDeleteOpen} handleDeleteClose={handleDeleteClose} selectedRows={selectedRows}/>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
