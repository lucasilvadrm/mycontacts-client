import { useCallback, useState } from 'react';

export const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const errorAlreadyExists = useCallback(
    ({ field }) => errors.find((error) => error.field === field),
    [errors],
  );

  const getErrorMessageByFieldName = useCallback((fieldName) => {
    const foundError = errorAlreadyExists({ field: fieldName });
    return foundError?.message;
  }, [errorAlreadyExists]);

  const setError = useCallback(
    ({ field, message }) => {
      if (errorAlreadyExists({ field })) return;
      setErrors((prev) => [...prev, { field, message }]);
    },
    [errorAlreadyExists],
  );

  const removeError = useCallback(({ field }) => {
    setErrors((prev) => prev.filter((error) => error.field !== field));
  }, []);

  const hasErrors = errors.length > 0;

  return {
    setError,
    removeError,
    hasErrors,
    getErrorMessageByFieldName,
  };
};
