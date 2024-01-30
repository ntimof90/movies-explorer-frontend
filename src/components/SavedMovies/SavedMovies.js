import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function SavedMovies({movieList}) {

  return (
    <main className='movie-section content-section'>
      <SearchForm />
      <MoviesCardList movieList={movieList}>
        {movieList.map((movie) => (
          <li key={movie._id}>
            <MoviesCard movie={movie}>
              <input className='movie-card__toggle' type="checkbox"  id={movie._id} />
              <label className='movie-card__logo movie-card__logo_type_delete-button button' htmlFor={movie._id} />
            </MoviesCard>
          </li>
        ))}
      </MoviesCardList>
    </main>
  )
}
