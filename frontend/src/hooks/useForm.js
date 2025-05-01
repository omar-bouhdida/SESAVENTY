import { useState, useCallback } from 'react';

/**
 * Custom hook for form handling
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler function
 * @param {Function} validate - Optional validation function
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}, onSubmit = () => {}, validate = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
    
    setIsSubmitting(false);
  }, [values, onSubmit, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

// Add default export
export default useForm;