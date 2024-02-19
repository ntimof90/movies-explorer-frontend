/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

export const CurrentUserContext = createContext();

export const CurrentUserContextConsumer = CurrentUserContext.Consumer;

const createUserContextValue = (loggedIn) => {
  const [user, setUser] = useState({});

  const updateUser = (newUser) => {
    const token = localStorage.getItem('jwt');
    return mainApi.editUser(newUser, token)
      .then(result => setUser(result.user));
  };

  useEffect(() => {
    const fetchUser = (token) => {
      mainApi.getUser(token)
        .then(result => {
          const { name, email } = result.user;
          setUser({ name, email })
        })
        .catch(e => console.log(e));
    };
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      fetchUser(token);
    } else setUser({});
  }, [loggedIn]);

  return { user, updateUser };
};

export const CurrentUserContextProvider = ({ loggedIn, children }) => {
  const userContextValue = createUserContextValue(loggedIn);

  return (
    <CurrentUserContext.Provider value={ userContextValue }>
      { children }
    </CurrentUserContext.Provider>
  )
}
