// src/services/FilmService.js
export default class FilmService {
    static async addFilm(formData) {
        // IMDb puanı 0.0 ile 10.0 arasında olmalı
        if (formData.imdbRating < 0.0 || formData.imdbRating > 10.0) {
            return { success: false, message: 'IMDb puanı 0 ile 10 arasında olmalıdır.' };
        }

        try {
            const response = await fetch('http://localhost:5090/Film', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseBody = await response.text(); // Yanıt gövdesini al

            let errorMessage = 'Film verileri eklenirken bir hata oluştu.';

            // Yanıtı JSON olarak parse etmeyi dene
            try {
                const errorData = JSON.parse(responseBody);
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch {
                // JSON parse hatası oluşursa, yanıtı metin olarak kullan
                errorMessage = responseBody || errorMessage;
            }

            if (!response.ok) {
                throw new Error(errorMessage);
            }

            // Yanıt başarılı ise JSON olarak parse et
            const result = JSON.parse(responseBody);
            return { success: true, data: result };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: error.message || 'Film verileri eklenirken bir hata oluştu. Lütfen tekrar deneyin.' };
        }
    }
}
