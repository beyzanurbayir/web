import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './LoginPage.css';

function LoginPage({ onLogin, onGuestLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const users = [
        { username: 'admin', password: '123' },
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ];

    const handleLogin = () => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            onLogin();
            navigate('/chat');
        } else {
            toast.error('Kullanıcı adı veya şifre hatalı!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    backgroundColor: '#333',
                    color: '#fff',
                    fontWeight: 'bold'
                }
            });
        }
    };

    const handleGuestLoginClick = () => {
        sessionStorage.clear(); // Misafir Girişi için mesajları temizle
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        onGuestLogin();
        navigate('/chat');
    };

    return (
        <div className="login-page">
            <ToastContainer />
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <input 
                    type="text" 
                    className="form-input username-input" 
                    placeholder="Kullanıcı Adı" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />

                <input 
                    type="password" 
                    className="form-input password-input" 
                    placeholder="Şifre" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="button-group">
                    <button onClick={handleLogin}>Giriş Yap</button>
                    {error && <p className="error">{error}</p>}
                    <button onClick={handleGuestLoginClick} className="guest-button">Misafir Girişi</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
