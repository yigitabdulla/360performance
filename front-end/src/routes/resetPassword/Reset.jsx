import React, { useState, useRef } from 'react';
import './reset.scss';
import emailjs from '@emailjs/browser';

export default function Reset() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_ehqrj68', 'template_mc3sbfl', {email:email}, 'mlA1zKffVQPqzecqn')
            .then(
                (response) => {
                    setErrors({})
                    setEmail('');
                    alert('Talebiniz başarıyla iletildi')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Talebiniz iletilemedi')
                }
            );
    };

    const validateForm = (e) => {
        e.preventDefault()
        const newErrors = {};

        if (!email) {
            newErrors.email = 'E-posta alanı boş bırakılamaz';
            setErrors(newErrors);
            return;
        }

        sendEmail(e)

        // If the errors object is empty, it means the form is valid
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        sendEmail()
    };

    return (
        <div className="reset">
            <div className="formContainer">
                <form ref={form} onSubmit={validateForm}>
                    <div className="title">
                        <img src="https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png" alt="" />
                        <h1>Şifremi Unuttum</h1>
                    </div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="E-posta adresinizi giriniz" />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    <button type="submit">Gönder</button>
                    <a href="/login" className="resetButton">Giriş sayfasına geri dön</a>
                </form>
            </div>
        </div>
    );
}
