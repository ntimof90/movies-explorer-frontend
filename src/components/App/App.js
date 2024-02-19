import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { Routes, Route, Outlet } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import movieList from '../../vendor/cards';
import ProtectedRouteComponent from '../ProtectedRouteComponent/ProtectedRouteComponent';

import useAuth from '../../utils/useAuth';

import { CurrentUserContextProvider } from '../../contexts/userContext';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { loggedIn, signIn, signUp, signOut } = useAuth();

  const handleLoading = () => {
    setIsLoading(true);
  }

  return (
    <CurrentUserContextProvider loggedIn={loggedIn}>
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
                  movieList={movieList}
                  isLoading={isLoading}
                  handleLoading={handleLoading}
                />
              }
            />
            <Route
              path='saved-movies'
              element={
                <ProtectedRouteComponent
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  movieList={movieList}
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
      </div>
    </CurrentUserContextProvider>
  );
}

export default App;
