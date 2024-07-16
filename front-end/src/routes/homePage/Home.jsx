import React from 'react'
import "./home.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import MessageIcon from '@mui/icons-material/Message';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Home() {
  return (
    <div className='home'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>
      <div className="homeContainer">
        <div className="wrapper">
          <h1>Merhaba Finartz</h1>
          <div className="top">

            <div className="top-info">
              <div className="title">Değerlendirmeye başlayın</div>


              <div className='container'>
                <div className="text">
                  <MessageIcon />
                  Katılımcıları belirleyin ve değerlendirme formunuzu oluşturun.
                  <br></br>
                  Değerlendirme sürecine hemen başlayın.
                </div>
                <button>360 değerlendirme oluştur</button>
              </div>

              <div className='container'>
                <div className="text">
                  <ModeStandbyIcon />
                  Hedeflerinizi tanımlayın ve değerlendirme sürecini başlatın.
                  <br></br>
                  Performans hedeflerinizi yönetin.
                </div>
                <button>Hedef değerlendirme oluştur</button>
              </div>
            </div>

            <img src="./analytic.svg" alt="" />
          </div>

          <div className="mid">
            <div className="text">
              <h2>360 Değerlendirme Nasıl Yapılır?</h2>
              <span>Üç basit adımda değerlendirme oluşturmayı öğrenmek için videomuzu izleyin.</span>
              <button>Videoyu izle</button>
            </div>

            <img src="./tutorial.svg" alt="" />

          </div>

          <div className="bottom">
            <div className="title">Yardıma mı ihtiyacınız var?</div>

            <div className='container'>
              <div className="text">
                <QuestionMarkIcon />
                Sistem kullanımıyla ilgili bilgilere destek merkezimizden erişebilirsiniz.
                <br></br>
                Kullanım videoları, sıkça sorulan sorular ve daha fazlası için destek merkezimize başvurun.
              </div>
              <button>Destek Merkezi</button>
            </div>

            <div className='container'>
              <div className="text">
                <PhoneIcon />
                Hafta içi her gün 10.00-16.00 saatleri arasında bizi aşağıdaki numaradan arayabilirsiniz
                <br></br>
                +12 345 678 99 99.
              </div>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
