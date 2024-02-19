import React from 'react';

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const handleChangeWithEmailValidation = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
    setIsValid(evt.target.closest('form').checkValidity());
    checkTopLevelDomain(evt);
  }

  const checkTopLevelDomain = (evt) => {
    const emailRegEx = /\.[a-z]{2,4}$/;
    if (evt.target.checkValidity()) {
      if (!emailRegEx.test(evt.target.value)) {
        setErrors({...errors, [evt.target.name]: 'Требуется домен верхнего уровня'});
        setIsValid(false);
      } else {
        setErrors({...errors, [evt.target.name]: ''});
        setIsValid(evt.target.closest('form').checkValidity());
      }
    }
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      console.log('ddd');
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { handleChange, handleChangeWithEmailValidation, resetForm, setValues, values, errors, isValid };
}