import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./login.scss"
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = false
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Şifre en az 8 karakter olmalıdır.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Şifrede en az 1 büyük harf olmalıdır.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Şifrede en az 1 küçük harf olmalıdır.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Şifrede en az 1 sayı olmalıdır.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Şifrede en az 1 özel karakter olmalıdır (?, @, !, #, %, +, -, *, vb.).');
    }
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.username = 'E-Posta alanı boş bırakılamaz';
    }
    if (!password) {
      newErrors.password = 'Şifre alanı boş bırakılamaz';
      setErrors(newErrors);
      return
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(' ');
    }

    setErrors(newErrors);

    // If the errors object is empty, it means the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(email,password)
        const response = await axios.post("http://localhost:8080/api/auth/login", { email:email, password:password })
        //setCookies("access_token", response.data.token)
        console.log(response)
        navigate("/home")

      } catch (error) {
        console.error(error)
      }
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <div className='login'>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <img src="https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png" alt="" />
            <h1>Kullanıcı Girişi</h1>
          </div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" placeholder="Kullanıcı Adı" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Şifre" />
          {login && <span className='error'>Yanlış kullanıcı adı ve/veya şifre</span>}
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          {Array.isArray(errors.password) && (
            <div className='errors'>
              {errors.password.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_KEY}
            onChange={onChange}
          />
          <button>Giriş Yap</button>
          <a href="/reset" className='resetButton'>Şifremi yenile</a>
        </form>
      </div>

    </div>
  )
}
