import React, { useState, useEffect, useRef } from 'react';
import './ProfileMenu.css';
import profileIcon from '../assets/profile-icon.png'; // Resmi import et

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [theme, setTheme] = useState('light-theme'); // Tema durumu
    const [showAlert, setShowAlert] = useState(false); // Uyarı mesajı durumu

    const menuRef = useRef(null);  // Menü ve modal için referanslar
    const modalRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setCurrentUsername(username);
        setCurrentPassword(password);
        setNewUsername('');
        setNewPassword('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = () => {
        if (username === 'Kullanıcı Adı Yok' && password === 'Şifre Yok') {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // 3 saniye sonra uyarıyı gizle
        } else {
            openModal(); // Güncelleme modalını aç
        }
    };

    const applyUpdate = () => {
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        setUsername(newUsername);
        setPassword(newPassword);
        closeModal();
    };

    const toggleTheme = () => {
        const newTheme = (theme === 'light-theme' ? 'dark-theme' : 'light-theme');
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        // Kullanıcı adı ve şifreyi localStorage'den al
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password'); // Şifreyi de saklayın

        setUsername(storedUsername || 'Kullanıcı Adı Yok');
        setPassword(storedPassword || 'Şifre Yok');
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.className = savedTheme;
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`profile-menu ${theme}`} ref={menuRef}>
            <img
                src={profileIcon}  // Import edilen resim
                alt="Profile"
                onClick={toggleMenu}
                style={{ cursor: 'pointer' }}  // İkonun tıklanabilir olduğunu belirlemek için
            />
            {isOpen && (
                <div className={`menu ${theme}`}>
                    <p>Kullanıcı Adı: {username}</p>
                    <p>Şifre: {password}</p>
                    <button onClick={handleUpdate}>Güncelle</button> {/* Güncelleme modalını aç */}
                </div>
            )}

            {showAlert && (
                <div className="alert-message">
                    Misafir kullanıcılar güncelleme yapamaz
                </div>
            )}

            {isModalOpen && (
                <div className={`modal-overlay ${theme}`} ref={modalRef}>
                    <div className={`modal-content ${theme}`}>
                        <div className="modal-header">
                            <img src={profileIcon} alt="Profile" className="modal-profile-icon" />
                            <h2>Merhaba!</h2>
                        </div>
                        <form className={`modal-form ${theme}`}>
                            <label>
                                Mevcut Kullanıcı Adı:
                                <input
                                    type="text"
                                    value={currentUsername}
                                    disabled
                                />
                            </label>
                            <label>
                                Yeni Kullanıcı Adı:
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </label>
                            <label>
                                Mevcut Şifre:
                                <input
                                    type="password"
                                    value={currentPassword}
                                    disabled
                                />
                            </label>
                            <label>
                                Yeni Şifre:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                        </form>
                        <div className={`modal-buttons ${theme}`}>
                            <button onClick={closeModal}>İptal</button>
                            <button onClick={applyUpdate}>Güncelle</button> {/* Güncellemeyi uygula */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
