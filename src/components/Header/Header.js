import React from "react";
import { Link } from 'react-router-dom';
import logoPath from '../../images/header-logo.svg';
import './Header.css';

export default function Header({loggedIn, onMenuClick}) {

  return (
    <header className='header content-section'>
      <Link to='/'><img className='header__logo' src={logoPath} alt='Логотип.' /></Link>
      {!loggedIn ?
      <nav className ='header__menu header__menu_type_unauth'>
        <Link to='/signup' className='link'>Регистрация</Link>
        <Link to='/signin' className='button'>Войти</Link>
      </nav> :
      <>
      <nav className='header__menu header__menu_type_auth'>
        <ul className='header__menu-list'>
          <li><Link to='/movies' className='link'>Фильмы</Link></li>
          <li><Link to='/saved-movies' className='link'>Сохранённые фильмы</Link></li>
        </ul>
      </nav>
      <button className='header__button'>Аккаунт</button>
      <button className="header__nav-button" type='button' onClick={onMenuClick} />
      </>
      }
    </header>
  )
}
