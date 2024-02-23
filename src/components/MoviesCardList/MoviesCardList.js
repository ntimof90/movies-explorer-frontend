import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({ isLoading, children }) {
  // const handleCardLoaderClick = () => {
  //   const cards = document.querySelectorAll('.movie-list__container li');
  //   const button = document.querySelector('.movie-list__cardloader');
  //   cards.forEach((card) => {
  //     card.style.display = 'block';
  //   });
  //   button.style.display = 'none';
  // }
  return (
    <section className='movie-list'>
      <ul className='movie-list__container'>
        {isLoading && <Preloader />}
        {children}
      </ul>
      {/* {!isLoading && <button className='movie-list__cardloader button' onClick={handleCardLoaderClick}>Ещё</button>} */}
    </section>
  )
}
