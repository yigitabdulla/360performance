import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaResponse, setCaptchaResponse] = useState('');
  const [errors, setErrors] = useState({});
  const [, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);


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
    } else {
      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(' ');
      }
    }

    if (!captchaResponse) {
      newErrors.captcha = 'CAPTCHA doğrulaması gereklidir';
    }

    setErrors(newErrors);

    // If the errors object is empty, it means the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login({ email, password, captchaResponse }))
        .unwrap()
        .then((response) => {
          setCookies('access_token', response.token, { path: '/' });
          navigate('/home');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function onCaptchaChange(value) {
    setCaptchaResponse(value);
  }


  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <div className='title'>
            <img
              src='https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png'
              alt=''
            />
            <h1>Kullanıcı Girişi</h1>
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type='text'
            placeholder='Kullanıcı Adı'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type='password'
            placeholder='Şifre'
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} onChange={onCaptchaChange} />
          {errors.captcha && <span style={{ color: 'red' }}>{errors.captcha}</span>}
          <button type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Giriş Yap'}
          </button>
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <Link to='/reset' className='resetButton'>
            Şifremi yenile
          </Link>
        </form>
      </div>
    </div>
  );
}
