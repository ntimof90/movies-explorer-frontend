import React from 'react';
import './Section.css';

export default function Section({heading, children}) {
  return (
    <section className='section'>
      <h2 className='section__title'>{heading}</h2>
      {children}
    </section>
  )
}
