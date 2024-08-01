import React, { useContext, useState } from 'react'
import "./addCompetenciesExcel.scss"
import * as XLSX from 'xlsx';
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';


export default function AddCompetenciesExcel() {


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

    const handleSave = () => {
        localStorage.setItem('columns', JSON.stringify(tempColumns));
        localStorage.setItem('rows', JSON.stringify(tempRows));

    };

    return (
        <div className='addCompetenciesExcel'>
            <div className="sideNavbar">
                <SideNavbar />
            </div>

            <div className="competenciesContainer">
                <div className='title'>
                    <h1>Yetkinlikler</h1>
                    <div className="templates">
                        <div className="buttons">
                            <a><InsertDriveFileOutlinedIcon /> Boş Şablon</a>
                            <a href='/comptencies/addExcel'><DescriptionOutlinedIcon /> Örnek Şablon</a>
                            <a><RemoveRedEyeOutlinedIcon /> Ön İzle</a>
                            <a><SettingsOutlinedIcon /> Ayarlar</a>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="info">
                    <span><ExploreOutlinedIcon />Örnek şablonu inceleyebilirsiniz, boş şablonu güncelleyerek yükleyebilirsiniz.</span>
                    <span><ExploreOutlinedIcon />Dosyanızı seçerek kaydet butonuna tıklayın. Sadece xlsx uzantılı dosya yükleyebilirsiniz. Dosya boyutu en fazla 2MB, satır sayısı en fazla 1500 satır olmalıdır.</span>
                </div>
                <div className="buttons">
                    <input id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <button onClick={handleSave}>Kaydet</button>
                </div>
            </div>
        </div>
    )
}
