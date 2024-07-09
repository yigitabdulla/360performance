import React from 'react'
import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;
  return (
    <nav>
      <div className="left">
        <a href="/home" className="logo">
          <img src="/logo.png" alt="" />
          <span>Performance</span>
        </a>
        <a href="/home">Ana Sayfa</a>
        <a href="/employees">Çalışanlar</a>
        <a href="/reports">Raporlar</a>
        <a href="/settings">Ayarlar</a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
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
          <MenuIcon onClick={() => setOpen((prev) => !prev)}/>
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Ana Sayfa</a>
          <a href="/">Çalışanlar</a>
          <a href="/">Raporlar</a>
          <a href="/">Ayarlar</a>
          <Accordion className='accordion'>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              expandIcon={<ArrowDropDownIcon />}
            >
              Değerlendir <ArrowDropDownIcon />
            </AccordionSummary>
            <AccordionDetails className='sideNavbar'>
              <a href="/">Değerlendirme</a>
              <a href="/">Katılımcılar</a>
              <a href="/">Yetkinlikler</a>
              <a href="/">Hedef Paketleri</a>
              <a href="/">Şablonlar</a>
            </AccordionDetails>
          </Accordion>
          <a href="/">Giriş Yap</a>
        </div>
      </div>
    </nav>
  );
}
