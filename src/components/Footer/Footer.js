import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer content-section'>
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className='footer__block'>
        <p className='footer__copy'>&copy; 2023</p>
        <nav className='footer__links'>
          <a className='footer__link link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          <a className='footer__link link' href='https://github.com/'>Github</a>
        </nav>
      </div>
    </footer>
  )
}
