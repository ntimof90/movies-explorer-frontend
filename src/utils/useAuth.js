import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainApi from './MainApi';

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const signIn = (data) => {
    return mainApi.login(data)
      .then((result) => {
        if (result.token) {
          localStorage.setItem('jwt', result.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        } else return Promise.reject(402);
      })
  };

  const signUp = ({ name, email, password }) => {
    return mainApi.register({ name, email, password })
      .then((result) => {
        if (result.token) {
          localStorage.setItem('jwt', result.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
        else return Promise.reject(402);
      })
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentQuery');
    localStorage.removeItem('currentRender');
    setLoggedIn(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
      .then((result) => {
        if (result) setLoggedIn(true);
      })
      .catch((e) => {
        setServerError('Ошибка авторизации')
      });
    }
  }, []);

  return { signIn, signUp, signOut, setServerError, loggedIn, serverError };
};
