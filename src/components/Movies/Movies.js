import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

export default function Movies({ movieList, isLoading, handleLoading }) {

  return (
    <main className='movie-section content-section'>
      <SearchForm handleLoading={handleLoading}/>
      {
      isLoading
      ? <Preloader />
      : <MoviesCardList >
          {movieList.map((movie) => (
            <li key={movie._id}>
              <MoviesCard movie={movie}>
                <input className='movie-card__toggle' type="checkbox"  id={movie._id} />
                <label className='movie-card__logo movie-card__logo_type_save-button button' htmlFor={movie._id}>Сохранить</label>
                <span className='movie-card__logo movie-card__logo_type_check-mark'></span>
              </MoviesCard>
            </li>
          ))}
        </MoviesCardList>
      }
    </main>
  )
}
