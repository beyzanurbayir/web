// src/components/FilmEkle.jsx
import React, { useState } from 'react';
import FilmService from '../services/FilmService';
import { useNavigate } from 'react-router-dom'; // react-router-dom'dan useNavigate'i import et
import './FilmEkle.css';

const FilmEkle = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        genre: '',
        year: '',
        director: '',
        imdbRating: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // useNavigate kancasını kullanarak yönlendirme yapacağız

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const result = await FilmService.addFilm(formData);

        if (result.success) {
            setSuccessMessage('Film başarıyla eklendi!');
            setFormData({
                id: '',
                name: '',
                genre: '',
                year: '',
                director: '',
                imdbRating: ''
            });

            // 1 saniye bekledikten sonra yönlendirme yap
            setTimeout(() => {
                navigate('/chat'); // chat-window sayfasına yönlendirme
            }, 1000);
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className="film-ekle-container">
            <h1>Film Ekle</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Adı:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Tür:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Yıl:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="director">Yönetmen:</label>
                    <input
                        type="text"
                        id="director"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imdbRating">IMDb Puanı:</label>
                    <input
                        type="number"
                        step="0.1"
                        id="imdbRating"
                        name="imdbRating"
                        value={formData.imdbRating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Film Ekle</button>
            </form>
            {successMessage && <div className="notification success">{successMessage}</div>}
            {errorMessage && <div className="notification error">{errorMessage}</div>}
        </div>
    );
};

export default FilmEkle;
