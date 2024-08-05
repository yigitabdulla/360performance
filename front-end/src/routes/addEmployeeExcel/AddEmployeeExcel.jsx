import React, { useContext, useState , useEffect } from 'react'
import "./addEmployeeExcel.scss"
import * as XLSX from 'xlsx';
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useDispatch, useSelector } from "react-redux"
import { updateEmployees , fetchEmployees, addEmployeesExcel } from '../../redux/slices/employeesSlice'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeeExcel() {
    const [cookies, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const [tempColumns, setTempColumns] = useState([]);
    const [tempRows, setTempRows] = useState([]);

    const dispatch = useDispatch();
    const realRows = useSelector(state => state.employees.rows);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const [header, ...dataRows] = jsonData;
            const cols = header.map((col, index) => ({ field: index.toString(), headerName: col, width: 150 }));
            const rowData = dataRows.map((row, index) => {
                const rowObj = {};
                row.forEach((cell, cellIndex) => {
                    rowObj[cellIndex.toString()] = cell;
                });
                return { id: index, ...rowObj };
            });

            const transformedColumns = cols.map((col) => ({
                ...col,
                headerName: col.headerName.charAt(0).toUpperCase() + col.headerName.slice(1).toLowerCase(),
            }));

            setTempColumns(transformedColumns);
            setTempRows(rowData);

        };

        reader.readAsArrayBuffer(file);
    };

    const token = cookies.access_token

    useEffect(() => {

        if (token) {
            dispatch(fetchEmployees(token));
        }
    }, [token]);

    const handleSave = () => {
        const updatedRows = []
        const rows = []
        tempRows.map(row => rows.push({
            firstName: row[0],
            lastName: row[1],
            email: row[2],
            position: row[3],
            status: row[4]
        }))
        
        if (realRows.length >= rows.length) {

            for (let j = 0; j < realRows.length; j++) {
                let flag = 0
                for (let i = 0; i < rows.length; i++) {
                    if (realRows[j].email === rows[i].email) {
                        flag++
                    }
                    
                }
                flag === 0 && updatedRows.push(realRows[j])
                
            }
        }
        else {

            for (let j = 0; j < rows.length; j++) {
                let flag = 0
                for (let i = 0; i < realRows.length; i++) {
                    if (rows[j].email === realRows[i].email) {
                        flag++
                    }
                    
                }
                flag === 0 && updatedRows.push(rows[j])
                
            }
        }
        console.log(updatedRows)
        dispatch(addEmployeesExcel(updatedRows))
        navigate("/employees")
    };

    return (
        <div className='addEmployeeExcel'>
            <div className="sideNavbar">
                <SideNavbar />
            </div>

            <div className="employeesContainer">
                <div className='title'>
                    <h1>Çalışanlar</h1>
                    <span>Çalışanları excel dosyası olarak içe aktar</span>
                    <hr />
                </div>
                <div className="templates">
                    <div className="templateButtons">
                        <a href="">Boş Şablon</a>
                        <a href="">Örnek Şablon</a>
                    </div>
                    <span><ArrowRightOutlinedIcon />Örnek şablonu inceleyebilirsiniz, boş şablonu güncelleyerek yükleyebebilirsiniz</span>
                </div>
                <div className="info">
                    <span>Dosyanızı seçerek kaydet butonuna tıklayın</span>
                    <span>Sadece xlsx uzantılı dosya yükleyebilirsiniz. Dosya boyutu en fazla 2mb, satır sayısı en fazla 1500 satır olabilir</span>
                </div>
                <div className="buttons">
                    <input id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <button onClick={handleSave}>Kaydet</button>
                </div>
            </div>
        </div>
    )
}
