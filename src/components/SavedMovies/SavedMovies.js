import React, { useState, useEffect, useContext, useRef } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import mainApi from '../../utils/MainApi';
import useMovieApp from '../../utils/useMovieApp';
import { CurrentUserMoviesContext } from '../../contexts/userContext';

export default function SavedMovies() {
  const [view, setView] = useState({});
  useEffect(() => {
    // setView({cardsCount: 12, addCount: 3});
    const handleResize = () => {
      if (window.innerWidth >= 1280) setView({ cardsCount: 12, addCount: 3 });
      if (window.innerWidth >= 850 && window.innerWidth < 1280) setView({ cardsCount: 8, addCount: 2 });
      if (window.innerWidth < 850) {console.log(view); setView({ cardsCount: 5, addCount: 2 })}
      // if (window.innerWidth < 1279) setView({cardsCount: 8, addCount: 2})
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    console.log(view)
    // setRenderList(userMovies.current.slice(0, view.cardsCount));
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  // const [myMovies, setMyMovies] = useState([]);
  // const [searchingResult, setSearchingResult] = useState(userMovies);
  const userMovies = useContext(CurrentUserMoviesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [renderList, setRenderList] = useState([]);
  // const myMovies = useRef([]);
  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   mainApi.getMyMovies(token)
  //     .then(result => {
  //       setRenderList(result.movies);
  //       myMovies.current = result.movies;
  //     })
  //     .catch(e => console.log(e))
  // }, [])
  useEffect(() => {
    setRenderList(userMovies.current.slice(0, view.cardsCount));
  }, [view]);
  const handleDeleteClick = (id) => {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');

    mainApi.deleteMovie(id, token)
      .then(() => {
        // myMovies.current = myMovies.current.filter(item => item._id !== id)
        console.log(userMovies.current)
        userMovies.current = userMovies.current.filter(item => item._id !== id)
        console.log(userMovies.current)
        setRenderList((prevState => {
          return prevState.filter(item => item._id !== id)
        }))
        setView({...view, cardsCount: view.cardsCount})
        console.log(view);
        // userMovies.current = userMovies.current.filter(movie => movie._id !== id)
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  }

  const handleSearch = (query) => {
    setSubmitMessage('');
    const respond = onSearch(query);
    setRenderList(respond.slice(0, view.cardsCount));
    if (respond.length === 0) setSubmitMessage('Ничего не найдено')
    // setRenderList(onSearch(query));
    // const searchResult = myMovies.filter(myMovie => {
    //   return myMovie.nameRU.toLowerCase().includes(query.movie.toLowerCase())
    // })
    // setSearchingResult(searchResult);
  }

  const onSearch = (query) => {
    const ruRegEx = /[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i;
    console.log(query);
    if (ruRegEx.test(query.movie)) {
      return userMovies.current.filter(movie => {
        console.log(query.movie);
        return movie.nameRU.toLowerCase().includes(query.movie.toLowerCase())
      })
    } else {
      return userMovies.current.filter(movie => movie.nameEN.toLowerCase().includes(query.movie.toLowerCase()))
    }
  }
  const handleMoreClick = () => {
    setView({...view, cardsCount: view.cardsCount + view.addCount})
    // view.cardsCount = view.cardsCount + view.addCount;
    // setRenderList(userMovies.current.slice(0, view.cardsCount));
  }

  // const { renderList, handleDeleteMovie, searchMovie } = useMovieApp();

  return (
    <main className='movie-section content-section'>
      <SearchForm onSubmit={handleSearch} />
      <MoviesCardList isLoading={isLoading}>
        {submitMessage && <p>{submitMessage}</p>}
        {renderList.map((movie) => (
          <li key={movie._id}>
            <MoviesCard movie={movie}>
              <button type='button' className='movie-card__logo movie-card__logo_type_delete-button button' onClick={() => {handleDeleteClick(movie._id)}} />
            </MoviesCard>
          </li>
        ))}
      </MoviesCardList>
      {view.cardsCount >= renderList.length && <button className='movie-list__cardloader button' onClick={handleMoreClick}>Ещё</button>}
    </main>
  )
}
