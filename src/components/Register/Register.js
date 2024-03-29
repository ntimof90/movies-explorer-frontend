import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import { useFormWithValidation } from '../../utils/FormHandler';

export default function Register({ onRegister }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const registerUi = {
    mainTitle: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    footerText: 'Уже зарегистрированы?',
    link: '/signin',
    linkText: 'Войти',
    formName: 'register'
  }
  const { handleChange, handleChangeWithEmailValidation, values, errors, isValid } = useFormWithValidation(null);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    onRegister(values)
    .catch(e => {
      switch (e) {
        case 409:
          setSubmitMessage('Пользователь с таким email уже существует.');
          console.log(e);
          break;
        case 402:
          setSubmitMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
          break;
        default:
          setSubmitMessage('При регистрации пользователя произошла ошибка.');
          console.log(e);
          break;
      }
    })
    .finally(() => setIsLoading(false));
  }
  // React.useEffect(() => {
  //   return () => resetForm();
  // }, [resetForm]);
  return (
    <Auth isValid={isValid} onSubmit={handleSubmit} isLoading={isLoading} {...registerUi}>
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
          onChange={handleChangeWithEmailValidation}
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
      {submitMessage && <p className='auth__submit-message'>{submitMessage}</p>}
    </Auth>
  )
}
