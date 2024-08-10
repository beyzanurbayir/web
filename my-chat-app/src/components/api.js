const API_KEY = 'd7259f93'; 

export const fetchMovieData = async (movieTitle) => {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
  const data = await response.json();
  
  if (data.Response === 'True') {
    return {
      title: data.Title,
      genre: data.Genre,
      year: data.Year,
      director: data.Director,
      imdbRating: data.imdbRating,
    };
  } else {
    throw new Error('Üzgünüm, aradığınız film bulunamadı. Lütfen film adını kontrol edip tekrar deneyin.');
  }
};
