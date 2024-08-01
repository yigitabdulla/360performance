import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import './editReview.scss'
import { useDispatch } from 'react-redux';
import {showToast} from "../../redux/slices/toastifySlice"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function EditReview({ openEditModal, handleEditClose }) {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
    };

    const handleSelect = (value) => {
        const options = {
            "start": "Değerlendirme Başlangıç Tarihi",
            "finish": "Değerlendirme Bitiş Tarihi",
        };

        return options[value] || "";
    };

    useEffect(() => {
        if (!openEditModal) {
            setSelectedOption('');
        }
    }, [openEditModal]);

    function ChildModal() {
        const [innerEditOpen, setInnerEditOpen] = useState(false);
        const handleOpen = () => {
            setInnerEditOpen(true);
        };
        const handleClose = () => {
            setInnerEditOpen(false);
        };

        return (
            <React.Fragment>
                <div className="editButtons">
                    <button onClick={handleEditClose}>İptal</button>
                    <button style={{ backgroundColor: '#1976d2' }} onClick={handleOpen}>Düzenle</button>
                </div>
                <Modal
                    open={innerEditOpen}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <span onClick={handleClose} className='close-x2'>X</span>
                        <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid gray', color: 'rgb(75, 75, 75)' }} id="modal-modal-title" variant="h6" component="h2">
                            Uyarı
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <span style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center' }}>Güncellemek istediğinize emin misiniz ?</span>
                            <span className="editButtons">
                                <button onClick={handleClose}>İptal</button>
                                <button onClick={notify} style={{ backgroundColor: '#1976d2' }}>Evet</button>
                            </span>
                        </Typography>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }

    const dispatch = useDispatch();

    const notify = () => {
        dispatch(showToast({ message: "Değerlendirmeler güncellendi!", type: 'success' }));
    };

    return (
        <>
            <Modal
                open={openEditModal}
                onClose={handleEditClose}
            >
                <Box sx={{ ...style, margin: 0, padding: 0, borderRadius: '10px', border: 'none' }}>
                    <div className="wrapper">
                        <div className="editContainer">
                            <span onClick={handleEditClose} className='close-x'>X</span>
                            <h2>Değerlendirme Düzenle</h2>
                            <div className="inputs">
                                <span>Değerlendirmek istediğiniz alanı seçiniz</span>
                                <select style={{ color: 'rgb(75, 75, 75)' }} onChange={handleSelectChange} name="status">
                                    <option disabled selected hidden value="">Bir alan seçin</option>
                                    <option value="start">Değerlendirme Başlangıç Tarihi</option>
                                    <option value="finish">Değerlendirme Bitiş Tarihi</option>
                                </select>

                                {
                                    selectedOption && (
                                        <>
                                            <span style={{ color: 'rgb(75, 75, 75)', marginTop: '10px', marginBottom: '-5px' }}>
                                                {handleSelect(selectedOption)} Seçiniz
                                            </span>
                                            <input
                                                style={{ color: 'rgb(75, 75, 75)', marginTop: '5px', padding: '3px' }}
                                                required
                                                type="date"
                                                id={selectedOption}
                                                name={selectedOption}
                                            />
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <ChildModal />
                </Box>
            </Modal>
        </>
    )
}
