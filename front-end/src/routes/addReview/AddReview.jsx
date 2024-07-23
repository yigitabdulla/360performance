import React from 'react'
import "./addReview.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'

export default function AddReview() {
    return (
        <div className='addEmployee'>
            <div className="sideNavbar">
                <SideNavbar />
            </div>

            <div className="formContainer">
                <h1>Değerlendirme Oluştur</h1>

                <form>
                    <div className="reviewInfo">
                        <div className="text">
                            <h3>Değerlendirme Bilgileri</h3>
                        </div>
                        <div className="inputs">
                            <div className="item">
                                <label htmlFor="period">Dönem Adı</label>
                                <input required id="period" name="period" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="internalReviewName">İç Değerlendirme Adı</label>
                                <input required id="internalReviewName" name="internalReviewName" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="reviewName">Değerlendirme Adı</label>
                                <input required id="reviewName" name="reviewName" type="text" />
                            </div>
                            <div className="item">
                                <label for="startDate">Başlangıç - Bitiş Tarihi</label>
                                <div className="dates">
                                    <input type="date" id="startDate" name="startDate" />
                                    <input type="date" id="endDate" name="endDate" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contactInfo">
                        <div className="text">
                            <h3>İletişim Bilgileri</h3>
                        </div>
                        <div className="inputs">
                            <div className="item">
                                <label htmlFor="email">E-posta</label>
                                <input id="email" name="email" type="email" />
                            </div>
                            <div className="item">
                                <label htmlFor="phone">Telefon</label>
                                <input id="phone" name="phone" type="text" />
                            </div>

                        </div>
                    </div>

                    <button className="sendButton">Kaydet ve Devam Et</button>
                    {false && <span>error</span>}



                </form>


            </div>
        </div>
    )
}
