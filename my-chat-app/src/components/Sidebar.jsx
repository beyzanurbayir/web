import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import DIGITURKLOGO from '../assets/DIGITURKLOGO.png'; 
import sunIcon from '../assets/sun.png'; // Güneş simgesi
import moonIcon from '../assets/moon.png'; // Ay simgesi

const Sidebar = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleThemeChange = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        document.body.className = newTheme ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', newTheme ? 'dark-theme' : 'light-theme');
    };
    
    // Sayfa yüklendiğinde temayı yerel depolamadan al
    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.className = savedTheme;
            setIsDarkTheme(savedTheme === 'dark-theme');
        }
    }, []);
    

    return (
        <div className="sidebar">
            <img src={DIGITURKLOGO} alt="DIGITURK Logo" className="logo" />
          
            <Link to="/film-ekle">
                <h2>Film Ekle</h2>
            </Link>
            <h2 onClick={toggleChat}>Ayarlar</h2>
            {isChatOpen && (
                <ul>
                    <li>
                        <div className="switch-container">
                            <img src={sunIcon} alt="Güneş" className="left-img" />
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isDarkTheme}
                                    onChange={handleThemeChange}
                                />
                                <span className="slider"></span>
                            </label>
                            <img src={moonIcon} alt="Ay" className="right-img" />
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
