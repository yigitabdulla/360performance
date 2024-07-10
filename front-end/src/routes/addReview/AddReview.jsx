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
                            <span>Değerlendirme formunuza ait bilgileri tamamlayın</span>
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
                                <label htmlFor="reviewName">E-posta Adresi</label>
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
                            <span>Bu bilgiler katılımcılara gönderilen mail içeriklerinde yer alır.
                                Katılımcılar sizinle iletişim kurmak için bu bilgileri kullanacaktır.
                            </span>
                        </div>
                        <div className="inputs">
                            <div className="item">
                                <label htmlFor="companyName">Firma Adı</label>
                                <input required id="companyName" name="companyName" type="text" />
                            </div>
                            <div className="personalInfo">
                                <div className="item">
                                    <label htmlFor="name">İsim</label>
                                    <input id="name" name="name" type="text" />
                                </div>
                                <div className="item">
                                    <label htmlFor="lastname">Soy İsim</label>
                                    <input id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div className="item">
                                <label htmlFor="email">E-posta</label>
                                <input id="email" name="email" type="email" />
                            </div>
                            <div className="phones">
                                <div className="item">
                                    <label htmlFor="phone">Telefon</label>
                                    <input id="phone" name="phone" type="text" />
                                </div>
                                <div className="item">
                                    <label htmlFor="otherPhone">Diğer Telefon</label>
                                    <input id="otherPhone" name="otherPhone" type="text" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="language">
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
                        <div className="languages">
                            <div className="item">
                                <label htmlFor="language">Değerlendirme Ana Dili</label>
                                <select name="language">
                                    <option value="a">Aasdas</option>
                                    <option value="b">Basdasd</option>
                                    <option value="c">Casdasd</option>
                                    <option value="d">Dasdas</option>
                                </select>
                            </div>

                            <div className="item">
                                <label htmlFor="language">Diğer Diller</label>
                                <button>Dil Ekle</button>
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
