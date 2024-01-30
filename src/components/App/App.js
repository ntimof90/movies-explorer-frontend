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

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className='page font-smoothed'>
      <Routes>
        <Route path='/' element={
          <>
            <Header loggedIn={true} />
            <Outlet />
            <Footer />
          </>
        }>
          <Route path='' element={<Main />} />
          <Route path='movies' element={<Movies movieList={movieList} isLoading={isLoading}/>} />
          <Route path='saved-movies' element={<SavedMovies movieList={movieList}/>} />
        </Route>
        <Route path='/profile' element={
          <>
            <Header loggedIn={true} />
            <Profile />
          </>
        } />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
