/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

export const CurrentUserContext = createContext();

export const CurrentUserMoviesContext = createContext();

const createUserContextValue = (loggedIn, setServerError) => {
  const [user, setUser] = useState({});

  const [isUserLoading, setIsUserLoading] = useState(false);

  const [userMovies, setUserMovies] = useState([])

  const updateUser = (newUser) => {
    const token = localStorage.getItem('jwt');
    return mainApi.editUser(newUser, token)
      .then(result => {
        const { name, email } = result.user;
        setUser({ name, email });
        return { name, email };
      });
  };

  useEffect(() => {
    const fetchUserData = (token) => {
      setIsUserLoading(true);
      Promise.all([mainApi.getUser(token), mainApi.getMyMovies(token)])
        .then(([user, movies]) => {
          const { name, email } = user.user;
          setUser({ name, email });
          setUserMovies(movies.movies);
        })
        .catch(e => setServerError('500 На сервере произошла ошибка.'))
        .finally(() => setIsUserLoading(false))
    }

    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      fetchUserData(token);
    } else setUser({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const deleteMovie = (id) => {
    const token = localStorage.getItem('jwt');
    return mainApi.deleteMovie(id, token)
      .then(() => {
        setUserMovies((prevState => {
          return prevState.filter(item => item._id !== id)
        }))
      })
      .catch(e => setServerError('500 На сервере произошла ошибка.'))
  }

  const saveMovie = (movie) => {
    const token = localStorage.getItem('jwt');
    return mainApi.saveMovie(movie, token)
      .then((savedMovie) => {
        setUserMovies([...userMovies, savedMovie.movie])
      })
      .catch(e => setServerError('500 На сервере произошла ошибка.'));
  }

  return { user, isUserLoading, userMovies, updateUser, deleteMovie, saveMovie };
};

export const CurrentUserContextProvider = ({ loggedIn, setServerError, children }) => {
  const { user, isUserLoading, userMovies, updateUser, deleteMovie, saveMovie } = createUserContextValue(loggedIn, setServerError);

  return (
    <CurrentUserContext.Provider value={ { user, isUserLoading, updateUser } }>
      <CurrentUserMoviesContext.Provider value={ { userMovies, isUserLoading, deleteMovie, saveMovie } }>
        { children }
      </CurrentUserMoviesContext.Provider>
    </CurrentUserContext.Provider>
  )
}
