import React, { useState, useContext } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserMoviesContext } from '../../contexts/userContext';
import { useForm } from '../../utils/FormHandler';

export default function SavedMovies() {
  const { userMovies, deleteMovie } = useContext(CurrentUserMoviesContext);

  const { values, setValues, handleChange } = useForm()

  const [query, setQuery] = useState(null);

  const [error, setError] = useState(false);

  const [loadingCard, setLoadingCard] = useState('');

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!values.name) {
      setQuery(null);
      setError(true);
    }
    else {
      setQuery(values);
      setError(false);
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
    setQuery(value);
  }

  const handleDeleteClick = (id) => {
    setLoadingCard(id);
    deleteMovie(id)
    .finally(() => setLoadingCard(''));
  }

  const results = (!query)
    ? userMovies
    : handleQuery(query, userMovies)

  return (
    <main className='movie-section content-section preloader-place'>
      <SearchForm
        values={values}
        error={error}
        query={query}
        setValues={setValues}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleChangeFormat={handleChangeFormat}
      />
      {results.length === 0
        ? <p className='movie-section__submit'>Ничего не найдено</p>
        : <MoviesCardList>
            {results.map((movie) => (
              <li key={movie._id}>
                <MoviesCard movie={movie} isLoading={(loadingCard === movie._id)}>
                  <span type='button' className='movie-card__logo movie-card__logo_type_delete-button button' onClick={() => {handleDeleteClick(movie._id)}} />
                </MoviesCard>
              </li>
            ))}
          </MoviesCardList>
      }
    </main>
  )
}