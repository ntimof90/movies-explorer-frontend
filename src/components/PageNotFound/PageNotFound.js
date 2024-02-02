import React from 'react';
import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='not-found'>
      <h2 className='not-found__title'>
        <span>404</span>
        Страница не найдена
      </h2>
      <button className='not-found__link' onClick={goBack}>Назад</button>
    </div>
  )
}
