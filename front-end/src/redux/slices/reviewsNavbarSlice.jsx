import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    render: true,
    activeStep: 0,
    completed: {},
    steps: ['Değerlendirme', 'Kaynaklar', 'Katılımcılar', 'Yetkinlikler', 'Başlat'],
    selectedReview: null
};

export const reviewsNavbarSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        updateStep: (state, action) => {
            state.activeStep = action.payload;
        },
        completeStep: (state, action) => {
            state.completed[action.payload] = true;
        },
        resetSteps: (state) => {
            state.completed = {};
            state.activeStep = 0;
        },
        setSteps: (state, action) => {
            state.steps = action.payload;
        },
        updateRender: (state, action) => {
            state.render = action.payload.render;
        },
        updateSelectedReview: (state, action) => {
            state.selectedReview = action.payload.selectedReview;
        },
        
    }
});

export const { updateStep, completeStep, resetSteps, setSteps , updateRender , updateSelectedReview } = reviewsNavbarSlice.actions;

export const totalSteps = (state) => {
    return state.step.steps.length;
};

export const completedSteps = (state) => {
    return Object.keys(state.step.completed).length;
};

export const isLastStep = (state) => {
    return state.step.activeStep === totalSteps(state) - 1;
};

export const allStepsCompleted = (state) => {
    return completedSteps(state) === totalSteps(state);
};

export default reviewsNavbarSlice.reducer;
