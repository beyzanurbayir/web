import React, { useState, useEffect, useRef } from 'react';
import { fetchMovieData } from './api';  // API istek fonksiyonunu import edin
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [
            { text: "Merhaba, lütfen bir film ismi giriniz", sender: "bot" }
        ];
    });

    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); // Tıklanan filmi takip eden state

    // Scroll ref
    const messagesEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // API çağrısı yaparak film isimlerini alın
        fetch('http://localhost:5090/film/names')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movie names:', error));
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'user', text: input }];
            setMessages(newMessages);
            setInput('');

            localStorage.setItem('chatMessages', JSON.stringify(newMessages));

            try {
                const movieData = await fetchMovieData(input);
                const botResponse = `
                Film: ${movieData.Title}\n
                Tür: ${movieData.Genre}\n
                Yıl: ${movieData.ReleaseYear}\n
                Yönetmen: ${movieData.Director}\n
                IMDb Puanı: ${movieData.IMDbRating}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botResponse }];
                setMessages(botMessages);

                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            } catch (error) {
                const botErrorMessage = `Üzgünüm, aradığınız film bulunamadı. Lütfen film adını kontrol edip tekrar deneyin.`;
                const botMessages = [...newMessages, { sender: 'bot', text: botErrorMessage }];
                setMessages(botMessages);

                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            }
        }
    };

    const handleButtonClick = (movieName) => {
        if (selectedMovie === movieName) {
            // Aynı filme tekrar tıklandı, input alanından geri al
            setInput('');
            setSelectedMovie(null);
        } else {
            // Farklı bir filme tıklandı, input alanına yerleştir
            setInput(movieName);
            setSelectedMovie(movieName);
        }
    };

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="chat-area">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-box ${msg.sender}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Scroll reference */}
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
            <div className="movie-list">
                <h2 className="movie-list-title">Film Listesi</h2>
                <div>
                    {movies.map((movie, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleButtonClick(movie)}
                        >
                            {movie}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
