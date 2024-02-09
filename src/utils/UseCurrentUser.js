import React, { useContext, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }) {
  const [user, setUser] = useState();
  return (
    <CurrentUserContext.Provider value={user}>
      { children }
    </CurrentUserContext.Provider>
  )
}
