import { useState } from 'react';

interface FormValues {
  [key: string]: any; // Allows for dynamic keys
}

interface FormErrors {
  [key: string]: string | undefined; // Error messages for each field
}

function useCustomForm<T extends FormValues>(
  callback: () => void,
  initialValues: T,
  validate: (values: T) => FormErrors
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  const clearForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, clearForm };
}

export {
    useCustomForm
}