import React, { useEffect } from 'react'
import "./home.scss"
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import { jwtDecode } from "jwt-decode";
import { useCookies } from 'react-cookie';

export default function Home() {

  const [cookies, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    if (cookies.access_token) {
      const decodedToken = jwtDecode(cookies.access_token);
      console.log('Decoded Token:', decodedToken);
      // Use the decoded token as needed
    }
  }, [cookies]);

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
              <div className="title">Değerlendirmeye Başlayın</div>
              <div className='container'>
                <div className="text">
                  {/* <MessageIcon /> */}
                  Katılımcıları belirleyin ve değerlendirme formunuzu oluşturun.
                  <br></br>
                  Değerlendirme sürecine hemen başlayın.
                </div>
                <button>360 Değerlendirme Oluştur</button>
              </div>

              {/* <div className='container'>
                <div className="text">
                  <ModeStandbyIcon />
                  Hedeflerinizi tanımlayın ve değerlendirme sürecini başlatın.
                  <br></br>
                  Performans hedeflerinizi yönetin.
                </div>
                <button>Hedef Değerlendirme Oluştur</button>
              </div> */}
            </div>

            <img src="./analytic.svg" alt="" />
          </div>

          <div className="mid">
            <div className="text">
              <div className='title'>360 Değerlendirme Nasıl Yapılır?</div>
              <span>Üç basit adımda değerlendirme oluşturmayı öğrenmek için videomuzu izleyin.</span>
              <button>Videoyu İzle</button>
            </div>

            <img src="./tutorial.svg" alt="" />

          </div>

          {/* <div className="bottom">
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
          </div> */}


        </div>
      </div>
    </div>
  )
}
