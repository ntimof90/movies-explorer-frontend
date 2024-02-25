import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { useFormWithValidation } from '../../utils/FormHandler';
import { CurrentUserContext } from '../../contexts/userContext';

export default function Profile( { onSignOut }) {
  const { user, isInitialLoading, updateUser } = useContext(CurrentUserContext);
  const { handleChange, handleChangeWithEmailValidation, resetForm, values, errors, isValid } = useFormWithValidation(user);
  const [editMode, setEditMode] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const inputRef = React.createRef();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log('sddsddd');
  // }, []);

  const handleClick = () => {
    setSubmitMessage('');
    setEditMode(true);
    inputRef.current.focus();
  }

  const onCancelClick = () => {
    setSubmitMessage('');
    setEditMode(false);
    if (values !== user) {
      resetForm(user);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    updateUser(values)
      .then((newUser) => {
        setEditMode(false);
        setSubmitMessage('Профиль успешно обновлен.');
        resetForm(newUser);
      })
      .catch(e => {
        if (e === 409) setSubmitMessage('Пользователь с таким email уже существует.')
        else setSubmitMessage('При обновлении профиля произошла ошибка.')
        resetForm(user);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className='profile'>
      <div className="profile__container">
        <h2 className='profile__title'>Привет, {isInitialLoading ? '…' : values.name}</h2>
        <form className='profile__form' action='' onSubmit={handleSubmit}>
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
              value={isInitialLoading ? '…' : values.name || ''}
              readOnly={!editMode}
              autoComplete='off'
              ref={inputRef}
              placeholder='Ваше имя'
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
              onChange={handleChangeWithEmailValidation}
              autoComplete='off'
              value={isInitialLoading ? '…' : values.email || ''}
              readOnly={!editMode}
              placeholder='Ваша почта'
            />
            <span className={`profile__input-error ${errors.email ? 'profile__input-error_active': ''}`}>{errors.email}</span>
          </label>
          {submitMessage && <p className='profile__submit-message'>{submitMessage}</p>}
          {editMode &&
            <>
              <button className='profile__button profile__button_type_submit link' disabled={!isValid || isLoading} type='submit'>{!isLoading ? 'Сохранить' : 'Подождите...'}</button>
              <button className='profile__button link' type='button' onClick={onCancelClick}>Отменить</button>
            </>
          }
        </form>
        {
          !editMode &&
          <>
            <button className='profile__button link' type='button' disabled={isInitialLoading} onClick={handleClick}>Редактировать</button>
            <button className='profile__button link' type='button' disabled={isInitialLoading} onClick={onSignOut}>Выйти из аккаунта</button>
          </>
        }
      </div>
    </div>
  )
}
