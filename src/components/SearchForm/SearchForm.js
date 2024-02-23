import React from 'react';
import './SearchForm.css';
import { findMovie } from '../../utils/MoviesApi';
import { useForm } from '../../utils/FormHandler';

export default function SearchForm({ handleLoading, handleMovies, onSubmit }) {
  const { handleChange, values, setValues} = useForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
    // evt.preventDefault();
    // findMovie()
    // .then((result) => handleMovies(result))
    // .catch(e => console.log(e));
  }
  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   onSubmit(values);
  // }
  return (
    <section className='search'>
      <form className='search__form' name='movie' action='' onSubmit={handleSubmit}>
        <fieldset className='search__input-fieldset'>
          <input
            className='search__input input'
            type='text'
            placeholder='Фильм'
            name='movie'
            onChange={ handleChange }
            required
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
