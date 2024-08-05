import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviews = createAsyncThunk("fetchReviews", async (token) => {
  try {
    let page = 0;
    let totalPages = 1;
    const allReviews = [];

    while (page < totalPages) {
      const response = await axios.get(`http://localhost:8080/api/evaluations?page=${page}&size=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      allReviews.push(...response.data.content);
      totalPages = response.data.totalPages;
      page++;
    }

    return allReviews;
  } catch (error) {
    console.log(error);
    throw error;  // This will trigger the rejected case
  }
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    deleteReviewsSuccess: (state, action) => {
      state.data = state.data.filter(review => !action.payload.includes(review.id));
    },
    updateReviewSuccess: (state, action) => {
      const updatedReview = action.payload;
      const index = state.data.findIndex(review => review.id === updatedReview.id);
      if (index !== -1) {
        state.data[index] = updatedReview;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { deleteReviewsSuccess, updateReviewSuccess } = reviewsSlice.actions;

export default reviewsSlice.reducer;
