import React, { useEffect, useState } from 'react';
import "./addReview.scss";
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {showToast} from "../../redux/slices/toastifySlice"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.gray,
        color: 'white',
        boxShadow: theme.shadows[1],
        fontSize: 17,
    },
}));

export default function AddReview() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['access_token']);

    const dispatch = useDispatch();

    const notify = () => {
        dispatch(showToast({ message: "Değerlendirme eklendi!", type: 'success' }));
    };

    const notifyError = () => {
        dispatch(showToast({ message: "Değerlendirme eklenemedi!", type: 'error' }));
    };

    const [reviewFormData, setReviewFormData] = useState({
        period: '',
        internalReviewName: '',
        reviewName: '',
        startDate: '',
        endDate: '',
        email: '',
        phone: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = cookies.access_token; // Replace this with your actual token
            const response = await axios.post(
                "http://localhost:8080/api/evaluations/save",
                {
                    termName: reviewFormData.period,
                    internalEvaluation: reviewFormData.internalReviewName,
                    evaluationName: reviewFormData.reviewName,
                    phone: reviewFormData.phone,
                    email: reviewFormData.email,
                    startDate: reviewFormData.startDate,
                    endDate: reviewFormData.endDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            notify();
            navigate('/reviews');
        } catch (error) {
            notifyError();
            console.error(error);
        }
    };
    

    return (
        <>
            <div className='addReview'>
                <div className="sideNavbar">
                    <SideNavbar />
                </div>

                <div className="formContainer">
                    <h1>Değerlendirme Oluştur</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="reviewInfo">
                            <div className="text">
                                <h3>Değerlendirme Bilgileri</h3>
                            </div>
                            <div className="inputs">
                                <div className="item">
                                    <label htmlFor="period">
                                        Dönem Adı
                                        <LightTooltip title="Değerlendirmeleriniz için dönem belirleyip, değerlendirmelerinizi aynı dönemin altında toplayabilirsiniz." placement="right">
                                            <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                        </LightTooltip>
                                    </label>
                                    <input required maxLength={100} id="period" name="period" type="text" onChange={handleChange} />
                                </div>
                                <div className="item">
                                    <label htmlFor="internalReviewName">
                                        İç Değerlendirme Adı
                                        <LightTooltip title="Bu adı sadece yönetim panelinde siz görebilirsiniz diğer değerlendirmelerden ayırt edebilmeniz için dizayn edilmiştir." placement="right">
                                            <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                        </LightTooltip>
                                    </label>
                                    <input required maxLength={100} id="internalReviewName" name="internalReviewName" type="text" onChange={handleChange} />
                                </div>
                                <div className="item">
                                    <label htmlFor="reviewName">
                                        Değerlendirme Adı
                                        <LightTooltip title="Değerlendirme formunun başlığı olarak değerlendirici kişilerde görünür." placement="right">
                                            <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                        </LightTooltip>
                                    </label>
                                    <input required maxLength={100} id="reviewName" name="reviewName" type="text" onChange={handleChange} />
                                </div>
                                <div className="item">
                                    <label htmlFor="startDate">
                                        Başlangıç Tarihi
                                        <LightTooltip title="Değerlendirmenin başlangıç ve bitiş tarihini değerlendirme başlamadan önce veya başladıktan sonra güncelleyebilirsiniz." placement="right">
                                            <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                        </LightTooltip>
                                    </label>
                                    <input required type="date" id="startDate" name="startDate" onChange={handleChange} />
                                </div>
                                <div className="item">
                                    <label htmlFor="endDate">
                                        Bitiş Tarihi
                                        <LightTooltip title="Değerlendirmenin başlangıç ve bitiş tarihini değerlendirme başlamadan önce veya başladıktan sonra güncelleyebilirsiniz." placement="right">
                                            <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                        </LightTooltip>
                                    </label>
                                    <input required type="date" id="endDate" name="endDate" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="contactInfo">
                            <div className="text">
                                <h3>İletişim Bilgileri</h3>
                            </div>
                            <div className="inputs">
                                <div className="item">
                                    <label htmlFor="email">E-posta</label>
                                    <input required id="email" name="email" type="email" onChange={handleChange} />
                                </div>
                                <div className="item">
                                    <label htmlFor="phone">Telefon</label>
                                    <input required id="phone" name="phone" type="text" onChange={handleChange} />
                                </div>

                                <div className="buttons">
                                    <a href='/reviews'>İptal</a>
                                    <button className='sendButton' type="submit">
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>

                        {false && <span>error</span>}
                    </form>
                </div>
            </div>
        </>
    );
}
