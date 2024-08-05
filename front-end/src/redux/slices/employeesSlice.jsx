import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const storedColumns = [
    { field: "firstName", headerName: "Ad", width: 150 },
    { field: "lastName", headerName: "Soyad", width: 150 },
    { field: "email", headerName: "E-posta", width: 150 },
    { field: "position", headerName: "Pozisyon", width: 150 },
    { field: "status", headerName: "Durum", width: 150 }
];

const initialState = {
    rows: [], // Default empty array; update on data fetch
    columns: storedColumns, // Use columns from localStorage or default value
    status: 'idle', // to track loading status
    error: null
};

// Asynchronous thunk to fetch employees data
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const addEmployeesExcel = createAsyncThunk(
    'employees/addEmployeesExcel',
    async (employees) => {
        try {
            
            const promises = employees.map(employee => 
                axios.post("http://localhost:8080/api/auth/register", {
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    password: "Qwert12345."
                })
            );

            const responses = await Promise.all(promises);

            return responses.map(response => response.data);
        } catch (error) {
            return error;
        }
    }
);

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        updateEmployees: (state, action) => {
            state.rows = action.payload.rows;
            // Optionally update columns if needed
            state.columns = action.payload.columns || state.columns;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rows = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addEmployeesExcel.pending, (state) => {
                state.status = 'saving'
            })
            .addCase(addEmployeesExcel.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(addEmployeesExcel.rejected, (state) => {
                state.status = 'failed'
            })
    }
});

export const { updateEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;