import React from 'react'
import "./addReview.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip , { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.gray,
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 17,
    },
  }));

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
                                <label htmlFor="period">
                                    Dönem Adı
                                    <LightTooltip title="Değerlendirmeleriniz için dönem belirleyip, değerlendirmelerinizi aynı dönemin altında toplayabilirsiniz." placement="right">
                                        <HelpOutlineOutlinedIcon style={{fontSize:'18px'}} />
                                    </LightTooltip>
                                </label>
                                <input required maxLength={100} id="period" name="period" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="internalReviewName">
                                    İç Değerlendirme Adı
                                    <LightTooltip title="Bu adı sadece yönetim panelinde siz görebilirsiniz diğer değerlendirmelerden ayırt edebilmeniz için dizayn edilmiştir." placement="right">
                                        <HelpOutlineOutlinedIcon style={{fontSize:'18px'}} />
                                    </LightTooltip>
                                </label>
                                <input required maxLength={100} id="internalReviewName" name="internalReviewName" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="reviewName">
                                    Değerlendirme Adı
                                    <LightTooltip title="Değerlendirme formunun başlığı olarak değerlendirici kişilerde görünür." placement="right">
                                        <HelpOutlineOutlinedIcon style={{fontSize:'18px'}} />
                                    </LightTooltip>
                                </label>
                                <input required maxLength={100} id="reviewName" name="reviewName" type="text" />
                            </div>
                            <div className="item">
                                <label htmlFor="startDate">
                                    Başlangıç - Bitiş Tarihi
                                    <LightTooltip title="Değerlendirmenin başlangıç ve bitiş tarihini değerlendirme başlamadan önce veya başladıktan sonra güncelleyebilirsiniz." placement="right">
                                        <HelpOutlineOutlinedIcon style={{fontSize:'18px'}} />
                                    </LightTooltip>
                                </label>
                                <div className="dates">
                                    <input required type="date" id="startDate" name="startDate" />
                                    <input required type="date" id="endDate" name="endDate" />
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
                                <input required id="email" name="email" type="email" />
                            </div>
                            <div className="item">
                                <label htmlFor="phone">Telefon</label>
                                <input required id="phone" name="phone" type="text" />
                            </div>

                            <div className="buttons">
                                <a href='/reviews'>İptal</a>
                                <a className="sendButton">Kaydet ve Devam Et</a>
                            </div>
                        </div>
                    </div>

                    {false && <span>error</span>}



                </form>


            </div>
        </div>
    )
}
