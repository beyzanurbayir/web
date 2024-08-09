// src/components/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin, onGuestLogin }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        onLogin();
        navigate('/chat');
    };

    const handleGuestLoginClick = () => {
        onGuestLogin();
        navigate('/chat');
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <input type="text" placeholder="Kullanıcı Adı" />
                <input type="password" placeholder="Şifre" />
                <div className="button-group">
                    <button onClick={handleLoginClick}>Giriş Yap</button>
                    <button onClick={handleGuestLoginClick} className="guest-button">Misafir Girişi</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
