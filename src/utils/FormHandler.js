import React from 'react';

export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, handleChange, setValues};
}

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  // React.useEffect(() => {
  //   setValues(initialValues);
  //   console.log('s222');
  // }, [initialValues])

  const handleChange = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage});
    setIsValid(evt.target.closest('form').checkValidity());
  };

  const handleChangeWithEmailValidation = (evt) => {
    handleChange(evt);
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