import React from 'react';
import Heading from '../Heading/Heading';
import './Techs.css';

export default function Techs() {
  const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  return (
    <section className='techs content-section' id='techs'>
      <Heading>Технологии</Heading>
      <h3 className='techs__title'>7&nbsp;технологий</h3>
      <p className='techs__paragraph'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии,
      которые применили в&nbsp;дипломном проекте.</p>
      <ul className='techs__list'>
        {techs.map((tech, i) => (
          <li key={i}>
            <p className='techs__list-item'>{tech}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
