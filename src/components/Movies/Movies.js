import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import coverPath from '../../images/movie-pack/pic__COLOR_pic5.jpg';

export default function Movies() {
  const movies = [
    {_id: 1, nameRU: '33 слова о дизайне33 слова о дизайне33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 2, nameRU: '33 слова о дизайне1', duration: 67, thumbnail: coverPath},
    {_id: 3, nameRU: '33 слова о дизайне2', duration: 67, thumbnail: coverPath},
    {_id: 4, nameRU: '33 слова о дизайне3', duration: 67, thumbnail: coverPath},
    {_id: 5, nameRU: '33 слова о дизайне4', duration: 67, thumbnail: coverPath},
    {_id: 6, nameRU: '33 слова о дизайне5', duration: 67, thumbnail: coverPath},
    {_id: 7, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 8, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 9, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 10, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 11, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 12, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 13, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 14, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {_id: 15, nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
  ];
  return (
    <main className='movie-section content-section'>
      <SearchForm />
      <MoviesCardList>
        {movies.map((movie) => (
          <MoviesCard key={movie._id} movie={movie}>
            <label className='movie-card__logo movie-card__logo_type_save-button button' htmlFor={movie._id}>Сохранить</label>
            <span className='movie-card__logo movie-card__logo_type_check-mark'></span>
          </MoviesCard>
        ))}
      </MoviesCardList>
    </main>
  )
}
