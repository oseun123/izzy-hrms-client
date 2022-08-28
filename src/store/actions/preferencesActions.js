import { setPrivateRequest } from "../../requestMethods";

const createRole = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await setPrivateRequest().post(
      "/api/preferences/roles",
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
const updateRole = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await setPrivateRequest().put(
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
const assignUsers = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await setPrivateRequest().put(
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

const deleteRole = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    dispatch({ type: "START_SPINNER_PREFERENCES" });
    const result = await setPrivateRequest().delete(
      `/api/preferences/roles/${creds.id}`
    );

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

export { createRole, deleteRole, updateRole, assignUsers };
