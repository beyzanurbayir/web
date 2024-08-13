const API_URL = 'http://localhost:5090/'; 

export const fetchMovieData = async (movieName) => {
  const response = await fetch(`${API_URL}film/name/${encodeURIComponent(movieName)}`); // Endpoint: /film/name/{name}
  const data = await response.json();
  
  if (data && data.name) {
    return {
      title: data.name,
      genre: data.genre,
      year: data.year,
      director: data.director,
      imdbRating: data.imdbRating,
    };
  } else {
    throw new Error('Üzgünüm, aradığınız film bulunamadı. Lütfen film adını kontrol edip tekrar deneyin.');
  }
};
