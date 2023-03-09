import { useState } from 'react';

export const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const errorAlreadyExists = ({ field }) => errors.find((error) => error.field === field);

  const getErrorMessageByFieldName = (fieldName) => {
    const foundError = errorAlreadyExists({ field: fieldName });
    return foundError?.message;
  };

  const setError = ({ field, message }) => {
    if (errorAlreadyExists({ field })) return;
    setErrors((prev) => [...prev, { field, message }]);
  };

  const removeError = ({ field }) => {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const hasErrors = errors.length > 0;

  return {
    setError, removeError, hasErrors, getErrorMessageByFieldName,
  };
};
