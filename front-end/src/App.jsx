import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./routes/homePage/Home"
import Login from "./routes/login/Login"
import Reset from "./routes/resetPassword/Reset"
import Layout from "./routes/layout/Layout"
import Employees from "./routes/employees/Employees"
import Settings from "./routes/settings/Settings"
import Reports from "./routes/reports/Reports"
import AddEmployee from './routes/addEmployee/AddEmployee';
import Reviews from './routes/reviews/Reviews';
import AddReview from './routes/addReview/AddReview';
import AddEmployeeExcel from './routes/addEmployeeExcel/AddEmployeeExcel';
import Employee from './routes/employee/Employee';
import Register from './routes/register/Register';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AddComptenciesExcel from './components/addComptenciesExcel/AddCompetenciesExcel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/login" replace={true} />
        },
        {
          path: "/home",
          element: <ProtectedRoute><Home /></ProtectedRoute>
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/reset",
          element: <Reset />
        },
        {
          path: "/employees",
          element: <ProtectedRoute><Employees /></ProtectedRoute>
        },
        {
          path: "/employees/:id",
          element: <ProtectedRoute><Employee /></ProtectedRoute>,
        },
        {
          path: "/employees/add",
          element: <ProtectedRoute> <AddEmployee /></ProtectedRoute>
        },
        {
          path: "/employees/addExcel",
          element: <ProtectedRoute> <AddEmployeeExcel /></ProtectedRoute>
        },
        {
          path: "/comptencies/addExcel",
          element: <ProtectedRoute> <AddComptenciesExcel /></ProtectedRoute>
        },
        {
          path: "/reviews",
          element: <ProtectedRoute> <Reviews /></ProtectedRoute>
        },
        {
          path: "/reviews/add",
          element: <ProtectedRoute> <AddReview /></ProtectedRoute>
        },
        {
          path: "/settings",
          element: <ProtectedRoute> <Settings /></ProtectedRoute>
        },
        {
          path: "/reports",
          element: <ProtectedRoute> <Reports /></ProtectedRoute>
        },
        {
          path: "/register",
          element: <Register />
        },

      ]
    }
  ]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ToastContainer position='bottom-right'/>
        <RouterProvider router={router} />
      </DndProvider>
    </>

  );


}

export default App
