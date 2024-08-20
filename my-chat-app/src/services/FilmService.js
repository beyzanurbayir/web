// FilmService.js
export default class FilmService {
    static async addFilm(formData) {
        // IMDb puanı 0.0 ile 10.0 arasında olmalı
        if (formData.imdbRating < 0.0 || formData.imdbRating > 10.0) {
            return { success: false, message: 'IMDb puanı 0 ile 10 arasında olmalıdır.' };
        }

        // Yılın 4 basamaktan oluşup oluşmadığını kontrol et
        if (formData.year.length !== 4) {
            return { success: false, message: 'Yıl 4 basamaktan oluşmalıdır.' };
        }

        try {
            const response = await fetch('http://localhost:5090/Film', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 0, // ID sıfır olarak gönderiliyor, API'nin dinamik olarak ID ataması yapması bekleniyor
                    title: formData.name,
                    genre: formData.genre, 
                    releaseYear: parseInt(formData.year, 10),
                    director: formData.director,
                    imdbRating: parseFloat(formData.imdbRating),
                }),
            });

            // Yanıtı JSON olarak al
            const responseBody = await response.json();

            if (!response.ok) {
                let errorMessage = 'Film verileri eklenirken bir hata oluştu.';
                if (responseBody && responseBody.errors) {
                    const errorMessages = Object.values(responseBody.errors)
                        .flat()
                        .join(' ');
                    errorMessage = errorMessages || errorMessage;
                }
                throw new Error(errorMessage);
            }

            return { success: true, data: responseBody };

        } catch (error) {
            console.error('Error adding film:', error);
            return { success: false, message: error.message || 'Film eklenirken bir hata oluştu. Lütfen tekrar deneyin.' };
        }
    }
}
