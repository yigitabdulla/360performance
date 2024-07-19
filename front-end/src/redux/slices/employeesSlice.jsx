import { createSlice } from '@reduxjs/toolkit'

export const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        rows: JSON.parse(localStorage.getItem("rows")) || [],
        columns: JSON.parse(localStorage.getItem("columns")) || []
    },
    reducers: {
        updateEmployees: (state,action) => {
            state.rows = action.payload.rows
            state.columns = action.payload.columns
        }
    }

})

export const {updateEmployees} = employeesSlice.actions

export default employeesSlice.reducer