import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import coverPath from '../../images/movie-pack/pic__COLOR_pic5.jpg';

export default function MoviesCardList({ children }) {
  const movies = [
    {nameRU: '33 слова о дизайне33 слова о дизайне33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне1', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне2', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне3', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне4', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне5', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
    {nameRU: '33 слова о дизайне', duration: 67, thumbnail: coverPath},
  ];
  const pages = Math.ceil(movies.length / 12);
  const [pageCount, setPageCount] = React.useState(1);
  // const moviesForRender = movies.slice(0, 12 * pageCount);
  // const [movieList, setMovieList] = React.useState([]);
  React.useEffect(() => {
      // setMovieList(moviesForRender);
    // setMovieList(movies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);
  // const limitOnPage = 12;
  // const handleLoadClick = () => {
  //   setPageCount(pageCount + 1);
  //   console.log(pages);
  // }
  return (
    <section className='movies'>
        { children }
      {/* <button className={`movies__more-button button ${pageCount === pages ? 'movies__more-button_inactive' : ''}`} type='button' onClick={handleLoadClick}>Ещё</button> */}
    </section>
  )
}
