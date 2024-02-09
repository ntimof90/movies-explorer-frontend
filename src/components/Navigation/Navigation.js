import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

export default function Navigation({isOpen, onClose}) {
  const handleCloseByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) onClose();
  }
  const handleLinkClassName = ({ isActive }) => `nav-panel__link link ${isActive ? 'nav-panel__link_active' : ''}`;

  React.useEffect(() => {
    const closeMenuByEsc = (evt) => {
      if (evt.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', closeMenuByEsc);
    return () => document.removeEventListener('keydown', closeMenuByEsc);
  }, [isOpen, onClose]);

  return (
    <div className={`nav-panel ${isOpen ? 'nav-panel_active' : ''}`} onClick={handleCloseByOverlay}>
      <aside className='nav-panel__container'>
        <button className='nav-panel__x-button link' type='button' onClick={onClose}></button>
        <nav className='nav-panel__menu'>
          <ul className='nav-panel__menu-list'>
            <li><NavLink className={handleLinkClassName} onClick={onClose} to='/'>Главная</NavLink></li>
            <li><NavLink className={handleLinkClassName} onClick={onClose} to='/movies'>Фильмы</NavLink></li>
            <li><NavLink className={handleLinkClassName} onClick={onClose} to='/saved-movies'>Сохранённые фильмы</NavLink></li>
          </ul>
        </nav>
        <NavLink className='account-button button nav-panel__account-button' onClick={onClose} to='/profile'>Аккаунт</NavLink>
      </aside>
    </div>
  )
}
