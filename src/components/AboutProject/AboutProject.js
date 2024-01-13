import React from 'react';
import './AboutProject.css';
import Heading from '../Heading/Heading';

export default function AboutProject() {
  return (
    <section className='about' id='project'>
      <Heading>О проекте</Heading>
      <ul className='about__columns'>
        <li className='about__column'>
          <h3 className='about__title'>Дипломный проект включал 5&nbsp;этапов</h3>
          <p className='about__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </li>
        <li className='about__column'>
          <h3 className='about__title'>На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className='about__text'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='about__table'>
        <p className='about__cell about__cell_type_value about__cell_accent'>1 неделя</p>
        <p className='about__cell about__cell_type_value'>4 недели</p>
        <p className='about__cell about__cell_type_key'>Back-end</p>
        <p className='about__cell about__cell_type_key'>Front-end</p>
      </div>
    </section>
  )
}
