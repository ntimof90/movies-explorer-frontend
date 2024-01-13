import React from 'react';
import Heading from '../Heading/Heading';
import myFotoPath from '../../images/my-foto.jpg'
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section className='about-me' id='me'>
      <Heading>Студент</Heading>
      <h3>Николай</h3>
      <p>Фронтенд-разработчик, 33 года</p>
      <p>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
      <a href="https://github.com/ntimof90">Github</a>
      <img className='about-me__image' src={myFotoPath} alt="Моя фотография." />
      <Portfolio />
    </section>
  )
}
