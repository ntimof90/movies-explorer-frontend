import React from "react";
import { Link } from 'react-router-dom';
import logoPath from '../../images/header-logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";

export default function Header({loggedIn, onMenuClick}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  }
  const handleClose = () => {
    setIsMenuOpen(false);
  }
  return (
    <>
      <header className='header content-section'>
        <Link to='/'><img className='header__logo' src={logoPath} alt='Логотип.' /></Link>
        {!loggedIn ?
        <div className ='header__menu-auth'>
          <Link to='/signup' className='header__link link'>Регистрация</Link>
          <Link to='/signin' className='header__button button'>Войти</Link>
        </div> :
        <>
        <nav className='header__menu'>
          <ul className='header__menu-list'>
            <li><Link to='/movies' className='header__menu-link link'>Фильмы</Link></li>
            <li><Link to='/saved-movies' className='header__menu-link link'>Сохранённые фильмы</Link></li>
          </ul>
        </nav>
        <Link to='/profile' className='header__acc-button button'>Аккаунт</Link>
        <button className="header__nav-button button" type='button' onClick={handleMenuClick} />
        </>
        }
      </header>
      <Navigation isOpen={isMenuOpen} onClose={handleClose} />
    </>
  )
}
