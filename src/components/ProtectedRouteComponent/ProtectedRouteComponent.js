import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/userContext';
import Preloader from '../Preloader/Preloader';

export default function ProtectedRouteComponent({ loggedIn, component: Component, ...componentProps }) {
  const {isUserLoading} = useContext(CurrentUserContext);
  return (
    loggedIn
    ? (!isUserLoading ? <Component { ...componentProps } /> : <main className='empty-main content-section'><Preloader /></main>)
    : <Navigate to='/' replace />
  )
}
