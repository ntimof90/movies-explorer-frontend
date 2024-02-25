/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useEffect, useState, useRef } from 'react';
import mainApi from '../utils/MainApi';

export const CurrentUserContext = createContext();

export const CurrentUserMoviesContext = createContext();

// export const CurrentUserContextConsumer = CurrentUserContext.Consumer;
// export const CurrentUserMoviesContextConsumer = CurrentUserMoviesContext.Consumer;

const createUserContextValue = (loggedIn) => {
  const [user, setUser] = useState({});
  // const [isInitialLoading, setUserLoading] = useState(false);
  const userMovies = useRef([]);

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
    // setIsLoading(true);
    const fetchUserData = (token) => {
      // setUserLoading(true);
      Promise.all([mainApi.getUser(token), mainApi.getMyMovies(token)])
        .then(([user, movies]) => {
          const { name, email } = user.user;
          setUser({ name, email });
          userMovies.current = movies.movies;
          console.log('sdfds');
        })
        .catch(e => console.log(e))
        // .finally(() => setUserLoading(false))
    }

    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      fetchUserData(token);
    } else setUser({});
  }, [loggedIn]);

  return { user, userMovies, updateUser };
};

export const CurrentUserContextProvider = ({ loggedIn, children }) => {
  const { user, userMovies, updateUser } = createUserContextValue(loggedIn);

  return (
    <CurrentUserContext.Provider value={ { user, updateUser } }>
      <CurrentUserMoviesContext.Provider value={ userMovies }>
        { children }
      </CurrentUserMoviesContext.Provider>
    </CurrentUserContext.Provider>
  )
}
