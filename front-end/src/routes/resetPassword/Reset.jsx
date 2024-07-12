import React, { useState } from 'react'
import "./reset.scss"
import { Link } from "react-router-dom";

export default function Reset() {
    const login = false
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'E-posta alanı boş bırakılamaz';
        }

        setErrors(newErrors);

        // If the errors object is empty, it means the form is valid
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully');
        }
    };

    return (
        <div className="reset">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <img src="https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png" alt="" />
                        <h1>Şifremi Unuttum</h1>
                    </div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="E-posta adresinizi giriniz" />
                    {login && <span className='error'>Yanlış kullanıcı adı ve/veya şifre</span>}
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                    <button>Gönder</button>
                    <a href="/login" className='resetButton'>Giriş sayfasına geri dön</a>
                    
                </form>
            </div>
        </div>
    )
}
