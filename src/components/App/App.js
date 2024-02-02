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
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const handleInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value});
    setErrors({ ...errors, [evt.target.name]: evt.target.validationMessage });
    setIsFormValid(evt.target.closest('form').checkValidity());
  }
  const handleLoading = () => {
    setIsLoading(true);
  }
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
          <Route path='movies' element={<Movies movieList={movieList} isLoading={isLoading} handleLoading={handleLoading} />} />
          <Route path='saved-movies' element={<SavedMovies movieList={movieList}/>} />
        </Route>
        <Route path='/profile' element={
          <>
            <Header loggedIn={true} />
            <Profile handleChange={handleInputChange} errors={errors} isValid={isFormValid} />
          </>
        } />
        <Route path='/signup' element={<Register handleChange={handleInputChange} errors={errors} isValid={isFormValid} />} />
        <Route path='/signin' element={<Login handleChange={handleInputChange} errors={errors} isValid={isFormValid} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
