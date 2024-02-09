import React, { createContext, useEffect, useState } from 'react';
import mainApi from '../utils/MainApi';

export const CurrentUserContext = createContext();

export const CurrentUserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const updateUser = (newUser) => {
    const token = localStorage.getItem('jwt');
    return mainApi.editUser(newUser, token)
      .then(result => setUser(result.user));
  };
  const resetUser = () => {
    localStorage.removeItem('jwt');
    setUser({});
  }
  const contextValue = { user, updateUser, resetUser };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const fetchUser = (token) => {
      mainApi.getUser(token)
        .then(result => {
          const { name, email } = result.user;
          setUser({ name, email })
        })
        .catch(e => console.log(e));
    };

    fetchUser(token);
  }, []);

  return (
    <CurrentUserContext.Provider value={ contextValue }>
      { children }
    </CurrentUserContext.Provider>
  )
}

// export const userContext = React.createContext();

// export function UserContextProvider({ children }) {
//   const [user, setUser] = React.useState({});
//   const onUserUpdate = (newUser) => {
//     const token = localStorage.getItem('jwt');
//     return mainApi.editUser(newUser, token)
//     .then((data) => {
//       setUser(data.user);
//     })
//   }

//   const onUserReset = () => {
//     setUser({});
//   }

//   return (
//     <userContext.Provider value={{ user, onUserUpdate, onUserReset }}>
//       { children }
//     </userContext.Provider>
//   )
// }
