import { useRef } from 'react';
import { findMovie } from './MoviesApi';

export default function useMoviesDatabase(setServerError) {
  const beatfilmMoviesDB = useRef([]);

  const getbeatfilmMoviesDB = () => {
    return findMovie()
      .then(result => {
        const initialMovies = result.map(movie => {
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailer: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          }
        });
        beatfilmMoviesDB.current = initialMovies;
      })
      .catch(e => setServerError('500 Нет доступа к базе данных.'));
  }

  return { beatfilmMoviesDB, getbeatfilmMoviesDB };
}
