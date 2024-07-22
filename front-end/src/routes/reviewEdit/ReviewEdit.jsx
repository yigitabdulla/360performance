import React, { useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./reviewEdit.scss"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ReviewEdit() {

    const [selectedOption, setSelectedOption] = useState('');
    const [additionalSelects, setAdditionalSelects] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        if (value) {
            setAdditionalSelects(value);
        }
    };

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


    console.log(selectedOption)
    return (
        <div className='reviewEdit'>
            <div className="editContainer">
                <h2>Değerlendirme Düzenle</h2>
                <div className="inputs">
                    <span>Değerlendirmek istediğiniz alanı seçiniz</span>
                    <select style={{ color: 'rgb(75, 75, 75)' }} onChange={handleSelectChange} name="status">
                        <option value="">Bir alan seçin</option>
                        <option value="name">Dönem Adı</option>
                        <option value="start">Değerlendirme Başlangıç Tarihi</option>
                        <option value="finish">Değerlendirme Bitiş Tarihi</option>
                        <option value="email">E-Posta</option>
                        <option value="phone">Telefon</option>
                    </select>

                    {
                        selectedOption && <select style={{ color: 'rgb(75, 75, 75)', marginTop: '10px' }}>
                            <option value={selectedOption}>{selectedOption == "name" ? "Dönem adı" : ""} seçin</option>
                            <option value="1">1.</option>
                            <option value="2">2.</option>
                            <option value="3">3.</option>
                            <option value="4">4.</option>
                            <option value="5">5.</option>
                        </select>
                    }
                    <div className="buttons">
                        <button>İptal</button>
                        <button onClick={handleOpen}>Düzenle</button>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Güncellemek istediğinize emin misiniz ?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="modalButtons">
                                    <button>İptal</button>
                                    <button>Evet</button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
