import React, { useState } from 'react'
import "./employee.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Employee() {

    const isMobile = window.innerWidth < 640;

    const location = useLocation();
    const { employee } = location.state || {}; // Get the employee data from location state
    if (!employee) {
        return <div>No employee data available</div>;
    }

    const [person, setPerson] = useState({
        name: employee[0],
        lastname: employee[1],
        email: employee[2],
        position: employee[3],
        status: employee[4],

    })


    const handleChange = (event) => {
        const { name, value } = event.target
        setPerson({ ...person, [name]: value })
    }

    const updatePerson = async (e) => {
        e.preventDefault()

        /* try {
            const res = await axios.post("http://localhost:3001/contacts",contact)
            setPerson(prev => [...prev,res.data])
            alert("Contact created!")
            setPerson({
                name: "",
                lastname: "",
                email: "",
                position: "",
                status: "",
            })
        } catch (error) {
            console.error(error)
        } */
    }

    const style = {
       
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notify = (status) => status == "aktif" ? toast("Çalışan aktif edildi!") : toast("Çalışan pasif edildi!")

    return (
        <div className='employee'>
            <div className="sideNavbar">
                <SideNavbar />
            </div>

            <div className="formContainer">
                {employee ? <form onSubmit={updatePerson}>
                    <div className="employeeInfo">

                        <div className="page-title">
                            <h1>{person.name} {person.lastname}</h1>
                        </div>

                        <div className="employee-details">
                            <div className="employee-title">
                                <h3>Çalışan Bilgileri</h3>
                            </div>

                            <div className="inputs">
                                <div className="item">
                                    <label htmlFor="name">İsim</label>
                                    <input required id="name" name="name" type="text" onChange={handleChange} defaultValue={person.name} />
                                </div>
                                <div className="item">
                                    <label htmlFor="lastname">Soyisim</label>
                                    <input required id="lastname" name="lastname" type="text" onChange={handleChange} defaultValue={person.lastname} />
                                </div>
                                <div className="item">
                                    <label htmlFor="email">E-posta Adresi</label>
                                    <input required id="email" name="email" type="email" onChange={handleChange} defaultValue={person.email} />
                                </div>
                                <div className="item">
                                    <label htmlFor="position">Pozisyon</label>
                                    <input required id="position" name="position" type="text" defaultValue={person.position} />
                                </div>
                                <div className="buttons">
                                    {person.status === "true" ? <button onClick={handleOpen} className='changeStatus'>Çalışanı pasif et</button> :
                                        <button onClick={handleOpen} className='changeStatus'>Çalışanı Aktif Et</button>}
                                    {person.status === "true" ? <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box className="modal-box" sx={style}>
                                            <Typography style={{ color: 'rgb(75, 75, 75)', textAlign:'center' }} id="modal-modal-title" variant="h6" component="h2">
                                                {person.name + " " + person.lastname} pasif edilsin mi ?
                                            </Typography>
                                            <Typography style={{ color: 'rgb(75, 75, 75)', textAlign:'center' }} id="modal-modal-description" sx={{ mt: 2 }}>
                                                {person.name + " " + person.lastname} tüm aktif değerlendirmelerden
                                                çıkarılacaktır. Bu işlem geri alınamaz. Pasif etmek istiyor musunuz?
                                            </Typography>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '10px' }} className='decision'>
                                                <Button onClick={handleClose} style={{ backgroundColor: 'rgb(255, 130, 96)', color: 'white', width: '100px', textTransform: 'none' }}>İptal</Button>
                                                <Button onClick={() => notify("pasif")} style={{ backgroundColor: 'rgb(0, 156, 156)', color: 'white', width: '100px', textTransform: 'none' }}>Evet</Button>
                                            </div>
                                        </Box>
                                    </Modal> : <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography style={{ color: 'rgb(75, 75, 75)', textAlign:'center' }} id="modal-modal-title" variant="h6" component="h2">
                                                {person.name + " " + person.lastname} aktif edilsin mi ?
                                            </Typography>
                                            <Typography style={{ color: 'rgb(75, 75, 75)', textAlign:'center' }} id="modal-modal-description" sx={{ mt: 2 }}>
                                                {person.name + " " + person.lastname} çalışanını aktif etmek
                                                istediğinize emin misiniz?
                                            </Typography>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '10px' }} className='decision'>
                                                <Button onClick={handleClose} style={{ backgroundColor: 'rgb(255, 130, 96)', color: 'white', width: '100px', textTransform: 'none' }}>İptal</Button>
                                                <Button onClick={() => notify("aktif")} style={{ backgroundColor: 'rgb(0, 156, 156)', color: 'white', width: '100px', textTransform: 'none' }}>Evet</Button>
                                            </div>
                                        </Box>
                                    </Modal>}
                                    <button className="sendButton">Kaydet</button>
                                    <ToastContainer position="bottom-right" />
                                    {false && <span>error</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </form> :
                    <div className='noData'>
                        <span>Çalışan bilgisi bulunamadı</span>
                        <a href="/employees">Çalışanlar sayfasına geri dön</a>
                    </div>
                }
            </div>
        </div>
    )
}
