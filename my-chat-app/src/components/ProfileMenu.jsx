import React, { useState } from 'react';
import './ProfileMenu.css';
import profileIcon from '../assets/profile-icon.png'; // Resmi import et

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-menu">
            <img
                src={profileIcon}  // Import edilen resim
                alt="Profile"
                onClick={toggleMenu}
                style={{ cursor: 'pointer' }}  // İkonun tıklanabilir olduğunu belirlemek için
            />
            {isOpen && (
                <div className="menu">
                    <p>Kullanıcı Adı: John Doe</p>
                    <p>E-posta: john.doe@example.com</p>
                    <button>Çıkış Yap</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
