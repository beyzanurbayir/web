const API_URL = 'http://localhost:5090/'; 

export const fetchMovieData = async (movieName) => {
  const response = await fetch(`${API_URL}film/name/${encodeURIComponent(movieName)}`); // Endpoint: /film/name/{name}
  const data = await response.json();

  // API yanıtını kontrol et
  console.log('API Response:', data);
  console.log('Release Year:', data.releaseYear);
  console.log('IMDb Rating:', data.imDbRating);
  
  if (data && data.title) {
    return {
      Title: data.title,
      Genre: data.genre,
      ReleaseYear: data.releaseYear, // Büyük/küçük harf uyumu sağlanmalı
      Director: data.director,
      IMDbRating: data.imDbRating, // Büyük/küçük harf uyumu sağlanmalı
    };
  } else {
    throw new Error('Üzgünüm, aradığınız film bulunamadı. Lütfen film adını kontrol edip tekrar deneyin!!');
  }
};
