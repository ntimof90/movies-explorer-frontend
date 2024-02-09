import React from 'react';
import { Link } from 'react-router-dom'
import './Auth.css';
import logoPath from '../../images/header-logo.svg';

export default function Auth({ ui, formName, isValid, children, onSubmit }) {
  return (
    <div className='auth'>
      <Link className='auth__logo-link logo-link' to='/'>
        <img className='logo' src={logoPath} alt='Логотип.' />
      </Link>
      <h2 className='auth__title'>{ ui.title }</h2>
      <form className='auth__form' name={formName} action='' onSubmit={onSubmit}>
         { children }
        <button className='auth__submit button' type='submit' disabled={!isValid}>{ui.button}</button>
      </form>
      <p className='auth__footer'>{ui.footer} <Link className='auth__link link' to={ui.link}>{ui.linkTitle}</Link></p>
    </div>
  )
}
