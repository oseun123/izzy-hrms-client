import Cookies from "js-cookie";

import { hashData } from "../../util/hash";

import { publicRequest, setPrivateRequest } from "../../requestMethods";


export const resetUsersState = (dispatch) => {
  dispatch({ type: "CLEAR_USERS_ERRORS" });
};

export const login = async (dispatch, user, history) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post("/api/auth/sign_in", user);
    console.log(result.data.payload);
    const hash = hashData(result.data.payload);
    Cookies.set(token, hash);
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "SUCCESS_LOGIN", payload: result.data });
    history.push("/");
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    const resMessage = error?.response?.data;
    dispatch({ type: "ERROR_SIGNUP", payload: resMessage });
  }
};

export const logOut = async (dispatch) => {

  dispatch({ type: "START_SPINNER" });
  const result = await setPrivateRequest().post("/api/auth/logout");
  Cookies.remove(token);
  const payload = { status: result.data.status, message: result.data.message };
  dispatch({ type: "STOP_SPINNER" });
  dispatch({ type: "LOGOUT_USER", payload });
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

