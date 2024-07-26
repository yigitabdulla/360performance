import { createSlice } from '@reduxjs/toolkit'

export const reviewsNavbarSlice = createSlice({
    name: "step",
    initialState: { step: null }, // Update the initial state to be an object
    reducers: {
        updateStep: (state, action) => {
            state.step = action.payload.step
        }
    }
})

export const { updateStep } = reviewsNavbarSlice.actions

export default reviewsNavbarSlice.reducer
