import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import { useFormWithValidation } from '../../utils/FormHandler';

export default function Login({ onLogin }) {
  const loginUi = {
    mainTitle: 'Рады видеть!',
    buttonText: 'Войти',
    footerText: 'Ещё не зарегистрированы?',
    link: '/signup',
    linkText: 'Регистрация',
    formName: 'login'
  }
  const [isLoading, setIsLoading] = useState(false);
  const { handleChange, handleChangeWithEmailValidation, values, errors, isValid } = useFormWithValidation();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    onLogin(values).finally(() => setIsLoading(false));
  }

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   mainApi.login(values)
  //   .then((result) => {
  //     if (result.token) {
  //       localStorage.setItem('jwt', result.token);
  //       resetForm();
  //       onLogin();
  //       navigate('/movies', { replace: true });
  //     }
  //   })
  //   .catch((e) => console.log(e));
  // }

  return (
    <Auth isValid={isValid} onSubmit={handleSubmit} isLoading={isLoading} {...loginUi}>
      <label className='auth__input-label'>
        <span className='auth__input-title'>E-mail</span>
        <input
        className='auth__input input'
        type='email'
        name='email'
        required
        autoComplete='off'
        onChange={handleChangeWithEmailValidation}
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
