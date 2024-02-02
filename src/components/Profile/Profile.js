import React from 'react';
import './Profile.css';

export default function Profile({ errors, handleChange, isValid }) {
  const [editMode, setEditMode] = React.useState(false);
  const inputRef = React.createRef();
  const handleClick = () => {
    setEditMode(true);
    inputRef.current.focus();
  }
  return (
    <div className='profile'>
      <div className="profile__container">
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form' action=''>
          <label className='profile__input-label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              minLength='2'
              maxLength='30'
              required
              name='name'
              onChange={handleChange}
              defaultValue={'Виталий'}
              readOnly={!editMode}
              autoComplete='off'
              ref={inputRef}
            />
            <span className={`profile__input-error ${errors.name ? 'profile__input-error_active': ''}`}>{errors.name}</span>
          </label>
          <label className='profile__input-label'>
            <span className='profile__input-title'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              required
              name='email'
              onChange={handleChange}
              autoComplete='off'
              defaultValue={'dsf@sdfsd.com'}
              readOnly={!editMode}
            />
            <span className={`profile__input-error ${errors.email ? 'profile__input-error_active': ''}`}>{errors.email}</span>
          </label>
          <button className={`profile__submit button ${editMode ? 'profile__submit_active' : ''}`} disabled={!isValid} type='submit'>Сохранить</button>
        </form>
        <button className={`profile__button link ${editMode ? 'profile__button_inactive' : ''}`} type='button' onClick={handleClick}>Редактировать</button>
        <button className={`profile__button link ${editMode ? 'profile__button_inactive' : ''}`} type='button'>Выйти из аккаунта</button>
      </div>
    </div>
  )
}
