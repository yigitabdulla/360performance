import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Home from "./routes/homePage/Home"
import Login from "./routes/login/Login"
import Register from "./routes/register/Register"
import Layout from "./routes/layout/Layout"
import Employees from "./routes/employees/Employees"
import Settings from "./routes/settings/Settings"
import Reports from "./routes/reports/Reports"
import AddEmployee from './routes/addEmployee/AddEmployee';

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
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/employees",
          element: <Employees />
        },
        {
          path: "/employees/add",
          element: <AddEmployee />
        },
        {
          path: "/settings",
          element: <Settings />
        },
        {
          path: "/reports",
          element: <Reports />
        },
        
      ]
    }
  ]);

  return (

    <RouterProvider router={router} />
  );


}

export default App
