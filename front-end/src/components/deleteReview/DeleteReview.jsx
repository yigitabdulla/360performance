import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function DeleteReview({ openDeleteModal, handleDeleteOpen, handleDeleteClose }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const notify = () => {
        toast("Değerlendirme silindi!");
        setIsDeleting(false);
        handleDeleteClose();
        console.log("Notify called");
    };

    const handleDelete = () => {
        if (isDeleting) {
            return;
        }
        setIsDeleting(true);
        console.log("Handle delete called");
        notify();
        
    };

    return (
        <>
            <Button onClick={handleDeleteOpen}>Open modal</Button>
            <Modal
                open={openDeleteModal}
                onClose={handleDeleteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <span onClick={handleDeleteClose} className='close-x2'>X</span>
                    <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid gray', color: 'rgb(75, 75, 75)' }} id="modal-modal-title" variant="h6" component="h2">
                        Değerlendirme silinsin ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                        <span style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center' }}>Değerlendirmeyi silmek istediğinize emin misiniz ? Bu işlem geri alınamaz.</span>
                            <span className="editButtons">
                                <button onClick={handleDeleteClose}>İptal</button>
                                <button disabled={isDeleting} onClick={handleDelete} style={{ backgroundColor: '#1976d2' }}>Evet</button>
                            </span>
                    </Typography>
                </Box>
            </Modal>
            <ToastContainer containerId={1} position="bottom-right" />
        </>
    )
}
