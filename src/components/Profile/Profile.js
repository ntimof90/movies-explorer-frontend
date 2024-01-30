import React from 'react';
import './Profile.css';

export default function Profile() {
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [formValitidy, setFormValidity] = React.useState({});
  const inputRef = React.createRef();
  const handleClick = () => {
    setEditMode(true);
    inputRef.current.focus();
  }
  const handleChange = (evt) => {
    const checkInputValidity = () => {
      if (!evt.target.validity.valid) {
        setErrors({ ...errors, [evt.target.name]: evt.target.validationMessage });
        setFormValidity({ ...formValitidy, [evt.target.name]: false});
      } else {
        setErrors({ ...errors, [evt.target.name]: ''});
        setFormValidity({ ...formValitidy, [evt.target.name]: true});
      }
    }
    setForm({ ...form, [evt.target.name]: evt.target.value});
    checkInputValidity();
  }
  return (
    <div className='profile'>
      <div className="profile__wrapper">
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
              defaultValue={'dsf@sdfsd.com'}
              readOnly={!editMode}
            />
            <span className={`profile__input-error ${errors.email ? 'profile__input-error_active': ''}`}>{errors.email}</span>
          </label>
          <button className={`profile__submit button ${editMode ? 'profile__submit_active' : ''}`} type='submit'>Сохранить</button>
        </form>
        <button className={`profile__button link ${editMode ? 'profile__button_inactive' : ''}`} type='button' onClick={handleClick}>Редактировать</button>
        <button className={`profile__button link ${editMode ? 'profile__button_inactive' : ''}`} type='button'>Выйти из аккаунта</button>
      </div>
    </div>
  )
}
