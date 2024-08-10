import React, { useState, useEffect } from 'react';
import { fetchMovieData } from './api';  // API istek fonksiyonunu import edin
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState(() => {
        // localStorage'dan mesajları al
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [
            { text: "Merhaba, lütfen bir film ismi giriniz", sender: "bot" }
        ];
    });

    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'user', text: input }];
            setMessages(newMessages);
            setInput('');

            // Mesajları localStorage'a kaydet
            localStorage.setItem('chatMessages', JSON.stringify(newMessages));

            // API'den veri al ve bot yanıtını güncelle
            try {
                const movieData = await fetchMovieData(input);
                const botResponse = `
                Film: ${movieData.title}\n
                Tür: ${movieData.genre}\n
                Yıl: ${movieData.year}\n
                Yönetmen: ${movieData.director}\n
                IMDb Puanı: ${movieData.imdbRating}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botResponse }];
                setMessages(botMessages);

                // Cevabı da localStorage'a kaydet
                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            } catch (error) {
                const botErrorMessage = `${error.message}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botErrorMessage }];
                setMessages(botMessages);

                // Hata mesajını da localStorage'a kaydet
                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            }
        }
    };

    useEffect(() => {
        // Kullanıcı sayfayı yenilediğinde mesajları korumak için
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

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
                    placeholder="Film adı girin..."
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
