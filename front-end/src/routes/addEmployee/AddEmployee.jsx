import React from 'react'
import "./addEmployee.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'

export default function AddEmployee() {
    return (
        <div className='addEmployee'>
            <div className="sideNavbar">
                <SideNavbar />
            </div>

            <div className="formContainer">
                <h1>Çalışan Ekle</h1>

                <form>
                    <div className="employeeInfo">
                        <h3>Çalışan Bilgileri</h3>
                        <div className="inputs">
                            <div className="item">
                                <label htmlFor="name">İsim</label>
                                <input required id="name" name="name" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="lastname">Soyisim</label>
                                <input required id="lastname" name="lastname" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="email">E-posta Adresi</label>
                                <input required id="email" name="email" type="email" />
                            </div>
                            <div className="item">
                                <label htmlFor="position">Pozisyon</label>
                                <input required id="position" name="position" type="text" />
                            </div>
                            <button className="sendButton">Kaydet</button>
                            {false && <span>error</span>}
                        </div>
                       
                    </div>

                    

                </form>


            </div>
        </div>
    )
}
