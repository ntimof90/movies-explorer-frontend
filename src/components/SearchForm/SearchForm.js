import React from 'react';
import './SearchForm.css';

export default function SearchForm({
  values,
  setValues,
  handleChange,
  error,
  handleSearch,
  query,
  handleChangeFormat,
}) {

  return (
    <section className='search'>
      <form className='search__form' name='movie' action='' onSubmit={handleSearch}>
        <fieldset className='search__input-fieldset'>
          <input
            className='search__input input'
            type='text'
            placeholder='Фильм'
            name='name'
            onChange={ (evt) => {handleChange(evt);} }
            value={values.name || ''}
          />
          <button className='search__button button' type='submit'></button>
          {error && <p className='search__submit-error'>Введите название фильма &uarr;</p>}
        </fieldset>
        <label className='search__checkbox-label'>
          <input
            className='search__checkbox'
            name='durationFormat'
            type="checkbox"
            checked={values.durationFormat || false}
            onChange={() => {setValues({...values, durationFormat: !values.durationFormat});
            if (query) handleChangeFormat({...query, durationFormat: !values.durationFormat});}}/>
          <span className='search__custom-checkbox'></span>
          <span className='search__checkbox-title'>Короткометражки</span>
        </label>
      </form>
    </section>
  )
}
