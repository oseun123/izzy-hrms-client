const createRole = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.post("/api/preferences/roles", creds);

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
const updateRole = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/api/preferences/roles/${creds.role_id}`,
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
const assignUsers = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await request.put(
      `/api/preferences/roles-users/${creds.role_id}`,
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
      `/api/preferences/roles-user/${creds.role_id}`,
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
    const result = await request.delete(`/api/preferences/roles/${creds.id}`);

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
    const result = await request.delete(
      `/api/preferences/departments/${creds.id}`
    );

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
    const result = await request.post("/api/preferences/departments", creds);

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
const preferencesCleanUp = async (dispatch) => {
  dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
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
};
