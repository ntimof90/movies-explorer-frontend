import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  const sites = [
    {name: 'Статичный сайт', link: 'https://coast.students.nomoredomainsmonster.ru/' },
    {name: 'Адаптивный сайт', link: 'https://coast.students.nomoredomainsmonster.ru/' },
    {name: 'Одностраничное приложение', link: 'https://coast.students.nomoredomainsmonster.ru/' },
  ]
  return (
    <section className='portfolio content-section'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        {sites.map((site, i) => (
          <li className='portfolio__list-item' key={i}>
            <a className='portfolio__link link' href={site.link} target='_blank' rel='noopener noreferrer'>{site.name}<span>↗</span></a>
          </li>
        ))}
      </ul>
    </section>
  )
}
