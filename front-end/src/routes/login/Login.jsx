import React from 'react'
import { Link } from "react-router-dom";
import "./login.scss"

export default function Login() {
  const login = false
  return (
    <div className='login'>

      <div className="formContainer">
        <form>
          <h1>Kullanıcı Girişi</h1>
          <input name="username" type="text" placeholder="Kullanıcı Adı" />
          <input name="password" type="password" placeholder="Şifre" />
          {login && <span className='error'>Yanlış kullanıcı adı ve/veya şifre</span>}
          <button>Giriş Yap</button>
          <Link to="/register" className='reset'>Şifremi yenile</Link>
        </form>
      </div>

    </div>
  )
}
