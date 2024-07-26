import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./reviewsNavbar.scss"
import { useDispatch, useSelector } from "react-redux"
import { updateStep } from '../../redux/slices/reviewsNavbarSlice'

const steps = ['Değerlendirme', 'Kaynak', 'Katılımcılar', 'Yetkinlikler', 'Başlat'];

export default function HorizontalNonLinearStepper() {
    const dispatch = useDispatch();
    const step = useSelector(state => state.step.step);

    console.log()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
        dispatch(updateStep({ step: steps[newActiveStep] }));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        dispatch(updateStep({ step: steps[activeStep-1] }));
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
        dispatch(updateStep({ step: steps[step] }));
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        dispatch(updateStep({ step: steps[step] }));
    };

    return (
        <div className="reviewsNavbar">
            <select className='select-review' style={{ color: 'rgb(75, 75, 75)' }} name="review" defaultValue="">
                <option disabled hidden value="">360° Değerlendirme Seçin</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

            <div className="stepperContainer">
                <Box sx={{ width: '50vw'}}>
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
                        {allStepsCompleted() ? (
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
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Bitir'
                                                    : 'Adımı tamamla'}
                                            </Button>
                                        ))}
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </div>
        </div>

    );
}