import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainApi from './MainApi';

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const signIn = (data) => {
    return mainApi.login(data)
      .then((result) => {
        if (result.token) {
          localStorage.setItem('jwt', result.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch(e => console.log(e))
  };

  const signUp = ({ name, email, password }) => {
    return mainApi.register({ name, email, password })
      .then((result) => {
        if (result.token) {
          localStorage.setItem('jwt', result.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch(e => console.log(e))
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken(token)
      .then((result) => {
        if (result) setLoggedIn(true);
      })
      .catch((e) => console.log(e));
    }
  }, []);

  return { signIn, signUp, signOut, loggedIn };
};
