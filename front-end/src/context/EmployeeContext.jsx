import React, { createContext, useEffect, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

    const [rows, setRows] = useState(
        JSON.parse(localStorage.getItem("rows")) || []
    );

    const [columns, setColumns] = useState(
        JSON.parse(localStorage.getItem("columns")) || []
    );

    const updateColumn = (data) => {
        setColumns(data);
    };

    const updateRow = (data) => {
        setRows(data);
    };

    useEffect(() => {
        localStorage.setItem("rows", JSON.stringify(rows));
        localStorage.setItem("columns", JSON.stringify(columns));
    }, [rows,columns]);


    return (
        <EmployeeContext.Provider value={{ rows, updateColumn, columns, updateRow }}>
            {children}
        </EmployeeContext.Provider>
    );
};
