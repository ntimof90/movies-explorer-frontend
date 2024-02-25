import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import logoPath from '../../images/header-logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => setIsMenuOpen(true);

  const handleClose = () => setIsMenuOpen(false);

  const handleLinkClassName = ({isActive}) => `header__menu-link link ${isActive ? 'header__menu-link_active' : ''}`;

  return (
    <>
      <header className='header content-section'>
        <Link className='logo-link' to='/'>
          <img className='logo' src={logoPath} alt='Логотип.' />
        </Link>
        {
        !loggedIn
        ? <nav className ='header__menu header__menu_user_unauthorized'>
            <Link to='/signup' className='header__link link'>Регистрация</Link>
            <Link to='/signin' className='header__button button'>Войти</Link>
          </nav>
        : <>
            <nav className='header__menu header__menu_user_authorized'>
              <NavLink to='/movies' className={handleLinkClassName}>Фильмы</NavLink>
              <NavLink to='/saved-movies' className={handleLinkClassName}>Сохранённые фильмы</NavLink>
            </nav>
            <NavLink to='/profile' className='account-button button header__account-button'>Аккаунт</NavLink>
            <button className='header__navigation-button link' type='button' onClick={handleMenuClick}></button>
          </>
        }
      </header>
      <Navigation isOpen={isMenuOpen} onClose={handleClose} />
    </>
  )
}
