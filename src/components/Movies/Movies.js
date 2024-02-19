import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';

export default function Movies({ movieList, isLoading, handleLoading }) {
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const getMovies = (movies) => {
    setMovies(movies);
    console.log(movies)
  }
  const onSaveMovie = (movie) => {
    const token = localStorage.getItem('jwt');
    const movieForSaving = {
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
    mainApi.saveMovie(movieForSaving, token)
    .catch(e => console.log(e));
  }
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const getSavedMovies = (token) => {
      mainApi.getMyMovies(token)
      .then(result => {
        console.log(result.movies)
        // const myMoviesId = result.movies.map(item => { return item.movieId });

        setMyMovies(result.movies);
      })
      .catch(e => console.log(e));
    }
    getSavedMovies(token);
  }, []);

  const isSaved = myMovies.some(movie => movie.movieId === 1);

  const [checked, setChecked] = useState([])

  return (
    <main className='movie-section content-section'>
      <SearchForm handleLoading={handleLoading} handleMovies={getMovies}/>
      {
      isLoading
      ? <Preloader />
      : <MoviesCardList >
          {movies.map((movie) => (
            <li key={movie.id}>
              <MoviesCard movie={movie}>
                <input className='movie-card__toggle' type="checkbox" defaultChecked={false}  id={movie.id} onChange={() => { setChecked(!checked); onSaveMovie(movie) }} />
                <label className='movie-card__logo movie-card__logo_type_save-button button' htmlFor={movie.id}>Сохранить</label>
                <span className='movie-card__logo movie-card__logo_type_check-mark'></span>
              </MoviesCard>
            </li>
          ))}
        </MoviesCardList>
      }
    </main>
  )
}
