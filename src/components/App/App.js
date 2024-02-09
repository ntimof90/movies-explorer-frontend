import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import movieList from '../../vendor/cards';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const handleLogging = () => {
    setIsLoggedIn(true);
  }
  const handleLoading = () => {
    setIsLoading(true);
  }
  const handleUserUpdate = (newUser) => {
    const token = localStorage.getItem('jwt');
    return mainApi.editUser(newUser, token)
    .then((data) => {
      setUser(data.user);
    })
  }
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    const checkToken = async (token) => {
      try {
        const isValid = await mainApi.checkToken(token);
        if (isValid) {
          setIsLoggedIn(true);
          navigate('/');
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (token) {
      checkToken(token);
    }
    // if (token) {
    //   mainApi.checkToken(token)
    //   .then((res) => {
    //     if (res) {
    //       setIsLoggedIn(true);
    //     }
    //   })
    //   .catch(e => console.log(e));
    // }
  }, [setIsLoggedIn]);
  React.useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([mainApi.getUser(token)])
      .then(([user]) => {
        const { name, email } = user.user;
        setUser({ name, email });
      })
      .catch(e => console.log(e));
    }
  }, [isLoggedIn, setUser]);
  const handleUserReset = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('jwt');
  }
  return (
    <CurrentUserContext.Provider value={user}>
      <div className='page font-smoothed'>
        <Routes>
          <Route path='/' element={
            <>
              <Header loggedIn={isLoggedIn} />
              <Outlet />
              <Footer />
            </>
          }>
            <Route path='' element={<Main />} />
            <Route
              path='movies'
              element={<ProtectedRouteElement
                element={Movies}
                isLoggedIn={isLoggedIn}
                movieList={movieList}
                isLoading={isLoading}
                handleLoading={handleLoading}
              />}
            />
             {/* <Movies movieList={movieList} isLoading={isLoading} handleLoading={handleLoading} />} /> */}
            <Route path='saved-movies' element={<SavedMovies movieList={movieList}/>} />
          </Route>
          <Route path='/profile' element={
            <>
              <Header loggedIn={isLoggedIn} />
              <ProtectedRouteElement
                element={Profile}
                isLoggedIn={isLoggedIn}
                onUserUpdate={handleUserUpdate}
                onUserReset={handleUserReset}
              />
            </>
          } />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login handleLogging={handleLogging} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
