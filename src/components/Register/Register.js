import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import logoPath from '../../images/header-logo.svg';

export default function Register() {
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
      <Link className='auth__logo-link' to='/'><img className='auth__logo' src={logoPath} alt='Логотип.' /></Link>
      <h2 className='auth__title'>Добро пожаловать!</h2>
      <form className='auth__form' name='registration' action=''>
      <label className='auth__input-label'>
          <span className='auth__input-title'>Имя</span>
          <input
            className='auth__input'
            type='text'
            name='name'
            minLength='2'
            maxLength='30'
            required
            onChange={handleChange}
            autoFocus
          />
          <span className={`auth__input-error ${errors.name ? 'auth__input-error_active': ''}`}>{errors.name}</span>
        </label>
        <label className='auth__input-label'>
          <span className='auth__input-title'>E-mail</span>
          <input
            className='auth__input'
            type='email'
            name='email'
            required
            onChange={handleChange}
          />
          <span className={`auth__input-error ${errors.email ? 'auth__input-error_active': ''}`}>{errors.email}</span>
        </label>
        <label className='auth__input-label'>
          <span className='auth__input-title'>Пароль</span>
          <input
            className='auth__input'
            type='password'
            name='password'
            required
            minLength='8'
            onChange={handleChange}
          />
          <span className={`auth__input-error ${errors.password ? 'auth__input-error_active': ''}`}>{errors.password}</span>
        </label>
        <button className='auth__submit' type='submit' disabled={!(formValitidy.name && formValitidy.email && formValitidy.password)}>Зарегистрироваться</button>
      </form>
      <p className='auth__footer'>Уже зарегистрированы? <Link className='auth__link' to='/signin'>Войти</Link></p>
    </div>
  )
}
