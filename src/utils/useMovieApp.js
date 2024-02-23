import React, { useRef, useState, useEffect } from 'react';
import mainApi from './MainApi';

export default function useMovieApp(initialRender = [], movieDB) {
  const [renderList, setRenderList] = useState(initialRender);

  const userMovies = useRef([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    mainApi.getMyMovies(token)
      .then(result => {
        setRenderList(result.movies);
        userMovies.current = result.movies;
      })
      .catch(e => console.log(e))
  }, [])

  const handleSearch = (query) => {
    const ruRegEx = /[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i;
    console.log(query);
    if (ruRegEx.test(query.movie)) {
      return movieDB.filter(movie => {
        console.log(query.movie);
        return movie.nameRU.toLowerCase().includes(query.movie.toLowerCase())
      })
    } else {
      return movieDB.filter(movie => movie.nameEN.toLowerCase().includes(query.movie.toLowerCase()))
    }
  }

  const handleDeleteMovie = (movieId) => {
    const token = localStorage.getItem('jwt');
    return mainApi.deleteMovie(movieId, token)
      .then(() => {
        userMovies.current = userMovies.current.filter(movie => movie._id !== movieId)
      })
      .catch(e => console.log(e));
  }

  const handleSaveMovie = (movie) => {
    const token = localStorage.getItem('jwt');
    return mainApi.saveMovie(movie, token)
      .then((res) => {
        userMovies.current = userMovies.current.push(res.movie);
        console.log(userMovies.current);
      })
      .catch(e => console.log(e))
  }
  return { renderList, handleDeleteMovie, handleSaveMovie, handleSearch };
}