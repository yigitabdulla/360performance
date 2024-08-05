import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from "./slices/employeesSlice"
import stepReducer from "./slices/reviewsNavbarSlice"
import formDataReducer from "./slices/formDataSlice"
import authReducer from "./slices/authSlice"
import toastifyReducer from "./slices/toastifySlice"
import reviewsReducer from "./slices/reviewsSlice"

export default configureStore({
  reducer: {
    employees: employeesReducer,
    step: stepReducer,
    formData: formDataReducer,
    auth: authReducer,
    toastify: toastifyReducer,
    reviews: reviewsReducer
    
  },
})