import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='promo__menu'>
      <a href='#project' className='promo__menu-item'>О проекте</a>
      <a href='#techs' className='promo__menu-item'>Технологии</a>
      <a href='#me' className='promo__menu-item'>Студент</a>
    </nav>
  )
}
