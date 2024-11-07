import { token, user_perm, storage_type } from "../../config";
// import Cookies from "js-cookie";
import { hashData } from "../../util/hash";

import { publicRequest } from "../../requestMethods";

export const resetUsersState = (dispatch) => {
  dispatch({ type: "CLEAR_USERS_ERRORS" });
};

export const login = async (dispatch, user, history, location) => {
  const from = location.state?.state?.from?.pathname || "/";
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post("/api/auth/sign_in", user);
    const hash = hashData(result.data.payload.token);
    const hash_perm = hashData(result.data.payload.user.permissions);
    storage_type.setItem(token, hash);
    storage_type.setItem(user_perm, hash_perm);

    dispatch({ type: "STOP_SPINNER" });

    dispatch({ type: "SUCCESS_LOGIN", payload: result.data });
    history.push(from);
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    const resMessage = error?.response?.data;
    dispatch({ type: "ERROR_SIGNUP", payload: resMessage });
  }
};

export const logOut = async (dispatch, request) => {
  try {
    dispatch({ type: "START_SPINNER" });
    const result = await request.post("/api/auth/logout");

    const payload = {
      status: result.data.status,
      message: result.data.message,
    };
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "LOGOUT_USER", payload });

    storage_type.removeItem(token);
    storage_type.removeItem(user_perm);
  } catch (error) {
    if (error.response?.status === 403) {
      storage_type.removeItem(token);
      dispatch({ type: "STOP_SPINNER" });

      dispatch({
        type: "LOGOUT_USER",
        payload: {
          message: "Invalid Session. Kindly login again.",
          status: "error",
        },
      });
    }
  }
};

export const requestPasswordLink = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post("/api/auth/forget_password", creds);
    const resMessage = result.data;
    dispatch({ type: "REQUEST_PASSWORD_LINK_SUCCESS", payload: resMessage });
    dispatch({ type: "STOP_SPINNER" });
    return resMessage;
  } catch (error) {
    const resMessage = error.response.data;
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "ERROR_REQUEST_PASSWORD_LINK", payload: resMessage });
  }
};

export const resetPassword = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post(
      `/api/auth/reset_password/${creds.token}`,
      creds
    );
    const resMessage = result.data;
    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: resMessage });
    dispatch({ type: "STOP_SPINNER" });
    return resMessage;
  } catch (error) {
    const resMessage = error.response.data;
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "ERROR_RESET_PASSWORD", payload: resMessage });
  }
};

export const updateCurrentUserSettings = async (dispatch, request, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await request.put("/api/auth/current_client/update", creds);

    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "CLEINT_SETTINGS_SUCCESS", payload: result.data });
    return result.data;
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });

    const resMessage = error?.response?.data;
    dispatch({ type: "CLEINT_SETTINGS_ERROR", payload: resMessage });
  }
};
