import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logoPath from '../../images/header-logo.svg';

export default function Login() {
  const [form, setForm] = React.useState({});

  const [errors, setErrors] = React.useState({});

  const [formValitidy, setFormValidity] = React.useState({});

  const handleChange = (evt) => {
    const checkInputValidity = () => {
      if (!evt.target.validity.valid) {
        setErrors({ ...errors, [evt.target.name]: evt.target.validationMessage });
        setFormValidity({ ...formValitidy, [evt.target.name]: false});
      } else {
        setErrors({ ...errors, [evt.target.name]: ''});
        setFormValidity({ ...formValitidy, [evt.target.name]: true});
      }
    }

    setForm({ ...form, [evt.target.name]: evt.target.value});
    checkInputValidity();
  }

  return (
    <div className='auth'>
      <Link className='auth__logo-link logo-link' to='/'><img className='logo' src={logoPath} alt='Логотип.' /></Link>
      <h2 className='auth__title'>Рады видеть!</h2>
      <form className='auth__form' name='authorization' noValidate action=''>
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
        <button className='auth__submit button' type='submit' disabled={!(formValitidy.email && formValitidy.password)}>Войти</button>
      </form>
      <p className='auth__footer'>Ещё не зарегистрированы? <Link className='auth__link link' to='/signup'>Регистрация</Link></p>
    </div>
  )
}
