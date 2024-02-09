import React from 'react';

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
    console.log(values);
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      console.log('ddd');
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const handleSubmit = (evt, request) => {
    evt.preventDefault();
    request()
  }

  return { handleSubmit, handleChange, resetForm, setValues, values, errors, isValid };
}