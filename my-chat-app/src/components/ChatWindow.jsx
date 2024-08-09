import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState(() => {
        // localStorage'dan mesajları al
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [
            { text: "Merhaba, size nasıl yardımcı olabilirim?", sender: "bot" }
        ];
    });

    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'user', text: input }];
            setMessages(newMessages);
            setInput('');

            // Mesajları localStorage'a kaydet
            localStorage.setItem('chatMessages', JSON.stringify(newMessages));

            // Chatbot cevabı
            setTimeout(() => {
                const botMessages = [...newMessages, { sender: 'bot', text: 'Merhaba' }];
                setMessages(botMessages);

                // Cevabı da localStorage'a kaydet
                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            }, 500);
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-box ${msg.sender}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="send-button" onClick={handleSend}>
                    Gönder
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
