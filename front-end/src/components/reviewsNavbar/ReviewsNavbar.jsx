import * as React from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./reviewsNavbar.scss"
import { useDispatch, useSelector } from "react-redux"
import { updateStep, resetSteps, allStepsCompleted, updateRender, updateSelectedReview } from '../../redux/slices/reviewsNavbarSlice';
import { updateReviewFormData } from '../../redux/slices/formDataSlice';

export default function HorizontalNonLinearStepper() {
    const selectRef = useRef(null);
    const dispatch = useDispatch();

    const activeStep = useSelector(state => state.step.activeStep);
    const completed = useSelector(state => state.step.completed);
    const steps = useSelector(state => state.step.steps);
    const reviewFormData = useSelector(state => state.formData.reviewFormData);
    const data = useSelector(state => state.reviews.data);

    const handleStep = (step) => () => {
        dispatch(updateStep(step));
        dispatch(updateRender({ render: false }))
    };

    const handleReset = () => {
        dispatch(resetSteps());
    };

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        dispatch(updateSelectedReview({ selectedReview: selectedValue }));
        if (selectedValue === "all") {
            dispatch(updateRender({ render: true }));
            dispatch(updateStep(null));
            dispatch(resetSteps());
            dispatch(updateReviewFormData({
                email: "",
                phone: "",
                reviewName: "",
                endDate: "",
                startDate: "",
                period: "",
                internalReviewName: ""
            }));
            selectRef.current.value = "";  // Reset the select value to the default
        } else {
            for (let index = 0; index < data.length; index++) {
                if(data[index].evaluationName === selectedValue) {
                    dispatch(updateReviewFormData({
                        email: data[index].email,
                        phone: data[index].phone,
                        reviewName: data[index].evaluationName,
                        endDate: data[index].endDate,
                        startDate: data[index].startDate,
                        period: data[index].termName,
                        internalReviewName: data[index].internalEvaluation
                    }));
                }
                
            }
            dispatch(updateRender({ render: false }));
        }
    };

    return (
        <div className="reviewsNavbar">
            <select
                onChange={handleSelect}
                className='select-review'
                style={{ color: 'rgb(75, 75, 75)' }}
                name="review"
                defaultValue=""
                ref={selectRef}  // Attach the ref here
            >
                <option disabled hidden value="">360° Değerlendirme Seçin</option>
                <option value="all">Tüm değerlendirmeler</option>
                {data.map(review => <option key={review.id} value={review.evaluationName}>{review.evaluationName}</option>)}
            </select>

            <div className="stepperContainer">
                <Box sx={{ width: '50vw' }}>
                    <Stepper className='stepper' nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton className='stepButton' color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted({ step: { completed, steps } }) ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    Tüm adımlar tamamlandı
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Geri
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        İleri
                                    </Button>
                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Adım {activeStep + 1} tamamlandı
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps({ step: { completed, steps } }) === totalSteps({ step: { steps } }) - 1
                                                    ? 'Bitir'
                                                    : 'Adımı tamamla'}
                                            </Button>
                                        ))}
                                </Box> */}
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div>
        </div>
    );
}
