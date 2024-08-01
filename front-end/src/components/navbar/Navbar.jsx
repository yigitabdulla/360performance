import React from 'react'
import { useState } from "react";
import "./navbar.scss";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(['access_token']);

  const handleClick = () => {
    removeCookie('access_token', { path: '/' });
  }

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/home" className="logo">
          <img src="https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png" alt="" />
          {/* <span><ApiIcon/>Finartz</span> */}
        </a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe <LogoutIcon onClick={handleClick} className='logout-btn'/></span>
          </div>
        ) : (
          <>
            <a href="/login">Giriş Yap</a>
            <a href="/register" className="register">
              Kayıt Ol
            </a>
          </>
        )}
        <div className="menuIcon">
          <MenuIcon style={{color:'gray'}} onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Ana Sayfa</a>
          <Accordion className='accordion'>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
            >
              Çalışanlar
            </AccordionSummary>
            <AccordionDetails className='sideNavbar'>
              <a href="/employees">Tüm Çalışanlar</a>
            </AccordionDetails>
          </Accordion>
          <a href="/">Raporlar</a>
          <a href="/">Ayarlar</a>
          <Accordion className='accordion'>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
            >
              Performans Değerlendirme
            </AccordionSummary>
            <AccordionDetails className='sideNavbar'>
              <a href="/reviews">Değerlendirme</a>
              <a href="/">Katılımcılar</a>
              <a href="/">Yetkinlikler</a>
              <a href="/">Şablonlar</a>
            </AccordionDetails>
          </Accordion>
          <a href="/">Hedef Değerlendirme</a>
          {cookies ? <a onClick={handleClick}>Çıkış Yap</a>  :  <a href="/">Giriş Yap</a>}
        </div>
      </div>
    </nav>
  );
}
