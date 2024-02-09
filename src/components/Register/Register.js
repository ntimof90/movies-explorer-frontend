import React from 'react';
import Auth from '../Auth/Auth';
import mainApi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import useFormWithValidation from '../../utils/FormHandler';

// export default function Register({ form, errors, handleChange, isValid, resetStates }) {
export default function Register() {
  const navigate = useNavigate();
  const registerUi = {
    title: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
    footer: 'Уже зарегистрированы?',
    link: '/signin',
    linkTitle: 'Войти'
  }
  const { handleChange, values, errors, isValid } = useFormWithValidation();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    mainApi.register(values)
    .then(() => {
      const { email, password } = values;
      mainApi.login({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          // handleLogging();
          navigate('/movies', { replace: true });
        }
      })
    })
    .catch((e) => console.log(e));
  }
  // React.useEffect(() => {
  //   return () => resetForm();
  // }, [resetForm]);
  return (
    <Auth ui={registerUi} isValid={isValid} formName={'register'} onSubmit={handleSubmit}>
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
          // pattern={/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/v}
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
