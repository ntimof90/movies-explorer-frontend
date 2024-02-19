/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

const UserContext = createContext();

const createUserContextValue = (loggedIn) => {
  const [user, setUser] = useState({});
  const signIn = (data) => {
  }
  const signUp = (data) => {
  }
  const signOut = () => {
  }
  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      mainApi.getUser(token)
        .then(result => {
          const { name, email } = result.user;
          setUser({ name, email });
        })
        .catch(e => console.log(e));
    } else {
      setUser({});
    }
  }, [loggedIn]);
  return {
    user,
    signIn,
    signUp,
    signOut
  }
}

export const UserProvider = ({ loggedIn, children }) => {
  const userContextValue = createUserContextValue(loggedIn);
  return (
    <UserContext.Provider value={userContextValue}>
      { children }
    </UserContext.Provider>
  )
}