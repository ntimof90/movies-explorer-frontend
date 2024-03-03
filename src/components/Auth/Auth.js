import React from 'react';
import { Link } from 'react-router-dom'
import './Auth.css';
import logoPath from '../../images/header-logo.svg';

export default function Auth({
    mainTitle,
    buttonText,
    footerText,
    link,
    linkText,
    formName,
    isValid,
    children,
    onSubmit,
    isLoading
  }) {
  return (
    <div className='auth'>
      <div className='auth__container'>
        <Link className='auth__logo-link logo-link' to='/'>
          <img className='logo' src={logoPath} alt='Логотип.' />
        </Link>
        <h2 className='auth__title'>{mainTitle}</h2>
        <form className='auth__form' name={formName} action='' onSubmit={onSubmit}>
           { children }
          <button className='auth__submit button' type='submit' disabled={!isValid || isLoading}>{!isLoading ? buttonText : 'Подождите...'}</button>
        </form>
        <p className='auth__footer'>{footerText} <Link className='auth__link link' to={link}>{linkText}</Link></p>
      </div>
    </div>
  )
}
