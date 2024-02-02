import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

export default function Navigation({isOpen, onClose}) {
  return (
    <div className={`nav-panel ${isOpen ? 'nav-panel_active' : ''}`}>
      <aside className='nav-panel__container'>
        <button className='nav-panel__x-button link' type='button' onClick={onClose}></button>
        <nav className='nav-panel__menu'>
          <ul className='nav-panel__menu-list'>
            <li><NavLink className={({isActive}) => `nav-panel__link link ${isActive ? 'nav-panel__link_active' : ''}`} onClick={onClose} to='/'>Главная</NavLink></li>
            <li><NavLink className={({isActive}) => `nav-panel__link link ${isActive ? 'nav-panel__link_active' : ''}`} onClick={onClose} to='/movies'>Фильмы</NavLink></li>
            <li><NavLink className={({isActive}) => `nav-panel__link link ${isActive ? 'nav-panel__link_active' : ''}`} onClick={onClose} to='/saved-movies'>Сохранённые фильмы</NavLink></li>
          </ul>
        </nav>
        <NavLink className='account-button button nav-panel__account-button' onClick={onClose} to='/profile'>Аккаунт</NavLink>
      </aside>
    </div>
  )
}
