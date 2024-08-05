import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import {showToast} from "../../redux/slices/toastifySlice"
import "./deleteReview.scss"
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { deleteReviewsSuccess } from '../../redux/slices/reviewsSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteReview({ openDeleteModal, handleDeleteOpen, handleDeleteClose, selectedRows }) {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['access_token']);

    const notifyDelete = () => {
        dispatch(showToast({ message: "Değerlendirme silindi!", type: 'success' }));
    };

    const notifyError = () => {
        dispatch(showToast({ message: "Değerlendirme silinemedi!", type: 'error' }));
    };

    const [isDeleting, setIsDeleting] = useState(false);

    const notify = () => {
        notifyDelete()
        setIsDeleting(false);
        handleDeleteClose();
        console.log("Notify called");
    };

    const handleDelete = async () => {
        if (isDeleting) {
          return;
        }
        setIsDeleting(true);
      
        try {
          const deleteRequests = selectedRows.map(id =>
            axios.delete(`http://localhost:8080/api/evaluations/deleteEvaluation/${id}`, {
              headers: {
                Authorization: `Bearer ${cookies.access_token}`
              }
            })
          );
          await Promise.all(deleteRequests);
          notify();
      
          // Dispatch the action to update the Redux state
          dispatch(deleteReviewsSuccess(selectedRows));
      
          console.log('All selected rows have been deleted');
        } catch (error) {
          console.error('Error deleting selected rows:', error);
          notifyError();
        } finally {
          setIsDeleting(false);
        }
      };
    

    return (
        <>
            <Modal
                open={openDeleteModal}
                onClose={handleDeleteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <span onClick={handleDeleteClose} className='close-button'>X</span>
                    <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid gray', color: 'rgb(75, 75, 75)' }} id="modal-modal-title" variant="h6" component="h2">
                        Değerlendirme silinsin mi?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                        <span style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center' }}>Değerlendirmeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</span>
                            <span className="edit-buttons">
                                <button onClick={handleDeleteClose} className='cancel-button'>İptal</button>
                                <button disabled={isDeleting} onClick={handleDelete} className='deleteButton'>Evet</button>
                            </span>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
