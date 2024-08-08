// src/components/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'; // CSS dosyasını import et

const LoginPage = ({ onLogin, onGuestLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Burada gerçek bir doğrulama işlemi yapılabilir
        if (username && password) {
            onLogin(); // Kullanıcı giriş yaparsa onLogin fonksiyonu çağrılır
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleLogin}>Giriş Yap</button>
                    <button className="guest-button" onClick={onGuestLogin}>Misafir Girişi</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
