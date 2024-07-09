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
            <div className="title">Değerlendirmeye başlayın</div>

            <div className='container'>
              <div className="text">
                <MessageIcon />
                360 değerlendirme oluşturun.
                <br></br>
                Katılımcıları ve formunuzu oluşturup değerlendirmenizi başlatın.
              </div>
              <button>360 değerlendirme oluştur</button>
            </div>

            <div className='container'>
              <div className="text">
                <ModeStandbyIcon />
                Hedef bazlı değerlendirme oluşturun.
                <br></br>
                Hedefleri belirleyin ve  değerlendirme sürecini başlatın.
              </div>
              <button>Hedef değerlendirme oluştur</button>
            </div>
          </div>

          <div className="mid">
            <div className="text">
              <h2>360 değerlendirme nasıl oluşturulur?</h2>
              <span>3 adımda değerlendirme oluşturmak için videoumuzu izleyin</span>
              <button>Video izle</button>
            </div>

            <img src="https://img.freepik.com/free-vector/concept-website-setup-landing-page_52683-26521.jpg?t=st=1720520381~exp=1720523981~hmac=36d5f1ef0afbd34de851cf03a2e331b7c17ea17896eef2d69c6a1cea74b1e081&w=1060" alt="" />

          </div>

          <div className="bottom">
            <div className="title">Yardıma mı ihtiyacınız var?</div>

            <div className='container'>
              <div className="text">
                <QuestionMarkIcon />
                Sistem kullanımıyla ilgili bilgilere destek merkezimizden ulaşabilirsin.
                <br></br>
                Kullanım videoları, sıkşa sorulan sorular ve daha fazlası...
              </div>
              <button>Destek Merkezi</button>
            </div>

            <div className='container'>
              <div className="text">
                <PhoneIcon />
                Hafta içi her gün 10.00-16.00 saatleri arasında bizi aşağıdaki numaradan arayabilirsiniz.
                <br></br>
                +12 345 678 99 99
              </div>
              
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
