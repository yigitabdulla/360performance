import React from 'react'
import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

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
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Ana Sayfa</a>
          <a href="/">Çalışanlar</a>
          <a href="/">Raporlar</a>
          <a href="/">Ayarlar</a>
          <a href="/">Giriş Yap</a>
          <a href="/">Kayıt Ol</a>
        </div>
      </div>
    </nav>
  );
}
