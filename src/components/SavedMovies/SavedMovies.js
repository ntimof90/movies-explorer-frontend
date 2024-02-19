import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import mainApi from '../../utils/MainApi';

export default function SavedMovies() {
  const [myMovies, setMyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoading(true);
    mainApi.getMyMovies(token)
      .then(result => {
        setMyMovies(result.movies);
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('jwt');
    mainApi.deleteMovie(id, token)
      .catch(e => console.log(e));
  }
  const filterMovies = (id) => {
    setMyMovies(prevState => {
      return prevState.filter(movie => movie._id !== id)
    })
  }
  const deleteMovie = (id) => {
    const token = localStorage.getItem('jwt');
     return mainApi.deleteMovie(id, token)
      .catch(e => console.log(e));
  }

  const handleClick = (id) => {
    setIsLoading(true);
    deleteMovie(id)
    .then(() => filterMovies(id))
    .finally(() => setIsLoading(false))
  }

  return (
    <main className='movie-section content-section'>
      <SearchForm />
      <MoviesCardList isLoading={isLoading}>
        {myMovies.map((movie) => (
          <li key={movie._id}>
            <MoviesCard movie={movie}>
              <button type='button' className='movie-card__logo movie-card__logo_type_delete-button button' onClick={() => {handleClick(movie._id)}} />
              {/* <input className='movie-card__toggle' type="checkbox"  id={movie._id} /> */}
              {/* <label className='movie-card__logo movie-card__logo_type_delete-button button' htmlFor={movie._id} /> */}
            </MoviesCard>
          </li>
        ))}
      </MoviesCardList>
    </main>
  )
}
