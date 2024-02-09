import React from 'react';
import Auth from '../Auth/Auth';
import mainApi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import useFormWithValidation from '../../utils/FormHandler';

// export default function Login({ form, errors, handleChange, isValid, resetStates, handleLogging }) {
export default function Login({ handleLogging }) {
  const loginUi = {
    title: 'Рады видеть!',
    button: 'Войти',
    footer: 'Ещё не зарегистрированы?',
    link: '/signup',
    linkTitle: 'Регистрация'
  }
  const navigate = useNavigate();
  const { handleChange, values, errors, isValid } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    mainApi.login(values)
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        handleLogging();
        navigate('/movies', { replace: true });
      }
    })
    .catch((e) => console.log(e));
  }

  return (
    <Auth ui={loginUi} isValid={isValid} formName={'login'} onSubmit={handleSubmit}>
      <label className='auth__input-label'>
        <span className='auth__input-title'>E-mail</span>
        <input
        className='auth__input input'
        type='email'
        name='email'
        required
        autoComplete='off'
        onChange={handleChange}
        autoFocus
        />
        <span className={`input-error ${errors.email ? 'input-error_active': ''}`}>{errors.email}</span>
      </label>
      <label className='auth__input-label'>
        <span className='auth__input-title'>Пароль</span>
        <input
          className='auth__input input'
          type='password'
          name='password'
          required
          minLength='8'
          autoComplete='off'
          onChange={handleChange}
        />
        <span className={`input-error ${errors.password ? 'input-error_active': ''}`}>{errors.password}</span>
      </label>
    </Auth>
  )
}
