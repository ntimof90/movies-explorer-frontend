import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form' action=''>
        <fieldset className='search__input-fieldset'>
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
          />
          <button className='search__button button' type='submit'></button>
        </fieldset>
        <label className='search__checkbox-label'>
          <input className='search__checkbox' type="checkbox" />
          <span className='search__custom-checkbox'></span>
          <span className='search__checkbox-title'>Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
