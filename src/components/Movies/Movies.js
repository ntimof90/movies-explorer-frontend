import React, { useContext, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { CurrentUserMoviesContext } from '../../contexts/userContext';
import useRerenderByResize from '../../utils/useRerenderByResize';
import { useForm } from '../../utils/FormHandler';

export default function Movies({ beatfilmMoviesDB, getbeatfilmMoviesDB }) {
  const { userMovies, deleteMovie, saveMovie } = useContext(CurrentUserMoviesContext);

  const [isMovieDbLoading, setIsMovieDbLoading] = useState(false);

  const [loadingCard, setLoadingCard] = useState('');

  const currentQuery = JSON.parse(localStorage.getItem('currentQuery')) || {};
  const currentRender = JSON.parse(localStorage.getItem('currentRender')) || [];

  const { values, setValues, handleChange } = useForm(currentQuery)
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(false);
  const [searchResult, setSearchResult] = useState(currentRender);

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!values.name) {
      setQuery(null);
      setError(true);
    }
    else {
      setError(false);
      if (beatfilmMoviesDB.current.length === 0) {
        setIsMovieDbLoading(true)
        getbeatfilmMoviesDB()
          .then(() => {
            setQuery(values);
            setIsMovieDbLoading(false);
          })
      } else setQuery(values);
    }
  }

  const handleQuery = (query, movies) => {
    const { name, durationFormat} = query;

    const handleName = (name, item) => {
      if (/[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/.test(name.toLowerCase())) return item.nameRU.toLowerCase().includes(name.toLowerCase());
      else return item.nameEN.toLowerCase().includes(name.toLowerCase());
    }
    const handleDurationFormat = (isShortFormat, item) => {
      if (isShortFormat) return item.duration <= 40;
      else return true;
    }

    return movies.filter(item => handleName(name, item) && handleDurationFormat(durationFormat, item));
  }

  const handleChangeFormat = (value) => {
      if (beatfilmMoviesDB.current.length === 0) {
        setIsMovieDbLoading(true)
        getbeatfilmMoviesDB()
          .then(() => {
            setQuery(value);
            setIsMovieDbLoading(false);
          })
      } else setQuery(value);
  }

  const handleDeleteClick = (id) => {
    deleteMovie(id)
      .finally(() => setLoadingCard(''));
  }

  const handleSaveClick = (movie) => {
    setLoadingCard(movie.movieId)
    saveMovie(movie)
      .finally(() => setLoadingCard(''));
  }

  const { rerenderResult, handleMoreClick } = useRerenderByResize(searchResult)

  useEffect(() => {
    if (query && !isMovieDbLoading) {
      localStorage.setItem('currentQuery', JSON.stringify(query));
      const result = handleQuery(query, beatfilmMoviesDB.current)
      setSearchResult(result);
      localStorage.setItem('currentRender', JSON.stringify(result));
    }
  }, [query, isMovieDbLoading, beatfilmMoviesDB]);

  return (
    <main className='movie-section content-section'>
      <SearchForm
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        error={error}
        handleSearch={handleSearch}
        setQuery={setQuery}
        query={query}
        handleChangeFormat={handleChangeFormat}
      />
      {isMovieDbLoading
        ? <Preloader />
        : searchResult.length === 0 && query
            ? <p className='movie-section__submit'>Ничего не найдено</p>
            : <>
                <MoviesCardList >
                  {rerenderResult.map((movie) => (
                    <li key={movie.movieId}>
                      <MoviesCard movie={movie} isLoading={(loadingCard === movie.movieId)}>
                        {!userMovies.some(userMovie => userMovie.movieId === movie.movieId)
                        ? <span
                            className='movie-card__logo movie-card__logo_type_save-button button'
                            onClick={() => {
                              handleSaveClick(movie)
                            }}
                          >
                            Сохранить
                          </span>
                        : <span
                            className='movie-card__logo_type_check-mark button'
                            onClick={() => {
                              setLoadingCard(movie.movieId);
                              const userMovie = userMovies.find(userMovie => userMovie.movieId === movie.movieId);
                              handleDeleteClick(userMovie._id);
                            }}
                          >
                          </span>
                        }
                      </MoviesCard>
                    </li>
                  ))}
                </MoviesCardList>
                {rerenderResult.length < searchResult.length && <button className='movie-list__cardloader button' onClick={handleMoreClick}>Ещё</button>}
              </>
      }
    </main>
  )
}
