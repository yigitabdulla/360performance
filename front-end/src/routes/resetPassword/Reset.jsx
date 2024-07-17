import React, { useState, useRef } from 'react';
import './reset.scss';
import emailjs from '@emailjs/browser';

export default function Reset() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('')
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_ehqrj68', 'template_mc3sbfl', { email }, 'mlA1zKffVQPqzecqn')
            .then(
                (response) => {
                    console.log('SUCCESS!');
                    setEmail('');
                    setMessage('Talebiniz başarıyla iletildi')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setMessage('Talebiniz iletilemedi')
                }
            );
    };

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
            sendEmail(e); // Pass the event to sendEmail
            console.log('Form submitted successfully');
        }
    };

    return (
        <div className="reset">
            <div className="formContainer">
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="title">
                        <img src="https://finartz.com/hs-fs/hubfs/Finartz%20Logo-1.png?width=240&height=77&name=Finartz%20Logo-1.png" alt="" />
                        <h1>Şifremi Unuttum</h1>
                    </div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="E-posta adresinizi giriniz" />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    {message && <span>{message}</span>}
                    <button type="submit">Gönder</button>
                    <a href="/login" className="resetButton">Giriş sayfasına geri dön</a>
                </form>
            </div>
        </div>
    );
}
