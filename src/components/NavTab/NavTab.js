import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='promo__menu'>
      <ul className='promo__menu-list'>
        <li>
          <a href='#project' className='promo__link button'>О проекте</a>
        </li>
        <li>
          <a href='#techs' className='promo__link button'>Технологии</a>
        </li>
        <li>
          <a href='#me' className='promo__link button'>Студент</a>
        </li>
      </ul>
    </nav>
  )
}
