import React from 'react';
import Heading from '../Heading/Heading';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className='about-me content-section' id='me'>
      <Heading>Студент</Heading>
      <article className='profile-card'>
        <div className='profile-card__description'>
          <h3 className='profile-card__title'>Николай</h3>
          <p className='profile-card__subtitle'>Фронтенд-разработчик, 33 года</p>
          <p className='profile-card__paragraph'>
          Я родился и живу в Ленинградской области. В свое время учился на факультете прикладной математики.
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className='profile-card__link link' href="https://github.com/ntimof90">Github</a>
        </div>
        <div className='profile-card__photo'></div>
      </article>
    </section>
  )
}
