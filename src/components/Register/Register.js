import React from 'react';
import Auth from '../Auth/Auth';

export default function Register({ errors, handleChange, isValid }) {
  const registerUi = {
    title: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
    footer: 'Уже зарегистрированы?',
    link: '/signin',
    linkTitle: 'Войти'
  }
  return (
    <Auth ui={registerUi} isValid={isValid} formName={'register'}>
      <label className='auth__input-label'>
        <span className='auth__input-title'>Имя</span>
        <input
          className='auth__input input'
          type='text'
          name='name'
          minLength='2'
          maxLength='30'
          required
          autoComplete='off'
          onChange={handleChange}
          autoFocus
        />
        <span className={`input-error ${errors.name ? 'input-error_active': ''}`}>{errors.name}</span>
      </label>
      <label className='auth__input-label'>
        <span className='auth__input-title'>E-mail</span>
        <input
          className='auth__input input'
          type='email'
          name='email'
          required
          autoComplete='on'
          onChange={handleChange}
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
