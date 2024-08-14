// src/services/FilmService.js
export default class FilmService {
    static async addFilm(formData) {
        try {
            const response = await fetch('http://localhost:5090/Film', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Film verileri eklenirken bir hata oluştu.');
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, message: 'Film verileri eklenirken bir hata oluştu. Lütfen tekrar deneyin.' };
        }
    }
}
