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
                        </div>
                    </div>

                    <div className="organisationInfo">
                        <h3>Organizasyon Bilgileri</h3>
                        <div className="inputs">
                            <div className="item">
                                <label htmlFor="position">Pozisyon</label>
                                <input required id="position" name="position" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="registration">Sicil No</label>
                                <input id="registration" name="registration" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="location">Bölge</label>
                                <input id="location" name="location" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="section">Bölüm</label>
                                <input id="section" name="section" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="businessLine">İş Kolu</label>
                                <input id="businessLine" name="businessLine" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="firstAdmin">1. Yönetici</label>
                                <select name="firstAdmin">
                                    <option value="a">Aasdas</option>
                                    <option value="b">Basdasd</option>
                                    <option value="c">Casdasd</option>
                                    <option value="d">Dasdas</option>
                                </select>
                            </div>
                            <div className="item">
                                <label htmlFor="secondAdmin">2. Yönetici</label>
                                <select name="secondAdmin">
                                    <option value="a">Aasdas</option>
                                    <option value="b">Basdasd</option>
                                    <option value="c">Casdasd</option>
                                    <option value="d">Dasdas</option>
                                </select>
                            </div>
                            <div className="item">
                                <label htmlFor="reporter">Raporlayan</label>
                                <select name="reporter">
                                    <option value="a">Aasdas</option>
                                    <option value="b">Basdasd</option>
                                    <option value="c">Casdasd</option>
                                    <option value="d">Dasdas</option>
                                </select>
                            </div>
                            <div className="item">
                                <label htmlFor="level">Seviye</label>
                                <select name="level">
                                    <option value="a">Aasdas</option>
                                    <option value="b">Basdasd</option>
                                    <option value="c">Casdasd</option>
                                    <option value="d">Dasdas</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="languageContainer">
                        <div className="text">
                            <div className="title">
                                Dil Tercihi
                            </div>
                            <span>
                                Değerlendirme formunu hangi dilde
                                göndermek istiyorsanız "Değerlemdirme Dili"
                                kısmından seçim yapınız.
                            </span>
                        </div>
                        <div className="itemLanguage">
                            <label htmlFor="language">Değerlendirme Dili</label>
                            <select name="language">
                                <option value="a">Aasdas</option>
                                <option value="b">Basdasd</option>
                                <option value="c">Casdasd</option>
                                <option value="d">Dasdas</option>
                            </select>
                        </div>
                    </div>

                    <button className="sendButton">Kaydet</button>
                    {false && <span>error</span>}

                </form>


            </div>
        </div>
    )
}
