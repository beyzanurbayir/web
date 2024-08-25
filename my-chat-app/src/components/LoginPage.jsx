import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './LoginPage.css';

function LoginPage({ onLogin, onGuestLogin }) {

    // Kullanıcı adı ve şifre için state tanımları
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Kullanıcı adı ve şifreleri içeren basit bir kullanıcı listesi
    const users = [
        { username: 'admin', password: '123' },
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ];

    // Giriş yapma fonksiyonu
    const handleLogin = () => {
        // localStorage'dan güncel kullanıcı adı ve şifreyi al
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        const user = users.find((user) => user.username === username && user.password === password);

        if (user || (username === storedUsername && password === storedPassword)) {
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

    // Misafir girişi fonksiyonu
    const handleGuestLoginClick = () => {
        // Misafir kullanıcı için username'yi kaldır
        localStorage.removeItem('username');
        localStorage.removeItem('password'); // Misafir girişinde şifreyi kaldır
        onGuestLogin();
        navigate('/chat');
    };

    return (
        <div className="login-page">
            <ToastContainer /> {/* Bu bileşeni ekleyin */}
            <div className="login-form">
                <h2>Giriş Yap</h2>
                <input 
                    type="text" 
                    className="form-input username-input" // Özel sınıf adı
                    placeholder="Kullanıcı Adı" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />

                <input 
                    type="password" 
                    className="form-input password-input" // Özel sınıf adı
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
