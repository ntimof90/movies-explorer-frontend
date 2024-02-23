import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { findMovie } from '../../utils/MoviesApi';
import { CurrentUserMoviesContext } from '../../contexts/userContext';

export default function Movies({ movieList, handleLoading }) {
  // const { userMovies, like } = useContext(CurrentUserMoviesContext);
  const [movies, setMovies] = useState([]);
  const userMovies = useContext(CurrentUserMoviesContext);
  const movieDB = useRef([]);
  // let movieDB.current = [];
  const [renderList, setRenderList] = useState([]);

  const getInitialMovieList = () => {
    findMovie()
      .then(result => {
        const initialMovies = result.map(movie => {
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailer: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          }
        });
        movieDB.current = initialMovies;
        console.log(movieDB.current);
        setMovies(initialMovies);
      })
      .catch(e => console.log(e));
  }
  // const handleLikeClick = (movie) => {
  //   like(movie);
  // }
  // useEffect(() => {
  //   getInitialMovieList();
  // }, [])
  const getMovies = (movies) => {
    setMovies(movies);
    console.log(movies)
  }
  const [isLoading, setIsLoading] = useState(false)
  const handleSaveClick = (movie) => {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');
    return mainApi.saveMovie(movie, token)
      .then(res => {
        userMovies.current.push(res.movie);
        handleChange();
        })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  }
  const handleDeleteClick = (id) => {
    setIsLoading(true);
    const token = localStorage.getItem('jwt');

    mainApi.deleteMovie(id, token)
      .then(() => {
        console.log(userMovies.current)
        userMovies.current = userMovies.current.filter(item => item._id !== id)
        console.log(userMovies.current)
        // setRenderList((prevState => {
        //   return prevState.filter(item => item._id !== id)
        // }))
        // userMovies.current = userMovies.current.filter(movie => movie._id !== id)
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  }
  const handleChange = (movie) => {
  }

  const handleSearch = async (query) => {
    findMovie()
      .then(result => {
        const initialMovies = result.map(movie => {
          return {
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailer: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          }
        });
        movieDB.current = initialMovies;
      })
      .then(() => {
        const respond = onSearch(query);
        setRenderList(respond);
      })
    // try {
    //   if (movieDB.current.length === 0) {
    //     await getInitialMovieList();
    //   }
    //   const respond = onSearch(query);
    //   setRenderList(respond);
    // } catch (e) {

    // }
    // // setSubmitMessage('');
    // if (movieDB.current.length === 0) {
    //   getInitialMovieList();
    // }
    // const respond = onSearch(query);
    // console.log(respond);
    // setRenderList(respond);
    // if (respond.length === 0) setSubmitMessage('Ничего не найдено')
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
      return movieDB.current.filter(movie => {
        console.log(query.movie);
        return movie.nameRU.toLowerCase().includes(query.movie.toLowerCase())
      })
    } else {
      return movieDB.current.filter(movie => movie.nameEN.toLowerCase().includes(query.movie.toLowerCase()))
    }
  }
  // const onSaveMovie = (movie) => {
  //   const token = localStorage.getItem('jwt');
  //   mainApi.saveMovie(movie, token)
  //   .catch(e => console.log(e));
  // }
  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   const getSavedMovies = (token) => {
  //     mainApi.getMyMovies(token)
  //     .then(result => {
  //       console.log(result.movies)
  //       // const myMoviesId = result.movies.map(item => { return item.movieId });

  //       setRenderList(result.movies);
  //     })
  //     .catch(e => console.log(e));
  //   }
  //   getSavedMovies(token);
  // }, []);

  const isSaved = (id) => userMovies.current.some(movie => movie.movieId === id);

  const [checked, setChecked] = useState(false)

  return (
    <main className='movie-section content-section'>
      <SearchForm handleLoading={handleLoading} onSubmit={handleSearch}/>
      <MoviesCardList isLoading={isLoading} >
        {renderList.map((movie) => (
          <li key={movie.movieId}>
            <MoviesCard movie={movie}>
              {/* <input className='movie-card__toggle' type="checkbox" defaultChecked={isSaved(movie.movieId)}  id={movie.movieId} onChange={(evt) => { setChecked(!checked); handleSaveClick(movie) }} /> */}
              <input className='movie-card__toggle' type="checkbox" checked={userMovies.current.some(userMovie => userMovie.movieId === movie.movieId)}  id={movie.movieId} />
              <span
                className='movie-card__logo movie-card__logo_type_save-button button'
                onClick={(evt) => {
                  handleSaveClick(movie)
                  // console.log(evt.target.closest('checkbox'))
                }}
              >
                Сохранить
              </span>
              <span
                className='movie-card__logo movie-card__logo_type_check-mark button'
                onClick={(evt) => {
                  const userMovie = userMovies.current.find(mov => mov.movieId === movie.movieId);
                  handleDeleteClick(userMovie._id);
                 }}>
              </span>
            </MoviesCard>
          </li>
        ))}
      </MoviesCardList>
      <button className='movie-list__cardloader button'>Ещё</button>
    </main>
  )
}
