import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from "./slices/employeesSlice"
import stepReducer from "./slices/reviewsNavbarSlice"

export default configureStore({
  reducer: {
    employees: employeesReducer,
    step: stepReducer,
    
  },
})