import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteComponent({ loggedIn, component: Component, ...componentProps }) {
  return (
    loggedIn ? <Component { ...componentProps } /> : <Navigate to='/' replace />
  )
}
