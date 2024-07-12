import React, { useContext, useState } from 'react'
import "./addEmployeeExcel.scss"
import * as XLSX from 'xlsx';
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { EmployeeContext } from '../../context/EmployeeContext';

export default function AddEmployeeExcel() {

    const { updateRow, updateColumn } = useContext(EmployeeContext);
    const [tempColumns, setTempColumns] = useState([]);
    const [tempRows, setTempRows] = useState([]);

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
                headerName: col.headerName.toUpperCase(),
            }));

            setTempColumns(transformedColumns);
            setTempRows(rowData);

        };

        reader.readAsArrayBuffer(file);
    };

    const handleSave = () => {
        localStorage.setItem('columns', JSON.stringify(tempColumns));
        localStorage.setItem('rows', JSON.stringify(tempRows));

        updateColumn(tempColumns);
        updateRow(tempRows);
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
                    <span><ArrowRightOutlinedIcon/>Örnek şablonu inceleyebilirsiniz, boş şablonu güncelleyerek yükleyebebilirsiniz</span>
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
