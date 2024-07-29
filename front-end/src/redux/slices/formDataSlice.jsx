import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviewFormData: {
        period: '',
        internalReviewName: '',
        reviewName: '',
        startDate: '',
        endDate: '',
        email: '',
        phone: ''
    }
};

export const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        updateReviewFormData: (state, action) => {
            state.reviewFormData = { ...state.reviewFormData, ...action.payload };
        }
    }
});

export const { updateReviewFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
