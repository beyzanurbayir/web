// src/App.js
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import ProfileMenu from './components/ProfileMenu';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true); // Kullanıcı giriş yaptı olarak ayarla
    };

    const handleGuestLogin = () => {
        setIsLoggedIn(true); // Misafir olarak giriş yaptı olarak ayarla
    };

    return (
        <div className="app">
            {!isLoggedIn ? (
                <LoginPage onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
            ) : (
                <>
                    <Sidebar />
                    <div className="main-content">
                        <ProfileMenu />
                        <ChatWindow />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
