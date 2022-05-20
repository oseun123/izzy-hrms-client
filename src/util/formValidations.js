export const loginForm = (values) => {
  let errors = {};
  if (values.hasOwnProperty("email") && values.email.trim() === "") {
    errors.email = "Must not be empty";
  }
  if (values.hasOwnProperty("password") && values.password.trim() === "") {
    errors.password = "Must not be empty";
  }
  if (values.hasOwnProperty("first_name") && values.first_name.trim() === "") {
    errors.first_name = "Must not be empty";
  }
  if (values.hasOwnProperty("last_name") && values.last_name.trim() === "") {
    errors.last_name = "Must not be empty";
  }
  if (values.hasOwnProperty("name") && values.name.trim() === "") {
    errors.name = "Must not be empty";
  }
  return errors;
};

export const requestLink = (values) => {
  let errors = {};
  if (values.hasOwnProperty("email") && values.email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  return errors;
};
export const validatResetPassword = (values) => {
  let errors = {};
  if (values.hasOwnProperty("password") && values.password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  if (
    values.hasOwnProperty("password_confirm") &&
    values.password_confirm.trim() === ""
  ) {
    errors.password_confirm = "Password Confirmation must not be empty";
  }

  if (
    Object.keys(errors).length === 0 &&
    values.hasOwnProperty("password_confirm") &&
    values.hasOwnProperty("password") &&
    values.password !== values.password_confirm
  ) {
    errors.password_confirm =
      "Password confirmation feild must equal password feild";
  }
  return errors;
};
