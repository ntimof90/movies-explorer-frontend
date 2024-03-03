import React from 'react';
import './MoviesCardList.css';

export default function MoviesCardList({ children }) {

  return (
    <section className='movie-list'>
      <ul className='movie-list__container'>
        {children}
      </ul>
    </section>
  )
}
