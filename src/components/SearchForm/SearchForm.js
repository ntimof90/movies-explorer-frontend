import React from 'react';
import './SearchForm.css';

export default function SearchForm({ handleLoading }) {
  return (
    <section className='search'>
      <form className='search__form' name='movie' action='' onSubmit={handleLoading}>
        <fieldset className='search__input-fieldset'>
          <input
            className='search__input input'
            type='text'
            placeholder='Фильм'
            name='title'
          />
          <button className='search__button button' type='submit'></button>
        </fieldset>
        <label className='search__checkbox-label'>
          <input className='search__checkbox' name='isShort' type="checkbox" />
          <span className='search__custom-checkbox'></span>
          <span className='search__checkbox-title'>Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
