import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import './editReview.scss'

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
    const [inputType, setInputType] = useState('')

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        handleInputType(value)
    };

    const handleSelect = (value) => {
        const options = {
            "name": "Dönem Adı",
            "start": "Değerlendirme Başlangıç Tarihi",
            "finish": "Değerlendirme Bitiş Tarihi",
            "email": "E-posta",
            "phone": "Telefon"
        };

        return options[value] || "";
    };

    const handleInputType = (value) => {
        if (value === 'start' || value === 'finish') {
            setInputType('Date');
        } else if (value === 'email' || value === 'phone') {
            setInputType('Text');
        } else {
            setInputType('Option');
        }
    };

    function ChildModal() {
        const [innerEditOpen, setInnerEditOpen] = useState(false);
        const handleOpen = () => {
            setInnerEditOpen(true);
        };
        const handleClose = () => {
            setInnerEditOpen(false);
        };

        const notify = () => toast("Değerlendirmeler güncellendi!")

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
                                    <option value="name">Dönem Adı</option>
                                    <option value="start">Değerlendirme Başlangıç Tarihi</option>
                                    <option value="finish">Değerlendirme Bitiş Tarihi</option>
                                    <option value="email">E-Posta</option>
                                    <option value="phone">Telefon</option>
                                </select>

                                {
                                    inputType ? (
                                        inputType === "Date" ? (
                                            <>
                                                <span style={{ color: 'rgb(75, 75, 75)', marginTop: '10px', marginBottom: '-5px' }}>
                                                    {handleSelect(selectedOption)} Seçiniz
                                                </span>
                                                <input
                                                    style={{ color: 'rgb(75, 75, 75)', marginTop: '5px', padding: '3px' }}
                                                    required
                                                    type="date"
                                                    id="startDate"
                                                    name="startDate"
                                                />
                                            </>
                                        ) : inputType === "Text" ? (
                                            <>
                                                <span style={{ color: 'rgb(75, 75, 75)', marginTop: '10px', marginBottom: '-5px' }}>
                                                    {handleSelect(selectedOption)} Giriniz
                                                </span>
                                                <input
                                                    style={{ color: 'rgb(75, 75, 75)', marginTop: '5px', padding: '3px' }}
                                                    required
                                                    type="text"
                                                    id={selectedOption}
                                                    name={selectedOption}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span style={{ color: 'rgb(75, 75, 75)', marginTop: '10px', marginBottom: '-5px' }}>
                                                    {handleSelect(selectedOption)} Seçiniz
                                                </span>
                                                <select style={{ color: 'rgb(75, 75, 75)', marginTop: '5px' }}>
                                                    <option value={selectedOption}>{handleSelect(selectedOption)} seçin</option>
                                                    <option value="1">1.</option>
                                                    <option value="2">2.</option>
                                                    <option value="3">3.</option>
                                                    <option value="4">4.</option>
                                                    <option value="5">5.</option>
                                                </select>
                                            </>
                                        )
                                    ) : null
                                }

                            </div>
                        </div>
                    </div>
                    <ChildModal />
                </Box>
            </Modal>
            <ToastContainer containerId={2} position="bottom-right" />
        </>
    )
}
