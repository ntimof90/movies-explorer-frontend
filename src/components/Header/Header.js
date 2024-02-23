import React, { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import logoPath from '../../images/header-logo.svg';
import './Header.css';
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/userContext";
import Preloader from "../Preloader/Preloader";

export default function Header({ loggedIn }) {
  const { isLoading } = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => setIsMenuOpen(true);

  const handleClose = () => setIsMenuOpen(false);

  const handleLinkClassName = ({isActive}) => `header__menu-link link ${isActive ? 'header__menu-link_active' : ''}`;

  return (
    <>
      <header className='header content-section'>
        {/* {isLoading
        ? <Preloader />
        : <Link className="logo-link" to='/'>
        <Preloader />
        <img className='logo' src={logoPath} alt='Логотип.' />
      </Link>
        } */}
        <Link className="logo-link preloader-place" to='/'>
          {isLoading
            ? <Preloader />
            : <img className='logo' src={logoPath} alt='Логотип.' />}
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
