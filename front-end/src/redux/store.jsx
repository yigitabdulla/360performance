import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from "./slices/employeesSlice"
import stepReducer from "./slices/reviewsNavbarSlice"
import formDataReducer from "./slices/formDataSlice"

export default configureStore({
  reducer: {
    employees: employeesReducer,
    step: stepReducer,
    formData: formDataReducer,
    
  },
})