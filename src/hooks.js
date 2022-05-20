import { useState } from "react";
export const useForm = (callback, initState = {}, validate) => {
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const get_error = validate(values);
    if (Object.keys(get_error).length === 0) {
      callback();
      setErrors(get_error);
    } else {
      setErrors(get_error);
    }
  };
  function clearForm() {
    setValues((prev) => {
      let rep_obj = { ...prev };
      for (var key of Object.keys(rep_obj)) {
        rep_obj[key] = "";
      }
      return rep_obj;
    });
  }
  return { handleChange, handleSubmit, errors, values, clearForm };
};
