import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import './editReview.scss'
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from "../../redux/slices/toastifySlice"
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { updateReviewSuccess } from '../../redux/slices/reviewsSlice';


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

export default function EditReview({ openEditModal, handleEditClose, selectedRows }) {
    const [cookies, setCookie] = useCookies(['access_token']);
    const data = useSelector(state => state.reviews.data);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const selectedReviews = data.filter(review => selectedRows.includes(review.id));

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

    const handleDate = (e) => {
        setSelectedDate(e.target.value)
    }


    const updateReview = async (review, token) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/evaluations/editEvaluation/${review.id}`, {
                termName: review.termName,
                internalEvaluation: review.internalEvaluation,
                evaluationName: review.evaluationName,
                email: review.email,
                phone: review.phone,
                startDate: selectedOption === 'start' ? selectedDate : review.startDate,
                endDate: selectedOption === 'finish' ? selectedDate : review.endDate,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    };

    const handleUpdate = async (reviews) => {

        try {
            const updateRequests = reviews.map(review =>
                updateReview(review, cookies.access_token)
            );
            const updatedReviews = await Promise.all(updateRequests);

            // Dispatch the action to update the Redux state with the updated reviews
            updatedReviews.forEach(updatedReview => {
                dispatch(updateReviewSuccess(updatedReview));
            });

            notify();
            console.log('All selected rows have been updated');
        } catch (error) {
            console.error('Error updating selected rows:', error);
            notifyError();
        }
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
                                <button onClick={() => handleUpdate(selectedReviews)} style={{ backgroundColor: '#1976d2' }}>Evet</button>
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

    const notifyError = () => {
        dispatch(showToast({ message: "Değerlendirmeler güncellenemedi!", type: 'error' }));
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
                                                onChange={handleDate}
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
