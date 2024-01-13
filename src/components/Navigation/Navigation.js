import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

export default function Navigation({isOpen, onClose}) {
  return (
    <div className={`nav-panel ${isOpen ? 'nav-panel_active' : ''}`}>
      <aside className='nav-panel__container'>
        <button className='nav-panel__close-button' type='button' onClick={onClose}></button>
        <nav className='nav-panel__menu'>
          <ul className='nav-panel__menu-list'>
            <li>
              <NavLink className='nav-panel__link nav-panel__link_active' to='/'>Главная</NavLink>
            </li>
            <li>
              <NavLink className='nav-panel__link' to='/movies'>Фильмы</NavLink>
            </li>
            <li>
              <NavLink className='nav-panel__link' to='/saved-movies'>Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink className='nav-panel__button' to='/profile'>Аккаунт</NavLink>
      </aside>
    </div>
  )
}
