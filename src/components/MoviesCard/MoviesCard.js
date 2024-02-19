import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ movie, children }) {
  const convertDuration = (time) => {
    if (typeof time === 'number') {
      const hour = Math.floor(time / 60);
      const min = Math.floor(time - 60 * hour);
      if (hour < 1) return `${min}м`;
      return `${hour}ч ${min}м`;
    }
    return '-';
  }

  return (
    <article className='movie-card'>
      <div className='movie-card__header'>
        <img className='movie-card__cover' src={movie.image} alt={`Постер к фильму ${movie.nameRU}}`} />
        {children}
      </div>
      <div className='movie-card__footer'>
        <h2 className='movie-card__title'>{movie.nameRU}</h2>
        <p className='movie-card__subtitle'>{convertDuration(movie.duration)}</p>
      </div>
    </article>
  )
}
