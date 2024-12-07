const preferencesCleanUp = async (dispatch) => {
  dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
};

const createRole = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/roles", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_ROLE_ERROR", payload: resMessage });
  }
};
const createBranch = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/branches", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_BRANCH_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_BRANCH_ERROR", payload: resMessage });
  }
};
const updateBranch = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/branches/${creds.branch_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_BRANCH_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_BRANCH_ERROR", payload: resMessage });
  }
};
const updateRole = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/roles/${creds.role_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_ROLE_ERROR", payload: resMessage });
  }
};
const updateDepartment = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/departments/${creds.id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_DEPARTMENT_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_DEPARTMENT_ERROR", payload: resMessage });
  }
};
const assignUsers = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/roles-users/${creds.role_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_ROLE_ERROR", payload: resMessage });
  }
};
const removeUser = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/roles-user/${creds.role_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_ROLE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_ROLE_ERROR", payload: resMessage });
  }
};

const deleteRole = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/roles/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_ROLE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_ROLE_ERROR", payload: resMessage });
  }
};
const deleteDepartment = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/departments/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_DEPARTMENT_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_DEPARTMENT_ERROR", payload: resMessage });
  }
};

const createDepartment = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/departments", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_DEPARTMENT_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_DEPARTMENT_ERROR", payload: resMessage });
  }
};
const createGender = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/genders", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_GENDER_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_GENDER_ERROR", payload: resMessage });
  }
};

const createDesignation = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/designations", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const createEmployeeCategory = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/employee-category", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const createEmployeeStatus = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/employee-status", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};
const createCompany = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/companies", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_COMPANY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_COMPANY_ERROR", payload: resMessage });
  }
};
const deleteGender = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/genders/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_GENDER_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_GENDER_ERROR", payload: resMessage });
  }
};
const deleteDisignation = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(
      `/preferences/designations/${creds.id}`
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const deleteEmpCat = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(
      `/preferences/employee-category/${creds.id}`
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};
const deleteCompany = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/companies/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_COMPANY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_COMPANY_ERROR", payload: resMessage });
  }
};
const deleteBranch = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/branches/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_BRANCH_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_BRANCH_ERROR", payload: resMessage });
  }
};
const deleteState = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/states/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_STATE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_STATE_ERROR", payload: resMessage });
  }
};
const deleteCountry = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(`/preferences/countries/${creds.id}`);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "DELETE_COUNTRY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "DELETE_COUNTRY_ERROR", payload: resMessage });
  }
};

const updateGender = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/genders/${creds.id}`,
      {...creds,gender_id: creds.id}
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_GENDER_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_GENDER_ERROR", payload: resMessage });
  }
};
const updateDesignation = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/designations/${creds.designation_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};
const updateState = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/states/${creds.state_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_STATE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_STATE_ERROR", payload: resMessage });
  }
};
const updateCountry = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/countries/${creds.country_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_COUNTRY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_COUNTRY_ERROR", payload: resMessage });
  }
};
const updateCompany = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/companies/${creds.company_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_COMPANY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_COMPANY_ERROR", payload: resMessage });
  }
};
const createState = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/states", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_STATE_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_STATE_ERROR", payload: resMessage });
  }
};
const createCountry = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/preferences/countries", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "CREATE_COUNTRY_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "CREATE_COUNTRY_ERROR", payload: resMessage });
  }
};

const updateEmpCategory = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/employee-category/${creds.emp_cat_id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const deleteEmpStatus = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.delete(
      `/preferences/employee-status/${creds.id}`
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const updateEmpStatus = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/employee-status/${creds.id}`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const updateNumberPrefix = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/settings-general-prefix`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const updateNumberSuffix = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/settings-general-suffix`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};

const updateNumberStatus = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/preferences/settings-general-status`,
      creds
    );

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    dispatch({ type: "GENERIC_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "STOP_SPINNER_PREFERENCES" });
    const resMessage = error?.response?.data;
    dispatch({ type: "GENERIC_ERROR", payload: resMessage });
  }
};
export {
  createRole,
  deleteRole,
  updateRole,
  assignUsers,
  removeUser,
  createDepartment,
  preferencesCleanUp,
  deleteDepartment,
  updateDepartment,
  createGender,
  deleteGender,
  updateGender,
  createState,
  createCountry,
  deleteState,
  deleteCountry,
  updateState,
  updateCountry,
  createCompany,
  updateCompany,
  deleteCompany,
  createBranch,
  deleteBranch,
  updateBranch,
  createDesignation,
  deleteDisignation,
  updateDesignation,
  createEmployeeCategory,
  deleteEmpCat,
  updateEmpCategory,
  createEmployeeStatus,
  deleteEmpStatus,
  updateEmpStatus,
  updateNumberPrefix,
  updateNumberSuffix,
  updateNumberStatus,
};
