import React from 'react';
import { Link } from 'react-router-dom'
import './Auth.css';
import logoPath from '../../images/header-logo.svg';

export default function Auth({ ui, children }) {
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [formValitidy, setFormValidity] = React.useState({});
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
    <div className='auth'>
      <Link className='auth__logo-container logo-link' to='/'><img className='logo' src={logoPath} alt='Логотип.' /></Link>
      <h2 className='auth__title'>{ ui.title }</h2>
      <form className='auth__form' name='registration' action=''>
         { children }
        <button className='auth__submit button' type='submit' disabled={!(formValitidy.name && formValitidy.email && formValitidy.password)}>{ui.button}</button>
      </form>
      <p className='auth__footer'>{ui.footer} <Link className='auth__link link' to={ui.link}>{ui.linkTitle}</Link></p>
    </div>
  )
}
