import React, { useEffect } from 'react'
import "./addReview.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux"
import { updateStep, completeStep, totalSteps, completedSteps, isLastStep, allStepsCompleted, updateRender , updateFormData } from '../../redux/slices/reviewsNavbarSlice';

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

    const dispatch = useDispatch();
    const activeStep = useSelector(state => state.step.activeStep);
    const completed = useSelector(state => state.step.completed);
    const steps = useSelector(state => state.step.steps);
    const formData = useSelector(state => state.step.formData);

    const handleNext = () => {
        const newActiveStep =
            isLastStep({ step: { activeStep, steps } }) && !allStepsCompleted({ step: { completed, steps } })
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        dispatch(updateStep(newActiveStep));
        dispatch(updateRender({ render: false }))
    };

    const handleComplete = (e) => {
        e.preventDefault();
        const form = e.target.form;
    
        if (form.checkValidity()) {
            dispatch(completeStep(activeStep));
            dispatch(updateRender({ render: false }));
            handleNext();
        } else {
            form.reportValidity();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ [name]: value }));
    };

    useEffect(() => {
        // Populate the form with the data from the Redux store when the component mounts
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = formData[input.name] || '';
        });
    }, [formData]);
    return (
        <div className='addEmployee'>
            {/*  <div className="sideNavbar">
                <SideNavbar />
            </div> */}

            <div className="formContainer">
                <h1>Değerlendirme Oluştur</h1>

                <form onSubmit={handleComplete}>
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
                                <input required maxLength={100} id="reviewName" name="reviewName" type="text" onChange={handleChange}/>
                            </div>
                            <div className="item">
                                <label htmlFor="startDate">
                                    Başlangıç - Bitiş Tarihi
                                    <LightTooltip title="Değerlendirmenin başlangıç ve bitiş tarihini değerlendirme başlamadan önce veya başladıktan sonra güncelleyebilirsiniz." placement="right">
                                        <HelpOutlineOutlinedIcon style={{ fontSize: '18px' }} />
                                    </LightTooltip>
                                </label>
                                <div className="dates">
                                    <input required type="date" id="startDate" name="startDate" onChange={handleChange} />
                                    <input required type="date" id="endDate" name="endDate" onChange={handleChange} />
                                </div>
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
                                <button className='sendButton' onClick={handleComplete}>
                                    {completedSteps({ step: { completed, steps } }) === totalSteps({ step: { steps } }) - 1
                                        ? 'Bitir'
                                        : 'Kaydet ve Devam et'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {false && <span>error</span>}



                </form>


            </div>
        </div>
    )
}
