import React from 'react';
import Auth from '../Auth/Auth';

export default function Login({ errors, handleChange, isValid }) {
  const loginUi = {
    title: 'Рады видеть!',
    button: 'Войти',
    footer: 'Ещё не зарегистрированы?',
    link: '/signup',
    linkTitle: 'Регистрация'
  }
  return (
    <Auth ui={loginUi} isValid={isValid} formName={'login'}>
      <label className='auth__input-label'>
        <span className='auth__input-title'>E-mail</span>
        <input
        className='auth__input input'
        type='email'
        name='email'
        required
        autoComplete='on'
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
          autoComplete='on'
          onChange={handleChange}
        />
        <span className={`input-error ${errors.password ? 'input-error_active': ''}`}>{errors.password}</span>
      </label>
    </Auth>
  )
}
