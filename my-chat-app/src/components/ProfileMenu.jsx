import React, { useState } from 'react';
import './ProfileMenu.css';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-menu">
            <img src="/path-to-profile-icon.png" alt="Profile" onClick={toggleMenu} />
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
