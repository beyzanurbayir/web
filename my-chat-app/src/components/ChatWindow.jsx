import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Chatbot: Merhaba, size nasıl yardımcı olabilirim?', type: 'bot' }
    ]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: `Kullanıcı: ${message}`, type: 'user' }, { text: 'Chatbot: merhaba', type: 'bot' }]);
            setMessage(''); // Mesaj kutusunu temizle
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.type}>{msg.text}</p>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Mesajınızı yazın..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button className="send-button" onClick={handleSendMessage}>Gönder</button>
            </div>
        </div>
    );
};

export default ChatWindow;
