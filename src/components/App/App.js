import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRouteComponent from '../ProtectedRouteComponent/ProtectedRouteComponent';

import useAuth from '../../utils/useAuth';
import { CurrentUserContextProvider } from '../../contexts/userContext';
import useMoviesDatabase from '../../utils/useMoviesDatabase';

import './App.css';

export default function App() {
  const { loggedIn, serverError, signIn, signUp, signOut, setServerError } = useAuth();

  const { beatfilmMoviesDB, getbeatfilmMoviesDB } = useMoviesDatabase(setServerError);

  return (
    <CurrentUserContextProvider loggedIn={loggedIn} setServerError={setServerError}>
      <div className='page font-smoothed'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path='' element={ <Main /> } />
            <Route
              path='movies'
              element={
                <ProtectedRouteComponent
                  component={Movies}
                  loggedIn={loggedIn}
                  beatfilmMoviesDB={beatfilmMoviesDB}
                  getbeatfilmMoviesDB={getbeatfilmMoviesDB}
                />
              }
            />
            <Route
              path='saved-movies'
              element={
                <ProtectedRouteComponent
                  component={SavedMovies}
                  loggedIn={loggedIn}
                />
              }
            />
          </Route>
          <Route
            path='/profile'
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRouteComponent
                  component={Profile}
                  loggedIn={loggedIn}
                  onSignOut={signOut}
                />
              </>
            }
          />
          <Route path='/signup' element={<Register onRegister={ signUp } />} />
          <Route path='/signin' element={<Login onLogin={ signIn } />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {serverError &&
          <div className='error-popup'>
            <button className='error-popup__button button' onClick={() => {setServerError('')}}>&#215;</button>
            {serverError}
          </div>
        }
      </div>
    </CurrentUserContextProvider>
  );
}
