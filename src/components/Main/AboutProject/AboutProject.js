import React from 'react';
import './AboutProject.css';
import Heading from '../Heading/Heading';

export default function AboutProject() {
  return (
    <section className='about-project content-section' id='project'>
      <Heading>О проекте</Heading>
      <div className='about-project__text-block'>
        <p className='about-project__paragraph'>
          <span className='about-project__accent-paragraph'>Дипломный проект включал 5 этапов</span>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
        </p>
        <p className='about-project__paragraph'>
          <span className='about-project__accent-paragraph'>На&nbsp;выполнение диплома ушло 5 недель</span>
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className='about-project__graph'>
        <span className='about-project__graph-value'>1 неделя</span>
        <span className='about-project__graph-value'>4 недели</span>
        <span className='about-project__graph-heading'>Back-end</span>
        <span className='about-project__graph-heading'>Front-end</span>
      </div>
    </section>
  )
}
