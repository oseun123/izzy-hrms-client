const loginForm = (values) => {
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
const requestLink = (values) => {
  let errors = {};
  if (values.hasOwnProperty("email") && values.email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  return errors;
};

const validatResetPassword = (values) => {
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

const validateCreateRole = (values) => {
  let errors = {};

  if (values.hasOwnProperty("name") && values.name.trim() === "") {
    errors.name = "Name cannot not be empty.";
  }
  if (values.hasOwnProperty("permissions") && values.permissions.length === 0) {
    errors.permissions = "Permissions cannot be empty.";
  }
  return errors;
};

const validateAssignUsers = (values) => {
  let errors = {};

  if (values.hasOwnProperty("role") && values.role === "") {
    errors.role = "Role cannot not be empty.";
  }
  if (values.hasOwnProperty("users") && values.users.length === 0) {
    errors.users = "User cannot be empty.";
  }
  return errors;
};
const validateCreateDepartment = (values) => {
  let errors = {};

  if (values.hasOwnProperty("name") && values.name === "") {
    errors.name = "Name cannot not be empty.";
  }

  return errors;
};
const validateCreateGender = (values) => {
  let errors = {};

  if (values.hasOwnProperty("name") && values.name === "") {
    errors.name = "Name cannot not be empty.";
  }

  return errors;
};

const validateCreateState = (values) => {
  let errors = {};

  if (values.hasOwnProperty("name") && values.name === "") {
    errors.name = "Name cannot not be empty.";
  }

  return errors;
};
const validateCreateCountry = (values) => {
  let errors = {};

  if (values.hasOwnProperty("name") && values.name === "") {
    errors.name = "Name cannot not be empty.";
  }

  return errors;
};

export {
  validateAssignUsers,
  validateCreateRole,
  validatResetPassword,
  requestLink,
  loginForm,
  validateCreateDepartment,
  validateCreateGender,
  validateCreateState,
  validateCreateCountry,
};
