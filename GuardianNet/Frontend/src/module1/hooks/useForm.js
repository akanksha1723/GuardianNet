import { useState, useCallback } from 'react';

/**
 * Generic form hook: tracks values, per-field errors, and "touched"
 * state, and runs a validation schema (an object of fieldName -> fn).
 *
 * @param {Object} initialValues
 * @param {Object} validationSchema  fieldName -> (value, allValues) => errorString
 */
export function useForm(initialValues, validationSchema = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateField = useCallback(
    (name, value, allValues) => {
      const validator = validationSchema[name];
      if (!validator) return '';
      return validator(value, allValues) || '';
    },
    [validationSchema]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, type, value, checked } = e.target;
      const nextValue = type === 'checkbox' ? checked : value;
      setValues((prev) => {
        const updated = { ...prev, [name]: nextValue };
        if (touched[name]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, nextValue, updated),
          }));
        }
        return updated;
      });
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, values),
      }));
    },
    [validateField, values]
  );

  const validateAll = useCallback(() => {
    const nextErrors = {};
    Object.keys(validationSchema).forEach((name) => {
      nextErrors[name] = validateField(name, values[name], values);
    });
    setErrors(nextErrors);
    setTouched(
      Object.keys(validationSchema).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    return Object.values(nextErrors).every((err) => !err);
  }, [validateField, validationSchema, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    setValues,
    errors,
    touched,
    submitting,
    setSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
}
